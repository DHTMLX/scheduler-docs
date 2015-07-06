onCellClick
=============
@short:fires when the user makes a single click on a cell (the Timeline view only)
	

@params: 
- x_ind	number	the column index of the clicked cell (zero-based numbering)
- y_ind	number	the row index of the clicked cell (zero-based numbering)
- x_val	object	a Date object of the start time stamp of the clicked cell
- y_val	array	an array of data items' objects resided in the clicked cell
- e			Event	a native event object

@example: 
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
	//any custom logic here
});



@template:	api_event
@descr: 


{{note
The event fires in the Timeline view only
}}
