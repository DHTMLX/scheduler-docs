---
title: "Режим только для чтения"
sidebar_label: "Режим только для чтения"
---

# Режим только для чтения

В этой части мы рассмотрим режим только для чтения в контексте 4 ситуаций:

1. [Режим только для чтения всего планировщика](guides/readonly.md#read-only-mode-for-the-entire-scheduler);
2. [Режим только для чтения всего lightbox](guides/readonly.md#read-only-mode-for-the-entire-lightbox);
3. [Режим только для чтения секции lightbox](guides/readonly.md#read-only-mode-for-a-lightboxs-section);
4. [Режим только для чтения конкретных событий](guides/readonly.md#read-only-mode-for-specific-events).

## Режим только для чтения всего планировщика

Чтобы сделать весь планировщик доступным только для чтения, установите опцию [`readonly`](api/config/readonly.md) в значение `true`.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~

Имейте в виду, что когда весь планировщик находится в режиме только для чтения, пользователи не смогут открыть lightbox.


## Режим только для чтения всего lightbox

Чтобы оставить пользователям возможность открыть lightbox, но запретить редактирование внутри него, установите опцию [`readonly_form`](api/config/readonly_form.md) в значение `true`:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here', new Date(2027, 5, 11), "month");
~~~


:::note
Опция [`readonly`] доступна в расширении [readonly](guides/extensions-list.md#readonly), и чтобы использовать её, включите расширение на странице.
:::

### Связанные примеры
- [Lightbox только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Режим только для чтения секции lightbox

Чтобы сделать конкретную секцию lightbox доступной только для чтения, используйте свойство `disabled` DOM-элемента соответствующего объекта секции:

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
Примечание: вы ссылаетесь на секцию через её тип, и все секции, имеющие этот тип, будут одновременно доступны только для чтения.
:::

## Режим только для чтения конкретных событий

Чтобы сделать конкретные события доступными только для чтения, добавьте к ним свойство `readonly` и установите его в `true`:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Эта возможность является частью расширения [readonly](guides/extensions-list.md#readonly), поэтому не забудьте включить это расширение на вашей странице.
:::

### Связанные примеры
- [События только для чтения](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)