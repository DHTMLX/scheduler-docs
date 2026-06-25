---
title: "Изменение размера шкалы и блоков событий"
sidebar_label: "Изменение размера шкалы и блоков событий"
---

# Изменение размера шкалы и блоков событий 

*Если вы работаете с dhtmlxScheduler 6.0 или более ранней версией, подробности смотрите [здесь](guides/sizing-legacy.md).*

В этой статье рассмотрим, как можно управлять размерами событий и шкалы времени.

## Отображение коротких событий

Сначала ознакомимся с поведением боксов событий по умолчанию:

+ высота единицы шкалы по умолчанию составляет 44px (или высота часа), как определено в [hour_size_px](api/config/hour_size_px.md)
+ минимальная высота бокса события — 20px, как указано настройкой **scheduler.xy.min_event_height**
+ поскольку событие не может иметь меньше 20px по высоте, как 15-минутные, так и 5-минутные события будут иметь одинаковую высоту
+ события высотой менее 42px используют особый режим отображения и получают дополнительный CSS-класс для отображения более коротких событий:
    + `.dhx_cal_event--small` - события высотой менее 42px
    + `.dhx_cal_event--xsmall` - события высотой менее 30px

![30_minute_short_event](/img/30_minute_short_event.png)

Вы можете увеличить высоту шкалы времени, чтобы улучшить видимость таких событий:

~~~js
scheduler.config.hour_size_px = 90;
scheduler.render();// или scheduler.init(...)
~~~

![30_minute_long_event](/img/30_minute_long_event.png)

### Кастомизация блока события

Можно полностью переопределить функцию отображения бокса события. Чтобы сделать это, следует использовать метод [renderEvent](api/method/renderevent.md), который позволяет задать собственный шаблон для событий:

~~~js
scheduler.renderEvent = function(container, ev) {
    //ваш кастомный код
}
~~~

Подробнее в соответствующей главе - [Настройка бокса пользовательского события](guides/custom-events-display.md).


[Бокс настраиваемых событий](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Предотвращение перекрытия коротких событий

Чтобы отображать короткие события отдельно и устранить возможность их перекрытия, установите опцию [separate_short_events](api/config/separate_short_events.md) в значение true:

~~~js
scheduler.config.separate_short_events = true;
~~~

:::note
Эта конфигурация включена по умолчанию начиная с версии v7.0. Её нужно включать вручную только если вы используете более раннюю версию Scheduler.
:::

## Как изменить шаг шкалы

Чтобы изменить интервал по умолчанию шкалы, нужно переписать шаблон [hour_scale](api/template/hour_scale.md). Чтобы интервал шкалы стал равным 30 минутам, можно переписать шаблон следующим образом:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>"+format(date)+"</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

**Связанные примеры:** [Настройка собственной оси](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)