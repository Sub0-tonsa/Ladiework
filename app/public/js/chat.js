// Seletor para o campo de entrada de mensagem e para o contêiner de conversa
const messageInput = document.getElementById('message-input');
const submitBtn = document.getElementById('submitBtn');

// Adiciona um evento de "keypress" ao campo de entrada de mensagem
messageInput.addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada foi a tecla Enter
    if (event.key === 'Enter') {
        // Previne a ação padrão do Enter (submissão de formulário)
        event.preventDefault();
        // Chama a função sendMessage() para enviar a mensagem
        sendMessage();
    }
});

// Função para enviar uma mensagem
function sendMessage() {
    // Obtém o texto da mensagem do campo de entrada e remove os espaços em branco para contar os caracteres 
    const messageText = messageInput.value.trim();

    // Verifica se o texto excede 338  caracteres
    if (messageText.length > 338) {
        alert('A mensagem não pode exceder 338 caracteres.');
        return;
    }

    // Verifica se o campo de entrada não está vazio. Se estiver, acontece nada. Se não estiver, envia a mensagem
    if (messageText !== '') {
        // Cria um novo elemento de mensagem
        const mainChat = document.getElementById('main-chat');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-container-you');
        messageElement.innerHTML = `
            <div class="chat-message-you">
                <div class="message-content">
                    <p>${messageText}</p>
                </div>
                <img src="images/profilephoto.svg" alt="Foto do usuário" class="user-photo">
            </div>
        `;

        // Seleciona o mainChat e enfia o html que criei pelo js
        mainChat.appendChild(messageElement);

        // Limpa o campo de entrada
        messageInput.value = '';

        // Rola para baixo para mostrar a última mensagem de acorod com o tamanho do chat principal
        mainChat.scrollTop = mainChat.scrollHeight;
    }
}

// Função para exibir o perfil da pessoa selecionada na lista de contatos
function showProfile(contactName) {
    // Atualiza o nome do contato na seção de conversa
    document.getElementById('contact-name').innerText = contactName;
}

// Adiciona eventos de clique aos itens da lista de contatos para exibir o perfil
document.querySelectorAll('.chat li').forEach(item => {
    item.addEventListener('click', function() {
        showProfile(item.querySelector('h3').innerText);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const chats = document.querySelectorAll(".chat ul li");
    const backButton = document.querySelector(".main .return");

    backButton.addEventListener("click", function() {
        document.querySelector(".main").classList.add("chat-leave"); // Adiciona a classe para sair
        document.querySelector(".main").classList.remove("chat-enter"); // Remove a classe de entrada
    });

    // Sempre que for usar um clique em uma lista use este modelo
    chats.forEach(chat => {
        chat.addEventListener("click", function() {
            document.querySelector(".main").classList.remove("chat-leave"); // Remove a classe de saída
            document.querySelector(".main").classList.add("chat-enter"); // Adiciona a classe para entrar
        });
    });
});