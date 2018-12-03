What's New 
==============

If you are updating scheduler from an older version, check migration_from_older_version.md for details.

5.1
------------

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


5.0
------

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


4.4
-----------

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

4.3
------

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


4.0
-------

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

1.  Touch support (tablets and touch monitors) ([details](touch_support.md))
2.  Romanian locale added


3.6 
-----

1.  Windows8 edition added ([details](winjs_compatibility.md)) 
2.  Extended date format configuration for lightbox form
3.  Sub-day navigation in timeline view
4.  Ability to define custom sorting in timeline view 
5.  Multi-page export to PDF ([details](pdf_multi.md))


3.5 
-----

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



3.0 
-------

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



2.0 
------

###Major Changes 

1.  Added support of [Recurring events](recurring_events.md)
2.  Added ability to create [Units view](units_view.md) (PRO version)
3.  Multi-day events can be seen in Day and Week mode ( scheduler.config.multi_day = true; )
4.  Month view can auto-size to prevent data overflow
5.  Added ability to create custom views



