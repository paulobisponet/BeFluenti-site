/**
 * Befluent Chatbot - Sistema de Chat Educacional
 * Simula um assistente virtual com respostas inteligentes
 */

'use strict';

// ===== CONFIGURAÇÕES DO CHATBOT =====
const CONFIG = {
    typingDelay: 1500,
    maxMessageLength: 500,
    storageKey: 'befluent_chat_history'
};

// ===== BASE DE CONHECIMENTO =====
const KNOWLEDGE_BASE = {
    // Saudações
    greetings: {
        keywords: ['oi', 'olá', 'hello', 'boa tarde', 'bom dia', 'boa noite', 'hey'],
        responses: [
            'Olá! 👋 Seja bem-vindo(a) ao suporte da Befluent! Como posso ajudar você hoje?',
            'Oi! 😊 Sou o assistente virtual da Befluent. Em que posso ser útil?',
            'Olá! Fico feliz em falar com você. Qual sua dúvida sobre a plataforma Befluent?'
        ]
    },

    // Login e Acesso
    login: {
        keywords: ['login', 'entrar', 'acesso', 'senha', 'usuário', 'cadastro'],
        responses: [
            '🔐 Para fazer login na sua turma:\n\n1. Você deve ter recebido um link de acesso por e-mail ou WhatsApp\n2. Clique no link ou digite o endereço no navegador\n3. Use suas credenciais fornecidas pelos professores\n\nSe não recebeu o acesso, entre em contato: (81) 99469-2570'
        ]
    },

    // Downloads
    downloads: {
        keywords: ['download', 'baixar', 'app', 'aplicativo', 'quiz', 'celular', 'android'],
        responses: [
            '📱 Para baixar nossos aplicativos educativos:\n\n1. Visite nossa página de Downloads no site\n2. Escolha o app da sua disciplina\n3. Clique em "Download"\n\n🎯 Apps disponíveis:\n• Quiz de Português\n• Quiz de Matemática\n• Quiz de Inglês\n• Quiz de História\n• Quiz de Ciências\n\n📋 Em breve na Play Store!'
        ]
    },

    // Estudos e Provas
    studies: {
        keywords: ['prova', 'estudar', 'matéria', 'conteúdo', 'o que vai cair', 'disciplina'],
        responses: [
            '📚 Para saber o que vai cair na prova:\n\n1. Consulte o cronograma da sua turma\n2. Verifique os materiais disponibilizados\n3. Use nossos quizzes para revisar\n4. Pergunte diretamente aos professores\n\n💡 Dica: Pratique com nossos apps de quiz para fixar o conteúdo!'
        ]
    },

    // Dicas de Estudo
    studyTips: {
        keywords: ['como estudar', 'dicas', 'aprender melhor', 'método', 'concentração'],
        responses: [
            '🧠 Dicas para estudar melhor:\n\n✅ Crie uma rotina de estudos\n✅ Use técnicas como mapas mentais\n✅ Faça pausas regulares (Técnica Pomodoro)\n✅ Pratique com nossos quizzes\n✅ Estude em ambiente silencioso\n✅ Revise o conteúdo regularmente\n\nCom nossa formação em Neuropsicopedagogia, sabemos que cada pessoa aprende de forma única! 🎯'
        ]
    },

    // Contato e Professores
    contact: {
        keywords: ['contato', 'professores', 'paulo', 'mônica', 'falar', 'atendimento'],
        responses: [
            '👨‍🏫👩‍🏫 Contato com Paulo e Mônica Bispo:\n\n📧 E-mail: atendimentobefluent@gmail.com\n📱 WhatsApp: (81) 99469-2570\n🕐 Horário: Segunda a sexta, 8h às 18h\n\nEles respondem pessoalmente e adoram ajudar os alunos! 😊'
        ]
    },

    // Horários
    schedule: {
        keywords: ['horário', 'atendimento', 'quando', 'funciona', 'disponível'],
        responses: [
            '🕐 Horários de Atendimento:\n\n📅 Segunda a sexta-feira\n⏰ Das 08:00 às 18:00\n📱 Suporte via WhatsApp e e-mail\n🤖 Este chat está disponível 24h!\n\nEm horários especiais, respondemos em até 24 horas. ⚡'
        ]
    },

    // Suporte Técnico
    techSupport: {
        keywords: ['problema', 'erro', 'não funciona', 'bug', 'travou', 'suporte técnico'],
        responses: [
            '🔧 Problemas técnicos?\n\n1. Tente atualizar a página (F5)\n2. Limpe o cache do navegador\n3. Verifique sua conexão\n4. Teste em outro navegador\n\nSe persistir:\n📧 atendimentobefluent@gmail.com\n📱 (81) 99469-2570\n\nDescreva o problema detalhadamente! 🔍'
        ]
    },

    // Sobre a Befluent
    about: {
        keywords: ['befluent', 'plataforma', 'sobre', 'quem', 'história', 'missão'],
        responses: [
            '💫 Sobre a Befluent:\n\n"Educar com amor, aprender com propósito"\n\n👫 Criada por Paulo e Mônica Bispo\n🎓 +25 anos de experiência educacional\n📚 Formação em Pedagogia e Letras\n🧠 Especialistas em Neuropsicopedagogia\n❤️ Casados desde 2001\n\nNossa missão é transformar vidas através da educação afetiva! ✨'
        ]
    },

    // Agradecimentos
    thanks: {
        keywords: ['obrigado', 'obrigada', 'valeu', 'thanks', 'agradeço'],
        responses: [
            'Fico feliz em ter ajudado! 😊 Se precisar de mais alguma coisa, estarei aqui!',
            'Por nada! 🌟 Lembre-se: estamos sempre aqui para apoiar seu aprendizado!',
            'Foi um prazer ajudar! 💙 Bons estudos e conte conosco sempre!'
        ]
    },

    // Despedidas
    goodbye: {
        keywords: ['tchau', 'bye', 'até logo', 'fui', 'falou'],
        responses: [
            'Até logo! 👋 Bons estudos e muito sucesso na sua jornada educacional!',
            'Tchau! 🌟 Lembre-se: a Befluent está sempre aqui para você!',
            'Até mais! 💙 Que seus estudos sejam produtivos e prazerosos!'
        ]
    }
};

