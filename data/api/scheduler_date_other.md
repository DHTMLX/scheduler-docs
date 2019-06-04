date
=============

@short: a set of date formatting methods
	

@type:object

@example:

@template:	api_config
@descr:
The **date** object provides the following methods:

- **add**(date, number, unit) - adds/subtracts the specified time interval to/from the date
	- **date** - (<i>Date</i>) the date object that you need to add a time to/subtract a time from 
    - **number** - (<i>number</i>) the number of units to add. If this number is positive - the time will be added to the date, if negative - the time will be subtracted 
    - **unit** - (<i>'minute', 'hour', 'day', 'week', 'month', 'year'</i>)  the time unit 

~~~js
//adds 1 year to the specified date: 29 June, 2013 -> 29 June, 2014
var newDate = scheduler.date.add(new Date(2013, 05, 29), 1, 'year');
~~~

- **convert_to_utc**(date) - converts local time to UTC
	- **date** - (<i>Date</i>) the date object to convert 
    
~~~js
//29 June, 2013 14:00 (local time) -> 29 June, 2013 12:00 (utc)
var time = scheduler.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

- **copy**(date)- makes a copy of a Date object
	- **date** - (<i>Date</i>) the date object to copy 
    
~~~js
var copy = scheduler.date.copy(new Date(2013, 05, 29));// -> 29 June, 2013
~~~
    
- **date_part**(date) - resets the time part of the provided date to 00:00:00
	- **date** - (<i>Date</i>) the date object to format
    
~~~js
//29 June, 2013 14:30:10 -> 29 June, 2013 00:00:00
var date = scheduler.date.date_part(new Date(2013, 05, 29, 14, 30, 10));
~~~
       
- **date_to_str**(format, utc) - returns a function that converts a Date object to a string of the specified format
       - **format**> - (<i>string</i>) the date format (see settings_format.md)  
       - **utc** - (<i>boolean</i>) specifies whether local time should be converted to UTC  
       
~~~js
var formatFunc = scheduler.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~
       
- **day_start**(date) - resets the time part of the provided date to 00:00:00. Alias of the <b>date_part</b> method. Used by the Day view to set the display date and can be redefined to provide the default behaviour
      - **date** - (<i>Date</i>) the date object to format

~~~js
//29 June, 2013 14:30:10 -> 29 June, 2013 00:00:00
var date = scheduler.date.day_start(new Date(2013, 05, 29, 14, 30, 10));
~~~

- **getISOWeek**(date)- returns the week number of the date
	- **date** - (<i>Date</i>) the date object to format

~~~js
var week = scheduler.date.getISOWeek(new Date(2013, 05, 29)); // ->26
~~~

- **getUTCISOWeek**(date) - returns the week number of the date, but previously converts local time to UTC
	- **date** - (<i>Date</i>) the date object to format 

~~~js
var week = scheduler.date.getUTCISOWeek(new Date(2013, 05, 29)); // ->26
~~~

- **month_start**(date) - returns a Date object of the first day of the month for the specified date and clears the time part to zero
	- **date** - (<i>Date</i>) the date object to format 
    
~~~js
//29 June, 2013 14:30 -> 01 June, 2013 00:00
var firstDay = scheduler.date.month_start(new Date(2013, 05, 29, 14, 30));
~~~

- <span id="strtodate">**str_to_date**(format,utc,parseExact)</span> - returns a function that converts a string of the specified format to a Date object
      - **format** - (<i>string</i>) the date format ( see settings_format.md)  
      - **utc** - (<i>boolean</i>) specifies whether local time should be converted to UTC  
      - **parseExact** - (<i>boolean</i>) defines whether Scheduler identifies the format of a date automatically (*false*, default) or uses the format passed a user (*true*)
~~~js
var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 29 June, 2013 00:00:00
~~~

- **time_part**(date) - returns the time of a Date object as a number of seconds counted from the midnight (00:00:00)       
	- **date** - (<i>Date</i>) the date object to format 
~~~js
var time = scheduler.date.time_part(new Date(2013, 05, 29, 14, 30, 10));
//time -> 52210
~~~

- **to_fixed**(num) - adds the leading zero to numbers less than 10 and returns the result as a string. Doesn't affect numbers from 10
	- **num** - (<i>number</i>) the number to format

~~~js
var num1 = scheduler.date.to_fixed(2);// ->"02"
var num2 = scheduler.date.to_fixed(10);// ->10
~~~
        
- **week_start**(date) - returns a Date object of the first day of the week for the specified date and clears the time part to zero
	- **date** - (<i>Date</i>) the date object to format 

~~~js
//29 June, 2013 14:30 -> 24 June, 2013 00:00
var weekStart = scheduler.date.week_start(new Date(2013, 05, 29, 14, 30));
~~~
      
- **year_start**(date) - returns a Date object of the first day of the year for the specified date and clears the time part to zero
	- **date** - (<i>Date</i>) the date object to format 
    
~~~js
//29 June, 2013 14:30 -> 01 January, 2013 00:00
var yearStart = scheduler.date.year_start(new Date(2013, 05, 29, 14, 30));
~~~



