---
title: "Loading Data"
sidebar_label: "Loading Data"
---

# Loading Data

dhtmlxScheduler can load data in several formats. Most applications use **JSON**. **iCalendar (.ics)** and **XML** are also supported for compatibility or import scenarios.

### Related Guides

- [Data formats overview](guides/data-formats.md)


## Loading data from an inline dataset

To load data from an inline dataset, use the [`parse()`](api/method/parse.md) method:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.parse([
    { id: "1", text: "Meeting", start_date: "2027-05-11 14:00", end_date: "2027-05-11 17:00" },
    { id: "2", text: "Conference", start_date: "2027-05-15 12:00", end_date: "2027-05-18 19:00" },
    { id: "3", text: "Interview", start_date: "2027-05-24 09:00", end_date: "2027-05-24 10:00" }
]);
~~~

### Related samples

- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Related API

- [`parse()`](api/method/parse.md)

### Related Guides

- [Data formats](guides/data-formats.md)

## Loading data from a data file

To load data from a file, use the [`load()`](api/method/load.md) method:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.load("data.json"); // loading data from a file
~~~


### Related samples

- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### Related API

- [`load()`](api/method/load.md)

### Related Guides

- [Data formats](guides/data-formats.md)

## Loading data from a backend

Load data from your backend by exposing a REST endpoint that returns Scheduler events in JSON format.

- The server-side implementation depends on your stack. For example, in Node.js you can add a route that returns event data:

~~~js
app.get("/data", async (request, response) => {
    const events = await db.event.find().toArray();
    response.json(events);
});
~~~

- On the client side, call [`load()`](api/method/load.md) with the data URL:

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
scheduler.load("/data");
~~~

:::note
For saving changes back to the server, use [`createDataProcessor()`](api/method/createdataprocessor.md). See [Server-Side Integration](guides/server-integration.md).
:::

### Related API

- [`createDataProcessor()`](api/method/createdataprocessor.md)

### Related Guides

- [Server-Side Integration](guides/server-integration.md)

## Loading data from multiple sources

To load data from multiple sources, request the endpoints you need and combine the results before calling [`parse()`](api/method/parse.md):

~~~js
Promise.all([
    fetch("/api/events").then((response) => response.json()),
    fetch("/api/holidays").then((response) => response.json())
]).then(([events, holidays]) => {
    scheduler.parse([...events, ...holidays]);
});
~~~

### Related API

- [`parse()`](api/method/parse.md)

### Related Guides

- [Data formats](guides/data-formats.md)

## Data Properties

### Mandatory properties

To be correctly parsed, each event must include the following properties:

- **id** - (*string|number*) a unique event id
- **start_date** - (*date|string*) the start date of the event
- **end_date** - (*date|string*) the end date of the event
- **text** - (*string*) the event title/description

The default date format for JSON and XML data is **'%Y-%m-%d %H:%i'** (see the [date format specification](guides/settings-format.md))

To change it, use the [`date_format`](api/config/date_format.md) configuration option.

~~~js
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init("scheduler_here", new Date(2027, 4, 18), "week");
~~~

### Custom properties

You are not limited to the mandatory properties listed above and can add any custom ones to data items.
Extra data properties will be parsed as strings and loaded to the client side where you can use them according to your needs.

See examples of data with custom properties [here](guides/data-formats.md)

### Related API

- [`date_format`](api/config/date_format.md)

### Related Guides

- [Event object](guides/event-object-operations.md)

## Database Structure

When you set up a database, the expected structure for scheduler events is the following:

- **events table** - specifies scheduler events
- **id** - (*string/int/guid*) the event id. Primary key, auto increment.
- **start_date** - (*DateTime*) the start date of the event, not nullable.
- **end_date** - (*DateTime*) the end date of the event, not nullable.
- **text** - (*string*) the description of a task.

If you have recurring events, add the following fields:

- **rrule** - (*string*) recurrence rule in RFC-5545 format
- **duration** - (*number*) duration of each occurrence in seconds
- **recurring_event_id** - (*string/int/guid*) parent series id for modified/deleted occurrences
- **original_start** - (*DateTime*) original start date of the edited/deleted occurrence
- **deleted** - (*boolean*) marks deleted occurrences

You can define any additional columns, they can be loaded to the client and made available for the client-side API.

### Related Guides

- [Recurring Events](guides/recurring-events.md)

## Dynamic loading

By default, dhtmlxScheduler loads all data at once. It may become problematic when you are using big event collections.
In such situations you may use the dynamic loading mode and load data by parts, necessary to fill the current viewable area of the scheduler.

### Technique

