---
title: "Всплывающие сообщения и модальные окна"
sidebar_label: "Всплывающие сообщения и модальные окна"
---

# Всплывающие сообщения и модальные окна

Сообщения в Scheduler используются для информирования пользователей об ошибках, подтверждения или отклонения действий, выбора опций и т.д. Сообщения Scheduler основаны на [форке репозитория dhtmlxMessage](https://github.com/DHTMLX/message), поэтому все возможности dhtmlxMessage доступны и для сообщений dhtmlxScheduler.

Существует две основные категории сообщений: [простое всплывающее сообщение](#basicpopupmessage) и [модальное сообщение](#modalmessageboxes) с кнопками, блокирующее взаимодействие с приложением.

Модальное окно может быть одного из трёх типов:

- [Окно с сообщением (Alert)](#alert)
- [Окно подтверждения (Confirm)](#confirm)
- [Модальное окно (Modalbox)](#modal)


## Простое всплывающее сообщение 

Для отображения простого модального окна используйте метод [scheduler.message](api/method/message.md). Единственный обязательный параметр - текст сообщения:

~~~js
scheduler.message("The event is updated");
~~~

Существует три вида всплывающих окон:

- окно по умолчанию (**type:"info"**)

![default_message](/img/default_message.png)
  
- окно с ошибкой (**type:"error"**)

![error_message](/img/error_message.png)

- окно с предупреждением (**type:"warning"**)

![warning_message](/img/warning_message.png)

Чтобы создать определённый тип окна, задайте свойство *type* с соответствующим значением:

~~~js
// создание окна с ошибкой
scheduler.message({
    text: "Click on the buttons to explore Scheduler message types", 
    expire: -1, 
    type: "error"
});
~~~


[Different types of popups and modal boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/11_popups_and_messages.html)


Для кастомизации внешнего вида окна укажите CSS-класс через параметр type, как описано [здесь](#styling).

### Позиционирование окон сообщений

По умолчанию всплывающие окна появляются в правом верхнем углу окна. В отличие от [модальных окон](#modalmessageboxes), они не блокируют взаимодействие с приложением. Позицию можно изменить с помощью свойства **scheduler.message.position**:

~~~js
scheduler.message.position = 'bottom';
~~~

Возможные значения позиции сообщения:

- **top** - окно отображается в правом верхнем углу (по умолчанию)
- **bottom** - окно отображается в правом нижнем углу
- **left** - окно отображается слева под Gantt
- **right** - окно отображается справа под Gantt

### Интервал показа (Expire Interval)

Вы можете управлять временем отображения окна, задав параметр *expire*, который определяет длительность (в миллисекундах) до исчезновения сообщения. По умолчанию - 4000 мс.

Чтобы изменить длительность или сделать так, чтобы сообщение не исчезало автоматически, установите *expire* в "-1". В этом случае сообщение закроется только при клике.

~~~js
scheduler.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### Скрытие окна сообщения через API

Чтобы вручную скрыть определённое всплывающее окно до истечения времени, используйте метод **scheduler.message.hide(boxId)**. Он принимает один аргумент:

- **boxId** - идентификатор, присвоенный сообщению при создании

~~~js
scheduler.message({
    id:"myBox",
    text:"Page is loaded"
});

scheduler.message.hide("myBox");
~~~

## Модальные окна сообщений

Модальные окна блокируют взаимодействие с приложением до выполнения необходимого действия, обычно по клику на кнопку. После этого окно закрывается и вызывается callback-функция, если она была передана.

Существует три типа модальных окон:

- [Alert Message Box](#alert) - окно с одной кнопкой
- [Confirm Message Box](#confirm) - окно с двумя кнопками (подтвердить или отменить)
- [Modalbox](#modal) - окно с произвольным количеством кнопок

Общие параметры:

- **id** - идентификатор окна
- **title** - текст заголовка
- **type** - тип сообщения (например, warning или error)
- **text** - основной текст сообщения
- **ok** - текст кнопки "OK"
- **cancel** - текст кнопки "Cancel" (только для confirm)
- **callback** - функция, вызываемая при клике на кнопку, получает *true* или *false* в зависимости от нажатой кнопки
- **position** - поддерживается только "top"; другие значения выравнивают окно по центру
- **width** - ширина модального окна (CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например, "100px", "50%")
- **height** - высота модального окна (CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) или [percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage), например, "100px", "50%")

## Окно с сообщением (Alert) (#alert)

![alert](/img/alert.png)

Alert-окно содержит одну кнопку "OK". Чтобы задать текст кнопки, используйте параметр *ok*:

- короткая форма (только текст сообщения, *text* задаётся автоматически, остальные параметры - по умолчанию):

~~~js
scheduler.alert("Text");
~~~

- полная форма (можно задать несколько параметров, неуказанные - по умолчанию):

~~~js
scheduler.alert({
    text: "some text",
    title: "Alert",
    ok: "Ok",
    callback: function(){...}
});
~~~


## Окно подтверждения (Confirm) (#confirm)

![confirm](/img/confirm.png)

Окно подтверждения содержит две кнопки: "OK" и "Cancel". Их текст задаётся соответствующими параметрами.

- короткая форма

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


## Модальное окно (Modalbox) (#modal)

![modalbox](/img/modalbox.png)

Модальное окно (modalbox) обладает рядом особенностей:

- *text* может содержать любой *HTML* контент
- поддерживает несколько кнопок, указанных в массиве *buttons*, каждая с собственным текстом
- функция *callback* получает индекс нажатой кнопки в качестве параметра

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


### Настройка кнопок modalbox

Есть два основных способа настройки кнопок modalbox:

- короткая форма:

~~~js
scheduler.modalbox({
    // другие параметры
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

В этом случае callback получает строковый индекс нажатой кнопки ("0", "1", "2", ...). Каждая кнопка получает CSS-класс на основе текста (в нижнем регистре), например: *scheduler_**save**_button*, *scheduler_**delete**_button*, *scheduler_**cancel**_button*.

Эти классы можно использовать для стилизации кнопок:

~~~js
.scheduler_delete_button div{
    background:red;
}
~~~

Если несколько всплывающих окон используют одинаковые имена кнопок, но требуют разного оформления, можно использовать свойство **type**:

~~~js
scheduler.modalbox({
    // другие параметры
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

Значение **type** добавляется с префиксом "scheduler_" как класс к элементу popup:

~~~js
.scheduler_special_popup .scheduler_delete_button div{
      background:red;
}
~~~

- полная форма:

Можно явно задать подписи кнопок, CSS-классы и значения для callback с помощью более детальной конфигурации:

~~~js
scheduler.modalbox({
    // другие параметры
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

Только параметр **label** обязателен; **css** и **value** - опциональны. Если они не указаны, CSS-класс формируется из текста кнопки в нижнем регистре, а значением выступает индекс кнопки.

CSS-класс **css** добавляется с префиксом "scheduler_" к элементу кнопки:

~~~js
.scheduler_link_delete_btn div{
      background:red;
}
~~~

## Скрытие модальных окон

Чтобы вручную закрыть модальное окно, используйте метод **scheduler.modalbox.hide()**, передав контейнер модального окна:

~~~js
var box = scheduler.modalbox({    
    title: "Settings",
    text: " ... html code here... ",
    buttons: ["Save", "Defaults", "Cancel"],
    callback: function(result){
        scheduler.alert(result);
    }
});

scheduler.modalbox.hide(box);
~~~

Для окон **alert** и **confirm** используется тот же метод **scheduler.modalbox.hide()**:

~~~js
var box = scheduler.confirm({
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

Вы можете изменить внешний вид любого окна сообщения, определив CSS-стили. Обычно CSS-класс указывается через параметр *type*: создайте CSS-класс и присвойте его имя параметру *type*.

Обратите внимание на следующие рекомендации по параметру 'type':

- Для стилизации окон alert и confirm инициализируйте их через 'window-related' метод.
- Для стилизации всплывающих сообщений используйте 'common' метод.
- Имена CSS-классов должны начинаться с префикса 'scheduler-'.
- Для корректного применения стилей используйте селекторы типа **.scheduler-some div** внутри сообщений scheduler.

Пример:

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

Поведение клавиатуры для модальных окон регулируется свойством **scheduler.message.keyboard**, по умолчанию оно *true*.

Если включено, модальные окна блокируют большинство клавиатурных событий на странице. Активны только следующие клавиши:

- "space" и "enter" - возвращают *true* в модальном окне
- "escape" - возвращает *false*

Если установить **scheduler.message.keyboard** в *false*, блокировка отключается и становится возможным полноценный ввод с клавиатуры, что удобно для ввода данных в модальных окнах:

~~~js
scheduler.message.keyboard = false; 
scheduler.modalbox({...});
~~~

Это позволяет использовать клавиатуру внутри модальных окон в обычном режиме.
