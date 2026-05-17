# 💬 Talkr — Mensagens em Tempo Real

O **Talkr** é um aplicativo de chat progressivo em tempo real que combina a simplicidade visual inspirada no WhatsApp Web com uma arquitetura de comunicação moderna e descentralizada em nuvem. O projeto foi projetado com foco total em privacidade, responsividade móvel extrema e persistência de dados.

---

## 🚀 Funcionalidades Principais (v1.4.0)

* **Autenticação Segura:** Sistema de login e cadastro integrado via Firebase Authentication (E-mail/Senha) com gerenciamento de apelidos (Nicks) dinâmicos.
* **Arquitetura Multi-Salas:**
    * **Sala Geral:** Um canal global e estático acessível a todos os usuários da plataforma.
    * **Salas Privadas Expandidas:** Criação de salas criptografadas por regras lógicas baseadas em códigos de convite customizados (ex: `sala-da-esposa`). 
* **Persistência em Nuvem:** A lista de salas nas quais o usuário se inscreveu fica salva no Firebase Cloud Firestore. Isso significa sincronização imediata ao alternar entre o computador e o celular.
* **Interface Mobile Anti-Quebra:** Design responsivo que utiliza propriedades CSS modernas (`safe-area-inset-bottom`) para evitar que as barras de navegação virtuais e teclados dos smartphones cubram o campo de digitação.
* **Segurança Estrita:** Sem Modo Anônimo. Todas as mensagens carregam obrigatoriamente a identidade visual e autoria de quem as enviou, prevenindo spans ou abusos nos canais privados.
* **Notificações Web Push:** Sistema nativo que dispara alertas visuais e sonoros no dispositivo caso o aplicativo receba uma nova mensagem enquanto estiver minimizado ou em segundo plano.
* **Manual de Integração (UX):** Um modal de ajuda interativo é exibido de forma automática para novos usuários para explicar a dinâmica de compartilhamento de códigos das salas privadas.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5 (Semântico), CSS3 (Flexbox/Grid/Safe Areas) e JavaScript Nativo (ES6+).
* **Banco de Dados:** Firebase Cloud Firestore (Tempo Real).
* **Autenticação:** Firebase Auth.
* **Hospedagem:** GitHub Pages (com suporte nativo a HTTPS para ativação de Service Workers/Notificações).

---

## 📝 Como Configurar as Regras de Segurança no Firebase

Para o correto funcionamento do filtro de salas e segurança de dados, certifique-se de aplicar as seguintes regras na aba **Rules** do seu *Firestore Database*:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid 
                    && request.resource.data.roomId is string
                    && request.resource.data.text is string 
                    && request.resource.data.text.size() > 0 
                    && request.resource.data.text.size() < 1000 
                    && request.resource.data.timestamp == request.time;
      allow update, delete: if false;
    }

    match /user_rooms/{docId} {
      allow read, create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if false;
    }
  }
}

```

---

## 📦 Como Rodar ou Contribuir com o Projeto

1. Faça o clone deste repositório:
```bash
git clone [https://github.com/SEU-USUARIO/talkr.git](https://github.com/SEU-USUARIO/talkr.git)

```


2. Abra o arquivo `index.html` e insira as suas credenciais do Firebase dentro do objeto `firebaseConfig`:
```javascript
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

```


3. Suba as alterações para a branch `main` e ative o **GitHub Pages** nas configurações do repositório para gerar o seu link de produção seguro.

---

## 🔒 Licença

Este projeto é de uso livre e pessoal. Desenvolvido para fins de comunicação privada estável, segura e ágil.

```

```
