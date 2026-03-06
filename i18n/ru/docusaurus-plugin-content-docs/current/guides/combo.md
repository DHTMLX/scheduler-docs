---
title: "Combo"
sidebar_label: "Combo"
---

# Combo

В этом разделе рассматривается комбобокс, предоставляемый компонентом <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo</a>.

![combo_editor](/img/combo_editor.png)

~~~js
var holders = [
    { key: 1, label: 'James' },
    { key: 2, label: 'Alex' },
    { key: 3, label: 'Antony' },
    { key: 4, label: 'Andrew' }
];
            
scheduler.locale.labels.section_holder = "Holder";

scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~ 


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## Инициализация

Чтобы добавить элемент управления Combo в lightbox, выполните следующие шаги:

1. Подключите файлы dhtmlxCombo:
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. Включите расширение editors на странице:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. Добавьте секцию в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. Задайте метку для секции:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

  


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## Свойства

Ниже приведены основные и часто используемые свойства для контрола 'combo' (полный список смотрите [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) имя свойства данных, которое будет связано с данной секцией</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет опции выбора для контрола (<b>для контролов 'select', 'multiselect', 'radio', 'combo'</b>). Каждый объект в массиве описывает одну опцию и содержит следующие свойства: <ul> <li><b>key</b> - (<i>string</i>) id опции. Это значение сравнивается со свойством данных события для назначения опций событиям</li> <li><b>label</b> - (<i>string</i>) текст метки опции</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) путь к изображениям dhtmlxCombo</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) включает поддержку автофильтрации (опции фильтруются по мере ввода текста). Необязательный параметр. Параметр может принимать следующие значения: <ul> <li><b>false</b> - отключает фильтрацию</li> <li><b>true или "start"</b> - включает фильтрацию, поиск с начала элемента</li> <li><b>"between"</b> - включает фильтрацию, ищет любое вхождение введённого текста в элементах</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) путь к серверному скрипту, который будет предоставлять опции combo с сервера. Необязательный параметр</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) включает или отключает кеширование ответов скрипта (рекомендуется включить). Необязательный параметр</td>
  </tr>
  </tbody>
</table>


## Заполнение контрола данными

Чтобы задать значения для контрола Combo, используйте параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = 
    { 
        name:"holders", type:"combo", 
        ...
        options:[
            { key: 1, label: 'James' },
            { key: 2, label: 'Alex' },
            { key: 3, label: 'Antony' },
            { key: 4, label: 'Andrew' }
    ]},
    ...
];
~~~

Каждый элемент в параметре [options](api/config/lightbox.md) должен содержать два обязательных свойства:

- **key** - id опции
- **label** - текст метки опции

## Заполнение контрола данными с сервера

Чтобы загрузить опции Combo с сервера, используйте свойство **script_path** для указания URL серверного скрипта, обрабатывающего запросы.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

Свойство **script_path** определяет URL, с которого combo загружает свои опции через AJAX.

Так как селектор combo основан на [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html), сервер должен возвращать данные в совместимом формате.
Подробнее о добавлении данных в combo можно узнать в статье [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html). 

Запросы выполняются в двух случаях:

1) Когда открывается lightbox и в combo выбрано значение, контрол отправляет запрос для загрузки метки для этой опции.

В запросе передаётся параметр **id**:

~~~
GET /url?id="1"
~~~

Ответ должен быть массивом, содержащим только элемент с указанным id, в следующем формате:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) Когда пользователь начинает вводить текст в поле combo, контрол загружает отфильтрованные опции.

В запросе передаётся введённый текст в параметре **mask**:

~~~
GET /url?mask="al"
~~~

Сервер должен вернуть все элементы, соответствующие маске:

~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

Если вы используете библиотеку [PHP Connector](https://github.com/DHTMLX/connector-php), серверная часть может выглядеть так:

~~~js
<?php
    require_once('../../connector-php/codebase/combo_connector.php');
    require_once("../common/config.php");

    $combo = new ComboConnector($res, $dbtype);

    $combo->event->attach("beforeFilter", "by_id");
    function by_id($filter) {
        if (isset($_GET['id']))
            $filter->add("item_id", $_GET['id'], '=');
    }    

    $combo->dynamic_loading(3);
    $combo->render_table("Countries","item_id","item_nm");

?>
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## Режим автофильтрации

Режим автофильтрации означает, что опции фильтруются автоматически по мере ввода текста пользователем. Чтобы включить этот режим, установите свойство **filtering** в *true*:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
Обратите внимание, что автофильтрация может использоваться независимо от того, загружаются ли данные на клиенте или с сервера.
:::


Для получения дополнительной информации смотрите документацию dhtmlxCombo по <a href="https://docs.dhtmlx.com/combo__filtering.html">фильтрации</a>.
