---
title: "Тултипы (v6.0)"
sidebar_label: "Тултипы (v6.0)"
---

# Тултипы (v6.0)

*Эта статья относится к dhtmlxScheduler версии 6.0 и ниже. Для версий 7.0 и выше, пожалуйста, ознакомьтесь с подробностями [здесь](guides/tooltips.md).*

Чтобы отображать тултипы для событий, следует активировать расширение **Tooltip** один раз на странице.

~~~js
scheduler.plugins({
    tooltip: true;
});
~~~

После этого тултипы будут отображаться с настройками по умолчанию.

![тултип](/img/tooltip.png)

[Тултипы](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)

Чтобы настроить тултипы, у вас есть следующий API:

## Методы

- **hide()** - скрывает тулtip
- **show(event,text)** - отображает тултип в месте события браузера с заданным содержимым. Метод принимает два параметра:
    - *event* - браузерное событие
    - *text* - содержимое тултипа, будет добавлено в innerHTML элемента тултипа

~~~js
tooltip.hide();
tooltip.show(event, text);
~~~

## Параметры конфигурации

- **className** - имя CSS-класса, которое будет применяться к тултипам
- **timeout_to_display** - задержка в миллисекундах перед отображением тултипа для события (по умолчанию, 50)
- **timeout_to_hide** - задержка в миллисекундах перед скрытием тултипа (по умолчанию, 50)
- **delta_x** - смещение курсора вправо (если положительное) относительно позиции курсора (по умолчанию, 15)
- **delta_y** - смещение по оси Y вверх (если положительное) относительно позиции курсора (по умолчанию, -20)

~~~js
scheduler.config.className = 'dhtmlXTooltip tooltip'; 
scheduler.config.timeout_to_display = 50;
scheduler.config.timeout_to_hide = 50;
scheduler.config.delta_x = 15; 
scheduler.config.delta_y = -20; 
~~~

## Шаблоны

- [tooltip_text](api/template/tooltip_text.md) - задаёт текст тултипов  
- [tooltip_date_format](api/template/tooltip_date_format.md) - задаёт формат начальной и конечной даты, отображаемой во тултипе

~~~js
const format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    format(start)+"

<b>End date:</b> "+format(end);
};
~~~