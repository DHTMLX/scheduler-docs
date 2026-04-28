---
title: "Всплывающие сообщения и модальные окна"
sidebar_label: "Всплывающие сообщения и модальные окна"
---

# Всплывающие сообщения и модальные окна

Сообщения используются в Scheduler для уведомления пользователя об ошибке, подтверждении или отклонении действия, выборе одного из вариантов и т. д.  
Сообщения Scheduler основаны на форке репозитория [dhtmlxMessage](https://github.com/DHTMLX/message) как их основы.  
Таким образом, весь функционал dhtmlxMessage актуален для сообщений dhtmlxScheduler.

Существуют два основных типа сообщений: [простое всплывающее окно](#basic-popup-message) и [модальное окно сообщения](#modal-message-boxes) с кнопками, которые блокируют работу приложения.

Модальное окно сообщения может принадлежать к одному из трёх возможных типов:

- [Окно оповещения](#alert-message-box-alert)
- [Подтверждающее сообщение](#confirm-message-box-confirm)
- [Modalbox](#modal-box-modal)


## Основное всплывающее сообщение

Чтобы создать основное модальное сообщение, используйте метод [scheduler.message](api/method/message.md). Обязательным параметром метода является текст сообщения:

~~~js
scheduler.message("The event is updated");
~~~

Существуют три типа окон сообщений:

- окно по умолчанию (**type:"info"**)

![default_message](/img/default_message.png)
  
- окно с ошибкой (**type:"error"**)

![error_message](/img/error_message.png)

- окно-предупреждение (**type:"warning"**)

![warning_message](/img/warning_message.png)

Чтобы создать нужное окно сообщения, необходимо определить свойство *type* со соответствующим значением: 

~~~js
// создание окна сообщения об ошибке
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[Различные типы попапов и модальных окон](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


Чтобы применить различные стили к окну сообщения, нужно указать CSS-класс через параметр type, как описано [здесь](#styling).

### Позиционирование окон сообщений

По умолчанию всплывающее окно сообщения появляется в правом верхнем углу окна. Оно не мешает работе родительского приложения, в отличие от [модальных окон](#modal-message-boxes), которые перекрывают родительское приложение и блокируют его работу. Вы можете изменить положение окна сообщения, используя свойство **scheduler.message.position**:

~~~js
scheduler.message.position = 'bottom';
~~~

Существуют четыре допустимых значения для положения окна сообщения:

- **top** - отображает окно сообщения в правом верхнем углу окна, выставлено по умолчанию

- **bottom** - отображает окно сообщения в правом нижнем углу окна

- **left** -  отображает окно сообщения на левой стороне окна под Scheduler

- **right** - отображает окно сообщения на правой стороне окна под Scheduler

### Интервал истечения

Можно настроить интервал истечения для окна сообщения с помощью параметра *expire*. Это время после окончания которого окно сообщения исчезает (в миллисекундах). По умолчанию интервал истечения равен 4000 миллисекунд. 

Вы можете либо изменить это значение, либо отменить период истечения вообще, установив expire в "-1". В этом случае окно сообщения исчезнет только по клику мыши.

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Скрытие окна сообщения через API

Чтобы скрыть указанное окно сообщения вручную и не ждать его автоматического исчезновения, можно использовать метод **scheduler.message.hide(boxId)**. Он принимает один параметр:

- **boxId** - идентификатор окна, указанный в конструкторе окна

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## Модальные окна сообщения

Модальные окна блокируют работу родительского приложения до тех пор, пока не будет выполнено необходимое действие (обычно клик по кнопке). Они закрываются по клику на кнопку и вызову обратного вызова, если он задан.

Существуют три типа модальных окон сообщения:

- [Окно оповещения](#alert-message-box-alert) - оповещающее окно с кнопкой;
- [Окно подтверждения](#confirm-message-box-confirm) - окно подтверждения с двумя кнопками (подтвердить или отменить); 
- [Modalbox](#modal-box-modal) - модальное окно сообщения с произвольным количеством кнопок. 

Общие свойства окон:

- **id** - идентификатор окна сообщения;
- **title** - текст заголовка;
- **type** - тип окна сообщения (предупреждение или ошибка);
- **text** - текст тела окна сообщения; 
- **ok** - текст кнопки "OK";
- **cancel** - текст кнопки "Cancel" (для окна подтверждения);
- **callback** - функция, вызываемая по нажатию кнопки. Принимает *true* или *false* в зависимости от нажатой кнопки;
- **position** - на данный момент поддерживает только один вариант - "top", любое другое значение приведёт к выравниванию по центру;
- **width** - ширина модального окна (устанавливается как CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) значения, например "100px", "50%");
- **height** - высота модального окна (устанавливается как CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) значения, например "100px", "50%").

## Окно оповещения (#alert) {#alert-message-box-alert}

![alert](/img/alert.png)

Окно оповещения содержит кнопку "OK". Чтобы задать текст кнопки "OK", используйте параметр *ok* с текстом в качестве значения:

- краткая форма (содержит только текст сообщения - неявное использование параметра 'text'. Другие параметры имеют значения по умолчанию):

~~~js
scheduler.alert("Text");
~~~

- полная форма (содержит несколько доступных параметров. Не указанные параметры имеют значения по умолчанию)

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~


## Подтверждающее сообщение (#confirm) {#confirm-message-box-confirm}

![confirm](/img/confirm.png)

Подтверждающее сообщение имеет две кнопки: кнопку "OK" и кнопку "Cancel". Текст кнопок определяется в свойствах с соответствующими именами. 


- краткая форма

~~~js
scheduler.confirm("ConfirmText");
~~~

- полная форма

~~~js
scheduler.confirm({
    title:"Confirm",
    text:"This is a simple confirm",
    ok:"Ok",
    cancel:"Cancel",
    callback: function(result){
        if(result){
            scheduler.message("You clicked Ok");
        }else{
            scheduler.message("You clicked Cancel");
        }
    }
});
~~~


## Modalbox (#modal) {#modal-box-modal}

![modalbox](/img/modalbox.png)

Modalbox обладает некоторыми особенностями: 

- его *text* может содержать любой *HTML* контент;
- может иметь множество кнопок, указанных в массиве *buttons*, которые содержат текстовые значения кнопок;
- функция *callback* принимает в качестве параметра *index* выбранной кнопки.

~~~js
scheduler.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});
~~~


### Конфигурация кнопок modalbox

Существует два основных способа определить конфигурацию кнопок modalbox:

- краткая форма:

~~~js
scheduler.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

Результатом вызова обратного вызова будет строковое представление индекса нажатой кнопки из массива ("0", "1", "2",...). Каждая кнопка будет получать CSS-класс из её метки, приведённой к нижнему регистру, например *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button*. 

Эти классы можно использовать для стилизации кнопок:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

В случае, если одинаковое имя кнопки используется в нескольких попапах и их нужно стилизовать по-разному, можно использовать конфигурацию **type**:

~~~js
scheduler.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Значение **type** будет префиксироваться строкой "scheduler_" и добавлено в качестве имени класса к элементу попапа:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- полная форма:

CSS-классы кнопок и значения обратного вызова можно явно задать, используя более длинную форму конфигурации:

~~~js
scheduler.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

Параметр **label** обязателен, тогда как параметры **css** и **value** могут быть опущены. Отсутствующие параметры вычисляются как в краткой форме конфигурации кнопок: CSS будет наследоваться от лейбла кнопки в нижнем регистре, а индекс кнопки будет использоваться как значение.



Префиксирование CSS и добавление в качестве класса выполняется следующим образом: префикс "scheduler_" добавляется к имени класса и применяется как класс к элементу кнопки:

~~~css
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## Скрытие модальных окон

Чтобы скрыть модальное окно вручную, можно использовать метод **scheduler.modalbox.hide()**. В качестве параметра он принимает div-контейнер модального окна:

~~~js
const box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

Для модальных окон **alert** и **confirm** также нужно использовать метод **scheduler.modalbox.hide()**:

~~~js
const box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        scheduler.message("Result: "+result);
    }
});

scheduler.modalbox.hide(box);
~~~


## Стилизация

Для любого типа окна сообщения можно определить собственный стиль, чтобы добиться нужного внешнего вида. Обычно соответствующий CSS-класс задаётся через параметр *type*: вы определяете CSS-класс и устанавливаете параметр равным его имени.

Есть несколько правил, которые следует помнить при установке параметра 'type':

- Чтобы задать CSS-класс для окон alert и confirm, необходимо инициализировать такое окно способом, связанным с окном (window-related)
- Чтобы задать CSS-класс для окон сообщений, необходимо инициализировать такое окно обычным способом ('common')
- Имя CSS-класса должно начинаться с префикса "scheduler-"
- Чтобы стиль применялся корректно, следует использовать имя класса как **.scheduler-some div**, чтобы указать, что он предназначен для элемента внутри сообщения Scheduler. 

~~~js
<style type="text/css">
.scheduler-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


scheduler.message({ type:"myCss", text:"some text" });
~~~

## Модальные окна и взаимодействие с клавиатурой

Клавиатурная функциональность для модальных окон управляется свойством **scheduler.message.keyboard**. Изначально оно установлено в *true*. 

По умолчанию модальные окна блокируют события клавиатуры на странице. Разрешены только следующие клавиши: 

- "space" и "enter" - возвращают *true* как результат модального окна;
- "escape" - возвращает *false* как результат модального окна.

Установка свойства **keyboard** в значение *false* включит клавиатурные события (и отключит вышеупомянутые клавиши):

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

Это позволяет полноценно использовать клавиатуру, например для ввода значений в поля внутри модальных окон.