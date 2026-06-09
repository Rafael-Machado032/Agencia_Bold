# 🖥️ Agência Bold - Front-end (Next.js)

Esta é a aplicação de cliente da Agência Bold. Uma interface ultra performática com foco em SEO, integrada ao painel administrativo via requisições HTTPS seguras para evitar problemas de segurança no navegador.

## ✨ Funcionalidades do Front-end

* 🔐 Fluxo de autenticação client-side integrado à API.
* 📱 Design totalmente responsivo baseado em Mobile-First.
* 🔄 Consumo de API RESTful em tempo real para alteração dinâmica de dados e layouts.
* 🚀 Roteamento protegido para a área administrativa (`/admin`).

## 📦 Bibliotecas e Recursos Técnicos

### 🍪 Gerenciamento de Cookies (Client-Side)
Utilizado para ler e manipular tokens de autenticação diretamente pelo navegador.
```bash
npm install js-cookie
npm install --save-dev @types/js-cookie
```
*Exemplo de uso:*
```tsx
import Cookies from 'js-cookie';
const token = Cookies.get('campoDoCookie');
```

## ⚙️ Configuração Local

### Pré-requisitos
Você precisará do **Git** e **Node.js** instalados.

1. Acesse a pasta do front-end:
```bash
cd frontend
```
2. Crie um arquivo `.env.local` e aponte para a URL da sua VPS:
```env
NEXT_PUBLIC_API_URL=https://duckdns.org
```
3. Instale as dependências e rode o projeto:
```bash
npm install
npm run dev
```
