---
title: "Schreibgeschützter Modus"
sidebar_label: "Schreibgeschützter Modus"
---

# Schreibgeschützter Modus

In diesem Abschnitt wird der schreibgeschützte Modus in vier verschiedenen Szenarien behandelt:

1. [Schreibgeschützter Modus für den gesamten Scheduler](guides/readonly.md#readonlymodefortheentirescheduler);
2. [Schreibgeschützter Modus für das gesamte Lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [Schreibgeschützter Modus für einen Abschnitt des Lightbox](guides/readonly.md#readonlymodeforalighboxssection);
4. [Schreibgeschützter Modus für bestimmte Ereignisse](guides/readonly.md#readonlymodeforspecificevents).

## Schreibgeschützter Modus für den gesamten Scheduler {#readonlymodefortheentirescheduler}

Um den gesamten Scheduler auf schreibgeschützt zu setzen, weisen Sie einfach die Option [readonly](api/config/readonly.md) auf *true* zu.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~
Beachten Sie, dass Benutzer das Lightbox nicht öffnen können, wenn der gesamte Scheduler schreibgeschützt ist.


## Schreibgeschützter Modus für das gesamte Lightbox {#read-only-mode-for-the-entire-lightbox}

Wenn Sie möchten, dass Benutzer das Lightbox öffnen, aber keine Änderungen darin vornehmen können, setzen Sie die Option [readonly_form](api/config/readonly_form.md) auf *true*:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~

:::note
Die Option [readonly](api/config/readonly.md) ist Teil der [readonly](guides/extensions-list.md#readonly) Erweiterung. Stellen Sie daher sicher, dass diese Erweiterung auf Ihrer Seite aktiviert ist.
:::


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Schreibgeschützter Modus für einen Abschnitt des Lightbox {#readonlymodeforalighboxssection}

Um nur einen bestimmten Abschnitt des Lightbox schreibgeschützt zu machen, verwenden Sie die Eigenschaft 'disabled' am DOM-Element dieses Abschnitts:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   var section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
Beachten Sie, dass Sie sich auf den Abschnitt anhand seines Typs beziehen. Daher werden alle Abschnitte mit diesem Typ gleichzeitig schreibgeschützt.
:::

## Schreibgeschützter Modus für bestimmte Ereignisse {#readonlymodeforspecificevents}

Um bestimmte Ereignisse schreibgeschützt zu machen, fügen Sie ihnen eine 'readonly'-Eigenschaft hinzu und setzen Sie diese auf true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Diese Funktion ist Teil der [readonly](guides/extensions-list.md#readonly) Erweiterung. Stellen Sie daher sicher, dass diese Erweiterung auf Ihrer Seite aktiviert ist.
:::


[Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)
