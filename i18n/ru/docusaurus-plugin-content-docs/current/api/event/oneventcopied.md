---
sidebar_label: onEventCopied
title: "Событие onEventCopied"
description: "Срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+C' (только с включенным расширением 'keyboard navigation')"
---

# onEventCopied

### Description

@short: Срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+C' (только с включенным расширением 'keyboard navigation')

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
- [Навигация клавиатурой в планировщике](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Повторяющиеся события](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Создание окон сообщений](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 Событие требует включенного расширения [key_nav](guides/extensions-list.md#keyboard-navigation) для включения.
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)