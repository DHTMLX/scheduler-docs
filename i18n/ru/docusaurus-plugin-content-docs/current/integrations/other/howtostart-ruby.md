---
title: "dhtmlxScheduler с Ruby on Rails"
sidebar_label: "dhtmlxScheduler с Ruby on Rails"
---

# dhtmlxScheduler с Ruby on Rails

В этой статье показано, как настроить Scheduler и интегрировать его на серверной стороне с использованием фреймворка [Ruby on Rails](https://rubyonrails.org/) совместно с REST API.

Если вы работаете с другой технологией, вы можете найти другие варианты интеграции ниже:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Если Ruby on Rails уже установлен на вашем компьютере, вы можете сразу приступить к интеграции. В противном случае необходимо установить фреймворк, следуя инструкциям из [руководства по установке](https://guides.rubyonrails.org/getting_started.html#installing-rails).

После завершения установки можно переходить к интеграции шаг за шагом.

## Шаг 1. Создание проекта

Чтобы создать новый проект, выполните следующую команду в терминале:

~~~js
rails new path/to/your/project
~~~

## Шаг 2. Создание контроллера {#step-2-creating-a-controller}

Далее добавьте контроллер для обработки пользовательских запросов к серверу через приложение. Поскольку запросы бывают разных типов, лучше создавать отдельные контроллеры для разных типов запросов.

Маршрутизация (routing) используется для связи контроллеров с типами запросов. Разные маршруты соответствуют разным действиям, и эти действия собирают информацию, передаваемую в представление.

Создайте новый контроллер с именем "home" и действием "index", выполнив:

~~~js
cd path/to/your/project
rails generate controller home index
~~~

В результате выполнения команды появится подтверждение о создании новых файлов.

## Шаг 3. Указание маршрутизации

Для настройки маршрутизации откройте *config/routes.rb*. Найдите строку вверху файла:

~~~js
get 'home/index'
~~~

и замените её на:

~~~js
root :to => 'home#index'
get "data", :to=>"event#get", :as=>"data"
post "data(/:id)", :to => "event#add"
put "data/:id", :to => "event#update"
delete "data/:id", :to => "event#delete"
~~~

После этого вы можете проверить работу сервера, выполнив:

~~~js
rails server
~~~

Затем откройте *http://localhost:3000/* в браузере. Вы должны увидеть страницу, похожую на эту:

![ruby_routing](/img/ruby_routing.png)

Теперь сервер готов, и можно переходить к добавлению представлений.

## Шаг 4. Подключение исходных файлов

Сначала скачайте пакет dhtmlxScheduler [здесь](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).

Выполните следующие действия:

1) Распакуйте *codebase/dhtmlxscheduler.js* и папки *codebase/ext* и *codebase/locale* из архива в *vendor/assets/javascripts/* в каталоге вашего проекта.

Структура файлов будет выглядеть примерно так:

![ruby_unpack_js](/img/ruby_unpack_js.png)

2) Распакуйте следующие файлы стилей:

- *codebase/dhtmlxscheduler.css*
- *codebase/dhtmlxscheduler_classic.css*
- *codebase/dhtmlxscheduler_flat.css* 
- *codebase/dhtmlxscheduler_glossy.css* 

в *vendor/assets/stylesheets/*.

В результате получится следующее:

![ruby_unpack_styles](/img/ruby_unpack_styles.png)

3) Внутри каталога "public" создайте папку "assets" и распакуйте в неё следующие папки:

- *codebase/imgs*
- *codebase/imgs_dhx_terrace*
- *codebase/imgs_flat*
- *codebase/imgs_glossy*

Структура будет выглядеть так:

![ruby_unpack_assets](/img/ruby_unpack_assets.png)

4) Откройте **config/initializers/assets.rb** и добавьте *dhtmlxscheduler.js* и *dhtmlxscheduler.css* в список препроцессинга, добавив строки:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.css )
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.js )
~~~

## Шаг 5. Создание представлений

Теперь пора создать представление. Представления отображают информацию, собранную действиями.

Если для контроллера не задан отдельный макет, Rails использует *app/views/layouts/application.html.erb* как шаблон для всех страниц с общими элементами. Лучше всего подключить JS и CSS файлы Scheduler здесь, добавив следующие строки в заголовок:

~~~html
<!DOCTYPE html>
<html>
<head>
 <title>SchedulerRubyRest</title>
 (= stylesheet_link_tag 'application',media:'all','data-turbolinks-track'=>true )
 (= javascript_include_tag 'application', 'data-turbolinks-track' => true )
 (= stylesheet_link_tag 'dhtmlxscheduler',media:'all','data-turbolinks-track'=>true )
 (= javascript_include_tag 'dhtmlxscheduler', 'data-turbolinks-track' => true )
 (= csrf_meta_tags )
</head>
<body>

(= yield )

</body>
</html>
~~~

Далее укажите представление для контроллера "home", созданного ранее в [Шаге 2](integrations/other/howtostart-ruby.md#step-2-creating-a-controller). Откройте *app/views/home/index.html.erb* и добавьте контейнер для Scheduler и код инициализации:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" name="day_tab"></div>
        <div class="dhx_cal_tab" name="week_tab"></div>
        <div class="dhx_cal_tab" name="month_tab"></div>
      </div>
      <div class="dhx_cal_header">
      </div>
      <div class="dhx_cal_data">
      </div>
</div>

<script>    
    scheduler.init("scheduler_here", new Date(2016,4,27), "week");
</script>
~~~

Теперь, если вы откроете *http://localhost:3000/* в браузере, вы увидите пустой Scheduler:

![ruby_empty_scheduler](/img/ruby_empty_scheduler.png)

На этом этапе Scheduler позволяет добавлять и изменять события, но пока не сохраняет их. Чтобы добавить возможность сохранения, необходимо создать модели.

## Шаг 6. Создание моделей {#step-6-creating-models}

Поскольку Scheduler работает с сущностями событий, необходимо создать модель для событий.

Сгенерируйте модель события с такими свойствами, выполнив:

~~~js
rails generate model Event start_date:datetime end_date:datetime text:string
~~~

Список необходимых свойств объекта Event и их описание вы найдете в [связной статье](guides/loading-data.md#dataproperties).

После генерации модели создайте базу данных командой:

~~~js
rake db:migrate
~~~

Вы можете проверить добавление записи следующим образом:

1. Откройте консоль Rails:

~~~js
rails c
~~~

2. Добавьте событие так:

~~~js
Event.create 
    :start_date => "2016-05-27 10:00:00", 
    :end_date => "2016-05-27 15:00:00", 
    :text => "Test";
~~~

3. Чтобы посмотреть все события, выполните:

~~~js
Event.all
~~~

4. Для выхода из консоли введите "exit".

![ruby_console](/img/ruby_console.png)

Далее вы реализуете загрузку и сохранение данных в Scheduler с помощью контроллеров.

## Шаг 7. Создание контроллера событий

### Общий подход к загрузке данных через REST API

Существует [стандартный подход](guides/server-integration.md#technique) для загрузки данных в Scheduler с серверной стороны.

Требования на стороне клиента, а также [детали запросов и ответов](guides/server-integration.md#requestresponsedetails) описаны в статье [Интеграция с серверной стороной](guides/server-integration.md).

Ниже приведены инструкции по загрузке данных в Scheduler с использованием backend на Ruby on Rails.

### Контроллер событий

Чтобы создать новый контроллер для событий, используйте следующую команду:

~~~js
rails generate controller event
~~~

Далее добавьте код для обработки добавления, обновления и удаления данных в файле контроллера событий, который находится по адресу *app/controllers/event_controller.rb*:

~~~js
class EventController < ApplicationController
    protect_from_forgery

    def get
         events = Event.all

        render :json => events.map {|event| {
            :id => event.id,
            :start_date => event.start_date.to_formatted_s(:db),
            :end_date => event.end_date.to_formatted_s(:db),
            :text => event.text
        }}        
    end
    
    def add
        event = Event.create 
            :text=>params["text"], 
            :start_date=>params["start_date"], 
            :end_date=>params["end_date"]
            
        render :json=>{:action => "inserted", :tid => event.id}
    end
    
    def update
        event = Event.find(params["id"])
        event.text = params["text"]
        event.start_date = params["start_date"]
        event.end_date = params["end_date"]
        event.save
        
        render :json=>{:action => "updated"}
    end
    
    def delete
        Event.find(params["id"]).destroy
        
        render :json=>{:action => "deleted"}
    end
end
~~~

Код контроллера задач поддерживает несколько типов запросов:

- GET-запрос получает данные для загрузки в Scheduler. Он формирует объект с данными событий для диаграммы Gantt, форматируя даты как строки.
- POST-запрос добавляет новую запись в базу данных.
- PUT-запрос обновляет существующую запись.
- DELETE-запрос удаляет запись.

Каждое действие возвращает ответ в формате JSON, указывающий на выполненную операцию или "error", если что-то пошло не так.

При добавлении новых записей в ответ также включается ID новой записи из базы данных. Это позволяет клиентской части связать новое событие с записью в базе данных.

## Шаг 8. Инициализация Scheduler

В завершение, добавьте следующий код внутри тегов &#60;script&#62;&#60;/script&#62; в файл *app/views/home/index.html.erb*:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor("(= data_path )/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Этот код настраивает Scheduler и позволяет ему загружать и сохранять данные. После этого вы можете запустить приложение в браузере и увидеть результат.

![ruby_ready_scheduler](/img/ruby_ready_scheduler.png)

Здесь событие отображается в Scheduler. Это событие было добавлено ранее на [шаге 6](integrations/other/howtostart-ruby.md#step-6-creating-models). Теперь вы можете добавлять и редактировать события, и все изменения будут сохранены в базе данных.

## Повторяющиеся события

Для поддержки повторяющихся событий требуются три дополнительных поля:

- **rec_type** (определяет шаблон повторения);


- **event_pid** (ID родителя для серии событий);


- **event_length** (фактическая длительность серии событий).

Начните с удаления старой модели командой:

~~~
rails destroy model Event
~~~

Затем создайте новую модель с дополнительными полями:

~~~
rails generate model Event start_date:datetime end_date:datetime text:string 
rec_type:string event_length:integer event_pid:integer
~~~

Удалите существующую таблицу событий из базы данных или удалите файл *db/development.sqlite3*.

Выполните миграцию для обновления схемы базы данных:

~~~
rake db:migrate
~~~

Далее откройте *app/controllers/home_controller.rb* и обновите методы "db_action" и "data" для поддержки сохранения и загрузки повторяющихся событий:

~~~
class HomeController < ApplicationController
 def index
 end

 def data
   events = Event.all

   render :json => events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :rec_type => event.rec_type,
              :event_length => event.event_length,
              :event_pid => event.event_pid
          }}
 end

 def db_action
   mode = params['!nativeeditor_status']
   id = params['id']
   start_date = params['start_date']
   end_date = params['end_date']
   text = params['text']
   rec_type = params['rec_type']
   event_length = params['event_length']
   event_pid = params['event_pid']
   tid = id

   case mode
     when 'inserted'
       event = Event.create :start_date => start_date, :end_date => end_date, 
                               :text => text,:rec_type => rec_type, 
                            :event_length => event_length, :event_pid => event_pid
       tid = event.id
       if rec_type == 'none'
         mode = 'deleted'
       end

     when 'deleted'
       if rec_type != ''
         Event.where(event_pid: id).destroy_all
       end

       if event_pid != 0 and event_pid != ''
         event = Event.find(id)
         event.rec_type = 'none'
         event.save
       else
         Event.find(id).destroy
       end

     when 'updated'
       if rec_type != ''
         Event.where(event_pid: id).destroy_all
       end
       event = Event.find(id)
       event.start_date = start_date
       event.end_date = end_date
       event.text = text
       event.rec_type = rec_type
       event.event_length = event_length
       event.event_pid = event_pid
       event.save
   end

   render :json => {
              :type => mode,
              :sid => id,
              :tid => tid,
          }
 end
end
~~~

Затем в *app/views/home/index.html.erb* добавьте инициализацию плагина **recurring**:

~~~js
scheduler.plugins({
    recurring: true
});

scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor({
    url: "(= data_path )/",
    mode: "REST"
});
~~~

Наконец, снова запустите сервер Rails, чтобы протестировать работу Scheduler с повторяющимися событиями:

~~~
rails server
recurring events on rails
~~~

Тщательно выполнив эти шаги, вы получите полностью рабочий планировщик с поддержкой повторяющихся событий в рамках Rails.

## Устранение неполадок

Если после выполнения этих шагов Scheduler не отображает события, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней представлены рекомендации по диагностике типовых проблем.

## Что дальше

Изучите [руководства по различным возможностям Scheduler](/guides/) или ознакомьтесь с уроками по интеграции Scheduler с другими backend-фреймворками в [[Как начать работу с dhtmlxScheduler](integrations/howtostart-guides.md)].
