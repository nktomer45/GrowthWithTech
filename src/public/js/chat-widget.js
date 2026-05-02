document.addEventListener('DOMContentLoaded', () => {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.getElementById('typing-indicator');

    let history = [];

    // Toggle Chat Window
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Handle Form Submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (!message) return;

        // Add User Message to UI
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show Typing Indicator
        typingIndicator.classList.remove('hidden');
        scrollToBottom();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, history })
            });

            const data = await response.json();

            if (data.error) {
                addMessage(data.error, 'bot error');
            } else {
                addMessage(data.text, 'bot');
                // Update history
                history.push({ role: 'user', text: message });
                history.push({ role: 'model', text: data.text });
                // Keep history manageable
                if (history.length > 20) history = history.slice(-20);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            addMessage('Sorry, something went wrong. Please try again.', 'bot error');
        } finally {
            typingIndicator.classList.add('hidden');
            scrollToBottom();
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const time = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');

        messageDiv.innerHTML = `
            <div class="message-content">
                ${formatText(text)}
            </div>
            <span class="message-time">${time}</span>
        `;

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function formatText(text) {
        // Basic markdown-like formatting for links and bold
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/\n/g, '<br>');
    }
});
