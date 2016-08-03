agenda_start
=============
@short:sets the date to start displaying events from
	

@type: Date
@example:
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2010, 0, 10), "agenda");

@template:	api_config
@default:the current user's date
@require:agenda_view
@views:agenda
@descr:


@relatedsample:
	03_extensions/03_agenda_view.html
@relatedapi:
	api/scheduler_agenda_end_config.md

@apigroup: Views/Agenda view
