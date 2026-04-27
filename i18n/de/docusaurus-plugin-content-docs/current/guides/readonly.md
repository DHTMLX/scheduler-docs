---
title: "Schreibgeschützter Modus"
sidebar_label: "Schreibgeschützter Modus"
---

# Schreibgeschützter Modus

In diesem Abschnitt betrachten wir den Nur-Lese-Modus im Kontext von vier Situationen:

1. [Nur-Lese-Modus für den gesamten Scheduler](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [Nur-Lese-Modus für die gesamte Lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [Nur-Lese-Modus für einen Abschnitt der Lightbox](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [Nur-Lese-Modus für bestimmte Ereignisse](guides/readonly.md#read-only-mode-for-specific-events).

## Nur-Lese-Modus für den gesamten Scheduler

Um den gesamten Scheduler schreibgeschützt zu machen, setzen Sie die [readonly](api/config/readonly.md) Option auf *true*.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~
Hinweis: Wenn der gesamte Scheduler nicht bearbeitbar ist, können Benutzer die Lightbox nicht öffnen.

## Nur-Lese-Modus für die gesamte Lightbox

Damit Benutzern die Möglichkeit bleibt, die Lightbox zu öffnen, aber jegliche Bearbeitung darin zu verbieten, setzen Sie die [readonly_form](api/config/readonly_form.md) Option auf *true*:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2027, 5,11),"month");
~~~

:::note
Hinweis: Die [readonly](api/config/readonly.md) Option wird in der [readonly](guides/extensions-list.md#readonly) Erweiterung bereitgestellt, und um sie zu verwenden, aktivieren Sie die Erweiterung auf der Seite.
:::

[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

## Nur-Lese-Modus für einen Abschnitt der Lightbox

Um einen bestimmten Abschnitt der Lightbox schreibgeschützt zu machen, verwenden Sie die 'disabled'-Eigenschaft eines DOM-Elements des zugehörigen Abschnittsobjekts:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.attachEvent("onLightbox", function(){
   const section = scheduler.formSection("description");
   section.control.disabled = true;
});
~~~

:::note
Hinweis: Sie beziehen sich auf den Abschnitt über seinen Typ, und alle Abschnitte, die diesen Typ haben, werden auf einmal schreibgeschützt sein
:::

## Nur-Lese-Modus für bestimmte Ereignisse

Um bestimmte Ereignisse schreibgeschützt zu machen, fügen Sie ihnen die Eigenschaft readonly hinzu und setzen Sie sie auf true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Die Funktionalität wird durch die [readonly](guides/extensions-list.md#readonly) Erweiterung bereitgestellt und um sie zu verwenden, aktivieren Sie die Erweiterung auf der Seite.
:::

[Nur-Lese-Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)