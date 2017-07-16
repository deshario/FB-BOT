var login = require('facebook-chat-api');
var handleMessage = require('./src/handleMessage.js');

var userInfo = {
	email : '',
	password : ''
};

var timeout = undefined;

var inTimeOut = {};

login({email: userInfo.email, password: userInfo.password},function(err,api){
	if(err) return console.log(err);
	function sendMessage(str, id){
		return new Promise((resolve, reject) => {
			api.sendMessage(str, id, function(err){
				if(err){
					reject(err);
					return;
				}
				resolve('send str success');
			});
		});
	}


api.listen(function(err, message){
	if (err){
		console.log(err);
		return;
	}
	console.log(message);

	var req = message.body ? message.body.toLowerCase() : '';
	var id = message.threadID;
	if(req && !inTimeOut[id]){
		handleMessage(req, id, sendMessage);
		if(timeOut){
			inTimeOut[id] = true;
			setTimeout(function(){
				inTimeOut[id] = false;
			},TimeOut);
		}
	}
});

});