---
title: "Ändern von Buttons im Lightbox"
sidebar_label: "Ändern von Buttons im Lightbox"
---

# Ändern von Buttons im Lightbox

Es ist möglich, die Standard-Buttons im Lightbox anzupassen.

![lightbox_buttons](/img/lightbox_buttons.png)

Beginnen wir mit der Sammlung, in der diese Buttons verwaltet werden.


Standardmäßig enthält das Lightbox drei Buttons ('Save', 'Cancel', 'Delete'), die über die Konfigurationsoptionen [buttons_left](api/config/buttons_left.md) und [buttons_right](api/config/buttons_right.md) gesteuert werden.

~~~js
scheduler.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
scheduler.config.buttons_right = ["dhx_delete_btn"];
~~~

Um die Standard-Button-Sets zu aktualisieren, gehen Sie wie folgt vor:


1. Fügen Sie neue Einträge zu den Arrays **buttons_left** oder **buttons_right** hinzu, zum Beispiel:

~~~js
scheduler.config.buttons_left = ["dhx_save_btn","dhx_cancel_btn","locate_button"];
~~~

2. Definieren Sie das Label für den Button auf folgende Weise:

~~~js
scheduler.locale.labels["locate_button"] = "Location";
~~~

3. Passen Sie die Button-Farben an, indem Sie den Selektor **(buttonName)_set** ansprechen. Beispiel:

~~~js
.dhx_save_btn_set{
    background-color:#4CAF50;
}
~~~

**Related sample** [Custom Color for Buttons](https://snippet.dhtmlx.com/1sjwldpb)


4. Weisen Sie einem Button ein Icon zu (oder wenden Sie andere Styles an), indem Sie die CSS-Klasse wie folgt angeben:

~~~js
.locate_button
{
    background-image:url('../../codebase/imgs/location.gif');
    background-position: -2px 0px;
    width:20px;
}
~~~

5. Implementieren Sie den Handler [onLightboxButton](api/event/onlightboxbutton.md), um Klicks auf die Buttons zu verarbeiten, wie hier gezeigt:

~~~js
scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
    if(button_id == "locate_button"){
        alert("Location!");
    }
});
~~~
