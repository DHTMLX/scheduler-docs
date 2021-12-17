deleteMarkedTimespan
=============

@short: 
	removes marking/blocking set by the addMarkedTimespan() method

@params: 
* id	string	the timespan's id
	

@example: 
var spanID = scheduler.addMarkedTimespan({  
	days:  [0,1], 
	zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);



@template:	api_method

@relatedapi:
	api/scheduler_addmarkedtimespan.md
    
@relatedsample:
	09_api/07_highlighted_timespans_month_view.html
@descr: 
{{note
Available from version 3.5.
}}

{{note The method requires the [limit](extensions_list.md#limit) plugin to be activated.}}

The method has 3 overloads:

1.  **deleteMarkedTimespan()** - takes no parameters and removes all blocking/marking.
2.  **deleteMarkedTimespan(id)** - takes the timespan's id.
3.  **deleteMarkedTimespan(config)** -  takes certain configuration properties.
     
   
~~~js
var spanID = scheduler.addMarkedTimespan({  
	days:  [3,4,5], 
	zones: [100,400]          
});

// removes marking from each Sunday
scheduler.deleteMarkedTimespan({ 
	days:  0,
});

//removes marking for the time period from 250 till 350 minute of each Friday
//each Friday now will have 2 marking blocks: 100-250, 350-400
scheduler.deleteMarkedTimespan({ 
	days:  5,
	zones: [250,350]
});

// removes marking for the item with id=3 in the Units view
scheduler.deleteMarkedTimespan({ 
	days:  5,
	zones: [250,350],
	sections:{ unit:3 }        
});

~~~

