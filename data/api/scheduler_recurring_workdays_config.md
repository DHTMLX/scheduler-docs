recurring_workdays
=============
@short:specifies working days that will affect the recurring event when the user selects the ""Every workday" option in the lightbox
	

@type: array
@default:[1, 2, 3, 4, 5]

@example:
//sets working days from Tuesday to Friday
scheduler.config.recurring_workdays = [2, 3, 4, 5];

@template:	api_config
@descr:
{{note The property requires the [recurring](extensions_list.md#recurring) extension to be enabled.}}

<img src="api/recurringworkdays_config.png"/>

@apigroup: Lightbox