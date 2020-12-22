const express = require('express');
require('dotenv').config();
const client = require('twilio')(process.env.SID, process.env.AUTH);


const server = express();
server.use(express.json());

server.get('/test', (req, res) => {
    res.send('Working');
})

server.post('/call', async (req, res) => {
    const callTo = req.body.number;
    console.log(callTo)
    await client.calls
    .create({
        url: 'https://ruby-millipede-6609.twil.io/welcome',
        to: callTo,
        from: process.env.NUMBER
    });
    res.send('Called');
});


server.post('/get-response', (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    if(response.StableSpeechResult.toLowerCase()){
        console.log(response.StableSpeechResult);
    }
});



server.listen(process.env.PORT || 3000, () => {
    console.log('Running server');
})