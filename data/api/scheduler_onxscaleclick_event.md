onXScaleClick
=============
@short:fires when the user makes a single click on a cell on the x-axis (the Timeline view only)
	

@params: 
- index		number	 the column index of the clicked cell (zero-based numbering)
- value		object	 a Date object of the start time stamp of the clicked cell
- e			Event	a native event object

@example: 
scheduler.attachEvent("onXScaleClick", function (index, value,e){
	//any custom logic here
});



@template:	api_event
@descr: 


