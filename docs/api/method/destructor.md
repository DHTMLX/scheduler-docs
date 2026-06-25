---
sidebar_label: destructor
title: "destructor method"
description: "destroys a scheduler instance"
---

# destructor

### Description

@short: Destroys a scheduler instance

@signature: destructor: () =\> void

### Example

~~~jsx
const myScheduler = Scheduler.getSchedulerInstance();
 
//destroying a scheduler instance
myScheduler.destructor();
~~~

### Details

The method destroys a scheduler instance and calls the [onDestroy](api/event/ondestroy.md) event.

Calling the destructor will:

- clear the data loaded into a scheduler instance
- destroy the [DataProcessor](api/method/dataprocessor.md) (if it is attached to the scheduler)
- detach the scheduler from DOM
- detach all DOM events attached via the [title:  method](api/method/event.md) method

:::note

If you use a package that does not allow creating multiple instances of a scheduler (GPL or Individual editions), calling the scheduler destructor will make scheduler inaccessible until a page is reloaded.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [Creating Multiple Schedulers on a Page](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)

### Change log
- added in version 6.0
