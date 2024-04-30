from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# def read():
#     netflix_movies_df = pd.read_csv('./data/netflix_titles.csv')
#     amazon_movies_df = pd.read_csv('./data/amazon_titles.csv')
#     disney_movies_df = pd.read_csv('./data/disney_titles.csv')
#     hbo_movies_df = pd.read_csv('./data/hbo_titles.csv')
#     hulu_movies_df = pd.read_csv('./data/hulu_titles.csv')
#     paramount_movies_df = pd.read_csv('./data/paramount_titles.csv')

#     netflix_movies_df['platform'] = 'Netflix'
#     disney_movies_df['platform'] = 'Disney Plus'
#     paramount_movies_df['platform'] = 'Paramount Plus'
#     hulu_movies_df['platform'] = 'Hulu'
#     hbo_movies_df['platform'] = 'HBO Max'
#     amazon_movies_df['platform'] = 'Amazon Prime'

#     movies_df = netflix_movies_df._append(amazon_movies_df, ignore_index = True)._append(hulu_movies_df, ignore_index = True)._append(hbo_movies_df, ignore_index = True)._append(paramount_movies_df, ignore_index = True)._append(disney_movies_df, ignore_index = True)

#     movies_df = movies_df[movies_df['production_countries'] == '[\'US\']']

#     movies_df['production_countries'] = movies_df['production_countries'].str.replace('[', '')
#     movies_df['production_countries'] = movies_df['production_countries'].str.replace(']', '')
#     movies_df['production_countries'] = movies_df['production_countries'].str.replace('\'', '')

#     movies_df = movies_df[['title', 'type', 'description', 'genres','release_year', 'imdb_score', 'tmdb_score', 'platform']]
    
#     movies_df.dropna(inplace=True)

#     movies_df = movies_df.groupby(['title', 'type', 'description', 'genres', 'release_year', 'tmdb_score', 'imdb_score'])['platform'].apply(', '.join).reset_index()

#     return movies_df

# def train(movies_df):
#     cv = CountVectorizer(max_features=50000,stop_words='english')

#     def combine_features(data):
#         features=[]
#         for i in range(0, data.shape[0]):
#             features.append(data['description'][i] + ' ' + data['genres'][i] + ' ' + str(data['release_year'][i]))
#         return features
    
#     movies_df['combined'] = combine_features(movies_df)

#     # ps = PorterStemmer()

#     # def stem(text):
#     #     y=[]
#     #     for i in text.split():
#     #         y.append(ps.stem(i))
#     #     return " ".join(y)

#     # movies_df['description'] = movies_df['description'].apply(stem)

#     vectors = cv.fit_transform(movies_df['combined']).toarray()

#     similarity = cosine_similarity(vectors)

#     return similarity

# def recommend_movie(similarity, movies_df, film_type, movie, platforms):
#     movie_index = movies_df[movies_df['title']==movie].index[0]
#     distances = similarity[movie_index]
#     movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])[1:25]

#     recommends = []
#     count = 0

#     for i in movie_list:
#         if count != 5:
#             if movies_df.iloc[i[0]].platform in platforms:
#                 if movies_df.iloc[i[0]].type == film_type:
#                     recommends.append(movies_df.iloc[i[0]].title)
#                     count += 1
#         else:
#             break
#     return recommends

# # Fix return with 0 in total
# def recommendation_accuracy(recommends, movies_df, type, title, platforms):
#     total = len(recommends)
#     count = 0
#     for x in recommends:
#         if movies_df[movies_df['title']==x].type.values[0] == type:
#             count += 0.5
#         if movies_df[movies_df['title']==x].platform.values[0] in platforms:
#             count += 0.5
#     return "%.0f%%" % (100 * count/total)

# def log(film_type, movie, platforms):
#     print("Film Type: " + film_type)
#     print("Movie Title: " + movie)
#     for platform in platforms:
#         print("Platform: " + platform)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# movies_df = read()
# similarity = train(movies_df)

@app.route('/')
@cross_origin()
def home():
    return "Welcome to PictureLock's API!"

# @app.route('/recommend/<film_type>/<movie>/<platforms>')
# @cross_origin()
# def recommend(film_type, movie, platforms):
#     # movies_df = read()
#     movies_df = ""
#     platforms = platforms.split("-")
#     log(film_type, movie, platforms)

#     recommends = recommend_movie(similarity, movies_df, str(film_type), str(movie), platforms)
#     # acc = recommendation_accuracy(recommends, movies_df, str(film_type), str(movie), platforms)
#     acc = None
#     response_data = {
#         'recommendations': recommends,
#         'accuracy': acc
#     }

#     return jsonify(response_data)