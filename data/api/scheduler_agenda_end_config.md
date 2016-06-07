agenda_end
=============
@short: sets the date to display events until
	

@type: Date


@example:
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "agenda");

@template:	api_config
@default: 'agenda_start' (value) + 1 year
@require:agenda_view
@views:agenda
@descr:


@relatedsample:
	03_extensions/03_agenda_view.html
@relatedapi:
	api/scheduler_agenda_start_config.md

@apigroup: Views/Agenda view
