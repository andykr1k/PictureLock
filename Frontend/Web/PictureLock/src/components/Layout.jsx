import Navbar from "./Navbar";
import ParticleBackground from "./ParticleBackground";

export default function Layout({ children }){
  return (
    <>
        <ParticleBackground/>
        <Navbar/>
        {children}
    </>
  );
};
