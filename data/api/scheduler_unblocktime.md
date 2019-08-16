unblockTime
=============

@short: 
	removes blocking set by the blockTime() method 

@require:limit
@params: 
- days		any 		(<i>Date, number,array, string</i>) days that should be limited
* zones		array		the period in minutes that should be limited. Can be set to 'fullday' value <br> to limit the entire day
* sections	object		allows blocking date(s) just for specific items of specific views. BTW, the specified date(s) will be blocked just in the related view(s)

@relatedapi:
    api/scheduler_blocktime.md
@example: 
var spanId = scheduler.blockTime(new Date(2013,2,5), "fullday");
...
//cancels blocking from 0 till 8 and from 18 till 24 hours for February 5, 2013
scheduler.unblockTime(new Date(2013,2,5), [0,10*60]);


@deprecated:
instead of it, you can use api/scheduler_deletemarkedtimespan.md
~~~
var spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~


@template:	api_method

@changelog: deprecated since v5.1