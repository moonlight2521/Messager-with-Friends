console.log('Hello World');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/messages';
const messageElement = document.querySelector('.messages');

loadingElement.style.display = 'none';

// listAllMessages();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const message = {
        name,
        content
    };
    console.log(message);
    
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdMessage => {
            console.log(createdMessage);
            form.reset();
            form.style.display = '';
            loadingElement.style.display = 'none';
            listAllMessages();
        });
});

function listAllMessages(){
    messageElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json({}))
        .then( messages => {
            console.log(messages)
            messages.reverse();
            messages.forEach( message => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = message.name;

                const content = document.createElement('p');
                content.textContent = message.content;

                const date = document.createElement('small');
                date.textContent = new Date(message.created);

                div.appendChild(header);
                div.appendChild(content);
                div.appendChild(date);
                messageElement.appendChild(div);
            });
        });
}