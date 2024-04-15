const chatbox = document.getElementById("chatbox");
const chatInput = document.getElementById("message-input");

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    navbarToggle.addEventListener('click', function() {
        if (navbarMenu.style.display === 'block') {
            navbarMenu.style.display = 'none';
        } else {
            navbarMenu.style.display = 'block';
        }
    });
});


let userMessage = null; // Variable to store user's message

const createMessageElement = (message, className, iconClass) => {
    // Create a <p> element with the message content
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;

    // Create a <span> element for the avatar icon
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("avatar-icon");
    iconSpan.innerHTML = `<i class="material-icons">${iconClass}</i>`;

    // Create a <div> element with the specified className
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(className);

    // Append the <span> element with the icon to the message <div>
    messageDiv.appendChild(iconSpan);

    // Append the <p> element with the message content to the message <div>
    messageDiv.appendChild(messageParagraph);

    // Return the message <div>
    return messageDiv;
}

const removeThinkingMessage = () => {
    const thinkingMessage = document.querySelector(".thinking-message");
    if (thinkingMessage) {
        thinkingMessage.remove();
    }
}

const generateResponse = () => {
    const API_KEY = "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"; // Your API key here
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and append it to chatbox
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        const responseMessage = data.choices[0].message.content.trim();
        removeThinkingMessage(); // Remove the "Thinking..." message
        chatbox.appendChild(createMessageElement(responseMessage, "bot-message", "smart_toy"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }).catch(() => {
        chatbox.appendChild(createMessageElement("Oops! Something went wrong. Please try again.", "bot-message error", "error"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        removeThinkingMessage(); // Remove the "Thinking..." message
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Append the user's message to the chatbox
    chatbox.appendChild(createMessageElement(userMessage, "user-message", "person"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Generate response after a short delay to simulate thinking time
        generateResponse();
    }, 600);

    // Clear input field after sending message
    chatInput.value = "";
}

// Event listener for sending message
document.getElementById("btn-submit").addEventListener("click", handleChat);

// Event listener for pressing Enter key
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleChat();
    }});


// parte em que o fromulario emviar as mensagens pra ca e o chat cria a primeira pergunta 
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name');
    const userNeeds = params.get('needs');

    // Lista de palavras-chave que podem indicar problemas escolares
    const keywords = ['bullying', 'ansiedade', 'depressão', 'solidão', 'pressão', 'isolamento', 'conflito', 'autoestima', 'discriminação', 'exclusão', 'notas baixas', 'boas notas', 'notas boas', 'vergonha', 'obesidade', 'professor rígido'];
    // Respostas correspondentes às palavras-chave
    const keywordResponses = {
        'bullying': `Olá, ${userName}! Parece que você está enfrentando bullying. Pode compartilhar como você está se sentindo em relação a esse sentimento? Saiba que estou aqui para te ajudar.`,
        'ansiedade': `Olá, ${userName}! Parece que você está ansioso. Pode compartilhar como você está se sentindo em relação a esse sentimento? Estou aqui para te ouvir.`,
        'depressaão': `Olá, ${userName}! Parece que você está deprimido. Pode compartilhar como você está se sentindo em relação a esse sentimento? Saiba que estou aqui para te apoiar.`,
        'solidão': `Olá, ${userName}! Parece que você pode estar enfrentando sentimentos de solidão. Pode compartilhar como você está se sentindo em relação a esse sentimento? Estou aqui para conversarmos juntos.`,
        'pressão': `Olá, ${userName}! Parece que você está se sentindo pressionado. Pode compartilhar como você está se sentindo em relação a essa pressão? Estou aqui para te ajudar.`,
        'isolamento': `Olá, ${userName}! Parece que você está se sentindo isolado. Pode compartilhar como você está se sentindo em relação a esse isolamento? Saiba que estou aqui para te ouvir.`,
        'conflito': `Olá, ${userName}! Parece que você está enfrentando um conflito. Pode compartilhar como você está lidando com essa situação? Estou aqui para te ajudar.`,
        'autoestima': `Olá, ${userName}! Parece que você está enfrentando problemas de autoestima. Pode compartilhar como você está se sentindo em relação a isso? Estou aqui para te apoiar.`,
        'discriminação': `Olá, ${userName}! Parece que você está sendo discriminado. Pode compartilhar como você está se sentindo em relação a isso? Saiba que estou aqui para te ouvir.`,
        'exclusão': `Olá, ${userName}! Parece que você está se sentindo excluído. Pode compartilhar como você está se sentindo em relação a essa exclusão? Estou aqui para te ajudar.`,
        'notas baixas': `Olá, ${userName}! Parece que você está com notas baixas. Pode me contar mais sobre como isso tem te afetado? Estou aqui para te ajudar.`,
        'boas notas': `Olá, ${userName}! Parece que você está com boas notas. Parabéns! Como você se sente em relação a isso? Estou aqui para te ouvir.`,
        'notas boas': `Olá, ${userName}! Parece que você está com boas notas. Isso é ótimo! Como você está se sentindo em relação a isso? Estou aqui para te apoiar.`,
        'vergonha': `Olá, ${userName}! Parece que você está sentindo vergonha. Pode compartilhar como você está lidando com essa emoção? Estou aqui para te ajudar.`,
        'obesidade': `Olá, ${userName}! Parece que você está lidando com questões relacionadas à obesidade. Pode compartilhar como você está se sentindo em relação a isso? Estou aqui para te ouvir.`,
        'professor rígido': `Olá, ${userName}! Parece que você está enfrentando dificuldades com um professor ou professora rígida. Como isso tem te afetado? Estou aqui para te ajudar.`
    };
    

    let initialQuestion;

    // Verifica se o texto do usuário contém palavras-chave
    for (const keyword of keywords) {
        if (userNeeds.toLowerCase().includes(keyword)) {
            initialQuestion = keywordResponses[keyword];
            break;
        }
    }

    // Se nenhuma palavra-chave foi encontrada, use a pergunta padrão
    //if (!initialQuestion) {
     //   initialQuestion = `Olá, ${userName}! Com base nessas suas necessidades emocionais na escola, como posso te ajudar hoje?`;
    //}

    if (!initialQuestion) {
        const responses = [
            `Olá, ${userName}! Com base nessas suas necessidades emocionais na escola, você pode compartilhar mais sobre?`,
            `Olá, ${userName}! Como posso te auxiliar hoje com o que você está passando na escola? Estou aqui para te ajudar.`,
            `Olá, ${userName}! Que tipo de suporte você está procurando na escola hoje? Estou aqui para te apoiar.`
        ];
    
        initialQuestion = responses[Math.floor(Math.random() * responses.length)];
    }

    const chatbox = document.getElementById('chatbox');
    const botMessage = chatbox.querySelector('.bot-message');
    botMessage.textContent = initialQuestion;
});

