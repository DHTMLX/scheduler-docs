---
title: "Multiselect"
sidebar_label: "Multiselect"
---

# Multiselect 

Этот контрол предоставляет группу чекбоксов.

![multiselect_editor](/img/multiselect_editor.png)

:::note
Убедитесь, что вы включили расширение **multiselect**, чтобы использовать этот контрол в lightbox.
:::

~~~js
scheduler.plugins({
    multiselect: true /*!*/
});

scheduler.locale.labels.section_userselect = "Участники";
 
scheduler.config.lightbox.sections="["    
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Инициализация

Чтобы добавить контрол Multiselect в lightbox, выполните следующие шаги:

1. Включите расширение 'multiselect' на вашей странице:
~~~js
scheduler.plugins({
    multiselect: true
});
~~~
2. Добавьте секцию multiselect в конфигурацию lightbox:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"), vertical:false },
    { name:"time", ...}
];
~~~
3. Задайте метку для секции:
~~~js
scheduler.locale.labels.section_userselect = "Участники";
~~~
  

[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Свойства {#properties}

Ниже приведены основные свойства, которые часто используются с контролом 'multiselect' (полный список смотрите [здесь](api/config/lightbox.md)):

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
  <td>(<i>string</i>) имя свойства данных, связанного с этой секцией</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип контрола для секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора для контрола (<b>применимо для 'select', 'multiselect', 'radio', 'combo' контролов</b>). Каждый объект представляет отдельный вариант с такими свойствами: <ul> <li><b>key</b> - (<i>string</i>) ID опции. Используется для сопоставления с данными события</li> <li><b>label</b> - (<i>string</i>) отображаемое название опции</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_url</b></td>
  <td>(<i>string</i>) URL серверного скрипта, который динамически загружает варианты multiselect. Необязательный параметр, используется только в динамическом режиме.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) определяет, будут ли кнопки multiselect располагаться вертикально (<i>true</i>) или горизонтально (<b>для контролов 'multiselect' и 'radio'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>delimiter</b></td>
  <td>(<i>string</i>) определяет разделитель, используемый для разделения значений multiselect. Если не указан, применяется глобальная настройка [section_delimiter](api/config/section_delimiter.md).</td>
  </tr>
  </tbody>
</table>

## Заполнение контрола данными

Обычно значения для кнопок multiselect задаются через параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = 
    {   name:"userselect", type:"multiselect", 
        ...
        options:[
            { key: 1, label: 'George' },
            { key: 2, label: 'Nataly' },
            { key: 3, label: 'Diana' },
            { key: 4, label: 'Adam' }
    ]},
    ...
];
~~~

Каждый элемент в массиве [options](api/config/lightbox.md) должен содержать два обязательных свойства:

- **key** - уникальный идентификатор опции
- **label** - текстовая метка, отображаемая для опции

## Заполнение чекбоксов с сервера

Чтобы получить значения чекбоксов с сервера, используйте метод [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    {name:"time", ...}
];

scheduler.load("api/data");
~~~

Здесь **api/data** - это [серверный скрипт](guides/server-integration.md), который возвращает как события, так и варианты для кнопок multiselect, в формате, описанном в [Примеры форматов данных](guides/data-formats.md#json-with-collections):

~~~js
//response
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"dblclick me!",
          "user_id":"1,2"
      },
      {
          "id":"2",
          "start_date":"2019-03-09 00:00:00",
          "end_date":"2019-03-11 00:00:00",
          "text":"and me!",
          "user_id":"2,3"
      }
   ], 
   "collections": {                         
      "users":[                          
         {"value":"1","label":"Lisa"},    
         {"value":"2","label":"Bob"},   
         {"value":"3","label":"Mike"}    
      ]                                     
   }                                        
}
~~~

:::note
Можно динамически обновлять список вариантов с помощью метода [updateCollection](api/method/updatecollection.md).
:::

~~~js
var oldOptions = scheduler.serverList("users").slice();
scheduler.updateCollection("users", [
         {"value":"4","label":"John"},    
         {"value":"5","label":"Paul"},   
         {"value":"6","label":"Ringo"},   
         {"value":"7","label":"George"}
]);
~~~


## Динамическая загрузка

В статическом режиме все варианты параметров события хранятся как отдельные поля в базе данных, что обеспечивает большую гибкость, но требует дополнительных запросов для загрузки всех опций.
  
В динамическом режиме опции загружаются только по мере необходимости. Это уменьшает количество запросов, но ограничивает возможность реализации пользовательской логики.

На серверной стороне у вас должен быть код, аналогичный следующему.

Чтобы включить динамический режим, добавьте свойство **script_url** вместе с **options**:

~~~js
scheduler.config.lightbox.sections = [
    {name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"),
    script_url:'api/options'},
    ...
];
~~~

Эндпоинт `api/options` должен возвращать JSON-данные следующего вида:

~~~js
[                          
    {"value":"1","label":"Lisa"},    
    {"value":"2","label":"Bob"},   
    {"value":"3","label":"Mike"}    
]
~~~
