onAfterFolderToggle
=============
@short:fires after a tree branch was opened or closed (the Timeline view, 'tree' mode only)
	

@params:
- section		object, boolean 	the configuration object of the opened/closed branch. <br>Takes the true value, if all branches were closed/opened at once by the closeAllSections()/openAllSections() methods.
- isOpen		boolean		indicates whether the branch was opened (<i>true</i>) or closed (<i>false</i>)
- allSections	boolean 	takes the <i>true</i> value, if all tree branches were closed/opened at once by the closeAllSections()/openAllSections() methods, 
<i>false</i> - if only one brach was opened/closed.


@example: 
scheduler.attachEvent("onAfterFolderToggle", function(section, isOpen, allSections){
	//any custom logic here
});



@template:	api_event
@descr: 


@edition:pro

@relatedapi:
api/scheduler_onbeforefoldertoggle_event.md
api/scheduler_closeallsections.md
api/scheduler_openallsections.md