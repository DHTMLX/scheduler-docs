---
sidebar_label: onXLE
title: "onXLE event"
description: "fires after loading data from the data source is complete"
---

# onXLE
:::warning 
The event is deprecated
:::
### Description

@short: Fires after loading data from the data source is complete

@signature: onXLE: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLE", function (){
    //any custom logic here
});
~~~

### Related API
- [onXLS](api/event/onxls.md)
- [load](api/method/load.md)

### Related Guides
- [Loading Data](guides/loading-data.md)

### Change log
- deprecated since v5.2
