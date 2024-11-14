$(document).ready(function() {
    let chatHistory = [];

    $('#chat-form').on('submit', function(e) {
        // prevent traditional form submit
        e.preventDefault();

        //read input and clear the box
        let message = $('#message-input').val();
        $('#message-input').val('');

        let gpsi = $('#gpsi-input').val();


        // Display user's message
        $('#chat-box').append(`
            <div class="message user">
                <div class="content">${message}</div>
            </div>
        `);
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);

        // Update chat history
        chatHistory.push({"role": "user", "content": message});

        // Create a placeholder for the assistant's message
        let assistantMessageDiv = $(`
            <div class="message assistant">
                <div class="content"></div>
            </div>
        `);
        $('#chat-box').append(assistantMessageDiv);
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);

        let assistantMessageContent = assistantMessageDiv.find('.content');

        // Use Fetch API to send POST request and handle streaming response
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                gpsi: gpsi,
                history: chatHistory
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            function read() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        return;
                    }

                    buffer += decoder.decode(value, { stream: true });
                    let lines = buffer.split('\n\n');
                    buffer = lines.pop(); // Save incomplete line

                    for (let line of lines) {
                        if (line.startsWith('data: ')) {
                            let data = JSON.parse(line.slice(6));
                            if (data.error) {
                                alert(data.error);
                                return;
                            }
                            if (data.content) {
                                assistantMessageContent.append(data.content);
                                $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
                            }
                            if (data.done) {
				parsed = marked.parse(assistantMessageContent[0].innerHTML);
                                assistantMessageContent[0].innerHTML = parsed;
                                chatHistory = data.history;
                            }
                        }
                    }

                    read();
                }).catch(error => {
                    console.error('Error reading stream:', error);
                });
            }

            read();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An error occurred while communicating with the server.');
        });
    });
});

