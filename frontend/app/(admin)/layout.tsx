import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "../globals.css";
import { DepoimentoProvedor } from "@/contexts/DepoimentoContext";
import { LayoutProvedor } from "@/contexts/LayoutContext";
import { MensagemProvedor } from "@/contexts/MensagemContext";
import { UsuarioProvedor } from "@/contexts/UsuarioContext";
import { NavegacaoProvedor } from "@/contexts/Navegacao"; // ajuste o caminho
import { buscarMensagens } from "../../api/MensagemAPI";
import { buscarDepoimentos } from "../../api/DepoimentoAPI";
import { buscarLayout } from "../../api/LayoutAPI";
import { buscarUsuario } from "../../api/UsuarioAPI"; // Se quiser buscar dados do usuário também



const roboto = Roboto({
  weight: ['400', '700'], // Escolha os pesos (400 é normal, 700 é negrito)
  subsets: ["latin"],
  variable: "--font-roboto", // Nome da variável para o CSS
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { //}Meta Tags Setados aqui
  title: "10.Agência | Título Incrível",
  description: "Uma descrição curta que convence a pessoa a clicar.",
  keywords: ["palavras-chaves", "separados", "por", "virgula"],
  authors: [{ name: "Rafael Machado" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://seusite.com.br",
  },
  // Configurações de Compartilhamento (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    url: "https://seusite.com.br",
    title: "Título Incrível do Meu Site",
    description: "Uma descrição curta que convence a pessoa a clicar.",
    images: [
      {
        url: "https://seusite.com.br/banner-compartilhamento.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  // X (Antigo Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Título Incrível do Meu Site",
    description: "Uma descrição curta que convence a pessoa a clicar.",
    images: ["https://seusite.com.br/banner-compartilhamento.jpg"],
  },
};

export const viewport = { //A cor da barra do mobile com a cor do site
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};



export default async function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const layoutInicial = await buscarLayout();
  const depoimentosIniciais = await buscarDepoimentos();
  const mensagemInicial = await buscarMensagens(); // Se quiser, pode criar uma função para buscar mensagens iniciais também
  const usuarioIniciais = await buscarUsuario(); // Aqui você pode buscar os dados do usuário, se necessário
  // console.log("RESULTADO DA API NO SERVIDOR:", JSON.stringify(mensagemInicial, null, 2));

  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} font-roboto antialiased`}>
        <NavegacaoProvedor>
          <LayoutProvedor layoutInicial={layoutInicial.dados}>
            <DepoimentoProvedor depoimentosIniciais={depoimentosIniciais.dados}>
              <MensagemProvedor mensagensIniciais={mensagemInicial.dados}>
                <UsuarioProvedor usuarioIniciais={usuarioIniciais.dados}>
                {children}
                </UsuarioProvedor>
              </MensagemProvedor>
            </DepoimentoProvedor>
          </LayoutProvedor>
        </NavegacaoProvedor>
      </body>
    </html>
  );
}