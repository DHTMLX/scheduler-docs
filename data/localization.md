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

###Recurring events

If you are using recurring events, one more file needs including  - the localized form for recurring events.

~~~html
<script src="../codebase/dhtmlxscheduler.js" type="text/javascript"></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" type="text/css">

<script src="../sources/locale/locale_es.js" type="text/javascript"></script>
<script src="../sources/locale/recurring/locale_recurring_es.js" ></script>
~~~

##Included locales 

**Note**, 

- Common locale files reside in the **scheduler/sources/locale/** folder.
- Recurring locale files reside in the **scheduler/sources/locale/recurring/** folder.


dhtmlxScheduler includes localization for the following languages:

<table style='border-collapse: collapse; color:#444444' >
<tr><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Language      
</td><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Common locale       
</td><td markdown='1' style='font-weight:bold; border:1px solid #AAA;'>
 Recurring events form 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Arabic 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ar.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Belarusian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_be.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_be.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Catalan 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ca.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Chinese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_cn.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_cn.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Czech 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_cs.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_cs.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Danish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_da.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_da.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Dutch 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_nl.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_nl.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 English 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_en.js - default
</td><td markdown='1' style='border:1px solid #AAA;'>
  locale_recurring_en.js - default 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Finnish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_fi.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_fi.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 French 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_fr.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_fr.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 German 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_de.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_de.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Greek 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_el.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_el.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hebrew 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_he.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_he.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Hungarian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_hu.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Indonesian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_id.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Italian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_it.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_it.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Japanese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_jp.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_no.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Norwegian Bokmål
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_nb.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_nb.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Polish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_pl.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_pl.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Portuguese 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_pt.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_pt.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Romanian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ro.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_ro.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Russian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ru.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_ru.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovak 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_sk.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_sk.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Slovenian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_si.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Spanish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_es.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_es.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Swedish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_sv.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_sv.js 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Turkish 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_tr.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 not translated 
</td></tr>
<tr><td markdown='1' style='border:1px solid #AAA;'>
 Ukrainian 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_ua.js 
</td><td markdown='1' style='border:1px solid #AAA;'>
 locale_recurring_ua.js 
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
scheduler.locale={
	date:{
		month_full:["January", "February", "March", "April", "May", "June", 
        	"July", "August", "September", "October", "November", "December"],
		month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		day_full:["Sunday", "Monday", "Tuesday", "Wednesday", 
        	"Thursday", "Friday", "Saturday"],
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
		confirm_closing:"", //Your changes will be lost, are your sure?
		confirm_deleting:"Event will be deleted permanently, are you sure?",
		section_description:"Description",
		section_time:"Time period"
    }
}
~~~


In case of recurring events, it requires a bit more complex operation. 
In addition to the above step, you will need to made  a copy of the **sources/repeat_template.html** file
and translate all text messages in it to the target language. After that, the translated html file needs converting in a single-line js string

~~~php
$source = "repeat_template_".$lang[$i].".html";
$target = "locale_recurring_".$lang[$i].".js";
 
$data="";
$data.="scheduler.__recurring_template='".preg_replace("|[\t ]+|"," ",
preg_replace("|[\r\n]+|","",file_get_contents($source)))."';\n\n";
file_put_contents(target,$data)."\n\n";
~~~

{{note
To make things simpler, you can send the translated HTML form to support@dhtmlx.com, and we will reply with a converted js file (and include the translation into the next release).
}}

{{sample
	01_initialization_loading/07_locale_usage.html
}}

## Additional notes 

- If the **confirm_closing** or **confirm_deleting** label is not defined, the related confirm dialog will not be shown at all (auto-confirm); 
- The **section_{name}** label refers to the lightbox section of the related name.
- The **new_event** label defines the default text of a new event.