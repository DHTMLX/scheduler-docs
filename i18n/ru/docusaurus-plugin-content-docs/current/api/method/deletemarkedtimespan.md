---
sidebar_label: "deleteMarkedTimespan"
title: "deleteMarkedTimespan method"
description: "удаляет маркировку или блокировку, созданную с помощью метода addMarkedTimespan()"
---

# deleteMarkedTimespan

### Description

@short: Удаляет маркировку или блокировку, созданную с помощью метода addMarkedTimespan()

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* -  id timespan или объект с его конфигурационными свойствами

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

Эта функция доступна начиная с версии 3.5.
 
:::

:::note
 Метод требует включенного плагина [limit](guides/extensions-list.md#limit). 
:::

Этот метод поддерживает три варианта вызова:

1. **deleteMarkedTimespan()** - без параметров, удаляет все маркировки/блокировки.
2. **deleteMarkedTimespan(id)** - удаляет timespan с указанным id.
3. **deleteMarkedTimespan(config)** - удаляет timespans, соответствующие заданным конфигурационным свойствам.
  
  
~~~js
var spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// удаляет маркировку для каждого воскресенья
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

// удаляет маркировку для временного интервала между 250 и 350 минутами в каждую пятницу
// таким образом, в пятницу останутся две маркировки: 100-250 и 350-400
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350]
});

// удаляет маркировку для элемента с id=3 в Units view по пятницам
scheduler.deleteMarkedTimespan({ 
    days:  5,
    zones: [250,350],
    sections:{ unit:3 }        
});

~~~

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