// ===== RESPOSTAS PADRÃO =====
const DEFAULT_RESPONSES = [
    '🤔 Hmm, não tenho certeza sobre isso. Mas posso te conectar com nossos professores!\n\n📱 WhatsApp: (81) 99469-2570\n📧 E-mail: atendimentobefluent@gmail.com',
    '💡 Essa é uma ótima pergunta! Para uma resposta mais precisa, recomendo falar diretamente com Paulo e Mônica:\n\n📞 (81) 99469-2570\n✉️ atendimentobefluent@gmail.com',
    '🎯 Não encontrei uma resposta específica, mas nossos educadores Paulo e Mônica podem ajudar melhor:\n\n💬 WhatsApp: (81) 99469-2570\n📮 atendimentobefluent@gmail.com'
];

// ===== VARIÁVEIS GLOBAIS =====
let messageHistory = [];
let isTyping = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    loadChatHistory();
    initializeEventListeners();
    focusInput();
});

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    const messageInput = document.getElementById('messageInput');
    
    // Auto-resize input e contagem de caracteres
    messageInput.addEventListener('input', function() {
        // Limitar caracteres
        if (this.value.length > CONFIG.maxMessageLength) {
            this.value = this.value.substring(0, CONFIG.maxMessageLength);
        }
    });

    // Enter para enviar
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    });
}

// ===== ENVIO DE MENSAGENS =====
function sendMessage(event) {
    event.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Salvar no histórico
    messageHistory.push({ type: 'user', content: message, timestamp: new Date().toISOString() });
    
    // Processar resposta do bot
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(botResponse, 'bot');
            messageHistory.push({ type: 'bot', content: botResponse, timestamp: new Date().toISOString() });
            saveChatHistory();
        }, CONFIG.typingDelay);
    }, 500);
}

function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    
    // Simular envio
    const event = new Event('submit');
    sendMessage(event);
}

// ===== GERAÇÃO DE RESPOSTAS =====
function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Verificar cada categoria da base de conhecimento
    for (const [category, data] of Object.entries(KNOWLEDGE_BASE)) {
        for (const keyword of data.keywords) {
            if (message.includes(keyword)) {
                return getRandomResponse(data.responses);
            }
        }
    }
    
    // Resposta padrão se não encontrar correspondência
    return getRandomResponse(DEFAULT_RESPONSES);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// ===== INTERFACE DO CHAT =====
