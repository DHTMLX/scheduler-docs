---
sidebar_label: "all_timed"
title: "all_timed config"
description: "'говорит', как отображать многодневные события в привычном формате (аналогично тому, как отображаются однодневные события)"
---

# all_timed

### Description

@short: 'говорит', как отображать многодневные события в привычном формате (аналогично тому, как отображаются однодневные события)

@signature: all_timed: boolean | string


**Default value:** 'short'

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

:::note
 Свойство требует включения плагина [all_timed](guides/extensions-list.md#all-timed). 
:::

В качестве строки параметр принимает только одно значение - *'short'*.

<br>

Для этого параметра доступны три возможных значения:

- **'short'** - отображает только многодневные события, длящихся менее 24 часов (начинающиеся в один день и заканчивающиеся в другой), в привычном формате
- **true** - отображает все многодневные события в привычном формате
- **false** - отображает все многодневные события в виде линий в верхней части scheduler (режим отображения по умолчанию для многодневных событий)

Для более точного управления тем, какие события показываются в многодневном разделе, а какие - в колонках дней, 
вы можете переопределить метод `isMainAreaEvent` модуля следующим образом:

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
- Плагин включён по умолчанию начиная с версии 7.2
