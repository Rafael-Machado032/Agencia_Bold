## Leitura de cookies pelo lado do cliente

1. Instalação do pacote
```bash
    npm install js-cookie
    npm install --save-dev @types/js-cookie
```
2. importe a biblioteca
```jsx
    import Cookies from 'js-cookie';
```
Para leitura use o comando
```jsx
    const cookieVariavel = Cookies.get('campoDoCookie');
```