function addMessage(content, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    
    // Processar quebras de linha e formatação
    const formattedContent = formatMessageContent(content);
    messageBubble.innerHTML = formattedContent;
    
    const messageTime = document.createElement('span');
    messageTime.className = 'message-time';
    messageTime.textContent = formatTime(new Date());
    
    messageContent.appendChild(messageBubble);
    messageContent.appendChild(messageTime);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function formatMessageContent(content) {
    return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function focusInput() {
    const messageInput = document.getElementById('messageInput');
    messageInput.focus();
}

// ===== INDICADOR DE DIGITAÇÃO =====
function showTypingIndicator() {
    isTyping = true;
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'flex';
    
    // Desabilitar botão de envio
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.disabled = true;
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'none';
    
    // Reabilitar botão de envio
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.disabled = false;
    
    focusInput();
}

// ===== GERENCIAMENTO DE HISTÓRICO =====
function saveChatHistory() {
    try {
        // Manter apenas as últimas 50 mensagens para não sobrecarregar o storage
        const recentHistory = messageHistory.slice(-50);
        const historyData = {
            messages: recentHistory,
            lastSaved: new Date().toISOString()
        };
        
        // Como não podemos usar localStorage, vamos apenas manter em memória
        // Em uma implementação real, isso seria enviado para um servidor
        console.log('Chat history would be saved:', historyData);
        
    } catch (error) {
        console.warn('Erro ao salvar histórico do chat:', error);
    }
}

function loadChatHistory() {
    try {
        // Em uma implementação real, isso carregaria do servidor
        // Por ora, começamos com histórico vazio
        messageHistory = [];
        
    } catch (error) {
        console.warn('Erro ao carregar histórico do chat:', error);
        messageHistory = [];
    }
}

function clearChat() {
    if (confirm('Tem certeza que deseja limpar toda a conversa?')) {
        const chatMessages = document.getElementById('chatMessages');
        
        // Manter apenas a mensagem de boas-vindas
        const welcomeMessage = chatMessages.querySelector('.bot-message');
        chatMessages.innerHTML = '';
        if (welcomeMessage) {
            chatMessages.appendChild(welcomeMessage);
        }
        
        // Limpar histórico
        messageHistory = [];
        
        // Mostrar mensagem de confirmação
        setTimeout(() => {
            addMessage('Conversa limpa! Como posso ajudar você agora? 😊', 'bot');
        }, 500);
    }
}

// ===== UTILITÁRIOS =====
function handleError(error, userMessage = 'Ops! Algo deu errado.') {
    console.error('Chatbot Error:', error);
    
    if (isTyping) {
        hideTypingIndicator();
    }
    
    addMessage(
        '😅 Ops! Tive um pequeno problema técnico. Mas não se preocupe!\n\n' +
        'Entre em contato direto com nossos professores:\n' +
        '📱 (81) 99469-2570\n' +
        '📧 atendimentobefluent@gmail.com', 
        'bot'
    );
}

// ===== RECURSOS ESPECIAIS =====
function handleSpecialCommands(message) {
    const commands = {
        '/help': () => {
            return '🆘 Comandos disponíveis:\n\n' +
                   '• Digite suas dúvidas naturalmente\n' +
                   '• Use os botões de perguntas frequentes\n' +
                   '• /clear - Limpar conversa\n' +
                   '• /contact - Informações de contato\n\n' +
                   'Estou aqui para ajudar! 😊';
        },
        '/clear': () => {
            clearChat();
            return null;
        },
        '/contact': () => {
            return KNOWLEDGE_BASE.contact.responses[0];
        }
    };
    
    const command = message.toLowerCase().trim();
    if (commands[command]) {
        return commands[command]();
    }
    
    return null;
}

// ===== ANALYTICS E FEEDBACK =====
function trackInteraction(type, content) {
    // Em uma implementação real, isso enviaria dados para analytics
    const interaction = {
        type: type,
        content: content,
        timestamp: new Date().toISOString(),
        sessionId: 'chat_session_' + Date.now()
    };
    
    console.log('Interaction tracked:', interaction);
}

// ===== EXPORTAR FUNCÕES GLOBAIS =====
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.clearChat = clearChat;
