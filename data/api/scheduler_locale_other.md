locale
=============

@short: a locale object (region-specific labels) of the scheduler
	
@type:object

@example:
scheduler.i18n.setLocale({
	date:{
		month_full:["January", "February", "March", "April", "May", "June", 
        	"July", "August", "September", "October", "November", "December"],
		month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
        	"Friday", "Saturday"],
		day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	labels:{
		dhx_cal_today_button:"Today",
		day_tab:"Day",
		week_tab:"Week",
		month_tab:"Month",
		new_event:"New event",
		icon_save:"Save",
		icon_cancel:"Cancel",
		icon_details:"Details",
		icon_edit:"Edit",
		icon_delete:"Delete",
		confirm_closing:"",// Your changes will be lost, are your sure?
		confirm_deleting:"Event will be deleted permanently, are you sure?",
		section_description:"Description",
		section_time:"Time period",
		full_day:"Full day",

		/*recurring events*/
		confirm_recurring:"Do you want to edit the whole set of repeated events?",
		section_recurring:"Repeat event",
		button_recurring:"Disabled",
		button_recurring_open:"Enabled",
		button_edit_series:"Edit series",
		button_edit_occurrence:"Edit occurrence",

		/*agenda view extension*/
		agenda_tab:"Agenda",
		date:"Date",
		description:"Description",

		/*year view extension*/
		year_tab:"Year",

		/* week agenda extension */
		week_agenda_tab:"Agenda",

		/*grid view extension*/
		grid_tab:"Grid",

		/* touch tooltip*/
		drag_to_create:"Drag to create",
		drag_to_move:"Drag to move",

		/* dhtmlx message default buttons */
		message_ok:"OK",
		message_cancel:"Cancel",

		/* wai aria labels for non-text controls */
		next:"Next",
		prev:"Previous",
		year:"Year",
		month:"Month",
		day:"Day",
		hour:"Hour",
		minute:"Minute"
	}
)};

console.log(scheduler.locale);

@template:	api_config
@descr:
The current locale is available in the **scheduler.locale** object and can be modified directly, as in:

~~~js
scheduler.locale.labels.day_tab = "Day";
~~~

Which is equal to:

~~~js
scheduler.i18n.setLocale({
	labels: {
		day_tab: "Day"
	}
});	
~~~

Both approaches are valid and supported. We recommend using the [scheduler.i18n](api/scheduler_i18n_other.md) object API.

@related:
	localization.md
@relatedsample:
	03_extensions/21_multiselect_options.html
    