To enable the dynamic loading, call the [`setLoadMode()`](api/method/setloadmode.md) method:

~~~js
scheduler.setLoadMode("month");
scheduler.load("/api/events");
~~~

As a parameter, the method takes the loading mode that defines the size of the data to load: *day, week, month or year.*

For example, if you set the 'week' mode, the scheduler will request data just for the current week and load remaining ones on demand.

#### How loading modes work

The predefined loading modes specify the interval of loading data within the set period. For example, you open the Week View in the scheduler for the following dates: from 2027-02-02 to 2027-02-09.
Depending on the chosen mode, the dynamic loading will go like this:

- for the "day" mode

~~~js
scheduler.setLoadMode("day");
~~~

Scheduler will request data by days, i.e.: from 2027-02-02 to 2027-02-09.

- for the "month" mode

~~~js
scheduler.setLoadMode("month");
~~~

Scheduler will request data by whole months, i.e.: from 2027-02-01 to 2027-03-01.

- for the "year" mode

~~~js
scheduler.setLoadMode("year");
~~~

Scheduler will request data by whole years, i.e.: from 2027-01-01 to 2028-01-01.

In any case, the requested interval won't be smaller than the rendered one.

The loading interval defines:

- the frequency of dynamic loading calls

The greater the loading interval is, the less the frequency of calls for dynamic loading will be. Scheduler keeps in memory the already loaded data portion and won't repeat a call for it.

- the duration of processing a separate request

The greater the loading interval is, the longer a request is being processed, since the more data are being loaded at once.

#### Request

Generated requests look as in:

~~~js
/api/events?from=DATEHERE&to=DATEHERE
~~~

*where DATEHERE - a valid date value in the format defined by the [`load_date`](api/config/load_date.md) option.*

### Related API

- [`setLoadMode()`](api/method/setloadmode.md)
- [`load_date`](api/config/load_date.md)

### Loading spinner

When you deal with a large data size, it's useful to display the loading spinner. It will show users that the app is actually doing something.

To enable the loading spinner for the scheduler, set the [`show_loading`](api/config/show_loading.md) property to *true*.

~~~js
scheduler.config.show_loading = true;
...
scheduler.init("scheduler_here", new Date(2027, 4, 10), "month");
~~~

:::note
To change the spinner image - replace 'imgs/loading.gif' with your custom image.
:::

## Loading data with Timeline and Units sections from the server {#collections}

While loading data into [Timeline](views/timeline.md) and [Units](views/units.md) views, you need to set an array of sections that will be loaded into views.

In order to load data containing Timeline and Units sections from the backend, you need to implement a more extended configuration:

- during Timeline view initialization, instead of sections array you should use the [`serverList()`](api/method/serverlist.md) method and pass the name of a collection as an argument:

~~~js
scheduler.createTimelineView({
    ....
    y_unit: scheduler.serverList("sections"),
    ...
});
~~~

- to load data into scheduler, use the [`load()`](api/method/load.md) method:

~~~js
scheduler.load("data.json");
~~~

If you fetch data manually (for example, to add headers), you can pass the same payload to [`parse()`](api/method/parse.md):

~~~js
fetch("/api/timeline")
    .then((response) => response.json())
    .then((payload) => scheduler.parse(payload, "json"));
~~~

- while implementing scheduler data response on the backend, use the following format:

~~~js title="data.json"
{
    "data":[
        {
            "id":"1",
            "start_date":"2027-03-02 00:00:00",
            "end_date":"2027-03-04 00:00:00",
            "text":"dblclick me!",
            "type":"1"
        },
        {
            "id":"2",
            "start_date":"2027-03-09 00:00:00",
            "end_date":"2027-03-11 00:00:00",
            "text":"and me!",
            "type":"2"
        },
        {
            "id":"3",
            "start_date":"2027-03-16 00:00:00",
            "end_date":"2027-03-18 00:00:00",
            "text":"and me too!",
            "type":"3"
        },
        {
            "id":"4",
            "start_date":"2027-03-02 08:00:00",
            "end_date":"2027-03-02 14:10:00",
            "text":"Type 2 event",
            "type":"2"
        }
    ],
    "collections": {
        "sections":[
            {"value":"1","label":"Simple"},
            {"value":"2","label":"Complex"},
            {"value":"3","label":"Unknown"}
        ]
    }
}
~~~

In the above example the "data" array contains calendar events, and the "collections" hash contains collections that can be referenced via the [`serverList()`](api/method/serverlist.md) method.

### Related API

- [`serverList()`](api/method/serverlist.md)

### Related Guides

- [Timeline view](views/timeline.md)
- [Units view](views/units.md)
