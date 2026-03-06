---
title: "Anpassen der 'Select'- und 'Edit'-Leisten"
sidebar_label: "Anpassen der 'Select'- und 'Edit'-Leisten"
---

# Anpassen der "Select"- und "Edit"-Leisten

dhtmlxScheduler ermöglicht es Ihnen, eine individuelle Sammlung von Buttons sowohl für die Edit- als auch die Select-Leiste zu konfigurieren.

## Die Select-Leiste

Standardmäßig enthält die Select-Leiste 3 Buttons ('Details', 'Edit', 'Delete'), die über die Option [icons_select](api/config/icons_select.md) definiert werden.

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

### Anwendungsbeispiel

Hier sehen Sie eine Beispiel-Select-Leiste wie im untenstehenden Bild dargestellt:

![select_bar.png](/img/select_bar.png)

Ein neuer Button mit dem Namen **Location** wurde zu den bestehenden Buttons hinzugefügt.

Die Schritte hierfür sind:

- Aktualisieren Sie [icons_select](api/config/icons_select.md) wie folgt:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];

~~~
 
:::note
Beachten Sie, jeder Button muss mit "icon_" beginnen
::: 

- Definieren Sie das Label für den neuen Button:
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

- Weisen Sie die CSS-Klasse für den Button zu:
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~

- Definieren Sie den Click-Handler für den Button:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~
 
Hier enthält **scheduler._click.buttons** die onClick-Handler für die Buttons der Leiste. Der Schlüssel 'location' entspricht dem Button-Namen aus [icons_select](api/config/icons_select.md), jedoch ohne das Präfix 'icon_'.

## Die Edit-Leiste

In der Regel verfügt die Edit-Leiste über 2 Buttons ('Save' und 'Cancel'), die über die Option [icons_edit](api/config/icons_edit.md) konfiguriert werden.

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~

### Anwendungsbeispiel

Betrachten Sie die untenstehende Edit-Leiste:

![customizing_edit_bar.png](/img/customizing_edit_bar.png)

Zusätzlich zu den Buttons **Save** und **Cancel** wurde ein neuer **Info**-Button hinzugefügt.
Das Vorgehen ist:

- Aktualisieren Sie [icons_edit](api/config/icons_edit.md) wie folgt:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

- Setzen Sie das Label für den neuen Button:
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

- Definieren Sie die CSS-Klasse für den Button:
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~

- Geben Sie den Click-Handler für den Button an:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

Auch hier enthält **scheduler._click.buttons** die Click-Handler für die Buttons, und 'custom' entspricht dem Button-Namen aus [icons_edit](api/config/icons_edit.md) nach Entfernen des Präfixes 'icon_'.
 

## Dynamisches Ändern der Elemente der Leisten

Es ist möglich, die Buttons der Edit- und Select-Leisten dynamisch anhand bestimmter Bedingungen zu ändern.

Wenn Ihre Events beispielsweise eine boolesche Eigenschaft **important** haben, die angibt, dass das Event kritisch ist und nicht gelöscht werden soll, können Sie den 'delete'-Button in der Select-Leiste entsprechend ein- oder ausblenden. So geht's:

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
