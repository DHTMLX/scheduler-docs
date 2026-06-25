---
sidebar_label: formSection
title: "formSection method"
description: "предоставляет доступ к объектам разделов lightbox"
---

# formSection

### Description

@short: Предоставляет доступ к объектам секций lightbox

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - имя секции lightbox

### Returns
- ` config` - (object) - объект секции (см. члены объекта ниже)

### Example

~~~jsx
const time = scheduler.formSection('time');
const descr = scheduler.formSection('description');

// получение значения
const value = time.getValue();
const value1 = descr.getValue();

// установка значения
descr.setValue('abc'); //для секций с одним контролом
time.setValue(null,{start_date:new Date(2026,03,10),end_date:new Date(2027,03,10)}); 
//for multi-control sections:the 1st parameter is 'null', 2nd - a data object
~~~

### Related samples
- [Связывание элементов управления с выпадающими списками в lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

Объект секции включает следующие члены:

## Properties

- **section** - (*object*) конфигурационный объект раздела
  - **id** -  (*string*) идентификатор раздела
  - **name** - (*string*) имя раздела. В соответствии с именем планировщик берет метку для раздела из коллекции **locale.labels**. Например, для раздела 'time' метка будет взята как **scheduler.locale.labels.section_time**
  - **height** - (*number*) высота раздела
  - **map_to** - (*string*) имя свойства, сопоставленного с редактором
- **control** - (*HTML collection*) HTML-collection — коллекция элементов управления, используемых в разделе  

## Methods

- **getValue()** - возвращает объект с данными раздела
- **setValue()** - устанавливает значения для раздела. В качестве параметра метод принимает значение (или объект значений, если у раздела несколько элементов управления), которое должно быть установлено