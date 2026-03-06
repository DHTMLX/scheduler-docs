---
sidebar_label: "onViewMoreClick"
title: "onViewMoreClick event"
description: "вызывается, когда пользователь кликает по ссылке 'View more' в Month view (применимо только для Month view)"
---

# onViewMoreClick

### Description

@short: Вызывается, когда пользователь кликает по ссылке 'View more' в Month view (применимо только для Month view)

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (required) *object* - дата ячейки, в которой пользователь кликнул по ссылке 'View more'

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    //здесь можно разместить любую кастомную логику
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

Это событие можно заблокировать. Возврат *false* предотвращает переключение Month view на Day view после клика по ссылке 'View more'.

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- [Месячный вид](views/month.md#limitingthenumberofeventsinacell)
