---
sidebar_label: "onEventPasted"
title: "onEventPasted event"
description: "вызывается, когда пользователь нажимает сочетание клавиш 'CTRL+V'"
---

# onEventPasted

### Description

@short: Вызывается, когда пользователь нажимает сочетание клавиш 'CTRL+V'

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - указывает, было ли событие скопировано или вырезано перед вставкой. Значение <em>true</em> означает, что событие было скопировано
- `pasted_ev` - (required) *object* - новый объект события, созданный в результате действия вставки
- `original_ev` - (required) *object* - оригинальный объект события, который был скопирован или вырезан

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    //любая пользовательская логика здесь
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 Для этого события необходимо включить расширение [key_nav](guides/extensions-list.md#keyboard-navigation). 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
