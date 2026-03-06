---
title: "Контролы Lightbox"
sidebar_label: "Контролы Lightbox"
---

# Контролы Lightbox

Lightbox - это форма редактирования, предназначенная для изменения деталей события. Стандартный Lightbox показан на изображении ниже.

![lightbox](/img/lightbox.png)

## Структура Lightbox

### Секции
Макет Lightbox определяется свойством **sections** объекта [lightbox](api/config/lightbox.md):

~~~js
// стандартное определение lightbox
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Каждый элемент массива **sections** - это объект, который определяет отдельную секцию внутри Lightbox ([доступные свойства секций](api/config/lightbox.md)).


### Контролы секций
Каждая секция в Lightbox строится вокруг определённого контрола. В Lightbox можно использовать следующие типы контролов:

- [Textarea](guides/textarea.md) - многострочное текстовое поле ввода
- [Время и дата](guides/time.md) - пара селекторов дат для указания диапазона времени
- [Select](guides/select.md) - выпадающий список с одиночным выбором
- [Template](guides/template.md) - контейнер для HTML-контента
- [Multiselect](guides/multiselect.md) - группа чекбоксов
- [Чекбокс](guides/checkbox.md) - двухсостояний чекбокс
- [Radio](guides/radio.md) - набор радиокнопок
- [Combo](guides/combo.md) - комбобокс, реализованный с помощью компонента DHTMLX Combo

:::note
Имейте в виду, что независимо от используемой комбинации редакторов, редактор 'time' всегда должен располагаться последним в Lightbox.
:::

~~~js
{name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
    {key:"", label:"Do not repeat"},
    {key:"day", label:"Each day"},
    {key:"week", label:"Each week"},
    {key:"month", label:"Each month"}
]}
~~~
