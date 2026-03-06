---
sidebar_label: onBeforeTodayDisplayed
title: "onBeforeTodayDisplayed event"
description: "fires when the user clicks on the 'Today' button in the scheduler"
---

# onBeforeTodayDisplayed

### Description

@short: Fires when the user clicks on the 'Today' button in the scheduler

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    //any custom logic here
    return true;
});
~~~
