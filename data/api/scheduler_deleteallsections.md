deleteAllSections
=============

@short: deletes all sections from  the currently active view (if the opened view isn't Timeline in the 'Tree' mode - the method will be ignored)

@example:

scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"Administration"},
        {key:"accounts",    label:"Accounting Department"},
        {key:"sales",       label:"Sales and Marketing"},
        {key:"production",  label:"Production Department"}
    ]
});
...
scheduler.deleteAllSections();

@require:treetimeline
@views: timeline
@template:	api_method
@relatedapi:
    api/scheduler_deletesection.md
    api/scheduler_addsection.md
@descr:

{{note
The method is used for the Tree mode only
}}
@edition:pro