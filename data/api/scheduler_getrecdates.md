getRecDates
=============
@short: returns all occurrences of a recurring event

@require:recurring
@params: 
- id	string	the id of a recurring event
- number	number	the maximum number of occurrences to return (by default, 100)

@returns:
- event		object	an object with 2 properties: <ul><li><b>start_date</b> - (<i>Date</i>) the start date of a single occurrence </li> <li><b>end_date</b> - (<i>Date</i>) the end date of a single occurrence</li></ul>

@example: 
var dates = scheduler.getRecDates(22);



@template:	api_method
@descr: 

For example, there is a recurring event (id: 22) which takes place every 2 days from 14.00 till 15.00, starting from 12th November, 2010; there are 3 occurrences in total. The api/scheduler_getrecdates.md 
method for this event will return the following array:


~~~js
[
    { 
      start_date: Tue Oct 12 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 12 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Tue Oct 14 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 14 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    },
    { 
      start_date: Tue Oct 16 2010 14:00:00 GMT+0300 (E. Europe Daylight Time),
      end_date: Tue Oct 16 2010 15:00:00 GMT+0300 (E. Europe Daylight Time)
    }
]

~~~

