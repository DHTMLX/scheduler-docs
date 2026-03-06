---
title: "Чекбокс"
sidebar_label: "Чекбокс"
---

# Чекбокс 

Простой чекбокс с двумя состояниями.

![checkbox_editor](/img/checkbox_editor.png)

~~~js        
scheduler.locale.labels.section_checkme = "Я собираюсь участвовать";     
            
scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"checkme", map_to:"participation", type:"checkbox", 
    checked_value: "registrable", unchecked_value: "unchecked", height:40 },
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## Инициализация

Чтобы добавить элемент управления Checkbox в lightbox, выполните следующие шаги:

1. Включите расширение **editors** на странице:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Добавьте секцию checkbox в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"checkme", map_to:"single_checkbox", type:"checkbox", 
    checked_value: "registrable", height:40},
    { name:"time", ...}
];
~~~
3. Задайте метку для секции checkbox:
~~~js
scheduler.locale.labels.section_checkme = "Я собираюсь участвовать"; 
~~~
  

[Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)


## Свойства

Ниже приведены основные свойства, которые часто используются с контролом 'checkbox' (полный список смотрите [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) идентификатор секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) свойство данных, связанное с этой секцией</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип контрола секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>checked_value</b></td>
  <td>(<i>boolean</i>) значение, присваиваемое при установленном чекбоксе. Необязательный параметр, по умолчанию <i>true</i></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unchecked_value</b></td>
  <td>(<i>boolean</i>) значение, присваиваемое при снятом чекбоксе. Необязательный параметр, по умолчанию <i>false</i></td>
  </tr>
  </tbody>
</table>
