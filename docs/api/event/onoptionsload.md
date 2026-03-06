---
sidebar_label: onOptionsLoad
title: "onOptionsLoad event"
description: "fires after sections of the Timeline/Units view have been updated"
---

# onOptionsLoad

### Description

@short: Fires after sections of the Timeline/Units view have been updated

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //any custom logic here
});
~~~

### Details

When this event is fired, the following happens:

- Timeline/Unit view recalculates visible sections based on the current value of the [y_unit](views/timeline.md#initialization) or [list](views/units.md#initialization) property respectively;
- [scheduler.resetLightbox](api/method/resetlightbox.md) is called;
- [scheduler.setCurrentView](api/method/setcurrentview.md) is called.

The event is fired in several cases:

- On initialization of the Timeline/Units view, when sections are parsed for the first time;
- When sections are loaded with the [data](guides/data-formats.md);
- Whenever [scheduler.updateCollection](api/method/updatecollection.md) is called.
