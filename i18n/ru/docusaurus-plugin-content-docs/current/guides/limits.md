---
title: "Блокировка и выделение дат"
sidebar_label: "Блокировка и выделение дат"
---

# Блокировка и выделение дат

Библиотека предоставляет расширение **Limit**, которое позволяет блокировать и помечать (выделять) определенные даты или диапазоны дат.

Чтобы начать использовать плагин, активируйте его на странице. 

:::note
Примечание: если вы используете [views/timeline.md], расширение 'limit' должно быть включено перед расширением 'timeline'.
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~


## Параметры конфигурации

Расширение предоставляет следующие параметры конфигурации:

- [display_marked_timespans](api/config/display_marked_timespans.md) - определяет, следует ли выделять помеченные (заблокированные) временные интервалы в планировщике
- [check_limits](api/config/check_limits.md) - активирует/деактивирует проверку ограничений
- [mark_now](api/config/mark_now.md) - включает/выключает отображение маркера текущего времени
- [now_date](api/config/now_date.md) - задает дату для опции [mark_now](api/config/mark_now.md)
- [limit_end](api/config/limit_end.md) - задает конечный предел допустимого диапазона дат
- [limit_start](api/config/limit_start.md) - задает начальный предел допустимого диапазона дат
- [limit_view](api/config/limit_view.md) - ограничивает просмотр событий


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## Связанные события 

Если планировщик обнаружит попытку создать/изменить событие с недопустимой датой, будет сгенерировано событие [onLimitViolation](api/event/onlimitviolation.md).

## Как заблокировать определенные даты?

Существует несколько способов задать ограничение в планировщике:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - помечает даты, но с определенными настройками делает их блокирующими (позволяет задавать пользовательский стиль для лимита)
- [markTimespan](api/method/marktimespan.md) - помечает и/или блокирует даты, применяя к ним стандартный или пользовательский стиль. Пометка отменяется сразу после любого внутреннего обновления в приложении. Может использоваться для выделения


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## Как пометить определенные даты?

Существует два метода, которые можно использовать для пометки указанных даты(й):


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - помечает даты, но с определенными настройками делает их блокирующими (позволяет задавать пользовательский стиль для лимита)
- [markTimespan](api/method/marktimespan.md) - помечает и/или блокирует даты, применяя к ним стандартный или пользовательский стиль. Пометка отменяется сразу после любого внутреннего обновления в приложении. Может использоваться для выделения


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Удаление выделения/блокировки 

Существует несколько методов, которые можно использовать для удаления текущих помеченных/заблокированных временных интервалов:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - удаляет пометку/блокировку, установленную методом [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [unmarkTimespan](api/method/unmarktimespan.md) - удаляет пометку/блокировку, установленную методом [markTimespan](api/method/marktimespan.md)


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Приоритет блокировки

Когда вы вызываете методы 'blocking' несколько раз и блокируете разные диапазоны, блокировка будет следовать такому порядку приоритетов (с наивысшего к наименьшему):


1. Даты, указанные через объекты Date() для отдельных элементов;
2. Даты для отдельных элементов (когда определён параметр **sections**);
3. Даты, указанные через объекты Date();
4. Другие даты.

- Блокировка/пометка с более высоким приоритетом перезапишет те, что с более низким приоритетом, если у них одинаковый **type**. 
- Несколько методов блокировки/пометки с одинаковым приоритетом (расположенных в одном временном слоте) будут применяться одновременно.

Например:

~~~js
scheduler.addMarkedTimespan({ // блокирует 4 июля 2027 года (середа).
    days:  new Date(2027, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // название применяемого CSS класса
});
scheduler.addMarkedTimespan({ // блокирует каждое воскресенье, понедельник, среду
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // название применяемого CSS класса
});
//блокирует каждое воскресенье и среду только для элемента с id="2" 
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // название применяемого CSS класса
    sections: { timeline: 2} 
});

~~~


В результате вызова этих методов вы получите следующее:


1. Прежде всего, планировщик заблокирует **каждое воскресенье и среду для элемента (id="2)" в Timeline** и **окрасит их в серый**.
2. Затем будет заблокировано **4 июля 2012 года** и **окрашено в красный**.
3. Наконец, будут заблокированы **каждое воскресенье, понедельник, среда** и **окрашены в синий**.

![limits_priority.png](/img/limits_priority.png)

Для изменения этого поведения и отображения всех маркеров независимо от их приоритета можно использовать настройку [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md):

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~