onEmptyClick
=============

@short: fires when the user clicks on an empty space in the scheduler (not on events)
	

@params: 
- date 	object	a date which corresponds to the point that the user clicks on
- e 	Event	a native event object

@example: 
	
scheduler.attachEvent("onEmptyClick", function (date, e){
       //any custom logic here
});



@template:	api_event
@descr: 




@relatedsample:
	09_api/06_hightlight_and_single_click_create.html