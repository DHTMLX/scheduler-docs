invertZones
=============
@short: 
	inverts the specified time zones 

@params: 
- zones	array	an array **[start_minute,end_minute,..,start_minute_N,end_minute_N]** <br >where each pair sets a certain limit range (in minutes). The array can have any <br> number of such pairs	

@example: 
var zones = scheduler.invertZones([500, 1000]); // => [0, 500, 1000, 1440]

@require:limit
@template:	api_method
@descr: 
{{note
Available from version 3.5
}}



