---
title: "Настройка панелей 'Select' и 'Edit'"
sidebar_label: "Настройка панелей 'Select' и 'Edit'"
---

# Настройка панелей "Select" и "Edit"

dhtmlxScheduler предоставляет возможность определить свой набор кнопок для панелей редактирования и выбора. 

## Панель выбора

По умолчанию панель выбора содержит 3 кнопки ('Details', 'Edit', 'Delete'), которые задаются конфигурационной опцией [icons_select](api/config/icons_select.md).

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~


### Пример использования

Рассмотрим панель выбора, изображенную на рисунке ниже:
  
![select_bar.png](/img/select_bar.png)

К существующим кнопкам мы добавили новую — **Location**.

Наши шаги:

-  Переопределите [icons_select](api/config/icons_select.md) как показано ниже:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];

~~~
 
:::note
Примечание: любая кнопка должна начинаться с "icon_"
::: 


-  Установите текст метки для новой кнопки:
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

-  Установите CSS‑класс для кнопки:
  
~~~css
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

-  Укажите обработчик кликов по кнопке:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~
 
где **scheduler._click.buttons** содержит коллекцию обработчиков onClick для кнопок панели. 'location' — имя кнопки, заданное в [icons_edit](api/config/icons_edit.md) после части 'icon_'.

## Панель редактирования

Как правило, панель редактирования содержит 2 кнопки ('Save' и 'Cancel'), которые задаются конфигурационной опцией [icons_edit](api/config/icons_edit.md).

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~


### Пример использования

Рассмотрим панель редактирования, изображенную на рисунке ниже:
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

К кнопкам **Save** и **Cancel** мы добавили новую кнопку - **Info**.
Вот наши шаги:

-  Переопределите [icons_edit](api/config/icons_edit.md) как в примере:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

-  Установите текст метки для новой кнопки:
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

-  Установите CSS‑класс для кнопки:
  
~~~css
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

-  Укажите обработчик кликов по кнопке:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

где **scheduler._click.buttons** содержит коллекцию обработчиков onClick для кнопок панели. 'custom' — имя кнопки, заданное в [icons_edit](api/config/icons_edit.md) после части 'icon_'.
 

## Динамическая смена элементов панелей

Кнопки панелей редактирования и выбора могут динамически изменяться в зависимости от условий. 

Например, у ваших событий есть пользовательское булево свойство **important**, которое указывает на то, что событие важно и не может быть удалено пользователем. 
В зависимости от значения этого свойства вы можете скрыть/показать кнопку 'delete' в панели выбора. Чтобы реализовать такое поведение, используйте следующую технику:

~~~js
scheduler.attachEvent("onClick", function(id){
    const event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~