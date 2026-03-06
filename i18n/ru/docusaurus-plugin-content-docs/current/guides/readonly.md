---
title: "Режим только для чтения"
sidebar_label: "Режим только для чтения"
---

# Режим только для чтения

В этом разделе рассматривается режим только для чтения в четырёх различных сценариях:

1. [Режим только для чтения для всего планировщика](guides/readonly.md#readonlymodefortheentirescheduler);
2. [Режим только для чтения для всей lightbox](guides/readonly.md#readonlymodefortheentirelightbox);
3. [Режим только для чтения для секции lightbox](guides/readonly.md);
4. [Режим только для чтения для определённых событий](guides/readonly.md#readonlymodeforspecificevents).

## Режим только для чтения для всего планировщика {#readonlymodefortheentirescheduler}

Чтобы сделать весь планировщик доступным только для чтения, просто установите опцию [readonly](api/config/readonly.md) в *true*.

~~~js
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~
Имейте в виду, что когда весь планировщик находится в режиме только для чтения, пользователи не смогут открыть lightbox.


## Режим только для чтения для всей lightbox {#readonlymodefortheentirelightbox}

Если вы хотите, чтобы пользователи могли открывать lightbox, но не могли редактировать данные внутри неё, установите опцию [readonly_form](api/config/readonly_form.md) в *true*:


~~~js
scheduler.config.readonly_form = true;
...
scheduler.init('scheduler_here',new Date(2019, 5,11),"month");
~~~

:::note
Опция [readonly](api/config/readonly.md) работает с расширением [readonly](guides/extensions-list.md#readonly), поэтому убедитесь, что это расширение включено на вашей странице.
:::


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Режим только для чтения для секции lightbox {#readonlymodeforalightboxssection}

Чтобы сделать только одну секцию lightbox доступной только для чтения, используйте свойство 'disabled' у DOM-элемента этого объекта секции:

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
Обратите внимание, что вы обращаетесь к секции по её type, поэтому все секции с этим типом одновременно станут только для чтения.
:::

## Режим только для чтения для определённых событий {#readonlymodeforspecificevents}

Чтобы сделать определённые события только для чтения, добавьте им свойство 'readonly' и установите его в true:

~~~js
scheduler.getEvent(id).readonly = true;
~~~

:::note
Эта возможность является частью расширения [readonly](guides/extensions-list.md#readonly), поэтому не забудьте включить это расширение на вашей странице.
:::


[Read-only events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/14_readonly_event.html)
