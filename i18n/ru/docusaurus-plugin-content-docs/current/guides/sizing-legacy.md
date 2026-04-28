---
title: "Изменение размера шкалы и блоков событий (v6.0)"
sidebar_label: "Изменение размера шкалы и блоков событий (v6.0)"
---

# Изменение размера шкалы и блоков событий (v6.0)

*Эта статья относится к dhtmlxScheduler версии 6.0 и ниже. Для версий 7.0 и выше, пожалуйста, ознакомьтесь с подробностями [здесь](guides/sizing.md).*

В этой статье мы рассмотрим размер шкалы и коробок событий на примере решения 4 задач:

**Проблема 1:** [События, длящиеся менее 1 часа, выглядят в планировщике так же, как и 1-часовые события. Я хочу, чтобы короткие события умещались на шкалу.](guides/sizing-legacy.md#how-to-make-short-events-fit-the-scale)
  
**Проблема 2:** [События длительностью менее 1 часа, происходящие в разное время, но в рамках одного часа, перекрываются. Я хочу, чтобы такие короткие события не перекрывались.](guides/sizing-legacy.md#preventing-short-events-from-overlapping)
  
**Проблема 3:** [Я изменяю высоту единицы шкалы и хочу соответственно изменить полосатый фон.](guides/sizing-legacy.md#how-to-change-the-background-according-to-the-set-scale)
  
**Проблема 4:** [Расстояние по умолчанию между шкалами равно 1 часу. Я хочу изменить его и сделать, например, 30 минут.](guides/sizing-legacy.md#how-to-change-the-scale-spacing)

## Как привести короткие события к размеру шкалы

Сначала давайте изучим поведение коробок событий по умолчанию:

+ высота единицы шкалы по умолчанию равна 44px (или высота часа)
+ минимальная высота коробки события — 44px
+ события длительностью менее 1 часа занимают высоту 44px. Таким образом, 15-минутные и 1-часовые события будут выглядеть одинаково в планировщике
+ события длительностью более 1 часа получают высоту согласно боковой шкале (предполагая, что 1 час равен 44px — 90-минутное событие займет 63px по высоте)

Допустим, вы хотите, чтобы 30-минутные события соответствовали шкале. Тогда есть 2 решения:

- Увеличить высоту единицы шкалы
- Настроить коробку событий

![30-minute_custom_event.png](/img/30-minute_custom_event.png)

### Решение 1. Изменение высоты единицы шкалы

Чтобы изменить высоту единицы шкалы, следует использовать конфигурационную опцию [hour_size_px](api/config/hour_size_px.md).
  
Например, чтобы увеличить высоту единицы шкалы в два раза, следует вызвать опцию так:

~~~js
scheduler.config.hour_size_px = 88;

scheduler.init(...);
~~~

Теперь высота единицы шкалы составляет 88 px, и 30-минутное событие, занимающее 44 px, будет занимать высоту, равную 30 минутам, как и требуется.

[Изменение шага оси Y](https://docs.dhtmlx.com/scheduler/samples/02_customization/09_timestep.html)

### Решение 2. Настройка блока события

Чтобы настроить отображение коробок событий, следует использовать метод [renderEvent](api/method/renderevent.md), который позволяет задать свой собственный шаблон для событий.

~~~js
scheduler.renderEvent = function(container, ev) {
    //ваш код настройки
}
~~~

Подробнее см. в соответствующей главе - [Коробка пользовательского события](guides/custom-events-display.md).

[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

## Предотвращение перекрытия коротких событий

Чтобы отображать короткие события отдельно и исключить их перекрытие, следует установить опцию [separate_short_events](api/config/separate_short_events.md) в значение *true*:

~~~js
scheduler.config.separate_short_events = true;
~~~

![overlapping.png](/img/overlapping.png)

## Как изменить фон в соответствии с установленной шкалой

Фон планировщика задаётся изображением. Чтобы изменить фоновое изображение, переопределите соответствующий CSS-класс, который является **.dhx_scale_holder**:

~~~html
<style>
.dhx_scale_holder {
     background-image: url("imgs/myNewImage.png");
}
</style>
~~~

~~~js
scheduler.init(...);
~~~

![changing_background.png](/img/changing_background.png)

## Как изменить расстояние между шкалами

Чтобы изменить значение по умолчанию расстояния между шкалами, нужно переписать шаблон [hour_scale](api/template/hour_scale.md). Чтобы сделать расстояние между шкалами равным 30 минутам, можно переписать шаблон следующим образом:

~~~js
const format = scheduler.date.date_to_str("%H:%i");
const step = 30;
        
scheduler.templates.hour_scale = function(date){
    let html="";
    for (let i = 0; i < 60/step; i++){
        html += "<div style='height:22px;line-height:22px;'>" + format(date) + "</div>";
        date = scheduler.date.add(date,step,"minute");
    }
    return html;
}
~~~

![scale_spacing.png](/img/scale_spacing.png)

**Related samples:** [Настраиваемая ось Y](https://docs.dhtmlx.com/scheduler/samples/02_customization/21_custom_hour_scale.html)