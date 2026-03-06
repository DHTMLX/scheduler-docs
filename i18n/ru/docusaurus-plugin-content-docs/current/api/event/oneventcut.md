---
sidebar_label: "onEventCut"
title: "onEventCut event"
description: "срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+X' (работает только если включено расширение 'keyboard navigation')"
---

# onEventCut

### Description

@short: Срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+X' (работает только если включено расширение 'keyboard navigation')

@signature: onEventCut: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - объект события

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("Вы вырезали событие: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
 Это событие работает только при активном расширении [key_nav](guides/extensions-list.md#keyboard-navigation). 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)
