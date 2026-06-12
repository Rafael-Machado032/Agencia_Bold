# ⚙️ Agência Bold - Back-end (Laravel API) teste

Esta é a API RESTful robusta que processa e armazena os dados da Agência Bold. Ela lida com as regras de negócio, persistência de mensagens de leads, gerenciamento de depoimentos e armazenamento local de arquivos.

## 🗄️ Armazenamento e Persistência
* **Banco de Dados:** MySQL configurado para persistência de dados relacionais de usuários e leads.
* **Storage Local:** O salvamento de imagens de perfil e mídias é feito diretamente no sistema de arquivos do servidor VPS.

---

## 🌐 Infraestrutura & Deploy (DevOps)

A API foi implantada em um ambiente de produção real utilizando boas práticas de infraestrutura em nuvem:

* **Servidor:** VPS baseada em **Ubuntu Server** na infraestrutura da **Oracle Cloud**.
* **Servidor Web:** **Apache** configurado para atuar como proxy reverso e servir a API Laravel.
* **Domínio Dinâmico:** Integração com **DuckDNS** para mascarar o IP público da VPS.
* **Segurança (SSL):** Instalação e configuração de certificado SSL para habilitar **HTTPS**. 
> *Nota de Infraestrutura:* A configuração do SSL via DuckDNS foi essencial para mitigar o erro de **Mixed Content** (Conteúdo Misto), garantindo que o front-end na Vercel (HTTPS) fizesse requisições seguras à API.

---

## ⚙️ Configuração Local (Desenvolvimento)

### Pré-requisitos
Você precisará do **PHP**, **Composer** e um banco **MySQL** local.

1. Acesse a pasta do back-end:
```bash
cd backend
```
2. Instale as dependências do ecossistema PHP:
```bash
composer install
```
3. Configure o seu arquivo `.env` com suas credenciais do MySQL:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agencia_bold
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```
4. Gere a chave da aplicação, rode as migrações do banco e inicie o servidor:
```bash
php artisan key:generate
php artisan migrate
php artisan serve
```
