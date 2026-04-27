--- 
title: "Режим только для чтения" 
sidebar_label: "Режим только для чтения" 
---

# Режим только для чтения

В этой части мы рассмотрим режим только для чтения в контексте четырех ситуаций:

1. [Режим только для чтения для всего планировщика](guides/readonly.md#read-only-mode-for-the-entire-scheduler);  
2. [Режим только для чтения для всего lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);  
3. [Режим только для чтения для раздела lightbox](guides/readonly.md#read-only-mode-for-a-lightboxs-section);  
4. [Режим только для чтения для конкретных событий](guides/readonly.md#read-only-mode-for-specific-events).

## Режим только для чтения для всего планировщика

Чтобы сделать весь планировщик доступным только для чтения, установите опцию [readonly](api/config/readonly.md) в значение *true*.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~
Примечание: когда весь планировщик недоступен для редактирования, пользователи не смогут открыть lightbox.

## Режим только для чтения для всего lightbox

Чтобы оставить пользователям возможность открыть lightbox, но запретить любые редактирования внутри него, установите опцию [readonly_form](api/config/readonly_form.md) в значение *true*:

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~

:::note
Опция [readonly] доступна в расширении [readonly], и чтобы использовать её, включите расширение на странице.
:::

[Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

## Режим только для чтения для раздела lightbox

Чтобы сделать конкретный раздел lightbox недоступным для редактирования, используйте свойство 'disabled' DOM-элемента связанного объекта раздела:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   const section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
Примечание: раздел вы ссылаетесь через его тип, и все разделы, имеющие этот тип, будут одновременно недоступны для редактирования.
:::

## Режим только для чтения для конкретных событий

Чтобы сделать конкретные события доступными только для чтения, добавьте к ним свойство 'read-only' и установите его в true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Функциональность доступна в расширении [readonly], и чтобы использовать её, подключите расширение на странице.
:::

[События только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)