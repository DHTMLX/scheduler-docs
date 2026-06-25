---
title: "Read-only Mode"
sidebar_label: "Read-only Mode"
---

# Read-only Mode

In this part we want to consider read-only mode in the context of 4 situations:

1. [Read-only mode for the entire scheduler](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [Read-only mode for the entire lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [Read-only mode for a lightbox's section](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [Read-only mode for specific events](guides/readonly.md#read-only-mode-for-specific-events).

## Read-only mode for the entire scheduler

To make the entire scheduler read-only, set the [`readonly`](api/config/readonly.md) option to `true`.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

Note, when the entire scheduler is non-editable, users can't open the lightbox.


## Read-only mode for the entire lightbox

To leave for users the possibility to open the lightbox, but to forbid any editing inside it, set the [`readonly_form`](api/config/readonly_form.md) option to `true`:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

:::note
The [`readonly`](api/config/readonly.md) option is provided in the [readonly](guides/extensions-list.md#readonly) extension, and to use it, enable the extension on the page.
:::

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Read-only mode for a lightbox's section

To make a specific lightbox's section read-only, use the `disabled` property of a DOM element of the related section object:

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
Note, you refer to the section through its type, and all sections that have this type will be read-only at once.
:::

## Read-only mode for specific events

To make specific events read-only, add the `readonly` property to them and set it to `true`:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
The functionality is provided in the [readonly](guides/extensions-list.md#readonly) extension, and to use it, enable the extension on the page.
:::

### Related samples
- [Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)
