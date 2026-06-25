---
title: "Операции с объектом события"
sidebar_label: "Операции с объектом события"
---

# Операции с объектом события

## Получение объекта события

Чтобы получить объект события, используйте метод [getEvent](api/method/getevent.md):

~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
... 
const eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"}
~~~  

## Получение событий за указанный период времени

Чтобы получить коллекцию событий, происходящих в заданный период, используйте метод [getEvents](api/method/getevents.md):

~~~js
const evs = scheduler.getEvents(new Date(2027,1,10),new Date(2027,2,10)); 
//где evs - массив объектов-событий
~~~  

## Получение всех событий в Scheduler

Чтобы получить все загруженные в планировщик события, вызовите метод [getEvents](api/method/getevents.md) без параметров, как показано:

~~~js
const evs = scheduler.getEvents();
// возвращает все события в виде массива объектов
~~~  

## Получение ближайшего события, начиная с текущей даты

~~~js
const evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - список всех предстоящих событий
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - ближайшее предстоящее событие
~~~  

## Получение идентификатора события

Чтобы получить идентификатор события по значению одного из свойств события, используйте следующую технику:

Пример: получение идентификатора события по тексту события.
~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
...

const evs = scheduler.getEvents(); //получает все события планировщика
for(let i = 0; i < evs.length; i++){  //перебираем все события, чтобы найти нужное
    if (evs[i].text == "Event 2") 
        const eventId = evs[i].id;// -> 2
};
~~~

Если вы знаете примерное время появления нужного события, лучше ограничить возвращаемую коллекцию событий, чтобы увеличить скорость работы приложения:

~~~js
const evs = scheduler.getEvents(new Date(2027,05,01),new Date(2027,05,10)); 
for(let i = 0; i < evs.length; i++){  
    if (evs[i].text == "Event 2") 
        const eventId = evs[i].id;// -> 2
};
~~~


## Изменение идентификатора события

Чтобы изменить текущий идентификатор события, можно использовать метод [changeEventId](api/method/changeeventid.md) как показано:

~~~js
scheduler.changeEventId("ev15", "ev25"); //изменит идентификатор события "ev15" на "ev25"
~~~


## Установка метки опции lightbox как текста события

По умолчанию текст события Scheduler устанавливается через сопоставляемое текстовое поле из lightbox. 

![default_event_text](/img/default_event_text.png)

Также возможно переопределить поведение по умолчанию и использовать метку выбранной в комбобоксе опции как текст события. 

![option_event_text](/img/option_event_text.png)

Текст события задается одной из следующих шаблонов: [event_text](api/template/event_text.md) или [event_bar_text](api/template/event_bar_text.md), в зависимости от типа представления. Таким образом, чтобы изменить схему добавления текста в событие, следует переопределить соответствующий шаблон.

~~~js
scheduler.config.lightbox.sections = [
    { name:"type", height:21, inputWidth:400, map_to:"type", type:"select", 
        options:scheduler.serverList("options", [
            {key:1, label:"Simple"},
            {key:2, label:"Complex"},
            {key:3, label:"Unknown"}
        ]
    )},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.templates.event_text = scheduler.templates.event_bar_text = function(start, end, event){
    const options = scheduler.serverList("options");

    for(let i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~


Существует несколько заметок по приведенному выше коду:

- Метод [serverList](api/method/serverlist.md) используется для предоставления опций для выпадающего списка и их извлечения внутри шаблона. Вы можете загружать опции вместе с данными событий через JSON-коллекции (см. [Data formats](guides/data-formats.md#json-with-collections)) и обновлять их позже с помощью [updateCollection](api/method/updatecollection.md).

- Внутри шаблона выполняется линейный поиск по выбранному элементу. В некоторых случаях, когда у вас много событий/опций, это может заметно повлиять на производительность, так как эти шаблоны могут вызываться довольно часто. Чтобы решить эту проблему, можно создать хеш для быстрого поиска вместо постоянной перебиракости массива.

- На клиентской стороне должен быть полный список опций для их отображения. В противном случае вам придется загружать опции вручную, например если вы используете функциональность автодополнения, которая подгружает необходимые опции динамически.