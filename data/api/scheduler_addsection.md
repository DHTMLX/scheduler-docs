addSection
=============
@short: 
	adds a section to the currently active view 

@params: 
- section			object			the object of the section to add
- parent_id			string			the id of the parent section. Pass 'null' if you are adding a section to the root

@returns:
- isSuccess			boolean			returns 'true', if the section was added successfully and 'false' in other cases (e.g. incorrect parent_id was specified).

@views: timeline
@example: 
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
    	{key:"production", label:"Production Department", children:[
			{key:"p1", label:"Managers", children:[
				{key:"pm1", label:"John Williams"},
				{key:"pm2", label:"David Miller"}
			]}
		]},
		{key:"sales", label:"Sales and Marketing", children:[
			{key:"s1", label:"Kate Moss"},
			{key:"s2", label:"Dian Fossey"}
		]}
    ]
});	

scheduler.addSection( {key:1, label:"James Smith"}, "p1");
scheduler.addSection( {key:2, label:"Alex White"}, "sales");


@template:	api_method
@relatedapi:
    api/scheduler_deletesection.md
    api/scheduler_deleteallsections.md
@descr: 
{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the [treetimeline](extensions_list.md#treetimeline) plugin to be activated.}}

{{note
If the opened view isn't Timeline in the 'Tree' mode, the method will be ignored.
}}

@edition:pro