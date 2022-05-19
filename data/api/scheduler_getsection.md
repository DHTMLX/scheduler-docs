getSection
=============

@short: 
	gets the object of the specified section in the currently active view 


@params: 
- section_id	string	the section's id

@views: timeline

@returns:
- section	object	the section object


@example: 
scheduler.createTimelineView({
    name:	"timeline",
    render:"tree",
    ...
	y_unit:[
		{key:"managers", 	label:"Administration"},
		{key:"accounts", 	label:"Accounting Department"},
		{key:"sales", 		label:"Sales and Marketing"},
		{key:"production", 	label:"Production Department"}
	]
});
...
scheduler.getSection("sales");//->{key:"sales",label:"Sales and Marketing"}


@template:	api_method


@relatedapi:
	api/scheduler_opensection.md
	api/scheduler_closeallsections.md
    api/scheduler_openallsections.md

@descr: 
{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the [treetimeline](extensions_list.md#treetimeline) plugin to be activated.}}

{{note
If the opened view isn't Timeline in the 'Tree' mode, the method will be ignored.
}}

@edition:pro