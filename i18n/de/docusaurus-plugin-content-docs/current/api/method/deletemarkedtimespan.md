---
sidebar_label: "deleteMarkedTimespan"
title: "deleteMarkedTimespan method"
description: "Entfernt eine Markierung oder Blockierung, die mit der Methode addMarkedTimespan() erstellt wurde."
---

# deleteMarkedTimespan

### Description

@short: Entfernt eine Markierung oder Blockierung, die mit der Methode addMarkedTimespan() erstellt wurde.

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* -  die ID des Timespans oder ein Objekt mit dessen Konfigurationseigenschaften.

### Example

~~~jsx
var spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~

### Related samples
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
  
Dieses Feature ist seit Version 3.5 verfügbar. 
 
:::

:::note
 Die Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Diese Methode unterstützt drei Aufrufarten:

1. **deleteMarkedTimespan()** - keine Parameter, entfernt alle Markierungen/Blockierungen. 
2. **deleteMarkedTimespan(id)** - entfernt den Timespan mit der angegebenen ID. 
3. **deleteMarkedTimespan(config)** - entfernt Timespans, die den angegebenen Konfigurationseigenschaften entsprechen. 
  
~~~js
var spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// entfernt die Markierung an jedem Sonntag
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

// entfernt die Markierung für den Zeitraum zwischen 250 und 350 Minuten an jedem Freitag
// somit bleiben für Freitage zwei Markierungsblöcke übrig: 100-250 und 350-400
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350]
});

// entfernt die Markierung für das Element mit id=3 in der Units-Ansicht an Freitagen
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350],
    sections:{ unit:3 }        
});
~~~

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
