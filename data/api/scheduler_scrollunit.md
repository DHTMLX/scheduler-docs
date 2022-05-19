scrollUnit
=============

@short:scrolls the specified number of units in the Units view

@views:units
	

@params:
- step	number	the number of units to scroll (<i>set the positive value to scroll units to the right <br> side,  the negative value - to the left side</i>). 


@example:
scheduler.scrollUnit(5);  //scrolls 5 units to the right 
...
scheduler.scrollUnit(-5); // scrolls 5 units to the left 

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the [units](extensions_list.md#units) plugin to be activated.}}

@edition:pro