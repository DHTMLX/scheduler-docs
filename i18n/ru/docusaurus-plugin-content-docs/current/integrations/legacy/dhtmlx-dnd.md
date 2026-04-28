---
title: "Перетаскивание из DHTMLX Suite v5.x"
sidebar_label: "Перетаскивание из DHTMLX Suite v5.x"
---

# Операции перетаскивания (устаревшее)

:::warning
Эта статья описывает устаревшую интеграцию. Если вы начинаете с нуля, см. интеграции с фреймворками или настройку на vanilla JS.
:::

Библиотека предоставляет расширение **outerdrag**, которое позволяет создавать новые события перетаскиванием элементов из внешних компонентов DHTMLX или других планировщиков. 

## Перетаскивание из внешних компонентов

Как только пользователь перетащит внешний элемент в планировщик, планировщик откроет окно lightbox для создания нового события.


![external_dnd](/img/external_dnd.png)


[Интеграция с dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Давайте рассмотрим внешнюю перетаскивание в контексте <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">компонента dhtmlxTree</a>.


Следуйте этим шагам, чтобы интегрировать планировщик с <a src="http://docs.dhtmlx.com/doku.php?id='dhtmlxtree:toc'">dhtmlxTree</a>: 

1. Скачать пакет dhtmlxTree и распаковать его содержимое в папку [YOUR APPLICATION ROOT]
2. Включите необходимые <b>js</b> и <b>css</b> файлы на страницу:
~~~html
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>
...
~~~
3. Активируйте расширение [outerdrag] на странице:
~~~js
scheduler.plugins({
    outerdrag: true
});
~~~
4. Инициализируйте компонент dhtmlxTree (см. инструкции <a href="https://docs.dhtmlx.com/tree__initialization_of_dhtmlxtree.html">здесь</a>) :
~~~js
const tree = new dhtmlXTreeObject("treebox", "100%", "100%", 0);
tree.setImagePath("../common/dhtmlxTree/imgs/csh_yellowbooks/");
tree.loadXML("./data/tree.xml");
~~~
5. Включите перетаскивание в компоненте dhtmlxTree (см. инструкции <a href="https://docs.dhtmlx.com/tree__drag_and_drop_handling.html">здесь</a>) :
~~~js
tree.enableDragAndDrop(true);
~~~
6. Инициализируйте и настройте планировщик:
~~~js
...
scheduler.init('scheduler_here', new Date(2027, 5, 30), "timeline");
~~~
7. Назначьте обработчик на событие [onExternalDragIn](api/event/onexternaldragin.md), чтобы определить, как текст перетаскиваемого элемента будет преобразован в свойство события:
~~~js
scheduler.attachEvent("onExternalDragIn", function(id, source, event){
    const label = tree.getItemText(tree._dragged[0].id);
    scheduler.getEvent(id).text = label;
    return true;
});

~~~


[Интеграция с dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


Теперь вы можете легко создавать новые события, содержащие данные дерева — просто перетащите нужный узел.