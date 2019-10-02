Migration From Older Versions 
==============

## 5.2 -> 5.3

### Responsive lightbox

Since version 5.3 the [lightbox](lightbox_editors.md) has an additional CSS class **dhx_cal_light_responsive** which has media queries with new CSS styles associated with it. 
These new styles will have effect only on smaller screen/window sizes (< 1024px) and can change look and feel of the lightbox on these screens.

You can disable this behavior using the [scheduler.config.responsive_lightbox](api/scheduler_responsive_lightbox_config.md) config, as in:

~~~js
scheduler.config.responsive_lightbox = false;
~~~

### Touch gestures

The default handler for the [swipe gesture](touch_support.md#touchgesturesinthescheduler) has been disabled by default.

You can re-enable it using the [scheduler.config.touch_swipe_dates](api/scheduler_touch_swipe_dates_config.md) config, as follows:

~~~js
scheduler.config.touch_swipe_dates = true;
~~~

### Markup and styles

[Box-sizing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) of event elements in 
month_view.md has been changed from **content-box** to **border-box** in all skins.

The affected elements are: **.dhx_cal_event_clear** and **.dhx_cal_event_line**.

It shouldn't cause any visible changes, but if you redefined the render of Month view events, or use a custom skin, you may need to take this change into account.

## 5.1 -> 5.2

<h3 id="dnd">Drag-n-drop behavior</h3>

Since version 5.2 it is possible to drag events by any part of the body, not just by the header as it worked in the earlier versions. If you want to restore the previous functionality, make use of the 
api/scheduler_drag_event_body_config.md and set it to *false* (by default the property is enabled).

~~~js
scheduler.config.drag_event_body = false;
~~~

### onXLE/onXLS events are deprecated

They still work, but will be removed in future. Here is how they should be replaced:

~~~js
scheduler.attachEvent("onXLS",function(){}); → 
scheduler.attachEvent("onLoadStart",function(){});

scheduler.attachEvent("onXLE",function(){}); → 
scheduler.attachEvent("onLoadEnd",function(){});
~~~


### "xml_date" config and template, and "xml_format" templates are renamed

Below there is the scheme of replacing previously used API:

- scheduler.config.xml_date →  [scheduler.config.date_format](api/scheduler_date_format_config.md)
- scheduler.templates.xml_date → [scheduler.templates.parse_date](api/scheduler_parse_date_template.md)
- scheduler.templates.xml_format → [scheduler.templates.format_date](api/scheduler_format_date_template.md)


Since v5.2 the default values of the **xml_date** config, and **xml_date** and **xml_format** templates are *undefined*. Thus if you haven't assigned any values to them, they won't work. 

However, Scheduler will continue to use the old names of the config and templates, so if you've redefined those APIs in your code, they will work as before. For example:

~~~js
// will work correctly
scheduler.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

#### Default date format has changed

- before v5.2 it was set by the **scheduler.config.xml_date** property and its value was "%m/%d/%Y %H:%i"
- after v5.2 it is set by the [scheduler.config.date_format](api/scheduler_date_format_config.md) property and its value is "%Y-%m-%d %H:%i"

To restore the previous default date format, specify the setting below:

~~~js
scheduler.config.date_format = "%m/%d/%Y %H:%i";
~~~

#### Improved parsing of dates

Since v5.2 Scheduler tries to automatically identify the format of dates that should be parsed, so there can be some changes in the work of related functions **scheduler.date.str_to_date**, 
**scheduler.templates.format_date**, and **scheduler.templates.parse_date**. 

If you want to restore previous behavior and get dates in the format defined by the user, use the api/scheduler_parse_exact_format_config.md configuration option:

~~~js
scheduler.config.parse_exact_format = true;
~~~

### "vertical" setting of the [Multiselect](multiselect.md#properties) control can't take string value

In previous versions it was possible to set the value of the *vertical* setting of the Multiselect control as a string, like this:

~~~js
{ name:"userselect", type:"multiselect", ..., vertical:"false" }
~~~

Since v5.2 the property takes just a boolean value, i.e. *true* or *false*.

~~~js
{ name:"userselect", type:"multiselect", ..., vertical: false }
~~~

In case you've used the string "false" value for the **vertical** property, you need to change it into the boolean one.

## 5.0 -> 5.1

Smart rendering and horizontal scroll features required a complete remaking of the timeline markup. It affected Timeline, TreeTimeline and all modes of these views.

The most notable change is that HTML elements TABLE, TR, TD were removed from the markup and replaced with DIVs with appropriate class names.

If you use table tags in CSS selectors for styling the timeline, an action will be needed in order to migrate such CSS.
The overall DOM structure didn't undergo many changes, thus migration would mostly require rewriting several CSS selectors in order for them to match the new markup.

For the reference, here is a sample of CSS selectors before and after the update given below.

Before:

- **.dhx_cal_data > table > tbody > tr > td.dhx_matrix_scell** - the lefthand label column
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line** - the timeline row with date cells
- **.dhx_cal_data > table > tbody > tr > td > div.dhx_matrix_line > table > tbody > tr > td.dhx_matrix_cell** - a single date cell inside a timeline row

After:

- **.dhx_cal_data .dhx_timeline_table_wrapper .dhx_timeline_label_row .dhx_matrix_scell** - the lefthand label column
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line** - the timeline row with date cells
- **.dhx_cal_data .dhx_timeline_data_wrapper .dhx_matrix_line .dhx_matrix_cell** - a single date cell inside a timeline row

## 4.4 -> 5.0

###Removed skins

**Glossy** and **Classic** skins were deprecated and removed since v5.0.
If you use them, you'll either need to migrate to another [skin](skins.md) or keep using a corresponding CSS file from an older version.

###Major CSS refactoring

Release of v5.0 involves a major CSS overhaul, which may create issues with updating heavily CSS-customized applications: the existing styles may stop working due to the specificity of renewed dhtmlxScheduler styles.
There is no general solution for this, the migration will require investigating and correcting CSS issues.

###POST route in the REST mode fixed

The update also fixes the **POST** (insert) route of dataProcessor in the **REST** mode, the request no longer sends a temporary event id to the server.

The following route:

~~~js
POST /api/{tempId}

//e.g.
POST /api/1234567890
~~~

should be changed to this one:

~~~js
POST /api
~~~

## 4.x -> 4.3

Since v.4.3 the extensions [Week Agenda View](weekagenda_view.md), [Grid View](grid_view.html), [Timeline View](timeline_view.md), [Units View](units_view.md), [Multisection Events](api/scheduler_multisection_config.md) 
are no longer available in the Standard Edition that is distributed under GNU GPL v2.

If you still want to use them, you may either continue using the version 4.2 (or older), or obtain either Commercial or Enterprise license.

Please check the license details [here](http://dhtmlx.com/docs/products/dhtmlxScheduler/#licenses).

## 3.6 -> 4.0

Public API is fully backward compatible.


### Changed defaults

- The default skin is changed to "terrace", ext/dhtmlxscheduler_dhx_terrace.js is removed. To change the skin back to the classic one, just include the related CSS file (codebase/dhtmlxscheduler_classic.css). 
For more details check skins.md.

- api/scheduler_multi_day_config.md is enabled by default, and if you want to revert such a behavior, add:

~~~js
scheduler.config.multi_day = false;
~~~


### Custom skins

Scheduler detects the used skin, based on the name of the CSS file, so if you are using a custom skin (which is not based on "terrace"), rename its css file to *dhtmlxscheduler_{skin name}.css*. 
Also, you can disable the skin auto-detection by adding the following line before *scheduler.init*:

~~~
scheduler.skin = "{skin name}";
~~~

### Deprecated API

The following API is deprecated: getEventText, getEventStartDate, getEventEndDate, setEventText, setEventStartDate, setEventEndDate  (those methods are still available, but will be removed in Scheduler 5.x).

Instead, you can use *scheduler.getEvent()* and set/get properties directly from the event object.


## 3.6 -> 3.7

Fully backward compatible

## 3.5 -> 3.6

Fully backward compatible

## 3.0 -> 3.5

Public API is fully backward compatible. 
  
+ 'Mark now' functionality was moved to the dhtmlxscheduler_limit.js extension. 
+ Scheduler now accepts [JSON generated by dhtmlxConnector](server_integration.md#retrievingdatainjsonformat). 
If there are no special reasons to use XML, consider switching to JSON (will decrease file size and, as a result, increase load speed).

## 2.3 -> 3.0

Public API is fully backward compatible. 
  
For private API, check  [Scheduler 3.0](scheduler_3.0.md).

+ File structure was changed a bit - ext/dhtmlxscheduler_ext.css and dhtmlxscheduler_recurring.css were removed (all styles now available in the dhtmlxscheduler.css).
+ Several templates arguments were changed to match the rest of them: scheduler.templates.agenda_text, scheduler.templates.map_text now use (start_date, end_date, event) as incoming parameters. Before only 'event' was used.

## 2.2 -> 2.3


+ full backward compatibility
+ Swedish locale file was renamed according to the iso 639-1

~~~
sources/locale_se.js => sources/locale_sv.js
sources/locale_recurring_se.js => sources/locale_recurring_sv.js
~~~

## 2.1 -> 2.2


+ full backward compatibility
+ 'createUnitsView' command accepts different set of parameters, but previous syntax will work as well


## 2.0 -> 2.1 


+ formatting rules were corrected, now %d and %m always return 2 digits, if you need the previous behavior, use %j and %n accordingly
+ path to files inside the package is changed a bit

~~~
codebase/dhtmlxgrid_recurring.js => codebase/ext/dhtmlxgrid_recurring.js
codebase/dhtmlxgrid_recurring.css => codebase/ext/dhtmlxgrid_recurring.css
codebase/dhtmlxgrid_units.js => codebase/ext/dhtmlxgrid_units.js
~~~


## 1.0 -> 2.0


+ API and data format are fully backward compatible
+ 'onEventChanged' and 'onEventAdded' events will not fire during data loading
+ Spanish locale renamed from locale_sp.js to locale_es.js
+ 'drag_create' option now controls only the ability to create a new event by dnd, creating a new event by dblclick now is controlled by 'dblclick_create'


@index:
- scheduler_3.0.md

