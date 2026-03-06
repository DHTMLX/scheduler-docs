---
title: "페이지에서 여러 개의 Scheduler 생성하기"
sidebar_label: "페이지에서 여러 개의 Scheduler 생성하기"
---

# 페이지에서 여러 개의 Scheduler 생성하기

:::info
이 기능은 Scheduler PRO 버전(2021년 10월 6일부터 상용, Enterprise, Ultimate 라이선스)에서만 사용할 수 있습니다.
:::

처음 라이브러리를 사용할 때, dhtmlxScheduler는 정적 객체로 _한 페이지에 오직 한 개의 인스턴스_만 존재할 수 있다는 점을 알 수 있습니다.

하지만 PRO 버전에서는 상황이 달라집니다. 이제 _여러 개의 dhtmlxScheduler 인스턴스_를 동일한 페이지에서 동시에 사용할 수 있습니다. 전역 **scheduler** 객체를 통해 접근 가능한 기본 scheduler 인스턴스 외에도, 추가적인 scheduler 객체를 생성할 수 있습니다.

## Scheduler 인스턴스 설정 {#schedulerinstanceconfiguration}

새로운 dhtmlxScheduler 인스턴스를 생성하려면 **Scheduler.getSchedulerInstance()** 메서드를 사용하세요:

~~~js
// 'Scheduler'의 첫 글자가 대문자임에 주의하세요
const scheduler = Scheduler.getSchedulerInstance();
~~~

이 메서드는 설정 객체를 인자로 받을 수 있습니다:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true,
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id:1, start_date: "2022-04-18 09:00", end_date: "2022-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2022-04-20 10:00", end_date: "2022-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2022-04-21 10:00", end_date: "2022-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2022-04-23 16:00", end_date: "2022-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2022-04-22 09:00", end_date: "2022-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

설정 객체에는 다음과 같은 속성을 포함할 수 있습니다:

- **container** - (*string|HTMLElement*) Scheduler가 렌더링될 HTML 컨테이너(또는 그 id)입니다. 생략할 경우 컨테이너 없이 Scheduler가 초기화됩니다.
- **config** - (*object*) Scheduler의 설정 정보
- **xy** - (*object*) scheduler 요소들의 크기, 자세한 내용은 [](api/other/xy.md) 참고
- **templates** - (*object*) 템플릿 설정
- **events** - (*object*) 이벤트 핸들러


새로운 Scheduler 인스턴스에 이벤트 핸들러를 지정할 때는 다음과 같이 작성합니다:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            var task = scheduler.getEvent(id);
            task.owner = null;
            return true;
        },
        onClick: function(id, e){
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- **data** - (*object|string*) 데이터를 직접 전달하거나 데이터를 가져올 URL
- **plugins** - (*object*) 활성화할 확장 기능
- **locale** - (*string|object*) 두 글자의 언어 코드 또는 활성화할 로케일 객체

**참고:** **Scheduler.getSchedulerInstance()**를 파라미터 없이 호출하면 기본 설정의 scheduler 객체가 반환됩니다. 새 인스턴스에 대해 별도로 설정, 초기화 및 데이터 로딩이 필요합니다.

아래는 두 개의 scheduler가 위아래로 배치된 간단한 예시입니다:


~~~js
window.addEventListener("DOMContentLoaded", function(){
    var scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2019,5,30),"week");
    scheduler1.load("/data/events");
    
    var scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2019,5,30),"month");
    scheduler2.load("/data/events");    
});

<body>
    <div id="scheduler_here"></div>
    <div id="scheduler_here_2"></div>    
</body>
~~~

## Scheduler 및 DataProcessor 인스턴스의 소멸자 {#destructor-of-scheduler-and-dataprocessor-instances}

버전 6.0부터 dhtmlxScheduler는 불필요한 Scheduler 인스턴스를 정리할 수 있도록 [destructor](api/method/destructor.md)를 제공합니다.

Scheduler 인스턴스 소멸자는 다음과 같이 사용할 수 있습니다:

~~~js
var myScheduler = Scheduler.getSchedulerInstance();
 
// scheduler 인스턴스 소멸
myScheduler.destructor();
~~~

소멸자는 다음 작업을 수행합니다:

- scheduler 인스턴스에 로드된 데이터 삭제
- 연결된 dataProcessor 소멸
- scheduler를 DOM에서 분리
- [scheduler.event()](api/method/event.md) 메서드로 연결된 모든 DOM 이벤트 제거

### Angular에서 소멸자 사용

Angular에서 scheduler 인스턴스를 정리할 때 소멸자를 사용하는 방법은 다음과 같습니다:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // 설정 및 초기화
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### dataProcessor 분리

dataProcessor의 소멸자를 호출하면 인스턴스가 정리되고 scheduler와의 연결이 해제됩니다. 예시:

~~~js
var scheduler = Scheduler.getSchedulerInstance();
var dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// dataProcessor를 소멸하고 scheduler에서 분리
dp.destructor();
~~~

:::note
여러 scheduler 인스턴스를 지원하지 않는 패키지(GPL 또는 Commercial 에디션 등)를 사용하는 경우, scheduler 소멸자를 호출하면 페이지를 새로고침하기 전까지 scheduler를 사용할 수 없습니다.
:::

## 관련 문서


- ["dhtmlxLayout와의 통합"](integrations/legacy/dhxlayout-integration.md)
