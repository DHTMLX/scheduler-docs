What's New
==============

If you are updating Scheduler from an older version, check migration_from_older_version.md for details.

<style>
.release_date{
	font-size: 13px;
	margin-left: 20px;
}
</style>

7.0.0
---------------
<span class='release_date'>January 30, 2024. Major release</span>

### Breaking Changes

This update brings some changes in the structure of the Scheduler package and behavior of functionality. Be sure to check [Migration notes](migration_from_older_version.md) to be on the safe side.

### Updates

- Updated the [Terrace skin](skins.md#terraceskin)
- Introduced a new [Dark skin](skins.html#darkskin)
- Enabled [customization of all skins](custom_skins.md) using CSS variables
- Added a new [Agenda view](agenda_view.md)
- Professional versions of the Scheduler can be [installed via npm](install_with_bower.md).
- Enhanced the ability to customize markers in the [Map View](map_view.md)
- Improved default display for [short events](sizing.md) in Day/Week/Units views
- Updated [Day](day_view.md)/[Week](week_view.md)/[Units](units_view.md) views to no longer use images for the background grid
- Removed the [Bluebird Promise](api/scheduler_promise.md) library from the core library
- Various improvements for scaling on high-definition screens and responsiveness on smaller screens
- Provided a new user-friendly API for the [Tooltip extension](tooltips.md)
- Added ability to reserve free space in columns of [Day](day_view.md)/[Week](week_view.md)/[Units](units_view.md) views
- New api/scheduler_onbeforequickinfo_event.md event
- New api/scheduler_time_slot_class_template.md and api/scheduler_time_slot_text_template.md templates
- Updated type definitions

### Fixes

- Corrected the display issues of the [recurring form](recurring_events.md) when the [French locale](localization.md) is used
- Fixed the incorrect duration of events after drag-and-drop actions in the [Timeline view](timeline_view.md) when using the first_hour/last_hour settings
- Addressed unexpected scroll behavior when using the mouse wheel over the left-hand panel of the [Timeline view](timeline_view.md)
- Resolved visual lag during vertical scrolling in the [Timeline view](timeline_view.md) on high-definition screens with Smart Rendering enabled
- Fixed the non-functional drag-and-drop in the [Units view](units_view.md) when the `all_timed` extension is active
- Restored the Multiselect plugin in GPL builds


6.0.5
---------------
<span class='release_date'>July 31, 2023. Bugfix release</span>

### Fixes

- Fix the issue where the [lightbox](lightbox_editors.md) was not functioning in SalesForce LWC
- Fix for the [container_autoresize](extensions_list.md#containerautoresize) issue that occurred with [ignore_week](custom_scales.md) when the week started on a hidden day

### Enhancements

- Updated type definitions to include [scheduler.form_blocks](custom_lightbox_editor.md)

6.0.4
---------------
<span class='release_date'>May 31, 2023. Bugfix release</span>

### Fixes

 - Fix the incorrect work of the [dataProcessor](server_integration.md) when an instance of the [Recurring series](recurring_events.md) is edited.
 - Fix the issue that caused [Recurring series](recurring_events.md) to lose custom properties assigned to them.
 - Fix the script error that happens after [scheduler.destructor()](api/scheduler_destructor.md) call when the [container_autoresize](extensions_list.md#containerautoresize) extension is enabled.
 - Fix the regression in the [Timeline view](timeline_view.md) that prevented autoscroll during event drag and drop.
 - The attached [onContextMenu](api/scheduler_oncontextmenu_event.md) event handler now prevents the default context automatically.

6.0.3
---------------
<span class='release_date'>November 4, 2022. Bugfix release</span>

### Fixes

- Fix the regression in the [Year view](year_view.md) which caused incorrect date arguments for the [onEmptyClick](api/scheduler_onemptyclick_event.md) event handler
- Fix work of the ['height' property of the 'time' section of the lightbox](time.md)
- Fix the issue with the incorrect height of the time scale in the timeline view when the [second_scale](timeline_view.md#secondxaxis) was specified
- Fix the value of the new event flag in the [onEventCancel](api/scheduler_oneventcancel_event.md) event arguments (the flag must have a boolean value) 
- Fix the script error which happened on scroll in the [Tree Timeline](timeline_view.md) view when [smart_rendering](api/scheduler_createtimelineview.md) was enabled and sections were initially loaded in the [closed](timeline_view.md#dataforyaxissectionsinthetreemode) state

6.0.2
-------------
<span class='release_date'>July 25, 2022. Bugfix release</span>

### Fixes

- Fix the regression in scripts for building [Custom Skins](custom_skins.md)
- Fix the script errors occurred on pages with enabled Content Security Policy
- Fix the incorrect work of the DataProcessor when it is initialized with the [router object](server_integration.md#customrouting)
- Fix the typo in the name of the DOM attribute for cells of the [Year view](year_view.md)

6.0.1
-------------
<span class='release_date'>June 23, 2022. Bugfix release</span>

### Fixes

- Fix compatibility with Salesforce LWC
- Fix the incorrect placement of the [Tooltip](tooltips.md) that caused the tooltip to be cut in some cases
- Fix the display of [columns](timeline_view.md#:~:text=Specifying%20columns%20of%20the%20left%2Dhand%20panel) in the [Tree Timeline](timeline_view.md) view
- Disabling the [show_quick_info](api/scheduler_show_quick_info_config.md) config now stops the [Quick Info](touch_support.md#quickinfoextension) from appearing after the mouse click on an event, but allows opening the popup via calling the [showQuickInfo](api/scheduler_showquickinfo.md) method
- Fix the incorrect work of the [repeat_date](api/scheduler_repeat_date_config.md) config in some cases

6.0
---------------------
<span class='release_date'>May 19, 2022. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### Breaking Changes

This update brings some changes in the structure of the Scheduler package and behavior of functionality. Be sure to check [Migration notes](migration_from_older_version.md#5360) to be on the safe side.

### New functionality

- [Destructors for Scheduler and DataProcessor instances](multiple_per_page.md#destructorofscheduleranddataprocessorinstances)
- Ability to specify the [height of Timeline sections](timeline_view.md#changingheightsofsections)
- Ability to specify [multiple columns](timeline_view.md#:~:text=Specifying%20columns%20of%20the%20left%2Dhand%20panel) in the left-hand panel of timeline_view.md
- New **resolvePosition**, **dateFromPos**, **getEventTop** methods of the [Timeline object](timeline_view.md#:~:text=timeline.resolvePosition) 

### API

- New [week_agenda_date](api/scheduler_week_agenda_date_template.md) template
- The [ajax](api/scheduler_ajax_other.md), [env](api/scheduler_env_other.md), [i18n](api/scheduler_i18n_other.md) objects are added
- New [Promise](api/scheduler_promise.md) method
- New [destructor()](api/scheduler_destructor.md) method and [onDestroy](api/scheduler_ondestroy_event.md) event
- Debug helpers are added: [assert()](api/scheduler_assert.md) method, [show_errors](api/scheduler_show_errors_config.md) property, [onError](api/scheduler_onerror_event.md) event
- New methods are added: [bind()](api/scheduler_bind.md), [copy()](api/scheduler_copy.md), [defined()](api/scheduler_defined.md), [mixin()](api/scheduler_mixin.md) 
- The constructor function of the dataProcessor has moved from the global scope to the scheduler object (window.dataProcessor -> [scheduler.DataProcessor](api/scheduler_dataprocessor.md))
- New [createDataProcessor()](api/scheduler_createdataprocessor.md) method
- Public helpers for [popup messages](integration_with_dhtmlxmessage.md) has moved from the **dhtmlx** to **scheduler** object
- New [serialize()](api/scheduler_serialize.md) method
- New [overwrite_marked_timespans](api/scheduler_overwrite_marked_timespans_config.md) property

### Updates

- All extensions must be activated now via the [plugins()](api/scheduler_plugins.md) method
- Locale files were removed from the package, [new API](api/scheduler_i18n_other.md) for the Scheduler localization is added
- `Scheduler.getSchedulerInstance` now [can take a configuration object](multiple_per_page.md#schedulerinstanceconfiguration) while creating a new Scheduler instance
- The CSP extension was removed from the package, the [csp mode is enabled by default](api/scheduler_csp_config.md)
- The `settings` object as the third parameter of the [attachEvent()](api/scheduler_attachevent.md) method is added
- [Routing options for DataProcessor](server_integration.md#customrouting)
- Ability to [import dhtmlxScheduler as an ES6 module](initialization.md#importfilesintoes67andtypescriptapps)

5.3.14
-------------
<span class='release_date'>March 29, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of drag and drop for recurring events that was added via the [scheduler.addEvent()](api/scheduler_addevent.md) method 
- Fix the script error that was thrown from [scheduler.formSection()](api/scheduler_formsection.md) when recurring events were enabled
- Fix the issue that caused the scheduler to display events that shouldn't be visible due to the value of the [first_hour](api/scheduler_first_hour_config.md) config
- Removed the unexpected call of the [onEventUnselected](api/scheduler_oneventunselected_event.md) event that fired on every empty click when no events were previously selected
- Now the [onEventUnselected](api/scheduler_oneventunselected_event.md) event will fire when the selected event is deleted

5.3.13
-------------
<span class='release_date'>November 9, 2021. Bugfix release</span>

### Fixes

- Fix the issue that caused the edited [recurring series](recurring_events.md) to disappear after closing [Lightbox](configuring_the_lightbox.md) via [scheduler.hideLightbox](api/scheduler_hidelightbox.md)
- Fix the issue with disabling the [auto_end_date](api/scheduler_auto_end_date_config.md) config dynamically
- Fix the incorrect work of [modified instances](recurring_events.md#editingdeletingacertainoccurrenceintheseries) of a recurring series when the `start_date` of the series event contains non-empty milliseconds part
- Fix the issue with the [Keyboard Navigation](keyboard_navigation.md) module that changed the scroll position of the scheduler when resizing an event in some cases
- Now, when [Keyboard Navigation](keyboard_navigation.md) is enabled, "trap modal focus" of the [Lightbox](configuring_the_lightbox.md) and `dhtmlx.modalbox` should respect the tabindex of elements
- Now, when the "Today" button is pressed, the [Keyboard Navigation](keyboard_navigation.md) focuses on the first cell of the Today column rather than the first cell of the first column of the [Week View](week_view.md)
- Fix the incorrect work of [scheduler.showEvent](api/scheduler_showevent.md) in the [Timeline view](timeline_view.md#horizontalscroll) when the [Smart Rendering](api/scheduler_createtimelineview.md) is enabled

5.3.12
----------
<span class='release_date'>August 24, 2021. Bugfix release</span>

### Fixes

- Fix the issue with [Tree Timeline](timeline_view.md#dataforyaxissectionsinthetreemode) view which caused it to enter an infinite loop when the list of sections contains duplicated keys
- Fix the incorrect work of the monthly [recurring events](recurring_events.md) when `After N occurrences` limitation is used
- Fix the incorrect work of the [recurring_overflow_instances](api/scheduler_recurring_overflow_instances_config.md) config in the `lastDay` mode which caused the event instance to lose the minutes/seconds part of its date
- Fix the issue with blocking [the dragged event from being moved out of the scheduler](dhtmlx_components_integration.md#draganddropbetweenschedulers) when returning `false` from the [onBeforeEventDragOut](api/scheduler_onbeforeeventdragout_event.md) event
- The default CSS of [Tree Timeline](timeline_view.md#dataforyaxissectionsinthetreemode) section [labels](api/scheduler_{timelinename}_scale_label_template.md) is changed to prevent unexpected line break when the label is too long for the cell

5.3.11
----------
<span class='release_date'>February 9, 2021. Bugfix release</span>

### Fixes

- Fix the script error occurred when changing dates in the scheduler when the [Cookie extension](extensions_list.md#cookie) is enabled
- Fix the incorrect value of the Content-Type header when the [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) of dataProcessor is set to "JSON"
- CSS corrections for the Lightbox on [mobile devices](touch_support.md) when the [Terrace](skins.md#terraceskin) skin is used
- Fix issues with [recurring events](recurring_events.md) that caused some events to transfer to the next month when the target month doesn't have the appropriate date and "monthly" recurrence is used
- Fix the issue that caused the modal overlay to stay visible after the Lightbox was closed via calling [scheduler.updateCollection()](api/scheduler_updatecollection.md)


### Updates

- The [onBeforeEventPasted](api/scheduler_onbeforeeventpasted_event.md) API event is added in order to allow validation or modifying the position of the pasted event
- New [recurring_overflow_instances](api/scheduler_recurring_overflow_instances_config.md) configuration option is added



5.3.10
----------
<span class='release_date'>November 11, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect work of [column_width](timeline_view.md#horizontalscroll) when some units are [hidden](custom_scales.md)
- Fix touch support on iPad on Safari
- Fix the incorrect work of the [onDblClick](api/scheduler_ondblclick_event.md) and [onClick](api/scheduler_onclick_event.md) events when handling *false* result in [Grid view](grid_view.md)
- Fix the incorrect work of drag and drop in [Timeline view](timeline_view.md) which caused events to move to the next section after clicking on the bottom border of the event bar

5.3.9
----------
<span class='release_date'>June 4, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect display of a [scrollable timeline](timeline_view.md#horizontalscroll) after scrolling it down and dragging and dropping the last row 
- Fix the incorrect display of events which happened after switching between two [scrollable timelines](timeline_view.md#horizontalscroll) 
- Fix script error that fired when a [timeline](timeline_view.md) was scrolled on touch devices 
- Fix the incorrect Content-Type of POST/PUT/DELETE requests sent by `dataProcessor` when [custom headers](server_integration.md#customrequestheadersandparameters) are specified
- The [timeline_row_class](api/scheduler_{timelinename}_row_class_template.md ) template for CSS class of a timeline row is added


5.3.8
----------
<span class='release_date'>May 14, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect height of the modal overlay of the [Lightbox](lightbox_editors.md)
- Fix the incorrect sizes of the scheduler when the scheduler is initialized inside Bootstrap modals

### Updates

- Scheduler now automatically tracks the container resize and adjusts its own sizes accordingly
- Add [Mini Calendar](minicalendar.md) control for the [header config](api/scheduler_header_config.md)

5.3.7
----------

<span class='release_date'>April 30, 2020. Bugfix release</span>

- Fix the incorrect work of the [Container Autoresize](extensions_list.md#containerautoresize) extension when [a horizontal scrollbar is enabled in Timeline view](timeline_view.md#horizontalscroll)
- Fix the incorrect work of the [show_unassigned](api/scheduler_createtimelineview.md) configuration option of the [Timeline view](timeline_view.md)

5.3.6
------------

<span class='release_date'>February 27, 2020. Bugfix release</span>

- Fix the incorrect displaying of events in the [Day Timeline view](timeline_view.md#viewmodes) when `scrollable:true` or `smart_rendering:true` is used
- Fix the script error which happened in the [Day Timeline view](timeline_view.md#viewmodes) after dragging a new event when  `scrollable:true` was used together with [dataProcessor](server_integration.md)
- Fix the script error which was thrown if no `date` element was included in the [header config](initialization.md#initializingschedulerviaheaderconfig)
- Fix styling of the `day` tab in the [Material skin](skins.md#materialskin) when the [header config](initialization.md#initializingschedulerviaheaderconfig) does not contain a `week` or `month` tab

5.3.5
------------

<span class='release_date'>January 31, 2020. Bugfix release</span>

### Fixes

- Fix styling of the 'next' button on the right side of the navigation panel in [Terrace skin](skins.md#defaultskin) when the scheduler is initialized using [header config](initialization.md#initializingschedulerviaheaderconfig)
- Fix the incorrect work of the [URL extension](extensions_list.md#url) which failed to highlight events by url in some cases
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

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

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

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

###Breaking Changes

This update changes behavior of multiple API methods. While they shouldn't cause any breaks in the existing code, be sure to check [Migration notes](migration_from_older_version.md#5152) to be on the safe side.

###New functionality

1. [Custom HTML content for timeline cells](timeline_view.md#customcontentincells) (PRO version)
2. [Drag-n-drop of events by the body](api/scheduler_drag_event_body_config.md)

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

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

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

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

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

[Review of release on the blog](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

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
10.  JSMessage included
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

