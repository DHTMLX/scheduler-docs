---
title: "Операции с объектом события"
sidebar_label: "Операции с объектом события"
---

# Операции с объектом события

## Получение объекта события

Чтобы получить объект события, используйте метод [getEvent](api/method/getevent.md):

~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
... 
var eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"}
~~~

## Получение событий за указанный период времени

Чтобы получить список событий, происходящих в определённый промежуток времени, используйте метод [getEvents](api/method/getevents.md):

~~~js
var evs = scheduler.getEvents(new Date(2019,1,10),new Date(2019,2,10)); 
//где evs — массив объектов событий
~~~

## Получение всех событий в Scheduler

Чтобы получить все события, загруженные в Scheduler, вызовите метод [getEvents](api/method/getevents.md) без параметров следующим образом:

~~~js
var evs = scheduler.getEvents();
// возвращает все события в виде массива объектов
~~~

## Получение ближайшего события, начиная с текущей даты

~~~js
var evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs — список всех предстоящих событий
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] — ближайшее предстоящее событие
~~~

## Получение id события

Чтобы найти id события по значению одного из его свойств, можно воспользоваться следующим подходом:

~~~js title="Получение id события по тексту события"
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
...

var evs = scheduler.getEvents(); //получаем все события из Scheduler
for(var i="0;i<evs.length;" i++){  //перебираем все события для поиска нужного
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

Если приблизительное время события известно, рекомендуется ограничить диапазон при получении событий для повышения производительности:

~~~js
var evs = scheduler.getEvents(new Date(2019,05,01),new Date(2019,05,10)); 
for(var i="0;i<evs.length;" i++){  
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

## Изменение id события

Чтобы изменить id события, используйте метод [changeEventId](api/method/changeeventid.md) следующим образом:

~~~js
scheduler.changeEventId("ev15", "ev25"); //меняет id события "ev15" -> "ev25"
~~~

## Использование подписи опции lightbox в качестве текста события

По умолчанию текст события Scheduler задаётся из соответствующего поля text в lightbox.

![default_event_text](/img/default_event_text.png)

Также можно переопределить это поведение и использовать подпись выбранной опции в комбобоксе как текст события.

![option_event_text](/img/option_event_text.png)

Текст события определяется одним из следующих шаблонов: [event_text](api/template/event_text.md) или [event_bar_text](api/template/event_bar_text.md), в зависимости от типа отображения. Чтобы изменить способ добавления текста к событию, переопределите соответствующий шаблон.

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
    var options = scheduler.serverList("options");

    for(var i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

Несколько моментов, на которые стоит обратить внимание в приведённом выше коде:

- Метод [serverList](api/method/serverlist.md) предоставляет опции для комбобокса и позволяет получить их внутри шаблона. Также его можно использовать для загрузки опций вместе с другими данными через коннектор и для их динамического обновления.

- Шаблон выполняет линейный поиск выбранного элемента. При большом количестве событий или опций это может повлиять на производительность, так как шаблоны могут вызываться часто. Для повышения эффективности рекомендуется создавать хеш для быстрого поиска вместо перебора массива каждый раз.

- На клиентской стороне должен быть доступен полный список опций для корректного отображения. В противном случае опции нужно загружать вручную, например, при использовании поиска с автозаполнением, который динамически подгружает опции.
