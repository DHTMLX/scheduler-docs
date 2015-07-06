onBeforeFolderToggle
=============

@short:fires before a tree branch will be opened or closed (the Timeline view, 'tree' mode only)

@params:
- section	object, boolean 	the configuration object of the branch to open/close. <br> Takes the <i>true</i> value, if all branches will be closed/opened at once by the <a href="api/scheduler_closeallsections.md">closeAllsections</a>/<a href="api/scheduler_openallsections.md">openAllSections</a> methods.
- isOpen	boolean		indicates whether the branch will be opened (<i>true</i>) or closed (<i>false</i>)
- allSections	boolean 	takes the <i>true</i> value, if all tree branches will be closed/opened at once by the <a href="api/scheduler_closeallsections.md">closeAllsections</a>/<a href="api/scheduler_openallsections.md">openAllSections</a> methods, <i>false</i> - if only one branch will be opened/closed.

@returns: 
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)


@example:
scheduler.attachEvent("onBeforeFolderToggle", function(section,isOpen,allSections){
	//any custom logic here
	return true;
});



@template:	api_event
@descr: 

@edition:pro