unmarkTimespan
=============

@short: removes marking/blocking set by the markTimespan() method 
@params: 
- divs	HTMLElement, array	 a timespan to remove marking/blocking from (or an array of timespans)
@require:limit
@relatedapi:
	api/scheduler_marktimespan.md
@example: 
	
var spanDIV = scheduler.markTimespan({  
	days:  [0,6],  
	zones: "fullday"
});

scheduler.unmarkTimespan(spanDIV);



@template:	api_method
@related:
	limits.md
@relatedsample:
	09_api/06_hightlight_and_single_click_create.html
@descr: 
{{note
Available from version 3.5
}}