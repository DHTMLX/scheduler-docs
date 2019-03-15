closeSection
=============

@short: 
	closes the specified section in the currently active view 

@params: 
- section_id	string	the section's id

@require:treetimeline
@views: timeline
@example: 
scheduler.createTimelineView({
    name:"timeline",
    render:"tree",
    ...
	y_unit:[
		{key:"managers", 	label:"Administration", children: [
        	{key:1, label:"James Smith"},
            {key:2, label:"John Williams"}
        ]},
		{key:"accounts", 	label:"Accounting Department", children: [
        	{key:3, label:"David Miller"},
            {key:4, label:"Linda Brown"}           
        ]},
		{key:"sales", 		label:"Sales and Marketing"},
		{key:"production", 	label:"Production Department"}
	]
});
...
scheduler.closeSection("managers");

@template:	api_method

@relatedapi:
	api/scheduler_opensection.md
	api/scheduler_closeallsections.md
    api/scheduler_openallsections.md

@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note
If the opened view isn't Timeline in the 'Tree' mode, the method will be ignored.
}}


@edition:pro