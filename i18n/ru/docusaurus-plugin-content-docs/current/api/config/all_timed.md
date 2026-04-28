--- 
sidebar_label: all_timed
title: "all_timed конфигурация"
description: "для отображения многодневных событий обычным способом (как отображаются однодневные события)"
---

# all_timed

### Description

@short: для отображения многодневных событий обычным способом (как отображаются однодневные события)

@signature: all_timed: boolean | string


**Значение по умолчанию:** 'short'

**Применимые виды:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Отображение многодневных событий обычным способом](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

### Details

:::note
 Свойство требует активации плагина [all_timed](guides/extensions-list.md#all-timed). 
::: 

Как строковый параметр, значение может принимать единственное - *'short'*.

Итак, параметр может принимать 3 возможных значения:

- **'short'**  - показывать только многодневные события, длительность которых менее 24 часов (начинаются в один день и заканчиваются в другой) обычным способом
- **true** - показывать все многодневные события обычным способом
- **false** - показывать все многодневные события в виде линий в верхней части планировщика (стандартный режим отображения для многодневных событий)

Чтобы обеспечить больший контроль над тем, какие события отображаются в секции многодневных событий и какие — в дневных колонках, переопределите метод `isMainAreaEvent` модуля следующим образом:

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
- Плагин активируется по умолчанию, начиная с версии v7.2