---
title: "What's New"
sidebar_label: "What's New"
---

# What's New

If you are updating Scheduler from an older version, check [Migration From Older Versions](migration.md) for details.

7.2.11
-------------
<span class='release_date'>January 12, 2026. Bugfix release</span>

### Fixes

- Fix the issue where new events were duplicated in [React Scheduler](integrations/react/overview.md) if the `save` handler did not return a new ID
- Fix the issue where [Timeline view](views/timeline.md) templates were not applied in [React Scheduler](integrations/react/overview.md)
- Fix the incorrect binding of events to sections in [Timeline view](views/timeline.md) when filtering is used in [React Scheduler](integrations/react/overview.md)
- Fix the script error in the [Agenda view](views/agenda.md) when the `date` section is not included in the [header configuration](guides/initialization.md#initializing-scheduler-via-header-config)
- Fix the incorrect display of header elements in the [Year](views/year.md) and [Agenda](views/agenda.md) views when using the [Material skin](guides/skins.md#material-skin)
- Fix the broken layout in [React Scheduler](integrations/react/overview.md) when switching from a plugin-based initial view to standard views
- Fix the issue where a phantom event block appeared when an all-day [recurring event](guides/recurring-events.md) had a duration of exactly 24 hours
- Fix the issue where the [Lightbox](guides/configuring-the-lightbox.md) failed to open when creating multiple events via drag on the same day in the [Month view](views/month.md) with the `year_view` plugin activated

7.2.10
-------------
<span class='release_date'>December 10, 2025. Bugfix release</span>

### Fixes

- Fix the issue where events jumped to the left when being dragged from the last column in the [multiday Units view](views/units.md#displaying-units-for-multiple-days)
- Fix the issue where some date cells were missing in specific months in the [Month view](views/month.md)
- Fix the drag-create issue on mobile devices when using the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin
- Fix the issue that prevented event creation on double-click after horizontal scrolling in the [Units view](views/units.md)

7.2.9
---------------
<span class='release_date'>September 19, 2025. Bugfix release</span>

### Fixes

- Fix memory leaks that occurred in the [Timeline view](views/timeline.md)
- Fix compatibility issue between the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin and the [Week Agenda](views/weekagenda.md) view
- Fix the issue where the [onScaleDblClick](api/event/onscaledblclick.md) was not triggered as expected
- Fix inconsistent behavior of [onEventSave](api/event/oneventsave.md) and [DataProcessor](api/method/createdataprocessor.md) when working with [recurring events](guides/recurring-events.md)
- Fix the [React Scheduler](integrations/react/overview.md) issue where multiple instances of the component caused duplicated templates
- Fix incorrect handling of the `events` prop's changes in [React Scheduler](integrations/react/overview.md)

## 7.2.8

<span class='release_date'>July 30, 2025. Bugfix release</span>

### New

- Samples for [React Scheduler](integrations/react/overview.md) were added to the Commercial, Enterprise, Ultimate, and Evaluation packages

### Fixes

- Fix the issue where dragging a [recurring event](guides/recurring-events.md) after deleting its subsequent occurrences behaved incorrectly
- Ensure "Repeat Event" control of the [lightbox](guides/lightbox-editors.md) is disabled for modified [series instances](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series)
- Fix the incorrect display of legacy labels for [recurring events](guides/recurring-events.md)
- Fix the conflict between the [max_month_events](api/config/max_month_events.md) setting and [multi-day events](views/month.md), which caused events to disappear or overlap in the [Month view](views/month.md)
- Ensure cookies set by Scheduler over HTTPS now include the **Secure** attribute
- Fix the issue where the [event_duration](api/config/event_duration.md) setting corrupted parsed event data
- Fix the issue where the [time_step](api/config/time_step.md) setting corrupted parsed event data


## 7.2.6

<span class='release_date'>June 26, 2025. Bugfix release</span>

### Fixes

- Fix the issue with seconds-level precision in the event timing
- Fix the incorrect drag behavior in the [Timeline view](views/timeline.md) during short months
- Fix the incorrect rounding of events in the [Timeline view](views/timeline.md)
- Prevent [DataProcessor](guides/server-integration.md) from adding the `!nativeeditor_status` property to [custom router](guides/server-integration.md#custom-routing) arguments

## 7.2.5

<span class='release_date'>May 20, 2025. Bugfix release</span>

- Ensure that the [Lightbox time control](guides/time.md) displays the correct number of days for each month in the day selectors
- Fix the script error occurring in the trial build in Salesforce
- Fix the regression introduced in Scheduler v7.2 where the "Today" cell was not highlighted in the [Month view](views/month.md)
- Fix the issue with incorrect `end_date` calculation when resizing events with [round_position](views/timeline.md#stretching-events-over-the-cell) enabled
- Fix the issue where the [Tooltip](guides/tooltips.md) shifted off-screen when displaying long content

## 7.2.4

<span class='release_date'>May 6, 2025. Bugfix release</span>

### Fixes

- Fix the incorrect behavior of the [ignore_timeline](views/timeline.md#time-interval-for-view-cells) setting when moving or resizing events in the [Timeline view](views/timeline.md)
- Fix the issue with incorrect `end_date` calculation when creating new events with [ignore_timeline](views/timeline.md#time-interval-for-view-cells) enabled
- Fix the issue where [lightbox](guides/lightbox-editors.md) button configurations were mixed up after being saved to storage
- Fix the issue where the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin unexpectedly increased container size in an empty [Agenda view](views/agenda.md)
- Fix the script error in the [Units view](views/units.md) that occurred with certain values of the `size` setting with the [mark_now](api/config/mark_now.md) config enabled
- Fix the incorrect behavior of horizontal scroll in the [Timeline view](views/timeline.md) when `smart_rendering` is set to `false`

## 7.2.3

<span class='release_date'>April 9, 2025. Bugfix release</span>

### Fixes

- Fix the issue where grid cells were not focused when tasks were outside the chart's visible time range
- Fix the issue in the [multiUserBackend](guides/multiuser-live-updates.md) extension that caused incorrect behavior when editing all events in a recurring series
- Fix the issue where the `timeline_scalex_class` added the class twice in the [Timeline view](views/timeline.md)
- Fix the issue where `scrollTo((section: x))` did not scroll to the first section in the [Timeline view](views/timeline.md)
- Fix the issue where the section `height` setting in the [lightbox](guides/lightbox-editors.md) was not applied correctly
- Fix the issue where the [Mini Calendar](guides/minicalendar.md) ignored the `rtl` configuration
- Fix the issue where smart rendering worked only in the first [Timeline view](views/timeline.md) when multiple timelines were used with `smart_rendering:true` and `scrollable:false`
- Fix the issue where using `first_hour`/`last_hour` with `round_position` caused incorrect dates of events when dragging events in the [Timeline view](views/timeline.md)

## 7.2.2

<span class='release_date'>February 13, 2025. Bugfix release</span>

- Fix the issue where filtering did not work correctly for modified occurrences of [recurring events](guides/recurring-events.md)
- Ensure the [month_date](api/template/month_date.md) template properly affects the [Year view](views/year.md)
- Fix the incorrect behavior when using [multisection](views/units.md#assigning-events-to-several-units) events in the [Timeline view](views/timeline.md) with `round_position: true`
- Prevent [recurring events](guides/recurring-events.md) occurrences from being cut off when they fall outside the visible range of the [Timeline view](views/timeline.md)
- Fix issues with editing [recurring events](guides/recurring-events.md) using the "current and the following" option

## 7.2.1

<span class='release_date'>January 16, 2025. Bugfix release</span>

- Prevent [recurring occurrences](guides/recurring-events.md) from disappearing during daylight saving time (DST) transitions.
- Fix the script error that occurred when editing newly created [recurring events](guides/recurring-events.md).
- Fix the incorrect display of [occurrences](guides/recurring-events.md) after loading data from the back-end.
- Fix the error encountered when adjusting the `size` property in the [Units view](views/units.md) that exceeds the available columns.
- Ensure multi-level folders in the [Tree Timeline view](views/timeline.md) display correctly at all nesting levels.
- Fix the issue with the `readonly_form` configuration option causing errors when opening the lightbox for recurring events.
- Fix the issue with recurring patterns when modifying "the current and the following" occurrences of weekly recurring events that span certain weekdays.

## 7.2

<span class='release_date'>December 17, 2024. Minor update</span>

[Review of the release on the blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-2/)

### Breaking Changes

This update brings changes for some map configuration properties. Check the [Migration notes](migration.md) for details.

### New functionality

- Ability to edit [the current and the following recurring events](guides/recurring-events.md)
- New [Live-Update module](guides/multiuser-live-updates.md) for collaborative editing

### Updates

- Improved display of [overnight events](api/config/all_timed.md)
- Updated [event handlers for the Mini Calendar](guides/minicalendar.md#event-handling)
- [Date functions](api/other/date.md) are now non-mutating

### Fixes

- Fix the issue with the container resize listeners in the LWC environment  
- Fix the issue with events' drag and drop when the event's end date is past the [scheduler_last_hour](api/config/last_hour.md) configuration  
- Fix the incorrect display of events in the [cascade_event_display](api/config/cascade_event_display.md) mode  
- Fix the incorrect behavior of drag-resize when a new event is resized to the bottom of the day column while the `all_timed` extension is active  
- Fix the incorrect behavior of vertical scrolling in the scrollable [Timeline view](views/timeline.md) when smart rendering is disabled  
- Fix the incorrect display of scroll buttons in the [Units](views/units.md) view  
- Fix the incorrect display of unassigned events in the [Units](views/units.md) view when the `skip_incorrect` setting is set to `false`

## 7.1.3

<span class='release_date'>November 19, 2024. Bugfix release</span>

- Fix the issue where the initial position of events was not [highlighted during drag and drop](api/config/drag_highlight.md) in the [Timeline](views/timeline.md) and [Units](views/units.md) views
- Fix the issue where the `last_hour` setting caused incorrect behavior of drag and drop in the [Timeline view](views/timeline.md)
- Prevent [recurring occurrences](guides/recurring-events.md) from disappearing in certain time zones during DST transitions
- Fix repeated end date increments when toggling [Full day](api/config/full_day.md) in the [Mini Calendar](guides/minicalendar.md#in-the-lightbox) control of the lightbox
- Restore functionality of the [ignore_year](guides/custom-scales.md) and [ignore_agenda](guides/custom-scales.md) methods

## 7.1.2

<span class='release_date'>October 8, 2024. Bugfix release</span>

- Fix the incorrect position of events pasted using [Ctrl+C/Ctrl+V](guides/keyboard-navigation.md) when the [multisection](views/units.md#assigning-events-to-several-units) extension is enabled
- Ensure the [Collision extension](guides/collisions.md) works properly with new [recurring events](guides/recurring-events.md)
- Correct the sections' height after calling [scheduler.updateCollection()](api/method/updatecollection.md) when smart rendering enabled in the [Timeline view](views/timeline.md)
- Resolve the issue where smart rendering hides parts of new [multisection](views/units.md#assigning-events-to-several-units) events when [onBeforeLightbox](api/event/onbeforelightbox.md) is canceled
- Fix incorrect behavior of the [getEvents](api/method/getevents.md) method with [recurring events](guides/recurring-events.md)
- Correct the handling of [recurring events](guides/recurring-events.md) with custom daily properties

## 7.1.1

<span class='release_date'>August 27, 2024. Bugfix release</span>

- Fix the issue where the [DataProcessor](api/method/createdataprocessor.md) did not allow sending false values
- Fix the issue where the [Tooltip](guides/tooltips.md) disappeared on mobile devices after a click
- Fix the [Tooltip](guides/tooltips.md) position issue during page scroll
- Fix the issue where the [container_autoresize](guides/extensions-list.md#container-autoresize) plugin hid the multiday section
- Fix the issue where the [Quick Info](guides/touch-support.md#quick-info-extension) popup appeared outside of the container
- Fix the issue where unconfirmed events disappeared during scrolling with smart rendering enabled in the [Timeline view](views/timeline.md)
- Fix the incorrect sections height in the [Timeline view](views/timeline.md) after calling [scheduler.updateCollection()](api/method/updatecollection.md) with active smart rendering


## 7.1

<span class='release_date'>July 31, 2024. Minor update</span>

[Review of the release on the blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-1/)

### Breaking Changes

This update brings changes for some map configuration properties. Check the [Migration notes](migration.md) for details.

### New functionality

- Storing [recurring events](guides/recurring-events.md) in the RRULE format 
- Map view [supports different map providers](views/map.md)
- The ability to [undo an event's deletion](api/config/undo_deleted.md)
- The [batchUpdate](api/method/batchupdate.md) method for updating multiple events at once

### Updates

- Scheduler [highlights the original position of a calendar event during the drag and drop](api/config/drag_highlight.md)

### Fixes

- Fix the issue when dynamically changing the **x_date** property of the [Timeline view](views/timeline.md) did not affect the template
- Fix the header misalignment in the multiday [Units view](views/units.md)
- Fix the script error that occurred after the [destructor](api/method/destructor.md) is called when the [drag_between](guides/drag-between.md) extension is active
- Fix the incorrect behavior of the [limit](guides/limits.md) extension, which prevented editing [recurring series](guides/recurring-events.md)
- Fix the performance issue with events drag and drop in the [Tree Timeline view](views/timeline.md) when the **show_unassigned** option is set to *true*
- Fix the incorrect behavior of the scrollable [Timeline view](views/timeline.md) when smart_rendering is set to *false*
- Fix the incorrect scroll position after a view change in a scrollable [Timeline view](views/timeline.md)

## 7.0.5

<span class='release_date'>May 30, 2024. Bugfix release</span>

### Fixes

- Fix the incorrect height of the [Timeline](views/timeline.md) sections when the **event_dy:"full"** setting is used
- Fix the missing "today" marker in the [Year view](views/year.md)
- Correct the positioning of events in the [Day](views/day.md)/[Week](views/week.md) views

## 7.0.4

<span class='release_date'>May 22, 2024. Bugfix release</span>

### Fixes

- Add the `placeholder` setting for the [textarea](guides/textarea.md) control
- Fix incorrect cell selection in [Keyboard Navigation](guides/keyboard-navigation.md)
- Fix the [Quick Info](guides/touch-support.md#quick-info-extension) popup in [Agenda view](views/agenda.md)
- Fix type definitions for the [Agenda view](views/agenda.md) templates
- Fix the incorrect display of multi-day events in [Month view](views/month.md) when [start_on_monday](api/config/start_on_monday.md) is disabled and several columns are [hidden](guides/custom-scales.md) from the view

## 7.0.3

<span class='release_date'>March 15, 2024. Bugfix release</span>

### Fixes

- Issue with [textColor](guides/custom-events-color.md) property not applying in the [Month view](views/month.md) view has been resolved
- Fix for the [color](guides/custom-events-color.md) property not functioning in the [Agenda view](views/agenda.md)
- Corrected an error that occurred when using [Keyboard Navigation](guides/keyboard-navigation.md) in [Day Timeline view](views/timeline.md).

## 7.0.2

<span class='release_date'>February 20, 2024. Bugfix release</span>

### Fixes

- Compatibility regressions with [DHTMLX Suite](https://docs.dhtmlx.com/suite/)
- The regression affecting the [mark_now](api/config/mark_now.md) marker in the [Timeline view](views/timeline.md)
- The [theme initialization](guides/skins.md) problem that resulted in the incorrect Scheduler layout display in some scenarios
- The issue where selected events in the [Grid view](views/grid.md) lost their selection styling after sorting
- The issue in the [Timeline's smart rendering mode](views/timeline.md#horizontal-scroll) that caused events appearing twice during drag and drop
- Corrections in the [Greek locale](guides/localization.md)
- Fixes of memory leaks to ensure Scheduler instances are properly released upon calling the [destructor](api/method/destructor.md)

## 7.0.1

<span class='release_date'>February 5, 2024. Bugfix release</span>

### Fixes

- Regression in the [Units](views/units.md) view that caused layout issues when a scheduler was displayed on the current date
- Position of the [Quick Info](guides/touch-support.md#quick-info-extension) popup in the [scrollable timeline](views/timeline.md#horizontal-scroll) is corrected
- Incorrect positioning of the selected time slot by the [Keyboard Navigation](guides/keyboard-navigation.md) module when the [RTL](guides/rtl-mode.md) mode is active 
- The issue that prevented the creation of multi-day events in the [Month](views/month.md) view after performing a drag-resize action in the [Day](views/day.md)/[Week](views/week.md) views

### Updates

- The [height of the multi-day section](api/config/multi_day_height_limit.md) in the [Day](views/day.md)/[Week](views/week.md) views is now limited to 200px by default

## <b>7.0</b>

<span class='release_date'>January 31, 2024. Major update</span>

[Review of the release on the blog](https://dhtmlx.com/blog/dhtmlx-scheduler-7-0/)

### Breaking Changes

This update brings some changes in the structure of the Scheduler package and behavior of the functionality. Make sure to check the [Migration notes](migration.md) to be on the safe side.

### New functionality

- [Skins customization](guides/custom-skins.md) with CSS variables
- New [Dark skin](guides/skins.md#dark-skin) is introduced
- New [Agenda view](views/agenda.md) is added

### Updates

- [Terrace skin](guides/skins.md#terrace-skin) is updated
- Ability to [install the professional versions of the Scheduler via npm](guides/installation.md)
- Enhanced ability to customize markers in the [Map View](views/map.md)   
- Improvements in the default display for [short events](guides/sizing.md) in the Day/Week/Units views 
- [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) views don't use images for the background grid any more
- [Bluebird Promise](api/method/promise.md) library is **removed** from the core library
- Various improvements for scaling on high-definition screens and responsiveness on smaller screens
- Columns of the [Day](views/day.md)/[Week](views/week.md)/[Units](views/units.md) views are now able to [reserve free space](api/config/day_column_padding.md)
- Updated type definitions
- The export API is included into [scheduler.plugins](guides/extensions-list.md#export-service) and no longer requires including an additional JS file. Check the [Migration](migration.md) article for details

### Fixes

- Display issues of the [recurring form](guides/recurring-events.md) when the [French locale](guides/localization.md) is used
- Incorrect duration of events after drag-and-drop actions in the [Timeline view](views/timeline.md) when using the first_hour/last_hour settings
- Unexpected scroll behavior when using the mouse wheel over the left-hand panel of the [Timeline view](views/timeline.md)
- Visual lag during vertical scrolling in the [Timeline view](views/timeline.md) on high-definition screens with Smart Rendering enabled
- Non-functional drag-and-drop in the [Units view](views/units.md) when the `all_timed` extension is active
- The Multiselect plugin in GPL builds is restored

## 6.0.5

<span class='release_date'>July 31, 2023. Bugfix release</span>

### Fixes

- Fix the issue where the [lightbox](guides/lightbox-editors.md) was not functioning in SalesForce LWC
- Fix for the [container_autoresize](guides/extensions-list.md#container-autoresize) issue that occurred with [ignore_week](guides/custom-scales.md) when the week started on a hidden day

### Enhancements

- Updated type definitions to include [scheduler.form_blocks](guides/custom-lightbox-editor.md)

## 6.0.4

<span class='release_date'>May 31, 2023. Bugfix release</span>

### Fixes

- Fix the incorrect work of the [dataProcessor](guides/server-integration.md) when an instance of the [Recurring series](guides/recurring-events.md) is edited.
 - Fix the issue that caused [Recurring series](guides/recurring-events.md) to lose custom properties assigned to them.
 - Fix the script error that happens after [scheduler.destructor()](api/method/destructor.md) call when the [container_autoresize](guides/extensions-list.md#container-autoresize) extension is enabled.
 - Fix the regression in the [Timeline view](views/timeline.md) that prevented autoscroll during event drag and drop.
 - The attached [onContextMenu](api/event/oncontextmenu.md) event handler now prevents the default context automatically.

## 6.0.3

<span class='release_date'>November 4, 2022. Bugfix release</span>

### Fixes

- Fix the regression in the [Year view](views/year.md) which caused incorrect date arguments for the [onEmptyClick](api/event/onemptyclick.md) event handler
- Fix work of the ['height' property of the 'time' section of the lightbox](guides/time.md)
- Fix the issue with the incorrect height of the time scale in the timeline view when the [second_scale](views/timeline.md#second-x-axis) was specified
- Fix the value of the new event flag in the [onEventCancel](api/event/oneventcancel.md) event arguments (the flag must have a boolean value) 
- Fix the script error which happened on scroll in the [Tree Timeline](views/timeline.md) view when [smart_rendering](api/method/createtimelineview.md) was enabled and sections were initially loaded in the [closed](views/timeline.md#data-for-y-axis-sections-in-the-tree-mode) state

## 6.0.2

<span class='release_date'>July 25, 2022. Bugfix release</span>

### Fixes

- Fix the regression in scripts for building [Custom Skins](guides/custom-skins.md)
- Fix the script errors occurred on pages with enabled Content Security Policy
- Fix the incorrect work of the DataProcessor when it is initialized with the [router object](guides/server-integration.md#custom-routing)
- Fix the typo in the name of the DOM attribute for cells of the [Year view](views/year.md)

## 6.0.1

<span class='release_date'>June 23, 2022. Bugfix release</span>

### Fixes

- Fix compatibility with Salesforce LWC
- Fix the incorrect placement of the [Tooltip](guides/tooltips.md) that caused the tooltip to be cut in some cases
- Fix the display of [columns](views/timeline.md#specifying-columns-of-the-left-hand-panel) in the [Tree Timeline](views/timeline.md) view
- Disabling the [show_quick_info](api/config/show_quick_info.md) config now stops the [Quick Info](guides/touch-support.md#quick-info-extension) from appearing after the mouse click on an event, but allows opening the popup via calling the [showQuickInfo](api/method/showquickinfo.md) method
- Fix the incorrect work of the [repeat_date](api/config/repeat_date.md) config in some cases

## <b>6.0</b>

<span class='release_date'>May 19, 2022. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlx-scheduler-6-0/)

### Breaking Changes

This update brings some changes in the structure of the Scheduler package and behavior of functionality. Be sure to check [Migration notes](migration.md#53---60) to be on the safe side.

### New functionality

- [Destructors for Scheduler and DataProcessor instances](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)
- Ability to specify the [height of Timeline sections](views/timeline.md#changing-heights-of-sections)
- Ability to specify [multiple columns](views/timeline.md#specifying-columns-of-the-left-hand-panel) in the left-hand panel of [Timeline view](views/timeline.md)
- New **resolvePosition**, **dateFromPos**, **getEventTop** methods of the [Timeline object](views/timeline.md#getting-coordinates-of-a-specific-position) 

### API

- New [week_agenda_date](api/template/week_agenda_date.md) template
- The [ajax](api/other/ajax.md), [env](api/other/env.md), [i18n](api/other/i18n.md) objects are added
- New [Promise](api/method/promise.md) method
- New [destructor()](api/method/destructor.md) method and [onDestroy](api/event/ondestroy.md) event
- Debug helpers are added: [assert()](api/method/assert.md) method, [show_errors](api/config/show_errors.md) property, [onError](api/event/onerror.md) event
- New methods are added: [bind()](api/method/bind.md), [copy()](api/method/copy.md), [defined()](api/method/defined.md), [mixin()](api/method/mixin.md) 
- The constructor function of the dataProcessor has moved from the global scope to the scheduler object (window.dataProcessor -> [scheduler.DataProcessor](api/method/dataprocessor.md))
- New [createDataProcessor()](api/method/createdataprocessor.md) method
- Public helpers for [popup messages](guides/popups-and-modals.md) has moved from the **dhtmlx** to **scheduler** object
- New [serialize()](api/method/serialize.md) method
- New [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) property

### Updates

- All extensions must be activated now via the [plugins()](api/method/plugins.md) method
- Locale files were removed from the package, [new API](api/other/i18n.md) for the Scheduler localization is added
- `Scheduler.getSchedulerInstance` now [can take a configuration object](guides/multiple-per-page.md#scheduler-instance-configuration) while creating a new Scheduler instance
- The CSP extension was removed from the package, the [csp mode is enabled by default](api/config/csp.md)
- The `settings` object as the third parameter of the [attachEvent()](api/method/attachevent.md) method is added
- [Routing options for DataProcessor](guides/server-integration.md#custom-routing)
- Ability to [import dhtmlxScheduler as an ES6 module](guides/initialization.md#import-files-into-es67-and-typescript-apps)

## 5.3.14

<span class='release_date'>March 29, 2022. Bugfix release</span>

### Fixes

- Fix the incorrect work of drag and drop for recurring events that was added via the [scheduler.addEvent()](api/method/addevent.md) method 
- Fix the script error that was thrown from [scheduler.formSection()](api/method/formsection.md) when recurring events were enabled
- Fix the issue that caused the scheduler to display events that shouldn't be visible due to the value of the [first_hour](api/config/first_hour.md) config
- Removed the unexpected call of the [onEventUnselected](api/event/oneventunselected.md) event that fired on every empty click when no events were previously selected
- Now the [onEventUnselected](api/event/oneventunselected.md) event will fire when the selected event is deleted

## 5.3.13

<span class='release_date'>November 9, 2021. Bugfix release</span>

### Fixes

- Fix the issue that caused the edited [recurring series](guides/recurring-events.md) to disappear after closing [Lightbox](guides/configuring-the-lightbox.md) via [scheduler.hideLightbox](api/method/hidelightbox.md)
- Fix the issue with disabling the [auto_end_date](api/config/auto_end_date.md) config dynamically
- Fix the incorrect work of [modified instances](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) of a recurring series when the `start_date` of the series event contains non-empty milliseconds part
- Fix the issue with the [Keyboard Navigation](guides/keyboard-navigation.md) module that changed the scroll position of the scheduler when resizing an event in some cases
- Now, when [Keyboard Navigation](guides/keyboard-navigation.md) is enabled, "trap modal focus" of the [Lightbox](guides/configuring-the-lightbox.md) and `dhtmlx.modalbox` should respect the tabindex of elements
- Now, when the "Today" button is pressed, the [Keyboard Navigation](guides/keyboard-navigation.md) focuses on the first cell of the Today column rather than the first cell of the first column of the [Week View](views/week.md)
- Fix the incorrect work of [scheduler.showEvent](api/method/showevent.md) in the [Timeline view](views/timeline.md#horizontal-scroll) when the [Smart Rendering](api/method/createtimelineview.md) is enabled

## 5.3.12

<span class='release_date'>August 24, 2021. Bugfix release</span>

### Fixes

- Fix the issue with [Tree Timeline](views/timeline.md#data-for-y-axis-sections-in-the-tree-mode) view which caused it to enter an infinite loop when the list of sections contains duplicated keys
- Fix the incorrect work of the monthly [recurring events](guides/recurring-events.md) when `After N occurrences` limitation is used
- Fix the incorrect work of the [recurring_overflow_instances](api/config/recurring_overflow_instances.md) config in the `lastDay` mode which caused the event instance to lose the minutes/seconds part of its date
- Fix the issue with blocking [the dragged event from being moved out of the scheduler](guides/drag-between.md) when returning `false` from the [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) event
- The default CSS of [Tree Timeline](views/timeline.md#data-for-y-axis-sections-in-the-tree-mode) section [labels](api/template/timelinename_scale_label.md) is changed to prevent unexpected line break when the label is too long for the cell

## 5.3.11

<span class='release_date'>February 9, 2021. Bugfix release</span>

### Fixes

- Fix the script error occurred when changing dates in the scheduler when the [Cookie extension](guides/extensions-list.md#cookie) is enabled
- Fix the incorrect value of the Content-Type header when the [transaction mode](https://docs.dhtmlx.com/api__dataprocessor_settransactionmode.html) of dataProcessor is set to "JSON"
- CSS corrections for the Lightbox on [mobile devices](guides/touch-support.md) when the [Terrace](guides/skins.md#terrace-skin) skin is used
- Fix issues with [recurring events](guides/recurring-events.md) that caused some events to transfer to the next month when the target month doesn't have the appropriate date and "monthly" recurrence is used
- Fix the issue that caused the modal overlay to stay visible after the Lightbox was closed via calling [scheduler.updateCollection()](api/method/updatecollection.md)


### Updates

- The [onBeforeEventPasted](api/event/onbeforeeventpasted.md) API event is added in order to allow validation or modifying the position of the pasted event
- New [recurring_overflow_instances](api/config/recurring_overflow_instances.md) configuration option is added


## 5.3.10

<span class='release_date'>November 11, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect work of [column_width](views/timeline.md#horizontal-scroll) when some units are [hidden](guides/custom-scales.md)
- Fix touch support on iPad on Safari
- Fix the incorrect work of the [onDblClick](api/event/ondblclick.md) and [onClick](api/event/onclick.md) events when handling *false* result in [Grid view](views/grid.md)
- Fix the incorrect work of drag and drop in [Timeline view](views/timeline.md) which caused events to move to the next section after clicking on the bottom border of the event bar

## 5.3.9

<span class='release_date'>June 4, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect display of a [scrollable timeline](views/timeline.md#horizontal-scroll) after scrolling it down and dragging and dropping the last row 
- Fix the incorrect display of events which happened after switching between two [scrollable timelines](views/timeline.md#horizontal-scroll) 
- Fix script error that fired when a [timeline](views/timeline.md) was scrolled on touch devices 
- Fix the incorrect Content-Type of POST/PUT/DELETE requests sent by `dataProcessor` when [custom headers](guides/server-integration.md#custom-request-headers-and-parameters) are specified
- The [timeline_row_class](api/template/timelinename_row_class.md) template for CSS class of a timeline row is added


## 5.3.8

<span class='release_date'>May 14, 2020. Bugfix release</span>


### Fixes

- Fix the incorrect height of the modal overlay of the [Lightbox](guides/lightbox-editors.md)
- Fix the incorrect sizes of the scheduler when the scheduler is initialized inside Bootstrap modals

### Updates

- Scheduler now automatically tracks the container resize and adjusts its own sizes accordingly
- Add [Mini Calendar](guides/minicalendar.md) control for the [header config](api/config/header.md)

## 5.3.7

<span class='release_date'>April 30, 2020. Bugfix release</span>

- Fix the incorrect work of the [Container Autoresize](guides/extensions-list.md#container-autoresize) extension when [a horizontal scrollbar is enabled in Timeline view](views/timeline.md#horizontal-scroll)
- Fix the incorrect work of the [show_unassigned](api/method/createtimelineview.md) configuration option of the [Timeline view](views/timeline.md)

## 5.3.6

<span class='release_date'>February 27, 2020. Bugfix release</span>

- Fix the incorrect displaying of events in the [Day Timeline view](views/timeline.md#view-modes) when `scrollable:true` or `smart_rendering:true` is used
- Fix the script error which happened in the [Day Timeline view](views/timeline.md#view-modes) after dragging a new event when  `scrollable:true` was used together with [dataProcessor](guides/server-integration.md)
- Fix the script error which was thrown if no `date` element was included in the [header config](guides/initialization.md#initializing-scheduler-via-header-config)
- Fix styling of the `day` tab in the [Material skin](guides/skins.md#material-skin) when the [header config](guides/initialization.md#initializing-scheduler-via-header-config) does not contain a `week` or `month` tab

## 5.3.5

<span class='release_date'>January 31, 2020. Bugfix release</span>

### Fixes

- Fix styling of the 'next' button on the right side of the navigation panel in [Terrace skin](guides/skins.md#terrace-skin) when the scheduler is initialized using [header config](guides/initialization.md#initializing-scheduler-via-header-config)
- Fix the incorrect work of the [URL extension](guides/extensions-list.md#url) which failed to highlight events by url in some cases
- Fix the incorrect work of the [Material skin](guides/skins.md#material-skin) when scheduler styles are loaded using the `@import` command

### Updates

- If neither [header config](guides/initialization.md#initializing-scheduler-via-header-config) nor [default markup](guides/initialization.md#initializing-scheduler-via-markup) is specified while initializing the scheduler, a default value for the scheduler header will be auto-generated to escape a script error

## 5.3.4

<span class='release_date'>December 10, 2019. Bugfix release</span>

### Fixes

- Fix the incorrect work of the vertical scroll in a [scrollable timeline](views/timeline.md#horizontal-scroll) when the mouse pointer is over the sections column
- Fix the incorrect serialization of nested objects by the [dataProcessor](guides/server-integration.md)
- Fix the script error which fired when creating a new event using a [custom lightbox](guides/custom-details-form.md)

## 5.3.3

<span class='release_date'>October 30, 2019. Bugfix release</span>

### Updates

- More informative error messages for common misconfigurations are added
- HTML markup of some public samples is cleaned up

## 5.3.2

<span class='release_date'>October 9, 2019. Bugfix release</span>

### Fixes

- Fix incorrect work of the click [handler](api/method/rendercalendar.md) in the [Mini Calendar](guides/minicalendar.md) when a custom [calendar_date template](api/template/calendar_date.md) is defined
- Fix rounding of the end date of an event when it is [resized](api/config/drag_resize.md) in [Day/Week views](/views/)

## 5.3.1

<span class='release_date'>October 2, 2019. Bugfix release</span>

### Updates

- [responsive_lightbox](api/config/responsive_lightbox.md) is disabled by default.

## 5.3

<span class='release_date'>October 2, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-3-minor-update-rtl-support-improved-responsiveness/)

### Breaking Changes

This update changes behavior of some parts of the component. While they shouldn't cause any breaks in the existing code, be sure to check [Migration notes](migration.md#53---60) to be on the safe side.

### New functionality

1. [RTL support](guides/rtl-mode.md)
2. [Improved mobile responsiveness](guides/touch-support.md)
3. [Integration with DHTMLX Suite 6 Layout](integrations/other/dhxlayout-integration.md#dhtmlxsuite-v6)

### Updates

1. The [year range](guides/time.md#properties) setting is added to the Date/Time lightbox control
2. [Changing Scheduler dates by horizontal swipe](guides/touch-support.md#touch-gestures-in-the-scheduler) is disabled by default
3. The possibility [to set scheduler header from config](guides/initialization.md#initializing-scheduler-via-header-config) rather than from the markup is added
4. The [render](api/method/render.md) method is added as a more intuitive alias for setCurrentView() and updateView()
5. The [hidelightbox](api/method/hidelightbox.md) method is added to the public API

### Fixes

- Fix [vertical](guides/multiselect.md#properties) config of multiselect control, which didn't work in the [Material skin](guides/skins.md#material-skin)

## 5.2.5

<span class='release_date'>September 23, 2019. Bugfix release</span>

### Fixes

- Fix regression of [Tooltip](guides/tooltips.md) extension introduced in [v5.2.4](#524)

## 5.2.4

<span class='release_date'>September 19, 2019. Bugfix release</span>

### Fixes

- Fix the issue with the [readonly form](guides/readonly.md#read-only-mode-for-the-entire-lightbox) which didn't allow changing the [configuration of the lightbox](guides/lightbox-editors.md) after [initialization](api/method/init.md) of Scheduler
- Fix the issue with Angular 8 compatibility

## 5.2.3

<span class='release_date'>August 20, 2019. Bugfix release</span>

### Fixes

- Fix incorrect animation of event bars in the [scrollable Timeline](views/timeline.md#horizontal-scroll) during drag and drop
- Fix the issue in [](views/day.md) / [](views/week.md) which caused an event to jump to the [multiday section](api/config/multi_day.md) when being moved to the end of a day
- Fix regression in the `scroll_position` setting of the [scrollable Timeline](views/timeline.md#horizontal-scroll)
- Fix the issue which caused chunks of [multi-section events](views/timeline.md#assignment-of-events-to-several-sections) to obtain incorrect position after a mouse click
- Fix the script error fired from the tooltip in `cell` mode of the [Timeline view](views/timeline.md#view-modes) when [ignore_timeline](guides/custom-scales.md) is used

## 5.2.2

<span class='release_date'>August 7, 2019. Bugfix release</span>

### Fixes

- Add more helpful error messages for common misconfigurations
- Fix the script error which was thrown from a double click on any label in a [readonly form](guides/readonly.md#read-only-mode-for-the-entire-lightbox)
- Fix incorrect displaying of the [Timeline view](views/timeline.md) when `smart_rendering:true` is used together with `section_autoheight:false`
- Fix the script error which was thrown from the [Year view](views/year.md) when days containing events were hidden using the [scheduler.ignore_year](guides/custom-scales.md) method

## 5.2.1

<span class='release_date'>June 11, 2019. Bugfix release</span>

### Fixes

- Fix the issue with [load](api/method/load.md) data type detection in IE11
- Fix [timeline.scrollTo](views/timeline.md#timeline-object-api) method in timeline without [horizontal scrollbar](views/timeline.md#horizontal-scroll)
- Fix not working [](api/method/showevent.md) method in the [Timeline view](views/timeline.md)
- Fix incorrect behavior of vertical scroll in [scrollable timeline](views/timeline.md#horizontal-scroll) with `smart_rendering:false`
- Fix incorrect event position in the [multiday units view](views/units.md#displaying-units-for-multiple-days) with the [multisection](views/units.md#assigning-events-to-several-units) extension when the [step](views/units.md#scrolling-units) option is specified
- Fix incorrect size of some events in [Daily Timeline](views/timeline.md#days-mode-details)


## 5.2

<span class='release_date'>June 6, 2019. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-2-custom-content-timeline-view-enhanced-drag-n-drop/)

### Breaking Changes

This update changes behavior of multiple API methods. While they shouldn't cause any breaks in the existing code, be sure to check [Migration notes](migration.md#51---52) to be on the safe side.

### New functionality

1. [Custom HTML content for timeline cells](views/timeline.md#custom-content-in-cells) (PRO version)
2. [Drag-n-drop of events by the body](api/config/drag_event_body.md)

### Updates

- The data format parameter of [load](api/method/load.md) and [parse](api/method/parse.md) became optional, scheduler now detects format automatically
- [Date-to-string functions](guides/date-formats.md) can now auto-detect the date strings format, if it doesn't match the provided one
- [dhtmlxConnector library](https://github.com/DHTMLX/connector-php) is no longer shipped with the dhtmlxScheduler package
- dhtmlxScheduler package samples no longer require a php/apache server to work
- New methods for the [timeline object](views/timeline.md#timeline-object-api)
- The [](guides/multiselect.md) control allows loading options in the JSON format
- [](api/event/onloadstart.md), [](api/event/onbeforeparse.md), [](api/event/onparse.md), [](api/event/onloadend.md) are introduced instead
of the deprecated - **onXLS** and **onXLE** events

### Fixes

- Fix incorrect behavior which happened when [](api/method/clearall.md) was called before `scheduler.endLightbox(false)` while creating a new event
- Fix flickering issue with [timeline horizontal scroll](views/timeline.md#horizontal-scroll) on iPad
- Fix various display issues with [scrollable timeline](views/timeline.md#horizontal-scroll)
- The Units view [](api/template/unitsname_scale_text.md) now provides a section date in arguments
- Fix script error which was thrown from the [Units view](views/units.md) during an event creation if no sections are loaded
- The [](guides/multiselect.md) control now expects only boolean values for `vertical` property `vertical:false` - string values as in `vertical:"false"` will be interpreted as boolean `true`


## 5.1.6

<span class='release_date'>January 11, 2019. Bugfix release</span>

### Fixes

- Fix incorrect position of events scheduled on Sat-Sun with `start_on_monday = false` in the Month view
- Fix script error in a scrollable timeline with the current time marker
- Fix incorrect argument value of the `onYScaleClick` handler in a scrollable timeline after horizontal scrolling
- Fix the bug that caused a scrollable timeline to be rendered empty until the next refresh after reloading sections
- Fix the bug with a scrollable timeline which caused some cells of Tree timeline folders not being rendered after horizontal scrolling
- Fix unexpected behavior of event resize with the `all_timed` extension, only the last event chunk should be resizeable
- Fix event disappearing during resize in the `all_timed="short"` mode

## 5.1.1

<span class='release_date'>December 14, 2018. Bugfix release</span>

### Fixes

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

## 5.1

<span class='release_date'>November 29, 2018. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-1-horizontal-scroll-and-new-server-side-integrations/)

### Breaking Changes

HTML structure of the Timeline view has changed significantly, some code changes may be required in order to migrate. Read more in the [Migration](migration.md#50---51) article.

### Major Changes

1. [Horizontal scroll in the Timeline view](views/timeline.md#horizontal-scroll) (PRO version)
2. Smart rendering and performance update for the Timeline view (PRO version)
3. Integration with different server-side platforms. [Check the related tutorials](integrations/howtostart-guides.md)


### Minor Changes

- [New API of the Timeline object](views/timeline.md#timeline-object-api)
- [Autoscroll in the Timeline view](views/timeline.md#autoscroll-configuration)
- Ability to [add a label into the header of the column with sections](views/timeline.md#header-of-the-sections-column)


## <b>5.0</b>

<span class='release_date'>May 17, 2018. Major update</span>

[Review of release on the blog](https://dhtmlx.com/blog/dhtmlxscheduler-5-0-material-design/)

### Breaking Changes

1. Classic and Glossy skins are removed. [Check the migration details](migration.md#44---50)
2. Scheduler went through the global CSS refactoring. [Learn how it will influence your applications](migration.md#44---50)

### Major Changes

1. New [Material skin](guides/skins.md#material-skin) added
2. [Server-side integration with REST API](guides/server-integration.md)
3. Flexible [skins customization](guides/custom-skins.md)

### Minor Changes

- Touch support for Microsoft devices is updated
- [Hebrew locale](guides/localization.md) is added for recurring events form
- [onLoadError](api/event/onloaderror.md) is added for network and server errors

### Bug Fixes and Improvements

- Compatibility issues with ES6/TS imports are fixed
- Fixes in keyboard navigation support
- Minor bugfixes

## 4.4.9

<span class='release_date'>June 6, 2017. Bugfix release</span>

### Fixes

- WAI-ARIA support - fix regression when WAI-ARIA attributes are disabled
- WAI-ARIA support - various improvements for JAWS support
- Keyboard navigation - various bugfixes and improvements
- Samples - fix invalid server config snippets
- Cookie extension - fix the conflict between cookie and ajax loading timeouts
- Year view - fix the bug with creation of events in the Year view
- Drag and drop - fix incorrect mouse position on a zoomed page
- All-timed extension - fix drag and drop on touch devices
- Dynamic loading - fix incorrect time range caused by the *server_utc* config
- Minor fixes in locales


## 4.4

<span class='release_date'>February 2, 2017. Minor update</span>

[Review of release on the blog](https://dhtmlx.com/blog/scheduler-4-4-released-accessibility-support-minor-improvements/)

### Major Changes

1. [Keyboard navigation](guides/keyboard-navigation.md)
2. [WAI-ARIA support](guides/accessibility.md#wai-aria-attributes)
3. [High-contrast themes](guides/accessibility.md#high-contrast-themes)
4. Initial support for Content Security Policy

### Minor Changes

- [ability to enable markTimespan for the Month view](api/method/marktimespan.md)
- [ability to remove recurring marker from a specific date added](guides/limits.md)
- [ability to skip days in the Year view added](guides/custom-scales.md)
- [*delimiter* option of the Multiselect control](guides/multiselect.md#properties)
- [compatibility of external drag-n-drop with the latest dhtmlxSuite updated](integrations/legacy/dhtmlx-dnd.md)
- [merge CSP-improvements request from public repo](https://github.com/DHTMLX/scheduler/pull/11/)
- minor performance improvements for [Timeline](views/timeline.md)
- normalize z-index values, add styles for latest [dhtmlxCombo](guides/combo.md)

### Bug Fixes and Improvements

- addEventNow must return id of new event
- bug with drag-n-drop and ignored column in the Week view
- check for undefined touch https://github.com/DHTMLX/scheduler/pull/21
- click and keyboard focus issue on iPad
- dataprocessor state must be cleared after scheduler.clearAll
- JS errors in event handlers from SVG elements fixed
- various bugs with Tooltip extension fixed
- various issues with container_autosize extension fixed
- many other fixes


## 4.3.35

<span class='release_date'>May 26, 2016. Bugfix release</span>

### Fixes

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

## 4.3.25

<span class='release_date'>March 3, 2016. Bugfix release</span>

### Fixes

- Touch support - trigger tap and double tap on multiday area of Day/Weeks/Units views
- Touch support - fix regression with event disappearing on start of touch-drag
- Timeline - fix onYScaleClick call when ignored columns are defined
- Timeline - fix incorrect state of event object after canceling drag and drop
- Tree Timeline - the *timeline_scale_class* template should be applied to folder items
- dataProcessor - clearing scheduler during the dataProcessor request is in progress should not cause a JS error
- dataProcessor - fix incorrect state while adding and modifying recurring series when autoUpdate is disabled
- Day/Week views - fix event visibility when the first/last hours of calendar are enabled
- Multiday Units View - fix default section on creating an event with a double click
- General - occasional Chrome bug when the click and double click events stopped firing
- General - fixes for daylight savings time bugs in Safari
- and other small fixes

## 4.3

<span class='release_date'>February 4, 2015. Minor update</span>

1. ["Days" mode for Timeline view](views/timeline.md#days-mode-details) was added (PRO version)
2. Ability to present [units for multiple days in the Units view](views/units.md#displaying-units-for-multiple-days) (PRO version)
3. New events for the ['expand' extension](guides/extensions-list.md#expand)
4. New option - [](api/config/now_date.md) for the [Limit extension](guides/extensions-list.md#limit)
5. New option - [](api/config/touch_tooltip.md) for the [Tooltip extension](guides/extensions-list.md#tooltip)
6. Ability to link events using the [URL extension](guides/extensions-list.md#url)
7. Fixes for DST issues
8. Fix for an issue with creating new events on touch devices in the Timeline view
9. [Week Agenda](views/weekagenda.md), [Grid View](views/grid.md), [Timeline view](views/timeline.md), [Units View](views/units.md),
[Multisection events](api/config/multisection.md) (PRO version)

## 4.2

<span class='release_date'>November 12, 2014. Minor update</span>

1. Ability to customize the layout of recurring form ([details](guides/recurring-events.md#custom-control-for-the-lightboxs-recurring-block))
2. Updated DataProcessor - REST mode and support of JSON response format ( [details](guides/server-integration.md#rest-json-mode))
3. Updated D'n'D of the [multisection events](api/config/multisection_shift_all.md) (PRO version)
4. API events for handling Ajax and server errors ([details](api/event/onloaderror.md))
5. Improved performance of the Timeline view
6. Ability to delay rendering mode ([details](api/config/delay_render.md))
7. Improved data export to iCal and Excel - ([details](export/excel.md))
8. Fixed compatibility with DHTMLX Suite 4.0
9. Multiple minor fixes

## 4.1

<span class='release_date'>June 13, 2014. Minor update</span>

1. New "Flat" skin - ([details](guides/skins.md#flat-skin))
2. Assigning events to several sections of [Timeline](views/timeline.md#assignment-of-events-to-several-sections) and [Units](views/units.md#assigning-events-to-several-units) Views
(PRO version)
3. Ability to resize multi-day events in the Month view by drag-and-drop ([details](views/month.md#resizing-events-by-drag-n-drop-ver-41))
4. Drag-n-drop operations between schedulers ([details](guides/drag-between.md))
5. Ability to export data in the PNG format ([details](export/png.md)).
6. New approach for exporting data in the PDF format ([details](export/pdf.md))
7. Ability to highlight event's duration on the time scale while dragging the event over the scheduler ([details](api/config/drag_highlight.md))
8. Ability to [change the scrolled time interval in the Grid view](views/grid.md#activating-navigation)(PRO version)
9. Ability to deny dragging events out of the visible area of the Timeline view ([details](api/config/limit_drag_out.md))
9. Bug fixes for Windows touch devices.
10. Samples updated to work correctly in different time zones.


## <b>4.0</b>

<span class='release_date'>July 2, 2013. Major update</span>

1. Flexible time scales - some days, hours can be removed from time scale ([details](guides/custom-scales.md))
2. Ability to show "more events" links in the Month view ([details](views/month.md#limiting-the-number-of-events-in-a-cell))
3. jQuery integration ([details](integrations/other/jquery-integration.md))
4. Backbone Integration ([details](integrations/legacy/backbone-integration.md))
5. Default skin changed to "terrace", multi-day events are visible by default
6. Alternative start-date logic for recurring events ([details](api/config/repeat_precise.md))
7. Scheduler can load json data from .Net web services
8. Documentation greatly improved

## 3.7

<span class='release_date'>February 20, 2013. Minor update</span>

1. Touch support (tablets and touch monitors) ([details](guides/touch-support.md))
2. Romanian locale added


## 3.6

<span class='release_date'>December 3, 2012. Minor update</span>

1. Windows8 edition added
2. Extended date format configuration for lightbox form
3. Sub-day navigation in timeline view
4. Ability to define custom sorting in timeline view
5. Multi-page export to PDF ([details](export/pdf-multi.md))


## 3.5

<span class='release_date'>August 24, 2012. Minor update</span>

1. Ability to show [multiple schedulers](guides/multiple-per-page.md) on the page
2. Support for loading JSON directly from Connectors ([details](guides/server-integration.md#json-mode))
3. Custom events rendering ([details](guides/custom-events-display.md))
4. Timeline view improved (support for drag, resize, event height control)
5. New 'dhx_terrace' skin ([details](guides/skins.md#contrast-white-skin))
6. New options for blocking dates ([details](guides/limits.md#how-to-block-certain-dates))
7. Marking time intervals ([details](guides/limits.md#how-to-mark-certain-dates))
8. Highlighting time intervals ([details](api/method/marktimespan.md))
9. New API methods: [](api/method/updateview.md), [](api/method/showevent.md), [](api/method/getrenderedevent.md), [](api/method/getactiondata.md)
10. JSMessage included
11. [Grid view](views/grid.md) (PRO version)
12. New configuration options
13. Simplified access to lightbox section objects ([details](api/method/formsection.md))
14. Support for ['CTRL+C', 'CTRL+X', 'CTRL+V' keyboard commands](guides/keyboard-navigation.md)


## <b>3.0</b>

<span class='release_date'>July 27, 2011. Major update</span>

1. [WeekAgenda view](views/weekagenda.md) (PRO version)
2. Netbook friendly lightbox form ([details](guides/lightbox-editors-manipulations.md#types-of-lightbox))
3. Cascade event display ([details](api/config/cascade_event_display.md))
4. Simple way to define a color for event ([details](guides/custom-events-color.md))
5. Drag and drop of the details form
6. Custom buttons for the details form ([details](guides/changing-lightbox-buttons.md))
7. Current time marker in day and week view
8. Multiline header for timeline view
9. Configurable work-time bounds ([details](guides/custom-scales.md#technique))
10. API to access lightbox values ([details](guides/lightbox-editors-manipulations.md))


## 2.3

<span class='release_date'>August 30, 2010. Minor update</span>

### Major Changes

1. Map view was added ([details](views/map.md))
2. Cell mode for Timeline view was added ([details](views/timeline.md#view-modes)) (PRO version)
3. Tree mode for Timeline view was added ([details](views/timeline.md#view-modes)) (PRO version)
4. Tooltips for all views were added ([details](guides/tooltips.md))
5. Ability to create new events by double click or by drag-and-drop in Timeline mode
6. Ability to move events by drop-and-drag in Timeline mode
7. Ability to create new events by external drag and drop ([details](integrations/legacy/dhtmlx-dnd.md))

### Minor Changes

+ Week-number format option was added ([details](guides/settings-format.md))
+ full_day configuration option added ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
+ event_duration and auto_end_date configuration options added ([details](guides/lightbox-editors-manipulations.md#automatic-end-date-in-the-time-control))
+ Multiselect section for details form ([details](guides/lightbox-editors.md#sections-controls))
+ Checkbox, combo, radio - sections for details form ([details](guides/lightbox-editors.md#sections-controls))
+ Preventing events collisions for recurring events
+ extra parameters were added to timeline-related handlers
+ api of mini-calendar extension extended ([details](guides/minicalendar.md))
+ custom form implementation simplified ([details](guides/custom-details-form.md))

### Bug Fixes and Improvements

+ incorrect processing of specific iCal data sources
+ incorrect event rendering for overlapping events


## 2.2

<span class='release_date'>April 14, 2010. Minor update</span>

### Major Changes

1. Export to XML, iCal, JSON added ([details](export/serialization.md))
2. Export to PDF ([details](export/pdf.md))
3. Loading from JSON data was added ([details](guides/data-formats.md))
4. 'Collision detection' extension was added ([details](guides/collisions.md))
5. 'Date-scale limitation' extension was added ([details](guides/limits.md))
6. Mini-calendar extension was added ([details](guides/minicalendar.md))
7. [Timeline view](views/timeline.md) was added
8. Auto-fetching option lists from the server ([details](guides/select.md#populating-the-control-with-data))

### Minor Changes

- hotkeys and some element's sizes are configurable now
- step-like scrolling in the Units view ([details](views/units.md#scrolling-units)) (PRO version)
- Arabic, Hungarian, Indonesian, Polish, Slovenian locales were added ([details](guides/localization.md#included-locales))
- 18 new samples were added

### Bug Fixes and Improvements

- many time-shifting related bugs
- problems with recurring events in the Agenda view
- problems with recurring events in the Year view


## 2.1

<span class='release_date'>December 2, 2009. Minor update</span>

### Major Changes

1. Agenda view was added ([details](views/agenda.md))
2. Year view was added ([details](views/year.md))
3. Bunch of small extensions was added
4. Skin Builder for the scheduler was added
5. Count of samples was doubled

### Full List of Updates

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


## <b>2.0</b>

<span class='release_date'>July 20, 2009. Major update</span>

### Major Changes

1. Added support of [Recurring events](guides/recurring-events.md)
2. Added ability to create [Units view](views/units.md) (PRO version)
3. Multi-day events can be seen in Day and Week mode ( scheduler.config.multi_day = true; )
4. Month view can auto-size to prevent data overflow
5. Added ability to create custom views


## <b>1.0</b>

<span class='release_date'>May 20, 2009. Initial release</span>

- Day/Week/Month views
- Drag-and-drop support
- Support of Ajax-enabled web API
