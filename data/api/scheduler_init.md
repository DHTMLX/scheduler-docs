init
=============

@short:
a constructor of a dhtmlxScheduler object 
    
@params: 
- container		string,HTMLElement	 		an HTML container (or its id) where a dhtmlxScheduler object will be initialized
* date			Date						the initial date of the scheduler (by default, the current date)
* view			string						the name of the initial view (by default, "week")

@example: 
scheduler.init("scheduler_here",new Date(2010,0,6),"month");



@template:	api_method
@relatedsample:
	01_initialization_loading/01_basic_init.html
    03_extensions/03_agenda_view.html
@descr: 
