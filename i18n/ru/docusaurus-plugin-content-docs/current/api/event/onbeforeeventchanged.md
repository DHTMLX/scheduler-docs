---
sidebar_label: "onBeforeEventChanged"
title: "onBeforeEventChanged event"
description: "срабатывает при изменении события через drag-and-drop, но изменения ещё не сохранены."
---

# onBeforeEventChanged

### Description

@short: Срабатывает при изменении события через drag-and-drop, но изменения ещё не сохранены.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - объект данных события после изменений
- `e` - (required) *Event* - нативный объект события
- `is_new` - (required) *boolean* - возвращает 'true', если пользователь изменяет новое событие; 'false', если редактирует существующее событие
- `original` - (required) *object* - объект данных события до изменений

### Returns
- ` result` - (boolean) - решает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    //любая пользовательская логика здесь
    return true;
});
~~~

### Details

Это событие вызывается каждый раз, когда новое событие добавляется или существующее событие обновляется через drag-and-drop.

- Учтите, что первый параметр в функции-обработчике - это сам объект данных элемента, а не просто его ID (поскольку у новых элементов ID может ещё не быть).
- При создании новых элементов данных неизменённое событие будет представлено пустым объектом.
- Событие можно отменить: возврат *false* из обработчика остановит обновление данных.
