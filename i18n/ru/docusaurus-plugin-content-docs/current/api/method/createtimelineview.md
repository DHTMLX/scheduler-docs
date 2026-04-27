---
sidebar_label: createTimelineView
title: "метод createTimelineView"
description: "настраивает Timeline view в планировщике"
---

# createTimelineView
:::info
 Эта функциональность доступна только в PRO-версии. 
:::
### Description

@short: Настраивает Timeline view в планировщике

@signature: createTimelineView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - конфигурационный объект Timeline-вью

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

**Применимые представления:** [Timeline view](views/timeline.md)

### Related samples
- [Cell mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/01_slots.html)
- [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)
- [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)
- [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)

### Details

:::note
 Методу требуется активировать плагин [timeline](guides/extensions-list.md#timeline). 
:::

Конфигурационный объект Timeline-вью может иметь следующие свойства:

- <b>name</b>- (<i>string</i>) идентификатор представления. Если вы укажете имя уже существующего Timeline-вью, он будет перезаписан
- <b>render</b> - (<i>'cell', 'bar', 'tree', 'days'</i>) режим представления. По умолчанию 'cell'
- <b>y_property</b> - (<i>string</i>) имя свойства данных, которое будет использоваться для присвоения событий к определенным секциям
- <b>y_unit</b> - (<i>array of objects</i>) определяет секции представления.<br> Каждый объект в массиве задаёт одну секцию и имеет следующие свойства:
    - <b>children</b> - (<i>array</i>) массив вложенных объектов элементов (для режима 'Tree' только)
    - <b>key</b> - (<i>string</i>) идентификатор секции. Это значение сравнивается с свойством данных события для привязки события к секции
    - <b>label</b> - (<i>string</i>) метка секции
    - <b>open</b> - (<i>boolean</i>) определяет, будет ли секция открыта по умолчанию (для режима 'Tree' только)
- <b>days</b> - (<i>number</i>) число элементов (дни) на оси Y. Применимо только к режиму 'Days'
- <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) единица измерения оси X. По умолчанию 'minute'
- <b>x_date</b> - (<i>string</i>) формат даты оси [X-Axis](guides/settings-format.md). Если не указан, используется формат [hour_date](api/config/hour_date.md)
- <b>x_step</b> - (<i>number</i>) шаг оси X в единицах <b>'x_unit'</b>. По умолчанию 1
- <b>x_start</b> - (<i>number</i>) смещение оси X в единицах <b>'x_unit'</b>. По умолчанию 0
- <b>x_size</b> - (<i>number</i>) длина оси X, заданная как общее число <b>'x_step'</b>. По умолчанию 24
- <b>x_length</b> - (<i>number</i>) количество <b>'x_step'</b>, которое будет прокручиваться за один раз при клике на кнопку 'next' в заголовке планировщика. Опционально. По умолчанию 1. 
Это немного запутанный параметр, и чтобы избежать ошибок, запомните следующее:
    - Параметр можно использовать только если <b>x_unit='minute'</b> или <b>x_unit='hour'</b>. В других случаях указывать его не требуется.
    - Если <b>x_unit='minute'</b> или <b>x_unit='hour'</b> и вы не указываете <b>x_length</b>, ось X будет отображать временной интервал (а не весь день, как обычно), заданный оставшимися параметрами шкалы (<b>x_start</b>, <b>x_step</b>, <b>x_size</b>). Это позволяет разделить день на равные интервалы и прокручивать их кнопкой 'next'.
    - Если <b>x_unit='minute'</b> или <b>x_unit='hour'</b> и вы решите задать параметр, установите его на весь день (то есть <b>x_length</b> должно быть равно количеству <b>x_steps</b>, необходимых для заполнения всего дня), чтобы корректно работала кнопка 'next'
