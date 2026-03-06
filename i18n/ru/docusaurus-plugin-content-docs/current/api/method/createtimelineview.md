---
sidebar_label: "createTimelineView"
title: "createTimelineView method"
description: "настраивает Timeline view в планировщике"
---

# createTimelineView
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Настраивает Timeline view в планировщике

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект конфигурации для Timeline view

### Example

~~~jsx
// шкала времени с 8 утра до 8 вечера с интервалом в 30 минут
scheduler.createTimelineView({
    name: "timeline",
    x_unit:    "minute",
    x_date:    "%H:%i",
    x_step:    30,
    x_size:    24,
    x_start: 16,
    x_length: 48,
    fit_events_offset: 15,
    y_unit:[    
         {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"},
        {key:4, label:"Section D"}    
    ],
    y_property: "section_id",
    render:    "bar"
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 Для работы метода необходимо включить плагин [timeline](guides/extensions-list.md#timeline). 
:::


Объект конфигурации Timeline view поддерживает следующие свойства:

- <b>name</b> - (<i>string</i>) идентификатор view. Если указать имя, совпадающее с существующим Timeline view, оно будет перезаписано
- <b>render</b> - (<i>'cell', 'bar', 'tree', 'days'</i>) режим отображения. По умолчанию 'cell'
- <b>y_property</b> - (<i>string</i>) свойство данных, используемое для связывания событий с конкретными секциями
- <b>y_unit</b> - (<i>массив объектов</i>) описывает секции в представлении.<br> Каждый объект представляет секцию со следующими свойствами:
    - <b>children</b> - (<i>массив</i>) вложенные элементы, только для режима 'Tree'
    - <b>key</b> - (<i>string</i>) id секции, сопоставляется со свойством события для назначения событий
    - <b>label</b> - (<i>string</i>) отображаемая метка секции
    - <b>open</b> - (<i>boolean</i>) раскрыта ли секция изначально (для режима 'Tree')
- <b>days</b> - (<i>number</i>) количество элементов (дней) по оси Y, актуально только для режима 'Days'
- <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) единица измерения по оси X. По умолчанию 'minute'
- <b>x_date</b> - (<i>string</i>) формат даты по оси X (см. [Спецификация формата даты](guides/settings-format.md)). Если не задан, используется формат из [hour_date](api/config/hour_date.md)
- <b>x_step</b> - (<i>number</i>) шаг по оси X в единицах <b>'x_unit'</b>. По умолчанию 1
- <b>x_start</b> - (<i>number</i>) смещение по оси X в единицах <b>'x_unit'</b>. По умолчанию 0
- <b>x_size</b> - (<i>number</i>) общая длина оси X в количестве <b>'x_step'</b>. По умолчанию 24
- <b>x_length</b> - (<i>number</i>) количество <b>'x_step'</b>, на которое прокручивается таймлайн при нажатии кнопки 'next' в шапке планировщика. Опционально, по умолчанию 1.
Этот параметр требует внимания:
    - Применяется только если <b>x_unit='minute'</b> или <b>x_unit='hour'</b>. Для других единиц можно опустить.
    - Без <b>x_length</b> для этих единиц таймлайн показывает часть дневного интервала, основанного на других параметрах шкалы (<b>x_start</b>, <b>x_step</b>, <b>x_size</b>), позволяя прокручивать сегменты дня.
    - Если <b>x_length</b> задан, он должен покрывать целый день (число <b>x_step</b>, составляющих день), чтобы кнопка 'next' работала корректно.
- <b>first_hour</b> - (<i>number</i>) начальный час временного интервала в ячейке, используется только если <b>x_unit="day"</b>
- <b>last_hour</b> - (<i>number</i>) конечный час временного интервала в ячейке, используется только если <b>x_unit="day"</b>
- <b>show_unassigned</b> (<i>boolean</i>) если false, события без назначения на секцию не отображаются; если true, такие события показываются в первой секции. По умолчанию false. Опционально
- <b>section_autoheight</b> - (<i>boolean</i>) включает автоматическую подгонку высоты ячеек. По умолчанию true
- <b>dy</b> - (<i>number</i>) минимальная высота ячейки (если <b>section_autoheight</b> false, ячейки имеют фиксированную высоту; иначе высота расширяется под содержимое). По умолчанию 50
- <b>dx</b> - (<i>number</i>) ширина колонки с названиями секций. По умолчанию 200
- <b>event_dy</b> - (<i>number/string</i>) высота событий; может быть 'full' для заполнения всей ячейки. По умолчанию <b>scheduler.xy.bar_height-5</b>
- <b>event_min_dy</b> - (<i>number</i>) минимальная высота события. По умолчанию <b>scheduler.xy.bar_height-5</b>
- <b>resize_events</b> - (<i>boolean</i>) разрешает уменьшать высоту отдельных событий, чтобы уместить их в одну высоту события (не ниже <b>event_min_dy</b>). По умолчанию true
- <b>fit_events</b> - (<i>boolean</i>) расширять ли высоту секции под все события или держать фиксированной (<b>dy</b>). Доступно с версии 3.0. По умолчанию true
- <b>fit_events_offset</b> - (<i>number</i>) дополнительное пространство (в пикселях) под последним событием, применяется при <b>fit_events</b> true
- <b>round_position</b> - (<i>boolean</i>) растягивает события на всю ширину ячейки вне зависимости от длительности. По умолчанию false. Применяется только в режимах 'Bar' и 'Tree'
- <b>folder_events_available</b> - (<i>boolean</i>) разрешает назначать события целым папкам (на любом уровне), а не только отдельным холдерам. Только для режима 'Tree'. По умолчанию false
- <b>folder_dy</b> - (<i>number</i>) высота в пикселях для папок (секций, содержащих дочерние секции). Только для режима 'Tree'
- <b>second_scale</b> - (<i>object</i>) добавляет вторую ось X над основной для группировки временных интервалов. Опционально. Доступно с версии 3.0. <br> Объект содержит:
    - <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) единица измерения. По умолчанию 'minute'
    - <b>x_date</b> - (<i>string</i>) формат даты (см. [Спецификация формата даты](guides/settings-format.md)). Если не задан, используется формат из [hour_date](api/config/hour_date.md)
- <b>scrollable</b> - (<i>boolean</i>) включает горизонтальный скроллинг в Timeline view; по умолчанию false. Если false или не задано, колонки дат сжимаются по ширине под размер окна. Если true, колонки не сжимаются меньше <b>column_width</b>, и появляется горизонтальный скроллбар при необходимости.
- <b>column_width</b> - (<i>number</i>) минимальная ширина колонок с датами таймлайна; по умолчанию 100
- <b>scroll_position</b> - (<i>Date</i>) прокручивает таймлайн к определённой дате после рендера; принимает те же аргументы, что и <b>timeline.scrollTo()</b>
- <b>autoscroll</b> - (<i>object</i>) настраивает чувствительность и скорость автоскроллинга, со свойствами:
    - <b>range_x</b> - (<i>number</i>) горизонтальное расстояние автоскролла от краёв области данных
    - <b>range_y</b> - (<i>number</i>) вертикальное расстояние автоскролла от краёв области данных
    - <b>speed_x</b> - (<i>number</i>) скорость горизонтального автоскролла
    - <b>speed_y</b> - (<i>number</i>) скорость вертикального автоскролла
- <b>cell_template</b> - (<i>boolean</i>) включает рендеринг кастомного шаблона для ячеек таймлайна
- **smart_rendering** - (*boolean*) включает умный рендеринг, при котором рендерятся только видимые строки, колонки и события, остальные загружаются при скроллинге. По умолчанию включено для scrollable таймлайнов.
- <b>columns</b> - (<i>массив</i>) задаёт колонки для левой панели. Если не указан, используется шаблон [timeline_scale_label](api/template/timelinename_scale_label.md).


## Динамическое изменение свойств

Все Timeline view хранятся в **scheduler.matrix**.
Вы можете получить и изменить конфигурацию любого Timeline view по его имени. Изменения вступают в силу после перерисовки планировщика:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // перерисовывает планировщик
~~~


Здесь "timeline" - это имя, заданное Timeline view в методе [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
});
~~~
