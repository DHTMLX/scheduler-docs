---
sidebar_label: "all_timed"
title: "all_timed config"
description: "'sagt', dass mehrtägige Events im üblichen Format angezeigt werden (ähnlich wie eintägige Events dargestellt werden)"
---

# all_timed

### Description

@short: 'sagt', dass mehrtägige Events im üblichen Format angezeigt werden (ähnlich wie eintägige Events dargestellt werden)

@signature: all_timed: boolean | string


**Default value:** 'short'

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

:::note
 Die Eigenschaft erfordert, dass das [all_timed](guides/extensions-list.md#all-timed) Plugin aktiviert ist. 
:::

Als String akzeptiert der Parameter nur einen Wert - *'short'*.

<br>

Es gibt drei mögliche Werte für diesen Parameter:

- **'short'**  - zeigt nur mehrtägige Events an, die weniger als 24 Stunden dauern (beginnen an einem Tag und enden an einem anderen) im üblichen Format
- **true** - zeigt alle mehrtägigen Events im üblichen Format an
- **false** - zeigt alle mehrtägigen Events als Linien oben im Scheduler an (Standardanzeigemodus für mehrtägige Events)

Um mehr Kontrolle darüber zu haben, welche Events im mehrtägigen Bereich erscheinen und welche in den Tages-Spalten angezeigt werden, 
können Sie die Methode `isMainAreaEvent` des Moduls wie folgt überschreiben:

~~~js
const { isMainAreaEvent } = scheduler.ext.allTimed;
scheduler.ext.allTimed.isMainAreaEvent = function(event) {
    if(event.multidaySection){
        return false;
    }else{
        return isMainAreaEvent(event);
    }
};
~~~

### Change log
- Das Plugin ist seit Version 7.2 standardmäßig aktiviert
