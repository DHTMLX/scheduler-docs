---
title: "Multiselect"
sidebar_label: "Multiselect"
---

# Multiselect 

Этот контрол предоставляет группу чекбоксов.

![multiselect_editor](/img/multiselect_editor.png)

:::note
Активируйте расширение **multiselect**, чтобы использовать элемент управления в лайтбоксе
:::

~~~js
scheduler.plugins({
    multiselect: true /*!*/
});

scheduler.locale.labels.section_userselect = "Participants";
 
scheduler.config.lightbox.sections= [    
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Контроль Multiselect в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Инициализация

Чтобы добавить контроль Multiselect в лайтбокс, выполните следующие шаги:

1. <b>Активируйте на странице расширение 'multiselect':</b>
~~~js
scheduler.plugins({
    multiselect: true
});
~~~
2. <b>Добавьте секцию в конфигурацию лайтбокса:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"), vertical:false },
    { name:"time", ...}
];
~~~
3. <b>Установите метку для секции:</b>
~~~js
scheduler.locale.labels.section_userselect = "Participants";
~~~
  

[Контроль Multiselect в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Свойства

Следующие свойства в основном важны и обычно задаются для элемента управления 'multiselect' (полный список см. [здесь](api/config/lightbox.md)):

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
  <td>(<i>array of objects</i>) определяет варианты выбора управления (<b>для контролов 'select', 'multiselect', 'radio', 'combo'</b>). Каждый объект в массиве задаёт один вариант и имеет следующие свойства: <ul> <li><b>key</b> - (<i>string</i>) идентификатор варианта. Это свойство сравнивается с данным событием для сопоставления вариантов</li> <li><b>label</b> - (<i>string</i>) подпись варианта</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_url</b></td>
  <td>(<i>string</i>) путь к серверному скрипту, который будет предоставлять загрузку вариантов multiselect. Используется только в динамическом режиме. Необязательно</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) задаёт, размещать ли кнопки multiselect вертикально (<i>true</i>) или горизонтально (<b>для контролов 'multiselect' и 'radio'</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>delimiter</b></td>
  <td>(<i>string</i>) задаёт разделитель, который будет использоваться для разделения значений мультиселекта. Если это свойство не задано, будет применяться конфигурация [section_delimiter](api/config/section_delimiter.md)</td>
  </tr>
  </tbody>
</table>

## Заполнение контролла данными

Обычно значения для кнопок мультиселекта задают через параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = [
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

Элементы в параметре [options](api/config/lightbox.md) должны иметь 2 обязательных свойства:

- **key** - идентификатор варианта
- **label** - подпись варианта

## Заполнение флажков с сервера

Чтобы получить значения флажков с сервера, используйте метод [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    {name:"time", ...}
];

scheduler.load("api/data");
~~~

где **api/data** — это [серверный скрипт](guides/server-integration.md), который возвращает события, загруженные в планировщик, и коллекцию значений для кнопок multiselect, как показано здесь в примере [Examples of Data Formats](guides/data-formats.md#json-with-collections):

~~~js
//ответ
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
         {"value":"1","label":"Лиза"},    
         {"value":"2","label":"Боб"},   
         {"value":"3","label":"Майк"}    
      ]                                     
   }                                        
}
~~~

:::note
Примечание: можно использовать метод [updateCollection](api/method/updatecollection.md) для обновления списка доступных вариантов
:::

~~~js
const oldOptions = scheduler.serverList("users").slice();
scheduler.updateCollection("users", [
         {"value":"4","label":"John"},    
         {"value":"5","label":"Paul"},   
         {"value":"6","label":"Ringo"},   
         {"value":"7","label":"George"}
]);
~~~


## Динамическая загрузка

В статическом режиме все параметры событий хранятся как отдельное поле в базе данных, и вы можете позже использовать это поле для построения собственной логики. Это даёт дополнительные возможности, но требует большего количества запросов для загрузки всех опций.
  
  
В динамическом режиме ничего дополнительного не хранится. Опции загружаются по мере необходимости. Это уменьшает количество запросов, но отключает построение какой-либо логики. 

На стороне сервера код должен быть аналогичным следующему

Чтобы включить динамический режим, следует использовать свойство **script_url** вместе с **options**:

~~~js
scheduler.config.lightbox.sections = [
    {name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"),
    script_url:'api/options'},
    ...
];
~~~

где `api/options` возвращает следующий JSON:

~~~js
[                          
    {"value":"1","label":"Лиза"},    
    {"value":"2","label":"Боб"},   
    {"value":"3","label":"Майк"}    
]
~~~