---
title: "dhtmlxScheduler와 Ruby on Rails 연동하기"
sidebar_label: "dhtmlxScheduler와 Ruby on Rails 연동하기"
---

# dhtmlxScheduler와 Ruby on Rails 연동하기

이 문서에서는 [Ruby on Rails](https://rubyonrails.org/) 프레임워크와 REST API를 사용하여 Scheduler를 서버 사이드에 연동하는 방법을 안내합니다.

다른 기술을 사용하고 있다면, 아래의 다른 연동 옵션을 참고하세요:

- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 ASP.NET MVC"](integrations/dotnet/howtostart-dotnet.md)
- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)
- ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)

이미 Ruby on Rails가 설치되어 있다면 바로 연동을 시작할 수 있습니다. 설치되어 있지 않다면, [설치 가이드](https://guides.rubyonrails.org/getting_started.html#installing-rails)를 참고하여 프레임워크를 설치하세요.

설치가 완료되면, 아래 단계에 따라 연동을 진행할 수 있습니다.

## 1단계. 프로젝트 생성

프로젝트를 새로 생성하려면 터미널에서 다음 명령어를 실행하세요:

~~~js
rails new path/to/your/project
~~~

## 2단계. 컨트롤러 생성

다음으로, 애플리케이션을 통해 서버에 대한 사용자 요청을 처리할 컨트롤러를 추가합니다. 요청의 종류에 따라 별도의 컨트롤러를 두는 것이 좋습니다.

라우팅은 컨트롤러와 요청 타입을 연결해주는 역할을 합니다. 서로 다른 라우트는 서로 다른 액션에 대응하며, 각 액션은 뷰에 전달할 정보를 수집합니다.

아래 명령어로 "home"이라는 이름의 컨트롤러와 "index" 액션을 생성하세요:

~~~js
cd path/to/your/project
rails generate controller home index
~~~

명령어 실행 후 새로운 파일들이 생성되었다는 메시지가 출력됩니다.

## 3단계. 라우팅 지정

라우팅을 설정하려면 *config/routes.rb* 파일을 엽니다. 상단 근처에서 아래와 같은 라인을 찾으세요:

~~~js
get 'home/index'
~~~

이를 아래와 같이 교체하세요:

~~~js
root :to => 'home#index'
get "data", :to=>"event#get", :as=>"data"
post "data(/:id)", :to => "event#add"
put "data/:id", :to => "event#update"
delete "data/:id", :to => "event#delete"
~~~

이제 아래 명령어로 서버를 실행하여 동작을 확인할 수 있습니다:

~~~js
rails server
~~~

이후 브라우저에서 *http://localhost:3000/* 을 열어보세요. 다음과 같은 페이지가 표시됩니다:

![ruby_routing](/img/ruby_routing.png)

서버가 준비되었으니, 이제 뷰(View)를 추가할 차례입니다.

## 4단계. 소스 파일 포함하기

먼저, [여기](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml)에서 dhtmlxScheduler 패키지를 다운로드하세요.

아래의 단계를 따라 진행합니다:

1) 패키지 내 *codebase/dhtmlxscheduler.js* 파일과 *codebase/ext*, *codebase/locale* 폴더를 프로젝트 디렉터리의 *vendor/assets/javascripts/* 에 복사하세요.

아래와 같이 보일 것입니다:

![ruby_unpack_js](/img/ruby_unpack_js.png)

2) 다음 스타일 파일들을 추출하여 *vendor/assets/stylesheets/* 에 복사하세요:

- *codebase/dhtmlxscheduler.css*
- *codebase/dhtmlxscheduler_classic.css*
- *codebase/dhtmlxscheduler_flat.css* 
- *codebase/dhtmlxscheduler_glossy.css* 

결과는 다음과 비슷합니다:

![ruby_unpack_styles](/img/ruby_unpack_styles.png)

3) "public" 디렉터리 내에 "assets" 폴더를 만들고, 다음 폴더들을 그 안에 복사하세요:

- *codebase/imgs*
- *codebase/imgs_dhx_terrace*
- *codebase/imgs_flat*
- *codebase/imgs_glossy*

아래와 같이 나타납니다:

![ruby_unpack_assets](/img/ruby_unpack_assets.png)

4) **config/initializers/assets.rb** 파일을 열고, *dhtmlxscheduler.js* 와 *dhtmlxscheduler.css* 를 precompile 리스트에 추가하세요:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.css )
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.js )
~~~

## 5단계. 뷰 생성하기

이제 뷰(View)를 생성할 차례입니다. 뷰는 액션에서 수집된 정보를 화면에 표시합니다.

컨트롤러용 레이아웃이 별도로 없다면, Rails는 *app/views/layouts/application.html.erb* 파일을 모든 페이지의 기본 템플릿으로 사용합니다. 여기에 스케줄러의 JS와 CSS 파일을 아래와 같이 `<head>` 태그 안에 추가하는 것이 좋습니다:

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

다음으로, [2단계](integrations/other/howtostart-ruby.md#2단계-컨트롤러-생성)에서 생성한 "home" 컨트롤러의 뷰를 지정합니다. *app/views/home/index.html.erb* 파일을 열고, 스케줄러 컨테이너와 초기화 코드를 추가하세요:

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

이제 *http://localhost:3000/* 을 브라우저에서 열면, 비어있는 스케줄러가 표시됩니다:

![ruby_empty_scheduler](/img/ruby_empty_scheduler.png)

이 단계에서는 스케줄러에서 이벤트를 추가 및 수정할 수 있지만, 아직 저장 기능은 동작하지 않습니다. 저장 기능을 위해서는 모델을 생성해야 합니다.

## 6단계. 모델 생성

Scheduler는 이벤트 엔티티와 함께 동작하므로, 이벤트 모델을 생성해야 합니다.

아래 명령어로 이벤트 모델을 생성하세요:

~~~js
rails generate model Event start_date:datetime end_date:datetime text:string
~~~

필수 Event 객체 속성 및 설명은 [관련 문서](guides/loading-data.md#data-properties)에서 확인할 수 있습니다.

모델 생성 후, 아래 명령어로 데이터베이스를 생성하세요:

~~~js
rake db:migrate
~~~

다음 단계로 데이터 추가를 테스트할 수 있습니다:

1. Rails 콘솔을 엽니다:

~~~js
rails c
~~~

2. 아래와 같이 이벤트를 추가하세요:

~~~js
Event.create 
    :start_date => "2016-05-27 10:00:00", 
    :end_date => "2016-05-27 15:00:00", 
    :text => "Test";
~~~

3. 모든 이벤트를 확인하려면 다음을 입력하세요:

~~~js
Event.all
~~~

4. 콘솔을 종료하려면 "exit"를 입력하세요.

![ruby_console](/img/ruby_console.png)

이제 컨트롤러를 사용하여 스케줄러에서 데이터 로딩 및 저장을 구현할 차례입니다.

## 7단계. 이벤트 컨트롤러 생성

### REST API를 사용한 데이터 로딩의 일반적인 방법

서버에서 Scheduler로 데이터를 로딩하는 [표준 접근법](guides/server-integration.md#technique)이 존재합니다.

클라이언트 측 요구사항과 [요청 및 응답의 세부사항](guides/server-integration.md#request-parameters)은 ["Server-Side Integration"](guides/server-integration.md) 문서에서 확인할 수 있습니다.

아래는 Ruby on Rails 백엔드를 사용하여 Scheduler로 데이터를 로딩하는 방법에 대한 안내입니다.

### 이벤트 컨트롤러

이벤트용 새로운 컨트롤러를 설정하려면 다음 명령어를 사용하세요:

~~~js
rails generate controller event
~~~

그 다음, *app/controllers/event_controller.rb* 파일 내에 데이터 추가, 수정, 삭제를 처리하는 코드를 추가합니다:

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

Task Controller 코드는 여러 요청 타입을 지원합니다:

- GET 요청은 데이터를 가져와 Scheduler에 로딩합니다. 이때 이벤트 데이터를 Gantt 차트용 객체로 만들며, 날짜는 문자열로 포맷팅됩니다.
- POST 요청은 새 레코드를 데이터베이스에 추가합니다.
- PUT 요청은 기존 레코드를 수정합니다.
- DELETE 요청은 레코드를 삭제합니다.

각 액션은 수행된 작업을 나타내는 JSON 응답을 반환하며, 문제가 발생하면 "error"를 반환합니다.

새 레코드를 추가할 때에는 응답에 새 항목의 데이터베이스 ID도 포함됩니다. 이를 통해 클라이언트 측에서 새 이벤트를 데이터베이스 항목과 연결할 수 있습니다.

## Step 8. Scheduler 초기화

마지막으로, *app/views/home/index.html.erb*의 &#60;script&#62;&#60;/script&#62; 태그 안에 다음 코드를 포함하세요:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor("(= data_path )/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

이 코드는 Scheduler를 설정하고 데이터의 로드 및 저장을 가능하게 합니다. 완료 후 브라우저에서 애플리케이션을 실행하여 동작을 확인할 수 있습니다.

![ruby_ready_scheduler](/img/ruby_ready_scheduler.png)

여기서는 scheduler에 이벤트가 표시되어 있습니다. 이 이벤트는 [Step 6](integrations/other/howtostart-ruby.md#6단계-모델-생성)에서 미리 추가한 것입니다. 이제 이벤트를 추가하거나 수정할 수 있으며, 모든 변경 사항은 데이터베이스에 저장됩니다.

## 반복 이벤트(Recurring events)

반복 이벤트를 지원하려면 세 개의 추가 필드가 필요합니다:

- **rec_type** (반복 패턴 정의);


- **event_pid** (이벤트 시리즈의 부모 ID);


- **event_length** (이벤트 시리즈의 실제 지속 시간).

먼저 기존 모델을 제거하세요:

~~~
rails destroy model Event
~~~

그리고 다음과 같이 추가 필드를 포함한 새 모델을 생성합니다:

~~~
rails generate model Event start_date:datetime end_date:datetime text:string 
rec_type:string event_length:integer event_pid:integer
~~~

데이터베이스에서 기존 events 테이블을 삭제하거나 *db/development.sqlite3* 파일을 삭제하세요.

마이그레이션을 실행하여 데이터베이스 스키마를 업데이트합니다:

~~~
rake db:migrate
~~~

다음으로, *app/controllers/home_controller.rb* 파일을 열고 "db_action" 메소드와 "data" 메소드를 반복 이벤트 저장 및 로딩을 처리하도록 업데이트하세요:

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

그리고 *app/views/home/index.html.erb*에서 **recurring** 플러그인 초기화를 추가하세요:

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

마지막으로, Rails 서버를 다시 시작하여 반복 이벤트가 적용된 scheduler를 테스트하세요:

~~~
rails server
recurring events on rails
~~~

이 과정을 따라하면 Rails 프레임워크 내에서 반복 이벤트를 지원하는 완전한 스케줄러를 구축할 수 있습니다.

## 문제 해결

이 과정을 마친 후에도 Scheduler에 이벤트가 표시되지 않는 경우, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 참고하세요. 일반적인 문제 진단 방법이 안내되어 있습니다.

## 다음 단계

[Scheduler의 다양한 기능 가이드](/guides/)를 살펴보거나, 다른 백엔드 프레임워크와의 연동 튜토리얼은 [["dhtmlxScheduler 시작하기"](integrations/howtostart-guides.md)]에서 확인하세요.

