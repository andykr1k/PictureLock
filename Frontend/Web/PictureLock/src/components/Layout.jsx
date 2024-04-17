import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";

export default function Layout({ children }){
  return (
    <div className="-z-10">
      <ParticleBackground />
      <Navbar />
      <div className="z-30">{children}</div>
    </div>
  );
};
