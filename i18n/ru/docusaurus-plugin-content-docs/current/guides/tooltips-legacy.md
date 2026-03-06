---
title: "Тултипы (v6.0)"
sidebar_label: "Тултипы (v6.0)"
---

# Тултипы (v6.0)

*Эта статья относится к dhtmlxScheduler версии 6.0 и ниже. Для версий 7.0 и выше, пожалуйста, ознакомьтесь с подробностями [здесь](guides/tooltips.md).*

Чтобы включить тултипы для событий, необходимо один раз на странице активировать расширение **Tooltip**.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

После активации тултипы будут отображаться с настройками по умолчанию.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


Функционал тултипов можно настраивать с помощью следующего API:

## Методы

- **hide()** - скрывает тултип
- **show(event,text)** - отображает тултип в месте браузерного события с предоставленным содержимым. Метод принимает два параметра:
    - *event* - объект браузерного события
    - *text* - содержимое, которое будет вставлено во внутренний HTML тултипа

~~~js
tooltip.hide();
tooltip.show(event, text);
~~~


## Конфигурационные свойства

- **className** - определяет CSS-класс, применяемый к тултипам
- **timeout_to_display** - задержка в миллисекундах перед появлением тултипа (по умолчанию 50)
- **timeout_to_hide** - задержка в миллисекундах перед скрытием тултипа (по умолчанию 50)
- **delta_x** - горизонтальное смещение относительно позиции курсора (положительные значения сдвигают вправо, по умолчанию 15)
- **delta_y** - вертикальное смещение относительно позиции курсора (положительные значения сдвигают вниз, по умолчанию -20)

~~~js
scheduler.config.className = 'dhtmlXTooltip tooltip'; 
scheduler.config.timeout_to_display = 50;
scheduler.config.timeout_to_hide = 50;
scheduler.config.delta_x = 15; 
scheduler.config.delta_y = -20; 
~~~

## Шаблоны

- [tooltip_text](api/template/tooltip_text.md) - определяет содержимое, отображаемое в тултипах  
- [tooltip_date_format](api/template/tooltip_date_format.md) - определяет формат даты для отображения дат начала и окончания в тултипе

~~~js
var format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    format(start)+"

<b>End date:</b> "+format(end);
};
~~~
