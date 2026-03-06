---
sidebar_label: "onEventSave"
title: "onEventSave event"
description: "срабатывает, когда пользователь нажимает кнопку «сохранить» в лайтбоксе (форме редактирования)"
---

# onEventSave

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «сохранить» в лайтбоксе (форме редактирования)

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - id события
- `ev` - (required) *object* - промежуточный объект события, содержащий значения из лайтбокса
- `is_new` - (required) *Date* - возвращает дату создания события, если сохраняется новое событие; иначе <i>null</i>, если событие уже существует

### Returns
- ` result` - (boolean) - определяет, должна ли выполняться стандартная операция сохранения события (<b>true</b>) или быть отменена (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventSave",function(id,ev,is_new){
    if (!ev.text) {
        alert("Text must not be empty");
        return false;
    }
    if (!ev.text.length<20) {
        alert("Text too small");
        return false;
    }
    return true;
})
~~~

### Related samples
- [Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)

### Details

Это событие можно заблокировать, оно полезно для валидации. Возврат *false* предотвратит стандартный процесс сохранения.

Учтите:

- Когда это событие срабатывает, значения из лайтбокса ещё не применены к исходному событию, поэтому <code>scheduler.getEvent(id)</code> возвращает событие в его исходном состоянии.
- Объект 'ev' включает только те свойства, которые соответствуют полям ввода, присутствующим в лайтбоксе; например, если в лайтбоксе только одно поле, 'ev' будет содержать только это одно свойство.
