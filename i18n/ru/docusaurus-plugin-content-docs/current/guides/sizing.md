---
title: "Изменение размера шкалы и блоков событий"
sidebar_label: "Изменение размера шкалы и блоков событий"
---

# Изменение размера шкалы и блоков событий 

*Если вы работаете с dhtmlxScheduler 6.0 или более ранней версией, подробности смотрите [здесь](guides/sizing-legacy.md).*

В этой статье описывается, как настраивать размеры блоков событий и временной шкалы.

## Отображение коротких событий

Давайте рассмотрим, как по умолчанию ведут себя блоки событий:

+ Высота единицы шкалы по умолчанию составляет 44px (что соответствует одному часу), как указано в [hour_size_px](api/config/hour_size_px.md).
+ Минимальная высота блока события - 20px, задается через конфигурацию **scheduler.xy.min_event_height**.
+ Поскольку события не могут быть меньше 20px, как 15-минутные, так и 5-минутные события будут иметь одинаковую высоту.
+ Для событий с высотой менее 42px используется специальный режим отображения и добавляется дополнительный CSS-класс:
    + `.dhx_cal_event--small` для событий менее 42px
    + `.dhx_cal_event--xsmall` для событий менее 30px

![30_minute_short_event](/img/30_minute_short_event.png)

Чтобы сделать короткие события более заметными, вы можете увеличить высоту временной шкалы:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// или scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### Кастомизация блока события

Вы можете полностью настроить отображение блоков событий, переопределив функцию рендеринга. Это делается с помощью метода [renderEvent](api/method/renderevent.md), который позволяет задать собственный шаблон события:

~~~js
scheduler.renderEvent = function(container, ev) {
    //ваш кастомный код
}
~~~

Подробнее смотрите в соответствующей главе - [Пользовательское Окно События](guides/custom-events-display.md).


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Предотвращение наложения коротких событий

Чтобы короткие события не накладывались друг на друга, установите опцию [separate_short_events](api/config/separate_short_events.md) в значение *true*:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
Начиная с версии 7.0 эта настройка включена по умолчанию. Вам нужно активировать её вручную только если вы используете более старую версию Scheduler.
:::

## Как изменить интервал шкалы

Чтобы изменить стандартный интервал шкалы, вы можете переопределить шаблон [hour_scale](api/template/hour_scale.md). Например, чтобы задать интервал шкалы в 30 минут, перепишите шаблон следующим образом:

~~~js
var format = scheduler.date.date_to_str("%H:%i");
var step = 30;
        
scheduler.templates.hour_scale = function(date){
    var html="";
    for (var i="0;" i<60/step; i++){
        html+="<div>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}

~~~

![scale_spacing.png](/img/scale_spacing.png)

**Связанные примеры:**


[Custom Y-Axis](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)
