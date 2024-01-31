Promise
=============

@short: Promise object constructor
	

@params:

- executor	function	a callback used to initialize the promise

@returns:
- promise	object	the promise object

@example:
new scheduler.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});

@template:	api_method
@descr:
The Promise object constructor.

@changelog: 
- Added in v6.0.
- Switched from Bluebird to native Promise in v7.0.