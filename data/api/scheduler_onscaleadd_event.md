onScaleAdd
=============
@short:fires after a single view unit (column, section, day cell etc.) has been rendered in the scheduler
	

@params:
- unit	HTMLElement		an HTML object of the related view unit
- date	object	the date of the unit


@example:
scheduler.attachEvent("onScaleAdd", function (unit, date){
    //any custom logic here
});


@template:	api_event
@descr:
Available views have different units:

- **Day view** - a column with a day (the whole view);
- **Week view** - a column with a day;
- **Month view** - a cell with a day;
- **Units** - a section;
- **Timeline** - a section;
- **Year** - a cell with a day.