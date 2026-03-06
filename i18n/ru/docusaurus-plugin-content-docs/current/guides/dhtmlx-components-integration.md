---
title: "Операции Drag-and-Drop"
sidebar_label: "Операции Drag-and-Drop"
---

# Операции Drag-and-Drop

Библиотека включает расширение **outerdrag**, которое позволяет создавать новые события путем перетаскивания элементов из внешних компонентов DHTMLX или других планировщиков.

## Перетаскивание из внешних компонентов {#draggingfromexternalcomponents}

Когда элемент перетаскивается из внешнего источника в планировщик, планировщик автоматически открывает lightbox для создания нового события.


![external_dnd](/img/external_dnd.png)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Вот как работает внешнее drag-and-drop с компонентом <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a>.

Чтобы интегрировать планировщик с <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a>, выполните следующие шаги:

1. Скачайте пакет dhtmlxTree и распакуйте его содержимое в корневую папку вашего приложения.
2. Добавьте необходимые файлы js и css на страницу:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. Активируйте расширение outerdrag:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. Инициализируйте компонент dhtmlxTree (инструкции здесь):
~~~js
var tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. Включите drag-and-drop в компоненте dhtmlxTree (инструкции здесь):
~~~js
tree.enableDragAndDrop(true);
~~~
6. Инициализируйте и настройте планировщик:
~~~js
...
scheduler.init('scheduler_here', new Date(2019, 5, 30), "timeline");
~~~
7. Добавьте обработчик события [onExternalDragIn](api/event/onexternaldragin.md), чтобы определить, как текст перетаскиваемого элемента будет присвоен событию:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    var label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});
~~~


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


После этой настройки создание новых событий с данными из дерева становится простым - просто перетащите нужный узел.

## Перетаскивание между планировщиками {#draganddropbetweenschedulers}

:::note
Эта функция доступна только для лицензий Commercial (с 6 октября 2021), Enterprise и Ultimate.
:::

При отображении [нескольких планировщиков на странице](guides/multiple-per-page.md) можно включить drag-and-drop между ними, что позволяет перемещать события из одного планировщика в другой без лишних действий.

Чтобы включить поддержку drag-and-drop между планировщиками, подключите расширение "**drag_between**":

~~~js title="Включение поддержки drag-and-drop для нескольких планировщиков"
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
</script>
~~~

Пример можно найти в файле **"samples/20_multiple/06_drag_between_layout.html"**, входящем в [пакет Scheduler PRO](https://dhtmlx.com/docs/products/dhtmlxScheduler/).

### Ограничение перетаскивания событий из/в планировщик
Чтобы запретить перетаскивание событий из планировщика, установите свойство [drag_out](api/config/drag_out.md) в *false*:

~~~js
scheduler.config.drag_out = false; // запретить перетаскивание событий из этого планировщика /*!*/
scheduler.init('scheduler_here',new Date(2019, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~


Чтобы запретить перетаскивание событий в планировщик, установите свойство [drag_in](api/config/drag_in.md) в *false*:

~~~js
scheduler.init('scheduler_here',new Date(2019, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // запретить перетаскивание событий в этот планировщик /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2019, 5, 30),"week");
~~~

Пример **"samples/20_multiple/06_drag_between_layout.html"** доступен в [пакете Scheduler PRO](https://dhtmlx.com/docs/products/dhtmlxScheduler/).

### События перетаскивания

- [onBeforeEventDragOut](api/event/onbeforeeventdragout.md) - вызывается перед тем, как событие будет перетащено из планировщика
- [onEventDragOut](api/event/oneventdragout.md) - вызывается, когда событие перетаскивается из планировщика
- [onBeforeEventDragIn](api/event/onbeforeeventdragin.md) - вызывается перед тем, как перетаскиваемое событие попадет в планировщик
- [onEventDragIn](api/event/oneventdragin.md) - вызывается, когда перетаскиваемое событие перемещается по планировщику
- [onEventDropOut](api/event/oneventdropout.md) - вызывается, когда перетаскиваемое событие сбрасывается за пределами области планировщика
