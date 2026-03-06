---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

Группа радиокнопок

![radio_editor](/img/radio_editor.png)

:::note
Убедитесь, что для использования этого элемента в lightbox включено расширение **editors**.
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

var priorities = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Medium' },
    { key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"priority", height:58, options:priorities, 
                map_to:"priority", type:"radio", vertical:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Инициализация

Чтобы добавить элемент Radio в lightbox, выполните следующие шаги:

1. Включите расширение 'editors' на вашей странице:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Добавьте секцию radio в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. Задайте метку для секции:
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~
  

[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Свойства

Ниже приведены основные свойства, которые обычно задаются для элемента 'radio' (полный список смотрите [здесь](api/config/lightbox.md)):

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
  <td>(<i>string</i>) имя свойства данных, с которым связана эта секция</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора для элемента управления (<b>используется для элементов 'select', 'multiselect', 'radio', 'combo'</b>). Каждый объект представляет одну опцию и включает: <ul> <li><b>key</b> - (<i>string</i>) ID опции, сопоставляется со свойством данных события</li> <li><b>label</b> - (<i>string</i>) отображаемая подпись опции</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) определяет, будут ли радиокнопки располагаться вертикально (<i>true</i>) или горизонтально (<b>применимо к элементам 'multiselect' и 'radio'</b>)</td>
  </tr>
  </tbody>
</table>

## Заполнение элемента управления данными

Обычно значения для радиокнопок задаются с помощью параметра [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = 
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'High' },
            { key: 2, label: 'Medium' },
            { key: 3, label: 'Low' }
    ]},
    ...
];
~~~

Каждый элемент массива [options](api/config/lightbox.md) должен содержать два обязательных свойства:

- **key** - ID опции
- **label** - отображаемый текст опции

## Получение значений радиокнопок с сервера

Чтобы заполнить радиокнопки данными, полученными с сервера, используйте метод [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("./data/types.php");
~~~

Ответ сервера для метода [load](api/method/load.md) должен включать коллекцию с именем, соответствующим названию server list, в формате JSON, как показано в [этом примере](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~

Если вы используете библиотеку [PHP Connector](https://github.com/DHTMLX/connector-php), серверная часть может выглядеть так:

~~~php
//types.php
<?php
    require_once('../../../../connector-php/codebase/scheduler_connector.php');
    include ('../../common/config.php');

    $list = new JSONOptionsConnector($res, $dbtype);
    $list->render_table("types","typeid","typeid(value),name(label)");
    
    $scheduler = new JSONSchedulerConnector($res, $dbtype);
    $scheduler->set_options("type", $list);
    $scheduler->render_table(
        "tevents",
        "event_id",
        "start_date,end_date,event_name,type"
    );
?>
~~~

:::note
Имейте в виду, что метод [updateCollection](api/method/updatecollection.md) может быть использован для обновления списка опций, полученных с сервера.
:::

## Обработка событий для элемента Radio

API dhtmlxScheduler не предоставляет встроенных обработчиков событий специально для радиокнопок в lightbox Scheduler.

Однако вы можете добавить обработчик клика для радиокнопок в Lightbox следующим образом:

1. Получите элементы radio после открытия lightbox.

~~~js

scheduler.attachEvent("onLightbox", function(){
    var node = scheduler.formSection("type").node;
    var radios = node.getElementsByTagName("input");
    ...
});
~~~

2. Добавьте событие <b>onclick</b> для каждой радиокнопки в Lightbox.

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(var i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. Определите функцию, которая будет выполняться при клике по радиокнопке.

~~~js
function onRadioClick(event){
    var e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

**Related sample** [Обработка событий для элемента Radio](https://snippet.dhtmlx.com/5/5b62dd79e)
