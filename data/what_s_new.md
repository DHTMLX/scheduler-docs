What's New 
==============

If you are updating Scheduler from an older version, check migration_from_older_version.md for details.

<style>
.release_date{
	font-size: 13px;
	margin-left: 20px;
}
</style>

5.3.5
------------

<span class='release_date'>January 29, 2020. Bugfix release</span>

### Fixes

- Fix styling of the 'next' button on the right side of the navigation panel in [Terrace skin](skins.md#defaultskin) when the scheduler is initialized using [header config](initialization.md#initializingschedulerviaheaderconfig)
- Fix the incorrect work of the [Url extension](extensions_list.md#url) which failed to highlight events by url in some cases
- Fix the incorrect work of the [Material skin](skins.md#materialskin) when scheduler styles are loaded using the `@import` command

### Updates

- If neither [header config](initialization.md#initializingschedulerviaheaderconfig) nor [default markup](initialization.md#initializingschedulerviamarkup) is specified while initializing the scheduler, a default value for the scheduler header will be auto-generated to escape a script error

5.3.4
------------

<span class='release_date'>December 10, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect work of the vertical scroll in a [scrollable timeline](timeline_view.md#horizontalscroll) when the mouse pointer is over the sections column
- Fix the incorrect serialization of nested objects by the [dataProcessor](server_integration.md)
- Fix the script error which fired when creating a new event using a [custom lightbox](custom_details_form.md)

5.3.3
------------

<span class='release_date'>October 30, 2019. Bugfix release</span>

### Updates

- More informative error messages for common misconfigurations are added
- HTML markup of some public samples is cleaned up

5.3.2
------------

<span class='release_date'>October 9, 2019. Bugfix release</span>

### Fixes

- Fix incorrect work of the click [handler](api/scheduler_rendercalendar.md) in the [Mini Calendar](minicalendar.md) when a custom [calendar_date template](api/scheduler_calendar_date_template.md) is defined
- Fix rounding of the end date of an event when it is [resized](api/scheduler_drag_resize_config.md) in [Day/Week views](views.md)

5.3.1
------------

<span class='release_date'>October 2, 2019. Bugfix release</span>

### Updates

- api/scheduler_responsive_lightbox_config.md is disabled by default.

5.3
---------

<span class='release_date'>October 2, 2019. Minor update</span>

###Breaking Changes

This update changes behavior of of some parts of the component. While they shouldn't cause any breaks in the existing code, be sure to check [Migration notes](migration_from_older_version.md#53) to be on the safe side.

###New functionality

1. [RTL support](rtl_mode.md)
2. [Improved mobile responsiveness](touch_support.md)
3. [Integration with DHTMLX Suite 6 Layout](dhxlayout_integration.md#dhtmlxsuitev6)

###Updates

1. The [year range](time.md#properties) setting is added to the Date/Time lightbox control
2. [Changing Scheduler dates by horizontal swipe](touch_support.md#touchgesturesinthescheduler) is disabled by default
3. The possibility [to set scheduler header from config](initialization.md#initializingschedulerviaheaderconfig) rather than from the markup is added
4. The api/scheduler_render.md method is added as a more intuitive alias for setCurrentView() and updateView()
5. The api/scheduler_hidelightbox.md method is added to the public API

### Fixes

- Fix [vertical](multiselect.md#properties) config of multiselect control, which didn't work in the [Material skin](skins.md#materialskin)

5.2.5
------------

<span class='release_date'>September 23, 2019. Bugfix release</span>

### Fixes

- Fix regression of tooltips.md extension introduced in [v5.2.4](#524)

5.2.4
------------

<span class='release_date'>September 19, 2019. Bugfix release</span>

### Fixes

- Fix the issue with the [readonly form](readonly.md#readonlymodefortheentirelightbox) which didn't allow changing the [configuration of the lightbox](lightbox_editors.md) after [initialization](api/scheduler_init.md) of Scheduler
- Fix the issue with Angular 8 compatibility

5.2.3
------------

<span class='release_date'>August 20, 2019. Bugfix release</span>

###Fixes

- Fix incorrect animation of event bars in the [scrollable Timeline](timeline_view.md#horizontalscroll) during drag and drop
- Fix the issue in day_view.md / week_view.md which caused an event to jump to the [multiday section](api/scheduler_multi_day_config.md) when being moved to the end of a day
- Fix regression in the `scroll_position` setting of the [scrollable Timeline](timeline_view.md#horizontalscroll)
- Fix the issue which caused chunks of [multi-section events](timeline_view.md#assignmentofeventstoseveralsections) to obtain incorrect position after a mouse click
- Fix the script error fired from the tooltip in `cell` mode of the [Timeline view](timeline_view.md#viewmodes) when [ignore_timeline](custom_scales.md) is used

5.2.2
------------

<span class='release_date'>August 7, 2019. Bugfix release</span>

###Fixes

- Add more helpful error messages for common misconfigurations
- Fix the script error which was thrown from a double click on any label in a [readonly form](readonly.md#readonlymodefortheentirelightbox)
- Fix incorrect displaying of the [Timeline view](timeline_view.md) when `smart_rendering:true` is used together with `section_autoheight:false`
- Fix the script error which was thrown from the [Year view](year_view.md#horizontalscroll) when days containing events were hidden using the [scheduler.ignore_year](custom_scales.md) method

5.2.1
------------

<span class='release_date'>June 11, 2019. Bugfix release</span>

###Fixes

- Fix the issue with api/scheduler_load.md data type detection in IE11
- Fix [timeline.scrollTo](timeline_view.md#timelineobjectapi) method in timeline without [horizontal scrollbar](timeline_view.md#horizontalscroll)
- Fix not working api/scheduler_showevent.md method in the [Timeline view](timeline_view.md)
- Fix incorrect behavior of vertical scroll in [scrollable timeline](timeline_view.md#horizontalscroll) with `smart_rendering:false`
- Fix incorrect event position in the [multiday units view](units_view.md#displayingunitsformultipledays) with the [multisection](units_view.md#assigningeventstoseveralunits) extension when the [step](units_view.md#scrollingunits) option is specified
- Fix incorrect size of some events in [Daily Timeline](timeline_view.md#daysmodedetails) 


5.2
--------------

<span class='release_date'>June 6, 2019. Minor update</span>

###Breaking Changes

This update changes behavior of multiple API methods. While they shouldn't cause any breaks in the existing code, be sure to check [Migration notes](migration_from_older_version.md#5152) to be on the safe side.

###New functionality

1. [Custom HTML content for timeline cells](timeline_view.md#customcontentincells) (PRO version)
2. [Drag-n-drop of events by the body](migration_from_older_version.md#dnd)

###Updates

- The data format parameter of api/scheduler_load.md and api/scheduler_parse.md became optional, scheduler now detects format automatically
- [Date-to-string functions](date_formats.md) can now auto-detect the date strings format, if it doesn't match the provided one
- [dhtmlxConnector library](https://github.com/DHTMLX/connector-php) is no longer shipped with the dhtmlxScheduler package
- dhtmlxScheduler package samples no longer require a php/apache server to work
- New methods for the [timeline object](timeline_view.md#timelineobjectapi)
- The multiselect.md control allows loading options in the JSON format
- api/scheduler_onloadstart_event.md, api/scheduler_onbeforeparse_event.md, api/scheduler_onparse_event.md, api/scheduler_onloadend_event.md are introduced instead
of the deprecated - **onXLS** and **onXLE** events

###Fixes

- Fix incorrect behavior which happened when api/scheduler_clearall.md was called before `scheduler.endLightbox(false)` while creating a new event
- Fix flickering issue with [timeline horizontal scroll](timeline_view.md#horizontalscroll) on iPad
- Fix various display issues with [scrollable timeline](timeline_view.md#horizontalscroll)
- The Units view api/scheduler_{unitsname}_scale_text_template.md now provides a section date in arguments
- Fix script error which was thrown from the [Units view](units_view.md) during an event creation if no sections are loaded
- The multiselect.md control now expects only boolean values for `vertical` property `vertical:false` - string values as in `vertical:"false"` will be interpreted as boolean `true` 


5.1.6
------------

<span class='release_date'>January 11, 2019. Bugfix release</span>

###Fixes

- Fix incorrect position of events scheduled on Sat-Sun with `start_on_monday = false` in the Month view
- Fix script error in a scrollable timeline with the current time marker
- Fix incorrect argument value of the `onYScaleClick` handler in a scrollable timeline after horizontal scrolling
- Fix the bug that caused a scrollable timeline to be rendered empty until the next refresh after reloading sections
- Fix the bug with a scrollable timeline which caused some cells of Tree timeline folders not being rendered after horizontal scrolling
- Fix unexpected behavior of event resize with the `all_timed` extension, only the last event chunk should be resizeable
- Fix event disappearing during resize in the `all_timed="short"` mode

5.1.1
------------

<span class='release_date'>December 14, 2018. Bugfix release</span>

###Fixes

- Fixed keyboard navigation focus not being highlighted in the timeline
- Fixed incorrect initial height of `timeline_scale_header` if `second_scale` specified
- Fixed bug with `event_min_dy` not affecting section height if only one event is located inside a section
- Fixed bug with quick info popup self-closing when the same event is clicked multiple times
- Fixed script error which fired after deleting event in `Year view`
- Fixed incorrect initial display of scrolled timeline if no events loaded into the scheduler
- Fixed ability to enable smart rendering for non-scrollable timelines
- Fixed issue with scroll position resetting on date change when key_nav extension is enabled in the timeline
- Fixed incorrect value `old_date` argument of `onBeforeViewChange` event in some cases
- Fixed incorrect display of a scrollable timeline with ignored time cells
- Fixed incorrect behavior if scrolling happened during drag-create of new events in day/week views
- Fixed `onAfterSchedulerResize` event not firing in `Timeline view`
- Performance improvement for event rendering in `Week view`

5.1
------------

<span class='release_date'>November 29, 2018. Minor update</span>

###Breaking Changes

HTML structure of the Timeline view has changed significantly, some code changes may be required in order to migrate. Read more in the [Migration](migration_from_older_version.md#5051) article.

###Major Changes

1. [Horizontal scroll in the Timeline view](timeline_view.md#horizontalscroll) (PRO version)
2. Smart rendering and performance update for the Timeline view (PRO version)
3. Integration with different server-side platforms. [Check the related tutorials](howtostart_guides.md)


###Minor Changes

- [New API of the Timeline object](timeline_view.md#timelineobjectapi)
- [Autoscroll in the Timeline view](timeline_view.md#autoscrollconfiguration)
- Ability to [add a label into the header of the column with sections](timeline_view.md#headerofthesectionscolumn)


<b>5.0</b>
------

<span class='release_date'>May 17, 2018. Major update</span>

###Breaking Changes

1. Classic and Glossy skins are removed. [Check the migration details](migration_from_older_version.md#4450)
2. Scheduler went through the global CSS refactoring. [Learn how it will influence your applications](migration_from_older_version.md#4450)  

###Major Changes

1. New [Material skin](skins.html#materialskin) added
2. [Server-side integration with REST API](server_integration.md)
3. Flexible [skins customization](custom_skins.md)

###Minor Changes

- Touch support for Microsoft devices is updated 
- [Hebrew locale](localization.md) is added for recurring events form
- [onLoadError](api/scheduler_onloaderror_event.md) is added for network and server errors

###Bug Fixes and Improvements

- Compatibility issues with ES6/TS imports are fixed
- Fixes in keyboard navigation support
- Minor bugfixes

4.4.9
------------

<span class='release_date'>June 6, 2017. Bugfix release</span>

###Fixes

- WAI-ARIA support – fix regression when WAI-ARIA attributes are disabled
- WAI-ARIA support – various improvements for JAWS support
- Keyboard navigation – various bugfixes and improvements
- Samples – fix invalid server config snippets
- Cookie extension – fix the conflict between cookie and ajax loading timeouts
- Year view – fix the bug with creation of events in the Year view
- Drag and drop – fix incorrect mouse position on a zoomed page
- All-timed extension – fix drag and drop on touch devices
- Dynamic loading – fix incorrect time range caused by the *server_utc* config
- Minor fixes in locales


4.4
-----------

<span class='release_date'>February 2, 2017. Minor update</span>

###Major Changes

1. [Keyboard navigation](keyboard_navigation.md)
2. [WAI-ARIA support](accessibility.md#waiariaattributes)
3. [High-contrast themes](accessibility.md#highcontrastthemes)
4. Initial support for [Content Security Policy](content_security_policy.md)

###Minor Changes

- [ability to enable markTimespan for the Month view](api/scheduler_marktimespan.md)
- [ability to remove recurring marker from a specific date added](limits.md)
- [ability to skip days in the Year view added](custom_scales.md)
- [*delimiter* option of the Multiselect control](multiselect.md#properties)
- [compatibility of external drag-n-drop with the latest dhtmlxSuite updated](dhtmlx_components_integration.md)
- [merge CSP-improvements request from public repo](https://github.com/DHTMLX/scheduler/pull/11/)
- minor performance improvements for [Timeline](timeline_view.md)
- normalize z-index values, add styles for latest [dhtmlxCombo](combo.md)

###Bug Fixes and Improvements

- addEventNow must return id of new event
- bug with drag-n-drop and ignored column in the Week view
- check for undefined touch https://github.com/DHTMLX/scheduler/pull/21
- click and keyboard focus issue on iPad
- dataprocessor state must be cleared after scheduler.clearAll
- JS errors in event handlers from SVG elements fixed
- various bugs with Tooltip extension fixed
- various issues with container_autosize extension fixed
- many other fixes


4.3.35
------------

<span class='release_date'>May 26, 2016. Bugfix release</span>

###Fixes

- Update integration with the latest version of the DHTMLX Suite library
- Added support for SVG elements inside scheduler
- Fix drag and create event dates in a timeline with rounded dates
- Double click on a marked timespan should take into account the *scheduler.config.dblclick_create* config
- Fix incorrect `onXScaleClick` arguments in timelines with *scheduler.ignore_timeline* enabled
- Minor improvements for layout misalignment when browser zoom is enabled
- Fix ignored columns and the Year view
- Fix errors on multi-touch screens
- Fix keyboard focus on mobile devices
- Fix various issues with DST
- Events placed on the 31st day of the month are displayed incorrectly in Daily Timeline
- `addEventNow` must return the id of a new event
- Fix scheduler listening of `window.onresize` when scheduler container is removed from DOM

4.3.25
------------

<span class='release_date'>March 3, 2016. Bugfix release</span>

###Fixes

- Touch support – trigger tap and double tap on multiday area of Day/Weeks/Units views
- Touch support – fix regression with event disappearing on start of touch-drag
- Timeline – fix onYScaleClick call when ignored columns are defined
- Timeline – fix incorrect state of event object after canceling drag and drop
- Tree Timeline – the *timeline_scale_class* template should be applied to folder items
- dataProcessor – clearing scheduler during the dataProcessor request is in progress should not cause a JS error
- dataProcessor – fix incorrect state while adding and modifying recurring series when autoUpdate is disabled
- Day/Week views – fix event visibility when the first/last hours of calendar are enabled
- Multiday Units View – fix default section on creating an event with a double click
- General – occasional Chrome bug when the click and double click events stopped firing
- General – fixes for daylight savings time bugs in Safari
- and other small fixes

4.3
------

<span class='release_date'>February 4, 2015. Minor update</span>

1. ["Days" mode for Timeline view](timeline_view.md#daysmodedetails) was added (PRO version)
2. Ability to present [units for multiple days in the Units view](units_view.md#displayingunitsformultipledays) (PRO version)
3. New events for the ['expand' extension](extensions_list.md#expand) 
4. New option - api/scheduler_now_date_config.md for the [Limit extension](extensions_list.md#limit) 
5. New option - api/scheduler_touch_tooltip_config.md  for the [Tooltip extension](extensions_list.md#tooltip) 
6. Ability to link events using the [URL extension](extensions_list.md#url)
7. Fixes for DST issues
8. Fix for an issue with creating new events on touch devices in the Timeline view
9. [Week Agenda](weekagenda_view.md), [Grid View](grid_view.html), [Timeline view](timeline_view.md), [Units View](units_view.md),
[Multisection events](api/scheduler_multisection_config.md) (PRO version)

4.2
-----------

<span class='release_date'>November 12, 2014. Minor update</span>

1. Ability to customize the layout of recurring form ([details](recurring_events.md#ustomcontrolforthelightboxsrecurringblock))
2. Updated DataProcessor - REST mode and support of JSON response format ( [details](server_integration.md#savingdatafromrestserver))
3. Updated D'n'D of the [multisection events](api/scheduler_multisection_shift_all_config.md) (PRO version)
4. API events for handling Ajax and server errors ([details](api/scheduler_onloaderror_event.md))
5. Improved performance of the Timeline view
6. Ability to delay rendering mode ([details](api/scheduler_delay_render_config.md))
7. Improved data export to iCal and Excel - ([details](excel.md))
8. Fixed compatibility with DHTMLX Suite 4.0
9. Multiple minor fixes

4.1
------

<span class='release_date'>June 13, 2014. Minor update</span>

1. New "Flat" skin  - ([details](skins.md#flatskin))
2. Assigning events to several sections of [Timeline](timeline_view.md#assigningeventstoseveralsections) and [Units](units_view.md#assigningeventstoseveralunits) Views 
(PRO version)
3. Ability to resize multi-day events in the Month view by drag-and-drop ([details](month_view.md#resizingeventsbydragndropver41))
4. Drag-n-drop operations between schedulers ([details](dhtmlx_components_integration.md#draganddropbetweenschedulers))
5. Ability to export data in the PNG format ([details](png.md)).
6. New approach for exporting data in the PDF format ([details](pdf.md))
7. Ability to highlight event's duration on the time scale while dragging the event over the scheduler ([details](api/scheduler_drag_highlight_config.md))
8. Ability to [change the scrolled time interval in the Grid view](grid_view.md#activatingnavigation)(PRO version)
9. Ability to deny dragging events out of the visible area of the Timeline view ([details](api/scheduler_limit_drag_out_config.md))
9. Bug fixes for Windows touch devices.
10. Samples updated to work correctly in different time zones.


<b>4.0</b>
-------

<span class='release_date'>July 2, 2013. Major update</span>

1. Flexible time scales - some days, hours can be removed from time scale ([details](custom_scales.md))
2. Ability to show "more events" links in the Month view ([details](month_view.md#limitingthenumberofeventsinacell))
3. jQuery integration ([details](jquery_integration.md))
4. Backbone Integration ([details](backbone_integration.md))
5. Default skin changed to "terrace", multi-day events are visible by default
6. Alternative start-date logic for recurring events ([details](api/scheduler_repeat_precise_config.md))
7. Scheduler can load json data from .Net web services
8. Documentation greatly improved

3.7 
-----

<span class='release_date'>February 20, 2013. Minor update</span>

1.  Touch support (tablets and touch monitors) ([details](touch_support.md))
2.  Romanian locale added


3.6 
-----

<span class='release_date'>December 3, 2012. Minor update</span>

1.  Windows8 edition added ([details](winjs_compatibility.md)) 
2.  Extended date format configuration for lightbox form
3.  Sub-day navigation in timeline view
4.  Ability to define custom sorting in timeline view 
5.  Multi-page export to PDF ([details](pdf_multi.md))


3.5 
-----

<span class='release_date'>August 24, 2012. Minor update</span>

1.  Ability to show [multiple schedulers](multiple_per_page.md) on the page
2.  Support for loading JSON directly from Connectors ([details](server_integration.md#retrieving_data_in_json_format))
3.  Custom events rendering ([details](custom_events_display.md))
4.  Timeline view improved (support for drag, resize, event height control) 
5.  New 'dhx_terrace' skin ([details](skins.md#the_white_skin))
6.  New options for blocking dates ([details](limits.md#how_to_block_certain_dates))
7.  Marking time intervals ([details](limits.md#how_to_mark_certain_dates))
8.  Highlighting time intervals ([details](api/scheduler_marktimespan.md)) 
9.  New API methods: api/scheduler_updateview.md, api/scheduler_showevent.md, api/scheduler_getrenderedevent.md, api/scheduler_getactiondata.md
10.  JSMessage included ([details](http://dhtmlx.github.com/message/))
11.  [Grid view](grid_view.md) (PRO version)
12.  New configuration options
13.  Simplified access to lightbox section objects ([details](api/scheduler_formsection.md))
14.  Support for ['CTRL+C', 'CTRL+X', 'CTRL+V' keyboard commands](keyboard_navigation.md)



<b>3.0</b>
-------

<span class='release_date'>July 27, 2011. Major update</span>

1.  [WeekAgenda view](weekagenda_view.md) (PRO version)
2.  Netbook friendly lightbox form ([details](lightbox_editors_manipulations.md#typesoflightbox))
3.  Cascade event display ([details](api/scheduler_cascade_event_display_config.md))
4.  Simple way to define a color for event ([details](custom_events_color.md))
5.  Drag and drop of the details form
6.  Custom buttons for the details form ([details](changing_lightbox_buttons.md))
7.  Current time marker in day and week view
8.  Multiline header for timeline view
9.  Configurable work-time bounds ([details](collisions.md#work_hours_limiting))
10.  API to access lightbox values ([details](lightbox_editors_manipulations.md))



2.3 
--------

<span class='release_date'>August 30, 2010. Minor update</span>

###Major Changes 


1.  Map view was added ([details](map_view.md))
2.  Cell mode for Timeline view was added ([details](timeline_view.md#viewmodes)) (PRO version)
3.  Tree mode for Timeline view was added ([details](timeline_view.md#viewmodes)) (PRO version)
4.  Tooltips for all views were added ([details](tooltips.md))
5.  Ability to create new events by double click or by drag-and-drop in Timeline mode
6.  Ability to move events by drop-and-drag in Timeline mode
7.  Ability to create new events by external drag and drop ([details](dhtmlx_components_integration.md))

### Minor Changes 


+ Week-number format option was added ([details](settings_format.md))
+ full_day configuration option added ([details](custom_details_form.md#setting_duration_for_events_version))
+ event_duration and auto_end_date configuration options added ([details](custom_details_form.md#setting_duration_for_events_version))
+ Multiselect section for details form ([details](custom_details_form.md#types_of_editors))
+ Checkbox, combo, radio - sections for details form ([details](custom_details_form.md#types_of_editors))
+ Preventing events collisions for recurring events
+ extra parameters were added to timeline-related handlers
+ api of mini-calendar extension extended ([details](minicalendar.md))
+ custom form implementation simplified ([details](custom_details_form.md#replacing_with_custom_form))

###Bug Fixes and Improvements


+ incorrect processing of specific iCal data sources
+ incorrect event rendering for overlapping events


2.2 
-------

<span class='release_date'>April 14, 2010. Minor update</span>

###Major Changes 


1.  Export to XML, iCal, JSON added ([details](export.md))
2.  Export to PDF ([details](pdf.md))
3.  Loading from JSON data was added ([details](data_formats.md))
4.  'Collision detection' extension was added ([details](collisions.md))
5.  'Date-scale limitation' extension was added ([details](collisions.md#limitations))
6.  Mini-calendar extension was added ([details](minicalendar.md))
7.  [Timeline view](timeline_view.md) was added 
8.  Auto-fetching option lists from the server ([details](select.md#populatingthecontrolwithdatafromtheserver))
 
###Minor Changes 


- hotkeys and some element's sizes are configurable now
- step-like scrolling in the Units view ([details](units_view.md#scrollingunits)) (PRO version)
- Arabic, Hungarian, Indonesian, Polish, Slovenian locales were added ([details](localization.md#included_locales))
- 18 new samples were added

###Bug Fixes and Improvements


- many time-shifting related bugs
- problems with recurring events in the Agenda view
- problems with recurring events in the Year view
  

2.1 
-------

<span class='release_date'>December 2, 2009. Minor update</span>

###Major Changes  


1.  Agenda view was added ([details](agenda_view.md))
2.  Year view was added ([details](year_view.md))
3.  Bunch of small extensions was added
4.  Skin Builder for the scheduler was added
5.  Count of samples was doubled

###Full List of Updates 


+ agenda view
+ year view
+ small extensions
+ onEventSave event is added
+ onSchedulerResize event is added
+ Finnish and Dutch locales are added
+ Chinese locale is added
+ Portuguese translation is added for scheduler
+ time_picker template is introduced
+ event_date template is introduced
+ incorrect layout in case of multi-week events (#808)
+ incorrect rendering of editor in IE6
+ incorrect event-bar size in complex dynamic patterns
+ error during js commands against non-visible events
+ incorrect processing of time_step, if it was defined as string (#788)
+ unnecessary scrolls in IE (#776)
+ incorrect end date of week scale label (#621)
+ incorrect drag on item, which is in adding process (#782)
+ incorrect placing multi-day events inside of unit view (#784)
+ setting end date lesser than start date (#781)
+ issue with incorrect processing of unknown css is fixed
+ incorrect outlining in Chrome and Safari
+ incorrect position of lightbox on scrollable page
+ summer|winter time transition is fixed
+ fixed issue with multi_day zone rendering, while deleting|adding events
+ problem with incorrect recurring view, after resize in edit mode, is fixed 
+ event editor doesn't close, if "onClick" event is disabled (#617)
+ incorrect processing of 12AM, while parsing the string to date



<b>2.0</b>
------

<span class='release_date'>July 20, 2009. Major update</span>

###Major Changes 

1.  Added support of [Recurring events](recurring_events.md)
2.  Added ability to create [Units view](units_view.md) (PRO version)
3.  Multi-day events can be seen in Day and Week mode ( scheduler.config.multi_day = true; )
4.  Month view can auto-size to prevent data overflow
5.  Added ability to create custom views


<b>1.0</b>
--------

<span class='release_date'>May 20, 2009. Initial release</span>

- Day/Week/Month views
- Drag-and-drop support
- Support of Ajax-enabled web API

