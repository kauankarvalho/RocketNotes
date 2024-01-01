<h1 align="center">RocketNotes WEB</h1>

<p align="center">
  Projeto retirado do programa Explorer, um programa de estudo exclusivo promovido pela Rocketseat para o ensino de tecnologias web.
</p>

<div align="center">
  <a href="#-introdução">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-pré-requisitos">Pré-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-instalação-e-configuração">Instalação e Configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-contribuições">Contribuições</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-contato">Contato</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</div>

<br />

<div align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000" />
</div>

## 📌 Introdução

O RocketNotes WEB é uma aplicação web que recria de forma excepcional a interface de menu interativa de um aplicativo de anotações. Destaca-se pela sua acessibilidade exemplar, contrastes de cores bem definidos, ícones intuitivos e um design singular, proporcionando uma experiência visualmente descomplicada e agradável.

## 🧪 Tecnologias

Está aplicação foi desenvolvido com as seguintes tecnologias:

- [**JavaScript**](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [**ViteJS**](https://vitejs.dev)
- [**ReactJS**](https://react.dev)
- [**react-router-dom**](https://reactrouter.com)
- [**react-icons**](https://react-icons.github.io/react-icons)
- [**react-toastify**](https://fkhadra.github.io/react-toastify/introduction)
- [**Tailwind CSS**](https://tailwindcss.com)
- [**Axios**](https://axios-http.com)
- [**Prettier**](https://prettier.io)
- [**ESLint**](https://eslint.org)

## 📦 Pré-requisitos

Lista de pré-requisitos necessários para que o projeto seja executado com sucesso:

- [**NodeJS**](https://nodejs.org) - Versão 20.0.0 ou superior.
- [**NPM**](https://www.npmjs.com) - Versão 10.0.0 ou superior.

## 🛠️ Instalação e Configuração

Siga os passos abaixo para instalar e configurar a aplicação em um ambiente local:

1. **📥 Clone o repositório:**

   ```bash
   git clone https://github.com/kauankarvalho/RocketNotes.git
   ```

2. **📂 Navegue para o diretório do projeto:**

   ```bash
   cd ./RocketNotes/web
   ```

   > **Oberservação:** O diretório `web` do projeto requer uma API para operar corretamente. Se você não possui uma API própria, poderá utilizar a API integrada à aplicação acessando o diretório `../api`.

3. **📦 Instale as dependências:**

   ```bash
   pnpm install
   ```

   > **Oberservação:** O gerenciador de pacotes que estou usando é o [**pnpm**](https://pnpm.io), no entanto, você pode optar pelo de sua preferência.

4. **⚙️ Crie um arquivo de configuração:**

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias de acordo com o modelo fornecido em `.env.example`. Por exemplo:

   ```dotenv
   VITE_API_URL=valor
   ```

   > **Oberservação:** Atualize o `valor` da variável de acordo com a URL da sua API.

5. **▶️ Inicie o servidor:**

   ```bash
   pnpm dev
   ```

   Isso iniciará o projeto na porta especificada no arquivo `vite.config.js`.

6. **🌐 Acesse a Aplicação:**

   Abra o navegador para acessar a aplicação em **http://localhost:5000** (substitua a porta conforme necessário).

   Agora a aplicação está instalada, configurada e em execução no seu ambiente local. Você pode começar a usá-la para testes e desenvolvimento.

## 🤝 Contribuições

Agradeço por considerar contribuir para o **RocketNotes**. Contribuições são importantes para melhorar e evoluir o projeto. Aqui estão algumas maneiras pelas quais você pode contribuir.

### Abertura de Issues:

Se você encontrar problemas, bugs ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue. Certifique-se de incluir detalhes suficientes para que possamos entender o problema ou a sugestão.

### Envio de Pull Request:

Se você deseja fazer alterações no código, pode criar um fork deste repositório, fazer suas alterações no seu fork e, em seguida, enviar um Pull Request. Certifique-se de descrever as alterações que você fez e explicar como isso beneficia o projeto.

### Melhoria da Documentação:

A documentação é fundamental para manter o projeto fácil de entender. Se você identificar partes do código que precisam de documentação adicional, pode contribuir adicionando comentários claros ou atualizando o README.

### Como Contribuir:

1. Faça um fork deste repositório;
2. Crie uma nova branch para suas alterações: `git checkout -b feature/nome-da-sua-feature`;
3. Faça suas alterações e commit: `git commit -m "Adiciona nova funcionalidade"`;
4. Envie suas alterações para o GitHub: `git push`;
5. Abra um Pull Request para este repositório.

## ✉️ Contato

Se você deseja um projeto comigo, colaborações ou oferecer oportunidades de carreira, fique à vontade para entrar em contato:

- **E-mail:** [kauan.karvalho@outlook.com](mailto:kauan.karvalho@outlook.com)

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [**LICENSE**](https://github.com/kauankarvalho/RocketNotes/blob/main/LICENSE) para obter mais detalhes.
