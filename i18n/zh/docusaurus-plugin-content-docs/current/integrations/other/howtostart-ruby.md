---
title: "dhtmlxScheduler 与 Ruby on Rails 集成"
sidebar_label: "dhtmlxScheduler 与 Ruby on Rails 集成"
---

# dhtmlxScheduler 与 Ruby on Rails 集成

本文将演示如何设置 Scheduler，并结合 REST API 在服务器端集成 [Ruby on Rails](https://rubyonrails.org/) 框架。

如果你使用的是其他技术，可以在下方找到其他集成选项:

- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)

如果你的机器上已安装 Ruby on Rails，可以直接开始集成流程。否则，请按照[安装指南](https://guides.rubyonrails.org/getting_started.html#installing-rails)中的说明完成框架安装。

一切准备就绪后，可以按步骤进行集成。

## 步骤 1. 创建项目

在终端中运行以下命令以创建新项目:

~~~js
rails new path/to/your/project
~~~

## 步骤 2. 创建控制器 {#step-2-creating-a-controller}

接下来，添加一个控制器，用于通过应用程序处理用户对服务器的请求。由于请求类型不同，建议为不同的请求类型创建独立的控制器。

路由用于将控制器与请求类型连接起来。不同的路由对应不同的动作，这些动作会收集传递给视图的信息。

通过以下命令创建名为 "home" 的新控制器，并包含一个名为 "index" 的 action:

~~~js
cd path/to/your/project
rails generate controller home index
~~~

输出结果会确认新文件的创建。

## 步骤 3. 指定路由

要设置路由，打开 *config/routes.rb*。在文件顶部附近找到如下行:

~~~js
get 'home/index'
~~~

并将其替换为:

~~~js
root :to => 'home#index'
get "data", :to=>"event#get", :as=>"data"
post "data(/:id)", :to => "event#add"
put "data/:id", :to => "event#update"
delete "data/:id", :to => "event#delete"
~~~

之后，可以通过以下命令测试服务器:

~~~js
rails server
~~~

然后在浏览器中打开 *http://localhost:3000/*。你应该会看到如下页面:

![ruby_routing](/img/ruby_routing.png)

服务器已准备就绪，可以继续添加视图。

## 步骤 4. 引入源文件

首先，从[这里](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml)下载 dhtmlxScheduler 包。 

请按照以下步骤操作:

1) 将 *codebase/dhtmlxscheduler.js* 以及 *codebase/ext* 和 *codebase/locale* 文件夹从安装包解压到项目目录下的 *vendor/assets/javascripts/*。

你应该会看到如下结构:

![ruby_unpack_js](/img/ruby_unpack_js.png)

2) 解压以下样式文件:

- *codebase/dhtmlxscheduler.css*
- *codebase/dhtmlxscheduler_classic.css*
- *codebase/dhtmlxscheduler_flat.css* 
- *codebase/dhtmlxscheduler_glossy.css* 

到 *vendor/assets/stylesheets/* 目录下。

结果如下所示:

![ruby_unpack_styles](/img/ruby_unpack_styles.png)

3) 在 "public" 目录下创建 "assets" 文件夹，并将以下文件夹解压到其中:

- *codebase/imgs*
- *codebase/imgs_dhx_terrace*
- *codebase/imgs_flat*
- *codebase/imgs_glossy*

效果如下:

![ruby_unpack_assets](/img/ruby_unpack_assets.png)

4) 打开 **config/initializers/assets.rb**，将 *dhtmlxscheduler.js* 和 *dhtmlxscheduler.css* 添加到预编译列表:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.css )
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.js )
~~~

## 步骤 5. 创建视图

现在可以创建视图了。视图用于展示由动作收集的信息。

如果没有为控制器指定专属布局，Rails 会使用 *app/views/layouts/application.html.erb* 作为所有页面的通用模板。建议在此文件的 header 部分引入 scheduler 的 JS 和 CSS 文件，添加如下内容:

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

接下来，为之前在[步骤 2](integrations/other/howtostart-ruby.md#step-2-creating-a-controller)创建的 "home" 控制器指定视图。打开 *app/views/home/index.html.erb*，添加 scheduler 的容器及初始化代码:

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

现在在浏览器中打开 *http://localhost:3000/*，你会看到一个空的 scheduler:

![ruby_empty_scheduler](/img/ruby_empty_scheduler.png)

此时，scheduler 已经可以添加和修改事件，但还无法保存。要实现保存功能，需要创建模型。

## 步骤 6. 创建模型 {#step-6-creating-models}

Scheduler 需要和事件实体进行交互，因此需要为事件创建模型。

通过以下命令生成带有如下属性的事件模型:

~~~js
rails generate model Event start_date:datetime end_date:datetime text:string
~~~

你可以在[相关文档](guides/loading-data.md#dataproperties)中查阅 Event 对象所需属性及其说明。

生成模型后，运行以下命令创建数据库:

~~~js
rake db:migrate
~~~

可以通过以下步骤测试添加数据:

1. 打开 Rails 控制台:

~~~js
rails c
~~~

2. 添加事件:

~~~js
Event.create 
    :start_date => "2016-05-27 10:00:00", 
    :end_date => "2016-05-27 15:00:00", 
    :text => "Test";
~~~

3. 查看所有事件:

~~~js
Event.all
~~~

4. 输入 "exit" 退出控制台。

![ruby_console](/img/ruby_console.png)

接下来，将通过控制器在 scheduler 中实现数据的加载与保存。

## 步骤 7. 创建事件控制器

### 使用 REST API 加载数据的一般方法

有一种[标准方法](guides/server-integration.md#technique)可用于从服务器端向 Scheduler 加载数据。

客户端要求及[请求与响应详情](guides/server-integration.md#request-and-response-details)可参见 [Server-Side Integration](guides/server-integration.md) 文章。

下方将说明如何通过 Ruby on Rails 后端向 Scheduler 加载数据。

### 事件控制器

要为事件设置一个新的控制器，请使用以下命令:

~~~js
rails generate controller event
~~~

接下来，在 *app/controllers/event_controller.rb* 文件中添加处理数据添加、更新和删除的代码:

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

任务控制器代码支持多种请求类型:

- GET 请求用于获取数据并加载到 Scheduler 中。它会为 Gantt 图表创建包含事件数据的对象，并将日期格式化为字符串。
- POST 请求用于向数据库添加新记录。
- PUT 请求用于更新现有记录。
- DELETE 请求用于删除记录。

每个操作都会返回一个 JSON 响应，指示已执行的操作。如果出现问题，则返回 "error"。

当插入新记录时，响应还会包含新项目的数据库 ID。这有助于客户端将新事件与数据库条目关联。

## 第8步. 初始化 Scheduler

最后，在 *app/views/home/index.html.erb* 的 &#60;script&#62;&#60;/script&#62; 标签内加入以下代码:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor("(= data_path )/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

这段代码用于初始化 Scheduler，并让其能够加载和保存数据。完成后，你可以在浏览器中启动应用，查看实际效果。

![ruby_ready_scheduler](/img/ruby_ready_scheduler.png)

如图，事件已显示在 scheduler 中。该事件是在[第6步](integrations/other/howtostart-ruby.md#step-6-creating-models)中添加的。现在你可以添加或编辑事件，所有更改都会保存到数据库。

## 重复事件

如需支持重复事件，需要增加三个额外字段:

- **rec_type**（定义重复模式）；


- **event_pid**（事件系列的父ID）；


- **event_length**（事件系列的实际持续时间）。

首先，移除旧模型:

~~~
rails destroy model Event
~~~

然后创建包含新字段的新模型:

~~~
rails generate model Event start_date:datetime end_date:datetime text:string 
rec_type:string event_length:integer event_pid:integer
~~~

从数据库中删除现有 events 表，或直接删除 *db/development.sqlite3* 文件。

运行迁移以更新数据库结构:

~~~
rake db:migrate
~~~

接着，打开 *app/controllers/home_controller.rb*，更新 "db_action" 方法和 "data" 方法，以支持保存和加载重复事件:

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

然后，在 *app/views/home/index.html.erb* 中，添加 **recurring** 插件初始化:

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

最后，重新启动 Rails 服务器，测试带有重复事件的 scheduler:

~~~
rails server
recurring events on rails
~~~

按照上述步骤操作后，你将在 Rails 框架下获得一个支持重复事件的完整 scheduler。

## 故障排查

如果完成上述步骤后 Scheduler 未显示事件，请查阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章。该文档提供了常见问题的排查建议。

## 后续步骤

你可以查阅 [Scheduler 各项功能指南](/guides/)，或在 [[dhtmlxScheduler 시작하기](/integrations/howtostart-guides/)] 中了解如何将 Scheduler 集成到其他后端框架的教程。

