---
title: "Несколько пользователей"
sidebar_label: "Несколько пользователей"
---

# Несколько пользователей

Хотя в планировщике нет встроенной поддержки отдельных календарей, вы можете имитировать это, загружая несколько источников данных в один экземпляр планировщика.

~~~js
// загрузить два источника данных
scheduler.load("events_shared.php?user="1"");
scheduler.load("events_shared.php?user="2"");
scheduler.config.readonly = true;
~~~

На серверной стороне это может выглядеть так:

~~~php
$scheduler->render_sql("select * from events_shared where event_type="1" AND 
userId = ".$user_id,"event_id","start_date,end_date,text,event_type,userId");
~~~

Этот способ позволяет отображать данные из нескольких источников одновременно. **userId** в примере - это просто заполнитель; на практике вы можете применять любые правила, которые подходят под ваши задачи.

Этот подход можно расширить для более сложных сценариев, например, когда пользователи видят все события, но могут редактировать только свои:

~~~js
//включить сохранение для первого источника данных
var dp =  scheduler.createDataProcessor("events.php?user");
dp.init(scheduler);
        
//разрешить операции редактирования только для своих событий
function allow_own(id){
    var ev = this.getEvent(id);
    return ev.userId == 1;
}
scheduler.attachEvent("onClick",allow_own);
scheduler.attachEvent("onDblClick",allow_own);

//значения по умолчанию для нового события
scheduler.attachEvent("onEventCreated",function(id){
    const ev = this.getEvent(id);
    // userId будет отправлен на сервер через DataProcessor,
    // обязательно проверьте это на сервере
    ev.userId = CURRENT_USER_ID; 
});
~~~
