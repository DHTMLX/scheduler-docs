---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

Набор радиокнопок

![radio_editor](/img/radio_editor.png)

:::note
Включите расширение **editors**, чтобы использовать элемент управления в лайтбоксе
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

const priorities = [
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


[Радиокнопка в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Инициализация

Чтобы добавить элемент Radio в lightbox, выполните следующие шаги:

1. Включите на странице расширение 'editors':
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Добавьте секцию в конфигурацию лайтбокса:
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


[Радиокнопка в лайтбоксе](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Свойства

Следующие свойства наиболее важны и обычно устанавливаются для элемента управления 'radio' (см. полный список [здесь](api/config/lightbox.md)):

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
  <td>(<i>string</i>) имя свойства данных, которое будет отображено в секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления секции</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) задаёт варианты выбора элемента управления (<b>для контролов 'select', 'multiselect', 'radio', 'combo'</b>). Каждый объект массива задаёт одну опцию и имеет следующие свойства: <ul> <li><b>key</b> - (<i>string</i>) идентификатор опции. Это свойство сравнивается с данными события, чтобы назначать опции событиям</li> <li><b>label</b> - (<i>string</i>) метка опции</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) указывает, следует ли располагать радиокнопки вертикально (<i>true</i>) или горизонтально (<b>для контролов 'multiselect' и 'radio'</b>)</td>
  </tr>
  </tbody>
</table>


## Заполнение элемента данными

Как правило, для задания значений радиокнопкам следует использовать параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = [
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


Элементы в параметре [options](api/config/lightbox.md) должны иметь 2 обязательных свойства:

- **key** - (<i>string</i>) идентификатор опции
- **label** - (<i>string</i>) метка опции

## Получение значений радиокнопок с сервера

Чтобы задать значения радиокнопкам, используя данные, полученные с сервера, используйте метод [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~


Ответ данных для метода [load](api/method/load.md) должен содержать коллекцию с именем списка сервера, указанным в JSON
[в следующем формате](guides/data-formats.md#json-with-collections):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
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

Пример обработчика бэкенда (Node.js/Express):

~~~js
app.get("/api/types", async (req, res) => {
  const data = await eventsService.list();
  const collections = {
    type: [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" }
    ]
  };
  res.json({ data, collections });
});
~~~

:::note
Примечание: вы можете использовать метод [updateCollection](api/method/updatecollection.md) для обновления списка полученных опций
:::


## Обработка событий для радиоконтроля

По умолчанию API dhtmlxScheduler не предоставляет специальных обработчиков событий для радиокнопок в лайтбоксе Scheduler.

Но вы можете назначить обработчик клика для радиокнопок лайтбокса следующим образом:

1. Получите элементы радиокнопок после открытия лайтбокса.

~~~js

scheduler.attachEvent("onLightbox", function(){
    const node = scheduler.formSection("type").node;
    const radios = node.getElementsByTagName("input");
    ...
});
~~~

2. Назначьте событие <b>onclick</b> найденным радиокнопкам лайтбокса.

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(let i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. Наконец, задайте функцию, которая будет выполняться после нажатия радиокнопки.

~~~js
function onRadioClick(event){
    let e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

Связанный пример [Обработка событий для радиоконтроля](https://snippet.dhtmlx.com/5/5b62dd79e)