- <b>first_hour</b> - (<i>number</i>) устанавливает начальный час временного интервала ячейки. Атрибут применим только если <b>x_unit="day"</b>
- <b>last_hour</b> - (<i>number</i>) устанавливает конечный час временного интервала ячейки. Атрибут применим только если <b>x_unit="day"</b>
- <b>show_unassigned</b> (<i>boolean</i>) если <i>false</i>, события, не принадлежащие ни одной секции, не будут отображаться. Если <i>true</i> — такие события будут размещаться в первой секции. По умолчанию <i>false</i>. Опционально
- <b>section_autoheight</b> - (<i>boolean</i>) включает автоматическую подгонку высоты ячеек. По умолчанию <i>true</i> 
- <b>dy</b> - (<i>number</i>) минимальная высота ячеек (если свойство <b>section_autoheight</b> имеет значение <i>false</i>, высота ячеек будет равна <b>dy</b>, иначе высота ячеек будет увеличиваться, чтобы заполнить все свободное место). По умолчанию, 50
- <b>dx</b> - (<i>number</i>) ширина колонки с именами секций. По умолчанию, 200 
- <b>event_dy</b> - (<i>number/string</i>) высота событий. Может принимать значение <b>'full'</b> и занимать всю ячейку. По умолчанию — равна <b>scheduler.xy.bar_height-5</b> 
- <b>event_min_dy</b> - (<i>number</i>) минимальная высота события. По умолчанию — равна <b>scheduler.xy.bar_height-5</b> 
- <b>resize_events</b> - (<i>boolean</i>) задаёт, следует ли уменьшать высоту отдельных событий, чтобы суммарная высота была равна высоте одного события (но не меньше значения свойства <b>event_min_dy</b>). По умолчанию <i>true</i> 
- <b>fit_events</b> - (<i>boolean</i>) задаёт, должна ли высота секции увеличиваться, чтобы разместитьAll событий в этой секции, или должна быть фиксированной (параметр <b>dy</b>). Доступно с версии 3.0. По умолчанию <i>true</i>
- <b>fit_events_offset</b> - (<i>number</i>) добавляет дополнительное пространство (в пикселах) под последним событием. Применяется, когда <b>fit_events</b> установлен в <i>true</i>
- <b>round_position</b>- (<i>boolean</i>) делает так, чтобы события растягивались по всей ширине ячейки, независимо от продолжительности события. По умолчанию <i>false</i>. Только для режимов 'Bar' и 'Tree'
- <b>folder_events_available</b> - (<i>boolean</i>) следует установить как <i>true</i>, если вы хотите иметь возможность задавать события не только для отдельного держателя, но и для всей папки (любого уровня). Применимо к режиму 'Tree' по умолчанию <i>false</i> 
- <b>folder_dy</b> - (<i>number</i>) высота папок в пикселях (папки — это секции, которые имеют дочерние секции). Применимо к режиму 'Tree' по умолчанию 
- <b>second_scale</b> - (<i>object</i>) добавляет вторую ось X поверх базовой и служит для группировки временных интервалов на исходной шкале. Опционально. Доступно с версии 3.0. <br> Объект scale имеет следующие свойства: 
    - <b>x_unit</b> - (<i>minute, hour, day, week, month, year</i>) единица измерения оси. По умолчанию 'minute'
    - <b>x_date</b> - (<i>string</i>) формат даты оси [axis](guides/settings-format.md). Если не указан, используется формат [hour_date](api/config/hour_date.md)
- <b>scrollable</b> - (<i>boolean</i>) включает горизонтальную прокрутку в Timeline view, по умолчанию false. Если <i>false</i> или undefined, колонки дат будут сжиматься, чтобы поместить временную шкалу в ширину области просмотра.
Если <i>true</i>, колонки дат не будут сжиматься менее чем до значения <b>column_width</b>, и появится горизонтальная полоса прокрутки по мере необходимости.
- <b>column_width</b> - (<i>number</i>) устанавливает минимальную ширину колонок дат Timeline, по умолчанию 100
- <b>scroll_position</b> - (<i>Date</i>) рендерит Timeline с прокруткой к конкретной позиции, принимает те же аргументы, что и <b>timeline.scrollTo()</b>, то есть дату, к которой Timeline должен прокрутиться после отрисовки
- <b>autoscroll</b> - (<i>object</i>) позволяет настраивать чувствительность и скорость автопрокрутки. Объект autoscroll имеет следующие свойства:
    - <b>range_x</b> - (<i>number</i>) горизонтальное расстояние автопрокрутки от края области данных
    - <b>range_y</b> - (<i>number</i>) вертикальное расстояние автопрокрутки от края области данных
    - <b>speed_x</b> - (<i>number</i>) скорость горизонтальной автопрокрутки
    - <b>speed_y</b> - (<i>number</i>) скорость вертикальной автопрокрутки
- <b>cell_template</b> - (<i>boolean</i>) включает рендеринг шаблона, указанного для Timeline
- **smart_rendering** - (*boolean*) включает умную отрисовку в Timeline (позволяет рендерить только видимые на экране строки, столбцы и события, в то время как остальные элементы рендерятся во время прокрутки Timeline). Обратите внимание, что в [scrollable timeline](views/timeline.md#horizontal-scroll) данная настройка по умолчанию включена.
- <b>columns</b>- (<i>array</i>) список колонок для левой панели. Если не указан, для содержания панели будет использоваться шаблон [timeline_scale_label](api/template/timelinename_scale_label.md)

## Динамическое изменение свойств

Все определённые timeline-объекты хранятся в объекте **scheduler.matrix**.
Вы можете получить конфигурацию любого timeline-вью по его имени и изменить любое свойство. Изменения применяются сразу после обновления планировщика:

~~~js
scheduler.getView('timeline').x_size = 12;
scheduler.setCurrentView(); // перерисовывает scheduler
~~~


Здесь "timeline" - это имя, заданное Timeline view в методе [createTimelineView](api/method/createtimelineview.md):

~~~js
scheduler.createTimelineView({
    name:"timeline",
    ...
});
~~~