---
sidebar_label: onEventSave
title: "onEventSave event"
description: "срабатывает, когда пользователь нажимает кнопку «Сохранить» в lightbox (форме редактирования)"
---

# onEventSave

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «Сохранить» в lightbox (форме редактирования)

@signature: onEventSave: (id: string, ev: object, original_ev: object) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - промежуточный объект события, содержащий значения lightbox.
- `is_new` - (required) *Date* - возвращает дату создания события (то есть текущую дату), если пользователь сохраняет новое событие.  <i>null</i> - если сохраняемое событие уже существует

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

Событие блокируемое и может использоваться для валидации. Возвратите *false* чтобы отменить обработку по умолчанию.

Обратите внимание:

- Когда событие срабатывает - значения, заданные в lightbox, ещё не применены к исходному событию, и <code>scheduler.getEvent(id)</code> вернет вам неизмененный экземпляр. 
- Объект 'ev' будет содержать только те значения, которые устанавливаются lightbox, то есть если в lightbox есть всего один input - у объекта 'ev' будет определено только одно свойство