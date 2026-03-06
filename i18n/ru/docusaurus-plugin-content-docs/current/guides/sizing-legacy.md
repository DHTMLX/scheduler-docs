---
title: "Изменение размера шкалы и блоков событий (v6.0)"
sidebar_label: "Изменение размера шкалы и блоков событий (v6.0)"
---

# Изменение размера шкалы и блоков событий (v6.0)

*Эта статья относится к dhtmlxScheduler версии 6.0 и ниже. Для версий 7.0 и выше, пожалуйста, ознакомьтесь с подробностями [здесь](guides/sizing.md).*

В этом разделе рассматривается настройка размера единиц шкалы и блоков событий на примере четырёх типичных ситуаций:

**Проблема 1:** [События короче 1 часа отображаются такого же размера, как и часовые события. Необходимо, чтобы короткие события правильно вписывались в шкалу.](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)
  
**Проблема 2:** [Короткие события, происходящие в разное время в течение одного часа, накладываются друг на друга. Требуется избежать такого наложения.](guides/sizing-legacy.md#preventing-short-events-from-overlapping)
  
**Проблема 3:** [После изменения высоты единицы шкалы необходимо скорректировать полосатый фон.](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)
  
**Проблема 4:** [По умолчанию шаг шкалы установлен на 1 час, но требуется изменить его, например, на 30 минут.](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## Как сделать так, чтобы короткие события вписывались в шкалу {#how-to-make-short-events-fit-the-scale}

Сначала рассмотрим стандартное поведение блоков событий:

+ Высота каждой единицы шкалы (часа) по умолчанию составляет 44px.
+ Минимальная высота блока события - 44px.
+ События короче 1 часа отображаются высотой 44px, поэтому событие на 15 минут выглядит так же, как и часовое событие.
+ Для событий длиннее 1 часа высота рассчитывается пропорционально шкале (например, событие на 90 минут будет высотой 63px, если 1 час - это 44px).

Если требуется, чтобы события на 30 минут корректно отображались на шкале, есть два способа:

- Увеличить высоту единицы шкалы.
- Настроить внешний вид блока события.

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### Решение 1. Изменение высоты единицы шкалы

Высота единицы шкалы настраивается с помощью опции `scheduler.config.hour_size_px`.
  
Например, чтобы удвоить высоту единицы, установите следующее значение:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

В результате высота единицы шкалы станет 88px, и событие на 30 минут займет 44px, соответствуя шкале.


[Changing the Y-Axis step](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)


### Решение 2. Настройка блока события

Для изменения отображения блоков событий используйте метод `scheduler.renderEvent`, который позволяет задать собственный шаблон для событий.

~~~js
scheduler.renderEvent = function(container, ev) {
    // ваш код кастомизации
}
~~~

Подробнее смотрите в разделе [Пользовательское Окно События](guides/custom-events-display.md).


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Предотвращение наложения коротких событий {#preventing-short-events-from-overlapping}

Чтобы короткие события отображались раздельно и не перекрывали друг друга, включите опцию `scheduler.config.separate_short_events`:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## Как изменить фон в соответствии с установленной шкалой {#how-to-change-the-background-according-to-the-set-scale}

Фон планировщика задается изображением. Чтобы изменить его, переопределите CSS-класс **.dhx_scale_holder** следующим образом:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

Затем инициализируйте планировщик:

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## Как изменить шаг шкалы {#how-to-change-the-scale-spacing}

Для изменения стандартного шага шкалы переопределите шаблон `scheduler.templates.hour_scale`. Для шага в 30 минут шаблон можно переписать так:

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
