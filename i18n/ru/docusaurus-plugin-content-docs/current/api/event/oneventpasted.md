--- 
sidebar_label: onEventPasted
title: "onEventPasted event"
description: "срабатывает, когда пользователь нажимает сочетание клавиш CTRL+V"
---

# onEventPasted

### Description

@short: Срабатывает, когда пользователь нажимает сочетание клавиш 'CTRL+V'

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - указывает, было ли событие скопировано или вырезано перед вставкой. Значение <em>true</em> говорит, что событие было скопировано
- `pasted_ev` - (required) *object* - объект новой записи данных (событие, созданное после вставки)
- `original_ev` - (required) *object* - объект исходной записи данных (событие, которое было скопировано/вырезано)

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    // любая ваша логика здесь
});
~~~

### Related samples
- [Навигация по клавиатуре в планировщике](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 Событие требует включения расширения [key_nav](guides/extensions-list.md#keyboard-navigation).
 :::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)