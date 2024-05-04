import { SeccionPrimeraInicio } from "@/components/SeccionPrimeraInicio";
import { SeccionSecundariaInicio } from "@/components/SeccionSecundariaInicio";
import SeccionTerceraInicio from "@/components/SeccionTerceraInicio";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/botonScroll/ScrollBoton";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <SeccionPrimeraInicio />
      <SeccionSecundariaInicio />
      <SeccionTerceraInicio />
      <Footer />
      <ScrollTop />
    </>
  );
}
