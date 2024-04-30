from flask import Flask, request, jsonify
from flask import render_template
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
import matplotlib.pyplot as plt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

df1 = pd.read_csv('./data/tmdb_5000_credits.csv')
df2 = pd.read_csv('./data/tmdb_5000_movies.csv')

def getURLs(df):
    URL = 'https://www.themoviedb.org/movie/'
    URL_END = '/watch?language=en-US'
    combined_strings_with_url = []

    for index, row in df.iterrows():
        id_str = str(row['id'])
        title_str = row['title'].lower().replace(' ', '-').replace("'", '-').replace(
            ':', '').replace(',', '').replace('.', '')
        combined_string = f"{URL}{id_str}-{title_str}{URL_END}"
        combined_strings_with_url.append(combined_string)
    return combined_strings_with_url

df1.columns = ['id', 'tittle', 'cast', 'crew']
df2 = df2.merge(df1, on='id')

C = df2['vote_average'].mean()

m = df2['vote_count'].quantile(0.9)

q_movies = df2.copy().loc[df2['vote_count'] >= m]


def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    return (v/(v+m) * R) + (m/(m+v) * C)

q_movies['score'] = q_movies.apply(weighted_rating, axis=1)

q_movies = q_movies.sort_values('score', ascending=False)

tfidf = TfidfVectorizer(stop_words='english')

df2['overview'] = df2['overview'].fillna('')

tfidf_matrix = tfidf.fit_transform(df2['overview'])

indices = pd.Series(df2.index, index=df2['title']).drop_duplicates()

features = ['cast', 'crew', 'keywords', 'genres']
for feature in features:
    df2[feature] = df2[feature].apply(literal_eval)

def get_director(x):
    for i in x:
        if i['job'] == 'Director':
            return i['name']
    return np.nan

def get_list(x):
    if isinstance(x, list):
        names = [i['name'] for i in x]
        if len(names) > 3:
            names = names[:3]
        return names
    return []

df2['director'] = df2['crew'].apply(get_director)

features = ['cast', 'keywords', 'genres']
for feature in features:
    df2[feature] = df2[feature].apply(get_list)

def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ''
        
features = ['cast', 'keywords', 'director', 'genres']

for feature in features:
    df2[feature] = df2[feature].apply(clean_data)

def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])

df2['soup'] = df2.apply(create_soup, axis=1)
count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(df2['soup'])

cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

df2 = df2.reset_index()
indices = pd.Series(df2.index, index=df2['title'])


def get_recommendations(title, cosine_sim=cosine_sim2):
    if title in indices.keys():
        idx = indices[title]

        sim_scores = list(enumerate(cosine_sim[idx]))

        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        sim_scores = sim_scores[1:11]

        movie_indices = [i[0] for i in sim_scores]

        table = df2[['title', 'id']].iloc[movie_indices].values.tolist()
        return table
    else:
        return "Movie Title Not Found"
    
@app.route('/')
@cross_origin()
def home():
    return "Welcome to PictureLock's API!"


@app.route('/recommend/<name>')
@cross_origin()
def recommend(name):
    return jsonify(get_recommendations(name))
