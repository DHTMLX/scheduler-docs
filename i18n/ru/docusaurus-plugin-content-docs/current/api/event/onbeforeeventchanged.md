---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged event"
description: "вызывается, когда событие изменено с помощью drag-n-drop, но изменения ещё не сохранены."
---

# onBeforeEventChanged

### Description

@short: Вызывается, когда событие изменено с помощью drag-n-drop, но изменения ещё не сохранены.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - объект данных элемента после изменений
- `e` - (required) *Event* - нативный объект события
- `is_new` - (required) *boolean* - возвращает 'true' если пользователь изменяет новое событие; 'false' если редактируемое событие уже существует
- `original` - (required) *object* - объект данных события до изменений

### Returns
- `result` - (boolean) - определяет, будет ли триггериться действие по умолчанию события (`true`) или будет отменено (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", (ev, e, is_new, original) => {
    // здесь можно добавить кастомную логику
    return true;
});
~~~


### Details

Событие возникает, когда добавляется новое событие или существующее изменяется перетаскиванием (drag-n-drop).

- Учтите, что первый параметр обработчика принимает сам объект элемента данных, а не ID этого элемента, потому что вновь созданные элементы данных могут ещё не иметь ID.
- Неизменённое событие будет пустым объектом при создании новых элементов данных.
- Событие можно заблокировать: возвращение `false` из обработчика предотвратит обновление данных.