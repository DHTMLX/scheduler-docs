---
title: "Изменение кнопок в Lightbox"
sidebar_label: "Изменение кнопок в Lightbox"
---

# Изменение кнопок в Lightbox

Можно настраивать стандартные кнопки в Lightbox.

![lightbox_buttons](/img/lightbox_buttons.png)

Начнем с коллекции, в которой управляются эти кнопки.


По умолчанию в Lightbox добавлены 3 кнопки ('Save', 'Cancel', 'Delete'), которые контролируются с помощью опций конфигурации [buttons_left](api/config/buttons_left.md) и [buttons_right](api/config/buttons_right.md).

~~~js
scheduler.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
scheduler.config.buttons_right = ["dhx_delete_btn"];
~~~

Чтобы изменить стандартный набор кнопок, выполните следующие шаги:


1. Добавьте новые элементы в массивы **buttons_left** или **buttons_right** следующим образом:

~~~js
scheduler.config.buttons_left = ["dhx_save_btn","dhx_cancel_btn","locate_button"];
~~~

2. Задайте подпись для кнопки следующим образом:

~~~js
scheduler.locale.labels["locate_button"] = "Location";
~~~

3. Настройте цвета кнопки, используя селектор **(buttonName)_set**. Например:

~~~js
.dhx_save_btn_set{
    background-color:#4CAF50;
}
~~~

**Related sample** [Custom Color for Buttons](https://snippet.dhtmlx.com/1sjwldpb)


4. Добавьте иконку к кнопке (или примените другие стили), указав CSS-класс следующим образом:

~~~js
.locate_button
{
    background-image:url('../../codebase/imgs/location.gif');
    background-position: -2px 0px;
    width:20px;
}
~~~

5. Реализуйте обработчик события [onLightboxButton](api/event/onlightboxbutton.md) для обработки кликов по кнопке, как показано ниже:

~~~js
scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
    if(button_id == "locate_button"){
        alert("Location!");
    }
});
~~~
