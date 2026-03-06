---
sidebar_label: "onEventCopied"
title: "onEventCopied event"
description: "срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+C' (работает только если включено расширение 'keyboard navigation')"
---

# onEventCopied

### Description

@short: Срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+C' (работает только если включено расширение 'keyboard navigation')

@signature: onEventCopied: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - объект скопированного события

### Example

~~~jsx
scheduler.attachEvent("onEventCopied", function(ev) {
    dhtmlx.message("Вы скопировали событие: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 Это событие работает только при активированном расширении [key_nav](guides/extensions-list.md#keyboard-navigation). 
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
