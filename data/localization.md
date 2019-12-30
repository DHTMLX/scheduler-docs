 Localization 
==============

The library  supports scheduler's localization  by providing a number of predefined locales and means of creating custom ones.

##Activation

To set the desired language for the scheduler, include the related locale '*js*' file on the page. For example, to present the scheduler in Spanish you need to have the following files included on the page:


~~~html
<script src="../codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css">

<script src="../sources/locale/locale_es.js" charset="utf-8"></script>
~~~

{{note
Make sure that you use **charset="utf-8"**, because all locales are stored as UTF-8 text.
}}

{{sample
	01_initialization_loading/07_locale_usage.html
}}

##Included locales 

{{note

Both Common locale files and Recurring locale files reside in the **scheduler/sources/locale/** folder.}}


dhtmlxScheduler includes localization for the following languages:

<table style='border-collapse: collapse; color:#444444' >
<tr><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Language      
</td><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Common locale       
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Arabic 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ar.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Belarusian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_be.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Catalan 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ca.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Chinese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_cn.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Czech 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_cs.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Danish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_da.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Dutch 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_nl.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 English 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_en.js - default
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Finnish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_fi.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 French 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_fr.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 German 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_de.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Greek 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_el.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hebrew 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_he.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hungarian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_hu.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Indonesian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_id.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Italian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_it.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Japanese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_jp.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_no.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian Bokmål
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_nb.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Polish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_pl.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Portuguese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_pt.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Romanian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ro.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Russian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ru.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovak 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_sk.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovenian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_si.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Spanish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_es.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Swedish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_sv.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Turkish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_tr.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Ukrainian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ua.js 
</td></tr>
</table>

## Creating custom locale 

The easiest way to create a custom locale is to make a copy of the default (English) locale  - **scheduler/sources/locale/locale.js**, and translate all strings from it into the required language. 

{{note
Note, activating a custom locale in the app will cause changes in the app's interface. Check and redefine (if required) all locale-dependent elements 
to be sure that the scheduler looks fine in its new language. 
}}

**You can send your custom locale file to support@dhtmlx.com - so we will include it in the next release**.


~~~js
scheduler.locale = {
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
		minute:"Minute",

			/* recurring event components */
		repeat_radio_day: "Daily",//name="repeat" value="day"
		repeat_radio_week: "Weekly",//name="repeat" value="week
		repeat_radio_month: "Monthly",
		repeat_radio_year: "Yearly",
		repeat_radio_day_type: "Every",
		repeat_text_day_count: "day",
		repeat_radio_day_type2: "Every workday",
		repeat_week: " Repeat every",
		repeat_text_week_count: "week next days:",
		repeat_radio_month_type: "Repeat",
		repeat_radio_month_start: "On",
		repeat_text_month_day: "day every",
		repeat_text_month_count: "month",
		repeat_text_month_count2_before: "every",
		repeat_text_month_count2_after: "month",
		repeat_year_label: "On",
		select_year_day2: "of",
		repeat_text_year_day: "day",
		select_year_month: "month",
		repeat_radio_end: "No end date",
		repeat_text_occurences_count: "occurrences",
		repeat_radio_end2: "After",
		repeat_radio_end3: "End by",
		month_for_recurring: ["January", "February", "March", "April", "May", "June", 
			"July", "August", "September", "October", "November", "December"],
		day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
			"Friday", "Saturday"]
	}
};
~~~

{{sample
	01_initialization_loading/07_locale_usage.html
}}

## Additional notes 

- If the **confirm_closing** or **confirm_deleting** label is not defined, the related confirm dialog will not be shown at all (auto-confirm); 
- The **section_{name}** label refers to the lightbox section of the related name.
- The **new_event** label defines the default text of a new event.

