---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged event"
description: "срабатывает, когда событие изменено перетаскиванием, но изменения ещё не сохранены."
---

# onBeforeEventChanged

### Description

@short: Срабатывает, когда событие изменено перетаскиванием, но изменения ещё не сохранены.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - объект данных события после изменений
- `e` - (required) *Event* - встроенный объект события
- `is_new` - (required) *boolean* - возвращает 'true', если пользователь изменяет новое событие. 'false' - если редактируемое <br> событие уже существует
- `original` - (required) *object* - объект данных события до изменений

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие возникает, когда добавляется новое "event" или существующее изменяется с помощью перетаскивания.

- Имейте в виду, что первый параметр обработчика принимает объект данных элемента, а не его идентификатор (поскольку новые элементы данных могут ещё не иметь ID).
- Неизменённое событие будет пустым объектом в случае создания новых элементов данных.
- Событие можно блокировать: возвращение *false* из обработчика предотвратит обновление данных.