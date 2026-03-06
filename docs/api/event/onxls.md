---
sidebar_label: onXLS
title: "onXLS event"
description: "fires immediately before loading data from the data source has been started"
---

# onXLS
:::warning 
The event is deprecated
:::
### Description

@short: Fires immediately before loading data from the data source has been started

@signature: onXLS: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onXLS", function (){
    //any custom logic here
});
~~~

### Related API
- [onXLE](api/event/onxle.md)
- [load](api/method/load.md)

### Related Guides
- [Loading Data](guides/loading-data.md)

### Change log
- deprecated since v5.2
