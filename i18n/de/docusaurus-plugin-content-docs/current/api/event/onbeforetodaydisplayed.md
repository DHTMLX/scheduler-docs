---
sidebar_label: "onBeforeTodayDisplayed"
title: "onBeforeTodayDisplayed event"
description: "Wird ausgelöst, wenn der 'Today'-Button im Scheduler angeklickt wird"
---

# onBeforeTodayDisplayed

### Description

@short: Wird ausgelöst, wenn der 'Today'-Button im Scheduler angeklickt wird

@signature: onBeforeTodayDisplayed: () =\> boolean

### Returns
- ` result` - (boolean) - Gibt an, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder verhindert wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTodayDisplayed", function (){
    //Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~
