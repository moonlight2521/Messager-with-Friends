const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();
const db = monk('localhost/messager');
const messages = db.get('messages');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'message sent! 💩'
    });

})

app.get('/messages', (req, res) =>{
    messages
        .find()
        .then(messages =>{
            res.json(messages);
        });
});
function isValidText(message){
    return message.name && message.name.toString().trim() !== '' ||
    message.content && message.content.toString().trim() !== '';
}

app.post('/messages', (req, res) => {
    console.log(req.body);
    if(isValidText){
        // insert into db
        const message = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        messages
            .insert(message)
            .then(createdMessage => {
                res.json(createdMessage);
            });
    } else {
        res.status(422);
        res.json({
            message: 'Error, Name and content are requried!'
        });
    }
});

app.listen(5000, ()=> {
    console.log('Listing on http://localhost:5000');
})