---
sidebar_label: "formSection"
title: "formSection method"
description: "提供对lightbox sections对象的访问"
---

# formSection

### Description

@short: 提供对lightbox sections对象的访问

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - lightbox section的名称

### Returns
- ` config` - (object) - section对象（见下方对象成员）

### Example

~~~jsx
const time = scheduler.formSection('time');  
const descr = scheduler.formSection('description');  

//获取值  
const value = time.getValue();  
const value1 = descr.getValue();  

//赋值  
descr.setValue('abc'); //针对只有单个控件的section  
time.setValue(null,{start_date:new Date(2025,03,10),end_date:new Date(2027,03,10)});  
//针对含有多个控件的section：第一个参数为null，第二个为数据对象
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

section对象包含以下成员:

### 属性

- **section** - (*object*) section的配置对象  
  - **id** -  (*string*) section的id  
  - **name** - (*string*) section的名称。scheduler使用此名称从**locale.labels**集合中获取对应的label。例如，对于'time' section，label来源于**scheduler.locale.labels.section_time**  
  - **height** - (*number*) section的高度  
  - **map_to** - (*string*) 映射到编辑器的属性名  
- **control** - (*HTML collection*) section中使用的控件集合  

### 方法

- **getValue()** - 返回包含section数据的对象  
- **setValue()** - 给section赋值。该方法接受一个值（如果section有多个控件，则接受包含多个值的对象）进行设置
