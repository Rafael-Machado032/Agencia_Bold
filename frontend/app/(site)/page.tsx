
import Hero from "@/components/site/Hero";
import Empresas from "@/components/site/Empresas";
import Servicos from "@/components/site/Servicos";
import Incetivo from "@/components/site/Incetivo";
import Beneficio from "@/components/site/Beneficio";
import Depoimentos from "@/components/site/Depoimentos";
import Formulario from "@/components/site/Formulario";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Empresas/>
      <Servicos/>
      <Incetivo/>
      <Beneficio/>
      <Depoimentos/>
      <Formulario/>
    </main>
  );
}
