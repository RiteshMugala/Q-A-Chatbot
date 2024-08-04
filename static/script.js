document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatBody = document.getElementById('chat-body');
    const userMessageInput = document.getElementById('user_message');

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userMessage = userMessageInput.value.trim();

        if (userMessage !== '') {
            // Display user message
            displayMessage('You', userMessage);

            // Send user message to server (you may need to modify this part)
            fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ user_message: userMessage }),
            })
                .then(response => response.json())
                .then(data => {
                    // Display bot response
                    displayMessage('Sam', data.response);
                })
                .catch(error => console.error('Error:', error));

            // Clear input field
            userMessageInput.value = '';
        }
    });

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        //const senderName = message.split(': ')[0];
        //const messageText = message.replace(`${senderName}: `, '');
        //messageDiv.innerHTML = `<strong>${senderName}:</strong> ${messageText}`;
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBody.appendChild(messageDiv);

        // Scroll to the bottom of the chat container
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
