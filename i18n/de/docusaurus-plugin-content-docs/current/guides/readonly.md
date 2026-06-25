---
title: "Nur-Lese-Modus"
sidebar_label: "Nur-Lese-Modus"
---

# Nur-Lese-Modus

In diesem Abschnitt möchten wir den Nur-Lese-Modus im Kontext von vier Situationen betrachten:

1. [Nur-Lese-Modus für den gesamten Scheduler](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [Nur-Lese-Modus für die gesamte Lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [Nur-Lese-Modus für einen Abschnitt der Lightbox](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [Nur-Lese-Modus für bestimmte Ereignisse](guides/readonly.md#read-only-mode-for-specific-events).

## Nur-Lese-Modus für den gesamten Scheduler

Um den gesamten Scheduler schreibgeschützt zu machen, setzen Sie die Option [`readonly`](api/config/readonly.md) auf `true`.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

Hinweis: Wenn der gesamte Scheduler nicht bearbeitbar ist, können Benutzer die Lightbox nicht öffnen.

## Nur-Lese-Modus für die gesamte Lightbox

Um den Benutzern die Möglichkeit zu geben, die Lightbox zu öffnen, Bearbeiten darin jedoch zu verhindern, setzen Sie die Option [`readonly_form`](api/config/readonly_form.md) auf `true`:

~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

:::note
Die [`readonly`](api/config/readonly.md) Option wird in der [readonly](guides/extensions-list.md#readonly) Erweiterung bereitgestellt, und um sie zu verwenden, aktivieren Sie die Erweiterung auf der Seite.
:::

### Verwandte Beispiele
- [Nur-Lese-Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Nur-Lese-Modus für einen Abschnitt der Lightbox

Um einen bestimmten Abschnitt der Lightbox schreibgeschützt zu machen, verwenden Sie die `disabled`-Eigenschaft eines DOM-Elements des zugehörigen Abschnittsobjekts:

~~~js
scheduler.config.lightbox.sections = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, type: "time", map_to: "auto" }
];

scheduler.attachEvent("onLightbox", () => {
    const descriptionSection = scheduler.formSection("description");
    descriptionSection.control.disabled = true;
});
~~~

:::note
Hinweis: Sie beziehen sich auf den Abschnitt über seinen Typ, und alle Abschnitte, die diesen Typ haben, werden gleichzeitig schreibgeschützt.
:::

## Nur-Lese-Modus für bestimmte Ereignisse

Um bestimmte Ereignisse schreibgeschützt zu machen, fügen Sie ihnen die Eigenschaft `readonly` hinzu und setzen Sie sie auf `true`:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Die Funktionalität wird in der [readonly](guides/extensions-list.md#readonly) Erweiterung bereitgestellt, und um sie zu verwenden, aktivieren Sie die Erweiterung auf der Seite.
::: 

### Verwandte Beispiele
- [Nur-Lese-Ereignisse](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)