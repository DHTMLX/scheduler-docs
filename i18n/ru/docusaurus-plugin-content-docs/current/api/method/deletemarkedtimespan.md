---
sidebar_label: deleteMarkedTimespan
title: "deleteMarkedTimespan метод"
description: "удаляет пометку/блокировку, установленную методом addMarkedTimespan()"
---

# deleteMarkedTimespan

### Description

@short: Удаляет маркировку или блокировку, созданную с помощью метода addMarkedTimespan()

@signature: deleteMarkedTimespan: (config?: any) =\> void

### Parameters

- `config` - (optional) *string | object* - идентификатор временного диапазона или свойства конфигурации временного диапазона

### Example

~~~jsx
const spanID = scheduler.addMarkedTimespan({  
    days:  [0,1], 
    zones: "fullday"              
});
scheduler.deleteMarkedTimespan(spanID);
~~~

### Related samples
- [Выделенные временные диапазоны в месячном представлении](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note

Эта функция доступна начиная с версии 3.5.
 
:::

:::note
 Методу требуется активированный плагин [limit](guides/extensions-list.md#limit). 
:::

Этот метод поддерживает три варианта вызова:

1. **deleteMarkedTimespan()** - не принимает параметров и удаляет все блокировки/пометки.
2. **deleteMarkedTimespan(id)** - принимает идентификатор временного диапазона.
3. **deleteMarkedTimespan(config)** - принимает некоторые свойства конфигурации.
  
~~~js
const spanID = scheduler.addMarkedTimespan({  
    days:  [3,4,5], 
    zones: [100,400]          
});

// удаляет пометку для каждого воскресенья
scheduler.deleteMarkedTimespan({ 
    days:  0,
});

//удаляет пометку для периода времени с 250 по 350 минуту каждого пятница
//каждая пятница теперь будет иметь 2 блока пометки: 100-250, 350-400
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