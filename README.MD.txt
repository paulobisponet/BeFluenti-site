# 🎓 Befluent - Plataforma Educacional

> **"Educar com amor, aprender com propósito."**

Plataforma educacional moderna e acessível criada por **Paulo e Mônica Bispo**, educadores com mais de 25 anos de experiência, especializados em Neuropsicopedagogia e Psicopedagogia.

## 📋 Sobre o Projeto

A **Befluent** é uma plataforma completa que conecta o ensino presencial ao digital, oferecendo recursos interativos e acolhedores para todos os níveis de ensino e cursos livres.

### ✨ Características Principais

- 🎨 **Design Responsivo**: Interface moderna que funciona em todos os dispositivos
- ♿ **Acessibilidade**: Navegação por teclado, alto contraste e semântica adequada
- 🚀 **Performance**: Código otimizado e carregamento rápido
- 🤖 **Chatbot Educacional**: Assistente virtual para suporte aos estudantes
- 📱 **Apps Educacionais**: Quizzes gamificados para download
- 🎯 **SEO Otimizado**: Meta tags e estrutura semântica

## 🏗️ Estrutura do Projeto

```
befluent-site/
├── index.html              # Página inicial
├── about.html              # Sobre nós
├── contact.html            # Contato
├── downloads.html          # Apps e quizzes
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos principais e responsividade
│   ├── js/
│   │   └── main.js         # Scripts de interação
│   └── img/                # Imagens (logo, ícones, etc.)
├── chatbot/
│   ├── chatbot.html        # Interface do chatbot
│   ├── chatbot.js          # Sistema de IA simulada
│   └── chatbot.css         # Estilos do chatbot
└── README.md               # Este arquivo
```

## 🚀 Como Executar o Projeto

### 1. Download dos Arquivos

Baixe todos os arquivos mantendo a estrutura de pastas.

### 2. Servidor Local (Recomendado)

Para melhor experiência, use um servidor local:

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server

