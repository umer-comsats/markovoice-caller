exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
  
    twiml.gather({
      input: 'speech',
      timeout: 4,
      hints: 'good, bad',
      action: 'https://ruby-millipede-6609.twil.io/pitch-customer',
      partialResultCallback: 'https://0b816081074d.ngrok.io/get-response',
      partialResultCallbackMethod: 'POST'
    }).say({
        voice: 'man',
        language: 'en'
    },
    'Hello, this is Mike from real estate company. How are you doing today?.');
  
    callback(null, twiml);
  };