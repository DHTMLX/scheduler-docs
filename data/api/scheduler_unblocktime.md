unblockTime
=============
@short: 
	removes blocking set by the blockTime() method 

@require:limit
@params: 
- days	any 	(<i>Date, number,array, string</i>) days that should be limited
* zones	array	the period in minutes that should be limited. Can be set to 'fullday' value <br> to limit the entire day
* sections	object	allows blocking date(s) just for specific items of specific views. BTW, the specified date(s) will be blocked just in the related view(s)
@relatedapi:
    api/scheduler_blocktime.md
@example: 
var spanId = scheduler.blockTime(new Date(2013,2,5), "fullday");
...
//cancels blocking from 0 till 8 and from 18 till 24 hours for 5th February,2013
scheduler.unblockTime(new Date(2013,2,5), [0,10*60]);


@deprecated:
instead of it, you can use
~~~
scheduler.blockTime(new Date(2013,2,5), "fullday");

scheduler.deleteMarkedTimespan({
	days:new Date(2013,2,5),
    zones:[0,10*60]

});
~~~


@template:	api_method
@descr: 
{{note
Available from version 3.5
}}

