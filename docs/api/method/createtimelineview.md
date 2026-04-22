---
sidebar_label: createTimelineView
title: "createTimelineView method"
description: "creates the Timeline view in the scheduler"
---

# createTimelineView
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Creates the Timeline view in the scheduler.

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - the configuration object of the Timeline view

### Example

~~~jsx
// the time scale from 8 AM to 8 PM with a 30-minute step
scheduler.createTimelineView({
    name: "timeline",
    x_unit: "minute",
    x_date: "%H:%i",
    x_step: 30,
    x_size: 24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit: [
        { key: 1, label: "Section A" },
        { key: 2, label: "Section B" },
        { key: 3, label: "Section C" },
        { key: 4, label: "Section D" }
    ],
    y_property: "section_id",
    render: "bar"
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 The method requires the [timeline](guides/extensions-list.md#timeline) plugin to be activated. 
:::

The configuration object of the Timeline view can have the following properties:

- `name` - (*string*) the view's id. If you specify the name of some already existing Timeline view, it will be overwritten
- `render` - (*'cell', 'bar', 'tree', 'days'*) the view's mode. By default, 'cell'
- `y_property` - (*string*) the name of a data property that will be used to assign events to certain sections
- `y_unit` - (*array of objects*) defines sections of the view. Each object in the array specifies a single section and takes these properties:
    - `children` - (*array*) an array of nested items' objects (for 'Tree' mode only)
    - `key` - (*string*) the section's id. This attribute is compared with the event's data property to assign the event to a section
    - `label` - (*string*) the section's label
    - `open` - (*boolean*) specifies whether the section will be opened initially (for 'Tree' mode only)
- `days` - (*number*) a number of items (days) in the Y-Axis. Applicable to the 'Days' mode only
- `x_unit` - (*minute, hour, day, week, month, year*) the measuring unit of the X-Axis. By default, 'minute'
- `x_date` - (*string*) the date format of the [X-Axis](guides/settings-format.md). If not specified, the [`hour_date`](api/config/hour_date.md) format is used
- `x_step` - (*number*) the X-Axis step in `x_unit`s. By default, 1
- `x_start` - (*number*) the X-Axis offset in `x_unit`s. By default, 0
- `x_size` - (*number*) the X-Axis length specified as the total number of `x_step`s. By default, 24
- `x_length` - (*number*) the number of `x_step`s that will be scrolled at a time, when the user clicks on the 'next' button in the scheduler's header. Optional. By default, 1.
It's a bit knotty parameter, and to not make a mistake, remember the following:
    - You can use the parameter only if `x_unit='minute'` or `x_unit='hour'`. In other cases, the parameter doesn't need specifying at all.
    - If `x_unit='minute'` or `x_unit='hour'` and you don't specify `x_length`, the X-Axis will display the time interval (not the whole day, as usual)
  specified by the remaining scale parameters (`x_start`, `x_step`, `x_size`). This allows you to divide a day into equal time intervals and scroll them with the 'next' button.
    - If `x_unit='minute'` or `x_unit='hour'` and you decide to set the parameter, set it to all day (i.e. `x_length` should be equal to the number of `x_steps` needed to fill the whole day)
  to provide correct work of the 'next' button.
- `first_hour` - (*number*) sets the start hour of the cell's time interval. The attribute is applicable only if `x_unit="day"`
- `last_hour` - (*number*) sets the end hour of the cell's time interval. The attribute is applicable only if `x_unit="day"`
- `show_unassigned` - (*boolean*) if *false*, events which belong to none of the sections won't be displayed. If *true* - such events will be placed to the first section. By default - *false*. Optional
- `section_autoheight` - (*boolean*) enables automatic height adjustment for cells. By default, *true*
- `dy` - (*number*) the minimum height of cells (if the `section_autoheight` property has value *false*, the height of cells will be equal to `dy`, otherwise the height of cells will be increased
to fill all free space). By default, 50
- `dx` - (*number*) the width of the column with the sections' names. By default, 200
- `event_dy` - (*number/string*) the height of events. Can have the `full` value and occupy the entire cell. By default, equal to `scheduler.xy.bar_height-5`
- `event_min_dy` - (*number*) the minimum event height. By default, equal to `scheduler.xy.bar_height-5`
- `resize_events` - (*boolean*) specifies whether the height of individual events should be decreased, to make the total height equal to the height of one single event (but not less than the value
of the `event_min_dy` property). By default, *true*
- `fit_events` - (*boolean*) specifies whether the section's height should be increased, to fit all events in this section, or should be fixed (the `dy` parameter). Available from
version 3.0. By default, *true*
- `fit_events_offset` - (*number*) adds extra space (in pixels) under the last event. It is applied when `fit_events` is set to *true*
- `round_position` - (*boolean*) 'stretches' the events all over the entire cell width, no matter how long the event lasts. By default, *false*. For 'Bar' and 'Tree' modes only
- `folder_events_available` - (*boolean*) should be set as *true*, if you want to have the possibility to specify events not only for an individual holder, but also for the whole folder (any
level). Applicable to the 'Tree' mode only. By default, *false*
- `folder_dy` - (*number*) the height of folders in pixels (folders are sections that have child sections). Applicable to the 'Tree' mode only
- `second_scale` - (*object*) adds the second X-Axis on the top of the default one and serves to group time intervals on the original scale. Optional. Available from version 3.0. The scale
object has the following properties:
    - `x_unit` - (*minute, hour, day, week, month, year*) the measuring unit of the axis. By default, 'minute'
    - `x_date` - (*string*) the date format of the [axis](guides/settings-format.md). If not specified, the [`hour_date`](api/config/hour_date.md) format is used
- `scrollable` - (*boolean*) enables horizontal scroll in the Timeline view, false by default. If *false* or undefined, date columns will shrink to fit the time scale into the viewport width.
If *true*, date columns will not shrink less than the `column_width` value, a horizontal scroll bar will appear when necessary.
- `column_width` - (*number*) defines the minimal width of timeline date columns, 100 by default
- `scroll_position` - (*Date*) renders timeline scrolled to a specific position, takes the same arguments as `timeline.scrollTo()`, i.e. the date you want timeline to be scrolled to after rendering
- `autoscroll` - (*object*) allows configuring sensibility and speed of autoscroll. The autoscroll object has the properties below:
    - `range_x` - (*number*) horizontal autoscroll distance from the edge of the data area
    - `range_y` - (*number*) vertical autoscroll distance from the edge of the data area
    - `speed_x` - (*number*) horizontal autoscroll speed
    - `speed_y` - (*number*) vertical autoscroll speed
- `cell_template` - (*boolean*) enables rendering a template specified for a timeline
- `smart_rendering` - (*boolean*) enables smart rendering functionality in a timeline (allows rendering only the rows, columns, and events visible on the screen, while other elements are being rendered 
during scrolling of the timeline). Note that in a [scrollable timeline](views/timeline.md#horizontal-scroll) this setting is enabled by default.
- `columns` - (*array*) a list of columns for the left-hand panel. If not specified, the [`timeline_scale_label`](api/template/timelinename_scale_label.md) template will be used for the content of the panel.

## Dynamic change of properties

All defined timeline objects are stored in the `scheduler.matrix` object.
You can access the configuration of any timeline view by its name and change any property. Changes will be applied as soon as you update the scheduler with `setCurrentView()`:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // redraws scheduler
~~~

where "timeline" is the name of the timeline view as specified in the [`createTimelineView()`](api/method/createtimelineview.md) method:

~~~js
scheduler.createTimelineView({
    name: "timeline",
    ...
});
~~~
