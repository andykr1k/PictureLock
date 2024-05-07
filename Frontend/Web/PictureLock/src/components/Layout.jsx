import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";

export default function Layout({ children }){
  return (
    <div className="-z-10">
      <Navbar />
      <div className="z-30">{children}</div>
      <footer className="text-white absolute flex justify-center md:block bottom-0 inset-x-0 text-sm p-1">
        © All Rights Reserved PictureLock 2024
      </footer>
    </div>
  );
};
