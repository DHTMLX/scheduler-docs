---
title: "Кастомизация панелей 'Select' и 'Edit'"
sidebar_label: "Кастомизация панелей 'Select' и 'Edit'"
---

# Кастомизация панелей "Select" и "Edit"

dhtmlxScheduler позволяет настраивать собственный набор кнопок как для панели выбора (select bar), так и для панели редактирования (edit bar).

## Грид выбора (select bar)

По умолчанию грид выбора содержит 3 кнопки ('Details', 'Edit', 'Delete'), которые задаются через опцию конфигурации [icons_select](api/config/icons_select.md).

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

### Пример использования

Вот пример грида выбора, показанный на изображении ниже:
  
![select_bar.png](/img/select_bar.png)

К существующим кнопкам добавлена новая кнопка **Location**.

Шаги для реализации такого результата:

- Обновите [icons_select](api/config/icons_select.md) следующим образом:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~
 
:::note
Обратите внимание, каждая кнопка должна начинаться с "icon_"
:::


- Задайте подпись для новой кнопки:
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

- Присвойте CSS-класс для кнопки:
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

- Определите обработчик клика для кнопки:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~
 
Здесь **scheduler._click.buttons** содержит обработчики onClick для кнопок панели. Ключ 'location' соответствует названию кнопки из [icons_select](api/config/icons_select.md) без префикса 'icon_'.

## Грид редактирования (edit bar)

Обычно грид редактирования содержит 2 кнопки ('Save' и 'Cancel'), которые настраиваются с помощью опции [icons_edit](api/config/icons_edit.md).

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~

### Пример использования

Рассмотрим грид редактирования, показанный на изображении ниже:
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

Помимо кнопок **Save** и **Cancel**, добавлена новая кнопка **Info**.
Порядок действий:

- Обновите [icons_edit](api/config/icons_edit.md) следующим образом:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

- Задайте подпись для новой кнопки:
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

- Определите CSS-класс для кнопки:
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

- Назначьте обработчик клика для кнопки:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

Снова, **scheduler._click.buttons** содержит обработчики кликов для кнопок, а 'custom' соответствует названию кнопки из [icons_edit](api/config/icons_edit.md) без префикса 'icon_'.
 

## Динамическое изменение элементов панели

Можно динамически изменять кнопки на панелях редактирования и выбора в зависимости от определённых условий.

Например, если у ваших событий есть булево свойство **important**, указывающее, что событие критично и не должно быть удалено, вы можете показывать или скрывать кнопку 'delete' на панели выбора соответствующим образом. Вот как это реализовать:

~~~js
scheduler.attachEvent("onClick", function(id){
    var event = scheduler.getEvent(id);
    if (event.important)
        scheduler.config.icons_select = ["icon_details"];
    else
        scheduler.config.icons_select = ["icon_details", "icon_delete"];

    return true;
});
~~~
