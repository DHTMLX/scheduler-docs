 Localization 
==============

The library  supports scheduler's localization  by providing a number of predefined locales and means of creating custom ones. By default, DHTMLX Scheduler uses [English locale](api/scheduler_locale_other.md).

##Activation

To set the desired language for the scheduler, you need to activate the necessary locale via the **setLocale** method of the [scheduler.i18n](api/scheduler_i18n_other.md) object. 

~~~js
scheduler.i18n.setLocale("fr");	
~~~

You can use and update any of the [predefined locales](#includedlocales) that are bundled with the dhtmlxscheduler.js file or define a custom locale.

{{note
  The locale can be switched dynamically but the changes will be applied only after a complete redrawing of the Scheduler either with the **scheduler.render()** or **scheduler.init()** call.
}}

~~~js
scheduler.i18n.setLocale("fr");
scheduler.init("scheduler_here");
~~~


{{sample
	01_initialization_loading/07_locale_usage.html
}}

##Included locales 

{{note

Both Common locale files and Recurring locale files reside in the **dhtmlxscheduler.js** file.}}


dhtmlxScheduler includes localization for the following languages:

<table style='border-collapse: collapse; color:#444444' >
<tr><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Language      
</td><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Language code       
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Arabic 
</td><td markdown='1' style='border:1px solid #AAA;'>
 ar 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Belarusian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 be
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Catalan 
</td><td markdown='1' style='border:1px solid #AAA;'>
 ca
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Chinese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 cn
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Czech 
</td><td markdown='1' style='border:1px solid #AAA;'>
 cs
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Danish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 da
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Dutch 
</td><td markdown='1' style='border:1px solid #AAA;'>
 nl
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 English 
</td><td markdown='1' style='border:1px solid #AAA;'>
 en (default)
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Finnish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 fi
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 French 
</td><td markdown='1' style='border:1px solid #AAA;'>
 fr
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 German 
</td><td markdown='1' style='border:1px solid #AAA;'>
 de
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Greek 
</td><td markdown='1' style='border:1px solid #AAA;'>
 el
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hebrew 
</td><td markdown='1' style='border:1px solid #AAA;'>
 he
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hungarian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 hu
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Indonesian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 id
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Italian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 it
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Japanese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 jp
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 no
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian Bokmål
</td><td markdown='1' style='border:1px solid #AAA;'>
 nb
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Polish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 pl
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Portuguese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 pt
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Romanian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 ro
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Russian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 ru
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovak 
</td><td markdown='1' style='border:1px solid #AAA;'>
 sk
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovenian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 si
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Spanish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 es
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Swedish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 sv
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Turkish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 tr
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Ukrainian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 ua
</td></tr>
</table>

## Creating custom locale 

{{note The [scheduler.i18n](api/scheduler_i18n_other.md) object is added in v6.0. In previous versions, the [scheduler.locale](api/scheduler_locale_other.md) object was used. For more information, see the [Migration article](migration_from_older_version.md#5360).}}

The easiest way to create a custom locale is to make a copy of the default (English) locale from the sample below, and translate all strings from it into the required language. 

The custom locale can be applied to the Scheduler in two ways:

- either override the current locale via passing an object of the locale as a parameter to the **setLocale** method:

~~~js
scheduler.i18n.setLocale(localeObject);	
~~~

Note, if you provide a partial locale object, the scheduler will add your labels into the current locale:

~~~js
scheduler.i18n.setLocale({
	labels: {
		day_tab: "Day",
	}
});	
~~~

- or, if you need to switch between several locales, define the locale with a custom language code and switch the scheduler to it later:

~~~js
scheduler.i18n.addLocale("lang", localeObject);	
scheduler.i18n.setLocale("lang");
~~~

{{note
Note, activating a custom locale in the app will cause changes in the app's interface. Check and redefine (if required) all locale-dependent elements 
to be sure that the scheduler looks fine in its new language. 
}}

**Note**, 

- You can send your custom locale file to **support@dhtmlx.com** - so we will include it in the next release;
- The currently active locale is also available in the **scheduler.locale** object;
- **monthFull** - the full names of months starting from January;
- **monthShort** - the short names of months starting from January;
- **dayFull** - the full names of week days starting from Sunday;
- **dayShort** - the short names of week days starting from Sunday.


{{snippet
English locale definition
}}
~~~js
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
});
~~~

{{sample
	01_initialization_loading/07_locale_usage.html
}}

## Additional notes 

- If the **confirm_closing** or **confirm_deleting** label is not defined, the related confirm dialog will not be shown at all (auto-confirm); 
- The **section_{name}** label refers to the lightbox section of the related name.
- The **new_event** label defines the default text of a new event.

