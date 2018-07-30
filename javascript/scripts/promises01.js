// https://scotch.io/tutorials/javascript-promises-for-dummies
// https://scotch.io/

var isMomHappy = true;

console.log('isMomHappy: ', isMomHappy);

// Promise
var willIGetANewPhone = new Promise(
	function(resolve, reject){
		if(isMomHappy){
			var phone = {
				brand: 'Samsung',
				color: 'Black'
			};
			resolve(phone);
		} else {
			var reason = new Error('mom is not happy');
			reject(reason);
		}
	}
)

// 2nd promise
// var showOff = function(phone){
// 	return new Promise(
// 		function(resolve, reject){
// 			var message = 'hey friend, I have a new ' + phone.color + ' ' + phone.brand + 'phone.'
// 			resolve(message)
// 			// reject is optional
// 		}
// 	)
// }

// 2nd promise - shortened
var showOff = function(phone){
	var message = 'hey friend, I have a new ' + phone.color + ' ' + phone.brand + 'phone.'
	return Promise.resolve(message)
}

// call our promise
var askMom = function(){
	willIGetANewPhone
		.then(showOff)
		.then(function(fulfilled){
			console.log(fulfilled)
		})
		.catch(function(error){
			console.log(error.message)
		})
}

askMom();