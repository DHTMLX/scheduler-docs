---
sidebar_label: onViewMoreClick
title: "onViewMoreClick событие"
description: "срабатывает, когда пользователь нажимает на ссылку 'Показать ещё' в месячном представлении (только в месячном представлении)"
---

# onViewMoreClick

### Description

@short: Вы вызывается, когда пользователь нажимает на ссылку 'Показать ещё' в месячном представлении (только в месячном представлении)

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (обязательный) *object* - дата ячейки, в которой пользователь кликает по ссылке 'Показать ещё'

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    // любая ваша логика здесь
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Событие можно блокировать. Верните *false*, и месячное представление не переключится на дневное представление после нажатия на ссылку 'Показать ещё'.

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- [Месячное представление](views/month.md#limiting-the-number-of-events-in-a-cell)