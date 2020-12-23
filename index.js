const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const client = require('twilio')(process.env.SID, process.env.AUTH);
const CallModel = require('./model/calls');


const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }))


mongoose
	.connect('mongodb://admin1:admin123@mycluster-shard-00-00.c89un.mongodb.net:27017,mycluster-shard-00-01.c89un.mongodb.net:27017,mycluster-shard-00-02.c89un.mongodb.net:27017/devConnectorDatabase?ssl=true&replicaSet=MyCluster-shard-0&authSource=admin&retryWrites=true&w=majority')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(() => console.error('Could not connect to MongoDB...'));

server.get('/test', (req, res) => {
    console.log('working')
    res.send('Working');
})

server.post('/call', async (req, res) => {
    const callTo = req.body.number;
    console.log(callTo)
    await client.calls
    .create({
        url: 'https://magenta-centipede-7916.twil.io/greet',
        to: callTo,
        from: process.env.NUMBER
    });
    res.send('Done');
});


server.post('/get-response', (req, res) => {
    const response = JSON.parse(JSON.stringify(req.body));
    if(response.StableSpeechResult.toLowerCase()){
        console.log(response);
        const command = response.StableSpeechResult.toLowerCase();

        
    }
});

async function addCall(number, label) {
    try {
        let call = CallModel.findOne({ number: number });
        if (call) {
            call = await callModel.findOneAndUpdate(
                { number: number }, // filter field
                { label: label }, // field to update -> field: new-value
                { new: true }, //return newly created instance, and not the old one.
                { useFindAndModify: false } //to avoid deprecation warning
            )
            return true;
        }
        return false;

    } catch (error) {
        return false;

    }
}



server.listen(process.env.PORT || 3000, () => {
    console.log('Running server');
})
