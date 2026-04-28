---
title: "Anpassen der 'Select' und 'Edit' Leisten"
sidebar_label: "Anpassen der 'Select' und 'Edit' Leisten"
---

# Anpassen der "Select" und "Edit" Leisten

dhtmlxScheduler bietet die Möglichkeit, eine benutzerdefinierte Menge von Schaltflächen für die Bearbeitungs- und Auswahlleisten zu definieren.

## Die Auswahlleiste

Standardmäßig enthält die Auswahlleiste drei Schaltflächen ('Details', 'Bearbeiten', 'Löschen'), die durch die [icons_select](api/config/icons_select.md) Konfigurationsoption festgelegt werden.

~~~js
scheduler.config.icons_select = [
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~


### Verwendungsbeispiel

Betrachten wir die unten gezeigte Auswahlleiste:
  
![select_bar.png](/img/select_bar.png)

Zu den vorhandenen Schaltflächen haben wir eine neue hinzugefügt - **Location**.

Hier sind unsere Schritte:

-  Definieren Sie [icons_select](api/config/icons_select.md) wie folgt:
  
~~~js
scheduler.config.icons_select = [
   "icon_location",
   "icon_details",
   "icon_edit",
   "icon_delete"
];
~~~

:::note
Hinweis: Jeder Button muss mit "icon_" beginnen.
 ::: 


-  Legen Sie die Beschriftung für den neuen Button fest:
  
~~~js
scheduler.locale.labels.icon_location = "Location";
~~~

-  Legen Sie die CSS-Klasse für den Button fest:
  
~~~js
.dhx_menu_icon.icon_location{
  background-image: url('location_icon.png');  
} 
~~~


-  Definieren Sie den Handler, der Klicks auf den Button verarbeitet:
  
~~~js
scheduler._click.buttons.location = function(id){
   some_function(id);
};
~~~

wobei scheduler._click.buttons die Sammlung der onClick-Handler für die Buttons der Leiste enthält. 'location' ist der Name des Buttons, der in [icons_edit](api/config/icons_edit.md) nach dem 'icon_'-Teil festgelegt wird.


## Die Bearbeitungsleiste

Im Allgemeinen enthält die Bearbeitungsleiste zwei Schaltflächen ('Speichern', 'Abbrechen'), die durch die [icons_edit](api/config/icons_edit.md) Konfigurationsoption festgelegt werden.

~~~js
scheduler.config.icons_edit = [
   "icon_save",
   "icon_cancel"
];
~~~


### Verwendungsbeispiel

Betrachten wir die unten gezeigte Bearbeitungsleiste:
  
![customizing_edit_bar.png](/img/customizing_edit_bar.png)

Zu den Buttons Speichern und Abbrechen haben wir eine neue hinzugefügt – Info.
Hier sind unsere Schritte:

-  Definieren Sie [icons_edit](api/config/icons_edit.md) wie folgt:
  
~~~js
scheduler.config.icons_edit = [
   "icon_custom",
   "icon_save",
   "icon_cancel"
];
~~~

-  Legen Sie die Beschriftung für den neuen Button fest:
  
~~~js
scheduler.locale.labels.icon_custom = "Info";
~~~

-  Legen Sie die CSS-Klasse für den Button fest:
  
~~~js
.dhx_menu_icon.icon_custom{
  background-image: url('info_icon.png');  
} 
~~~


-  Definieren Sie den Handler, der Klicks auf den Button verarbeitet:
  
~~~js
scheduler._click.buttons.custom = function(id){
   some_function;
};
~~~

wobei scheduler._click.buttons die Sammlung der onClick-Handler für die Buttons der Leiste enthält. 'custom' ist der Name des Buttons, der in [icons_edit](api/config/icons_edit.md) nach dem 'icon_'-Teil festgelegt wird.
 

## Dynamische Änderung der Leisten-Elemente

Die Buttons der Bearbeitungs- und Auswahlleisten können je nach Bedingung dynamisch geändert werden. 

Zum Beispiel besitzen Ihre Ereignisse eine benutzerdefinierte boolesche Eigenschaft important, die angibt, ob das Ereignis wichtig ist und vom Benutzer nicht gelöscht werden kann.
Je nach Wert dieser Eigenschaft möchten Sie den 'delete'-Button in der Auswahlleiste ausblenden bzw. anzeigen. Um ein solches Verhalten zu ermöglichen, verwenden Sie folgende Vorgehensweise:

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