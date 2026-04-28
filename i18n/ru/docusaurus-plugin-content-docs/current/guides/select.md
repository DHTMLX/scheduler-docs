---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
const alert_opts = [
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

[Основной редактор выбора во lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)



## Инициализация

Чтобы добавить элемент управления Select в lightbox, выполните следующие шаги:

1. <b>Добавьте секцию в конфигурацию lightbox:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. <b>Установите ярлык для секции:</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~


[Основной редактор выбора во lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Свойства

Следующие свойства в основном важны и обычно задаются для элемента управления 'select' (полный список см. [здесь](api/config/lightbox.md)):

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
  <td>(<i>string</i>) имя свойства данных, которое будет сопоставлено секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора элемента управления (<b>для контролов 'select', 'multiselect', 'radio', 'combo'</b>). Каждый объект в массиве задаёт один вариант и имеет следующие свойства: <ul> <li><b>key</b> - (<i>string</i>) идентификатор варианта. Это свойство сравнивается со свойством данных события для назначения опций события</li> <li><b>label</b> - (<i>string</i>) ярлык варианта</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) задаёт функцию обработчика события 'onchange' для элемента управления секции [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## Заполнение элемента управления данными

Обычно, чтобы задать значения для элемента управления Select, следует использовать параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = [
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

Элементы в параметре [options](api/config/lightbox.md) должны иметь 2 обязательных свойства:

- **key** - идентификатор варианта
- **label** - ярлык варианта

## Изменение опций динамически

Чтобы заполнить элемент управления данными с сервера, задайте параметр [options](api/config/lightbox.md) значением, возвращаемым методом [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~

:::note
Подробности о методе **serverList** приведены в [соответствующей статье](api/method/serverlist.md).
:::

Данные ответа для метода [load](api/method/load.md) должны содержать коллекцию с именем списка сервера, указанным в JSON [из следующего формата](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
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


Метод [parse](api/method/parse.md) можно также использовать, если нужно загрузить опции после инициализации планировщика.

Если нужно обновить указанные опции элемента управления новыми, можно использовать метод [updateCollection](api/method/updatecollection.md):

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

Подробности смотрите в статье [scheduler.serverList](api/method/serverlist.md).