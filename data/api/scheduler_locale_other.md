locale
=============
@short: a locale object (region-specific labels) of the scheduler
	

@type:object

@example:
scheduler.locale={
    date:{
        month_full:["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
        month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"],
        day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"],
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
    	confirm_closing:"", //Your changes will be lost, are you sure?
    	confirm_deleting:"Event will be deleted permanently, are you sure?",
    	section_description:"Description",
    	section_time:"Time period"
    }
}
@template:	api_config
@descr:

@related:
	localization.md
@relatedsample:
	03_extensions/21_multiselect_options.html