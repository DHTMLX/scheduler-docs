week_agenda_select
=============

@short: highlights the selected event in the Week Agenda view
	

@type: boolean

@default: true

@views: weekagenda

@example:
scheduler.config.week_agenda_select= false; /*!*/
scheduler.init('scheduler_here',new Date(2013,0,10),"agenda_week");


@template:	api_config


@descr:

{{note The property requires the [week_agenda](extensions_list.md#weekagenda) plugin to be activated.}}

<img src="week_agenda_select.png">

{{note Note, that the *false* value of the **week_agenda_select** config forbids only highlighting of the selected event but doesn't forbid its editing. To make the event non-editable use the api/scheduler_readonly_config.md config.}}

@edition: pro
@related: weekagenda_view.md
@relatedapi: api/scheduler_readonly_config.md