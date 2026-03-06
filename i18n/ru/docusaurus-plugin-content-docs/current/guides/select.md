---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
var alert_opts = [
    { key: 1, label: 'None' },
    { key: 2, label: 'On start date' },
    { key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Инициализация

Чтобы добавить элемент Select в lightbox, выполните следующие шаги:

1. Добавьте секцию в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. Задайте подпись для секции:
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  


[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Свойства {#properties}

Ниже приведены основные свойства, которые часто используются для элемента 'select' (полный список смотрите [здесь](api/config/lightbox.md)):

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
  <td>(<i>string</i>) имя свойства данных, к которому привязана секция</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления, используемого в секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора для элементов 'select', 'multiselect', 'radio' и 'combo'. Каждый объект представляет вариант и содержит: <ul> <li><b>key</b> - (<i>string</i>) идентификатор варианта, сопоставляется с соответствующим свойством данных события</li> <li><b>label</b> - (<i>string</i>) отображаемая подпись варианта</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) функция-обработчик события, вызывается при изменении значения элемента управления [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## Заполнение элемента управления данными

Обычно значения для элемента Select задаются через параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = 
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'None'},
            { key: 2, label: 'On start date'},
            { key: 3, label: '1 day before'}
    ]},
    ...
];
~~~

Каждый элемент массива [options](api/config/lightbox.md) должен содержать два обязательных свойства:

- **key** - идентификатор варианта
- **label** - отображаемая подпись варианта

## Динамическое изменение вариантов

Чтобы загрузить варианты с сервера, присвойте свойству [options](api/config/lightbox.md) значение, возвращаемое методом [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("./data/types");
~~~

:::note
Подробнее о методе **serverList** можно узнать в [соответствующей статье](api/method/serverlist.md).
:::

Ответ сервера для метода [load](api/method/load.md) должен содержать коллекцию с именем, соответствующим названию server list, в формате JSON
[пример](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
          "text":"Performance review",
          "type":"2"
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":"1","label":"Interview"},/*!*/
         {"value":"2","label":"Performance review"},/*!*/
         {"value":"3","label":"Request"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~


[Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)


Метод [parse](api/method/parse.md) также может быть использован для загрузки вариантов после инициализации Gantt.

Чтобы обновить варианты элемента управления новыми значениями, используйте метод [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

Более подробную информацию см. в статье [scheduler.serverList](api/method/serverlist.md).
