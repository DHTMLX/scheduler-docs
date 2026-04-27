---
sidebar_label: onEventCut
title: "onEventCut событие"
description: "срабатывает, когда пользователь нажимает сочетание клавиш CTRL+X (только при включенном расширении 'keyboard navigation')"
---

# onEventCut

### Description

@short: Срабатывает, когда пользователь нажимает сочетание клавиш CTRL+X (только при включенном расширении 'keyboard navigation')

@signature: onEventCut: (ev: object) => void;

### Parameters

- `ev` - (обязательно) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("Вы вырезали событие: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~


### Related samples
- [Навигация по клавиатуре в планировщике](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
Событие требует включенного расширения [key_nav](guides/extensions-list.md#keyboard-navigation).
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)