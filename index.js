const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { TaskQueueRealTimeStatisticsContext } = require('twilio/lib/rest/taskrouter/v1/workspace/taskQueue/taskQueueRealTimeStatistics');
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
        const phoneNumber = response.To;
        const command = response.StableSpeechResult.toLowerCase();
        console.log(command)
        if(
            command.includes('yes') ||
            command.includes('talk to') ||
            command.includes('ask') ||
            command.includes('think') ||
            command.includes('thinking') ||
            command.includes('maybe') 
        ){
            addCall(phoneNumber, 'Interested');
        }else if(
            command.includes('not interested') ||
            command.includes('I\'m not interested') ||
            command.includes('don\'t need') ||
            command.includes('i am not interested')
        ){
            addCall(phoneNumber, 'Not Interested');
        }else if(
            command.includes('busy') ||
            command.includes('call back') ||
            command.includes('call me back') ||
            command.includes('have to go')
        ){
            addCall(phoneNumber, 'Busy');
        }else if(
            command.includes('stop calling') ||
            command.includes('do not call') ||
            command.includes('no call') ||
            command.includes('keep on calling') ||
            command.includes('tierd of')
        ){
            addCall(phoneNumber, 'Do Not Call');
        } else if (
            command.includes('no') ||
            command.includes('so') ||
            command.includes('don\'t need')
        ){
            addCall(phoneNumber, 'Not Interested')
        } else {
            addCall(phoneNumber, 'Unknown')
        }

        
    }
});

async function addCall(number, label) {
    console.log('Called', label, number)
    try {
        let call = await CallModel.findOne({ number: number });
        console.log(call);
        if (call) {
            call = await CallModel.findOneAndUpdate(
                { number: number, label: 'other' }, // filter field
                { label: label }, // field to update -> field: new-value
                { new: true }, //return newly created instance, and not the old one.
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