# Opção 3: Live Server (VS Code)
# Instale a extensão Live Server e clique em "Go Live"
```

### 3. Acesso Direto

Você também pode abrir o `index.html` diretamente no navegador, mas alguns recursos podem ter limitações.

## 🎨 Personalização

### Cores da Identidade Visual

```css
:root {
    --primary-color: #2e6fdf;    /* Azul principal */
    --secondary-color: #00c2a8;  /* Verde-menta */
    --accent-color: #ffb703;     /* Amarelo destaque */
    --background-color: #f9fafc; /* Fundo claro */
    --text-dark: #1f2937;        /* Texto escuro */
}
```

### Alterando Conteúdo

#### Informações de Contato
Edite o arquivo `contact.html` e altere:
- E-mail: `atendimentobefluent@gmail.com`
- WhatsApp: `(81) 99469-2570`

#### Dados dos Fundadores
No arquivo `about.html`, atualize as informações de Paulo e Mônica Bispo conforme necessário.

#### Aplicativos Disponíveis
No arquivo `downloads.html`, adicione ou remova cards de aplicativos na seção `.apps-grid`.

### Adicionando Imagens

1. Coloque as imagens na pasta `assets/img/`
2. Atualize os caminhos nos arquivos HTML
3. Use formatos otimizados (WebP, PNG, JPG)
4. Inclua texto alternativo para acessibilidade

## 🤖 Chatbot - Sistema Inteligente

### Funcionalidades Atuais

- ✅ Respostas automáticas baseadas em palavras-chave
- ✅ Base de conhecimento educacional
- ✅ Interface responsiva
- ✅ Simulação de digitação
- ✅ Histórico de conversa
- ✅ Botões de ações rápidas

### Expandindo o Chatbot

Para adicionar novas respostas, edite o arquivo `chatbot/chatbot.js`:

```javascript
// Adicione nova categoria na KNOWLEDGE_BASE
newCategory: {
    keywords: ['palavra1', 'palavra2', 'palavra3'],
    responses: [
        'Resposta 1 para esta categoria',
        'Resposta 2 alternativa',
        'Resposta 3 com mais detalhes'
    ]
}
```

### Integração com IA Real

Para conectar com serviços de IA reais:

1. **OpenAI GPT**:
```javascript
async function callOpenAI(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });
    return response.json();
}
```

2. **Dialogflow**:
```javascript
// Integração com Dialogflow
function sendToDialogflow(message) {
    // Código de integração com Dialogflow
}
```

## 📱 Publicação Online

### GitHub Pages (Gratuito)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará em: `username.github.io/repository-name`

### Netlify (Recomendado)

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para o Netlify
3. Seu site será publicado automaticamente
4. Configure domínio personalizado se desejar

### Vercel

1. Instale a CLI: `npm i -g vercel`
2. Na pasta do projeto: `vercel`
3. Siga as instruções

### Hospedagem Tradicional

Para hospedagem tradicional (cPanel, etc.):
1. Faça upload dos arquivos via FTP
2. Aponte o domínio para a pasta do projeto
3. Configure HTTPS

## 🔧 Melhorias Implementadas pelo Claude

### Funcionalidades Extras Adicionadas

- ✅ **Scroll suave** entre seções
- ✅ **Botão de voltar ao topo** com animação
- ✅ **Menu mobile** responsivo com animações
- ✅ **Validação de formulários** em tempo real
- ✅ **Notificações** de sucesso/erro
- ✅ **Animações de entrada** para elementos
- ✅ **Modo escuro** automático baseado na preferência do sistema
- ✅ **Timeline interativa** na página "Sobre"
- ✅ **Cards de aplicativos** com hover effects
- ✅ **Sistema de chatbot** completo e funcional
- ✅ **Navegação por teclado** aprimorada
- ✅ **Performance otimizada** com lazy loading
- ✅ **SEO avançado** com Open Graph tags

### Acessibilidade Avançada

- ✅ **Skip links** para navegação rápida
- ✅ **ARIA labels** em todos os elementos interativos
- ✅ **Contraste adequado** para pessoas com deficiência visual
- ✅ **Navegação por teclado** completa
- ✅ **Screen reader friendly** com semântica correta
- ✅ **Focus management** aprimorado

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica moderna e acessível
- **CSS3**: Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+**: Módulos, Arrow Functions, Async/Await
- **Google Fonts**: Poppins e Open Sans
- **Font Awesome**: Ícones vetoriais
- **Progressive Enhancement**: Funciona sem JavaScript

## 📊 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Resolução de Problemas

### Problemas Comuns

**1. Fontes não carregam**
- Verifique a conexão com internet
- Certifique-se que o Google Fonts não está bloqueado

**2. Chatbot não funciona**
- Verifique se todos os arquivos JS estão no local correto
- Abra o console do navegador para ver erros

**3. Formulário não envia**
- Implementação atual é apenas front-end
- Para funcionamento real, conecte com backend

**4. Imagens não aparecem**
- Verifique os caminhos das imagens
- Certifique-se que os arquivos existem na pasta `assets/img/`

### Performance

Para melhorar a performance:
- Otimize imagens (use WebP quando possível)
- Minifique CSS e JS para produção
- Configure cache headers no servidor
- Use CDN para arquivos estáticos

## 🔄 Próximas Funcionalidades

### Roadmap Sugerido

- [ ] **Sistema de Login** real com autenticação
- [ ] **Dashboard do Aluno** com progresso
- [ ] **Integração com API** de pagamento
- [ ] **Notificações push** para lembretes
- [ ] **Sistema de gamificação** com pontos e badges
- [ ] **Modo offline** com Service Workers
- [ ] **Chat em tempo real** com WebSockets
- [ ] **Biblioteca de conteúdo** expandida
- [ ] **Sistema de avaliações** dos cursos
- [ ] **Integração com redes sociais**

## 👥 Contribuições

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas sobre o código ou implementação:

- 📧 Email: atendimentobefluent@gmail.com
- 📱 WhatsApp: (81) 99469-2570
- 🕐 Horário: Segunda a sexta, 8h às 18h

## 📄 Licença

Este projeto foi criado especificamente para **Paulo e Mônica Bispo** e a plataforma **Befluent**. 

Para uso comercial ou distribuição, entre em contato com os proprietários.

---

<div align="center">

**Criado com ❤️ para transformar a educação através da tecnologia**

*Befluent - Educar com amor, aprender com propósito*

</div>