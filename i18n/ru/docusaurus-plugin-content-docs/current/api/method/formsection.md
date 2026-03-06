---
sidebar_label: "formSection"
title: "formSection method"
description: "предоставляет доступ к объектам секций лайтбокса"
---

# formSection

### Description

@short: Предоставляет доступ к объектам секций лайтбокса

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - имя секции лайтбокса

### Returns
- ` config` - (object) - объект секции (см. члены объекта ниже)

### Example

~~~jsx
var time = scheduler.formSection('time');
var descr = scheduler.formSection('description');

//получение значения
var value = time.getValue();
var value1 = descr.getValue();

//установка значения
descr.setValue('abc'); //для секций с одним контролом
time.setValue(null,{start_date:new Date(2009,03,10),end_date:new Date(2012,03,10)}); 
//для секций с несколькими контролами: первый параметр — 'null', второй — объект с данными
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

Объект секции включает следующие члены:

## Свойства

- **section** - (*object*) объект конфигурации секции
  - **id** -  (*string*) id секции
  - **name** - (*string*) имя секции. Scheduler использует это имя для получения label из коллекции **locale.labels**. Например, для секции 'time' 
  label берётся из **scheduler.locale.labels.section_time**
  - **height** - (*number*) высота секции
  - **map_to** - (*string*) имя свойства, связанного с редактором
- **control** - (*HTML collection*) коллекция контролов, используемых внутри секции  
## Методы

- **getValue()** - возвращает объект с данными секции
- **setValue()** - присваивает значение(я) секции. Метод принимает значение (или объект с несколькими значениями, если в секции несколько контролов) для установки
