agenda_day
=============

@short: specifies the content of the day cell of the Agenda view
	

@type:

@example:
const dayDateToStr = scheduler.date.date_to_str("%F %j");
const dayDowToStr = scheduler.date.date_to_str("%l");

scheduler.templates.agenda_day = function(date){ 
	return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
	<div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
};

@params:
- date	Date	the date which needs formatting

@returns:
- text    string     html text for rendering in the scheduler


@template:	api_template
@descr:


@changelog: added in v7.0

@related:
agenda_view.md


