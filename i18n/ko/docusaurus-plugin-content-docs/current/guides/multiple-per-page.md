---
title: "한 페이지에서 다중 스케줄러 만들기"
sidebar_label: "한 페이지에서 다중 스케줄러 만들기"
---

# 한 페이지에서 다중 스케줄러 만들기

:::info
이 기능은 Scheduler PRO 버전(상용 라이선스(2021년 10월 6일부), Enterprise 및 Ultimate 라이선스)에서만 사용할 수 있습니다.
:::

아마도 라이브러리와 함께 작업을 시작하면서 이미 눈치 채셨을 텐데, dhtmlxScheduler는 정적 객체입니다. 즉, 페이지에 _단 하나의 인스턴스_만 존재할 수 있습니다.

이제 PRO 버전의 경우 이 명제를 재진술해야 하며: 페이지에 다수의 인스턴스가 존재할 수 있습니다. 기본 인스턴스인 scheduler는 여전히 존재하며 전역 객체 **scheduler**를 통해 접근할 수 있지만, 새로운 Scheduler 객체를 생성할 수도 있습니다.

## Scheduler 인스턴스 구성

새로운 dhtmlxScheduler 인스턴스를 만들려면 **Scheduler.getSchedulerInstance()** 메서드를 사용하세요:

~~~js
// 주의, 명령어의 'Scheduler'는 대문자로 시작합니다
const scheduler = Scheduler.getSchedulerInstance();
~~~

메서드는 구성 객체를 매개변수로 받을 수 있습니다:

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
            { id:1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", 
                text:"English lesson", subject: 'english' },
            { id:2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", 
                text:"Math exam", subject: 'math' },
            { id:3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", 
                text:"Science lesson", subject: 'science' },
            { id:4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", 
                text:"English lesson", subject: 'english' },
            { id:5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", 
                text:"Usual event" }
        ]
    }
});
~~~

구성 객체에는 다음 속성들이 포함될 수 있습니다:

- **container** - (*string|HTMLElement*) Scheduler가 표시될 HTML 컨테이너(또는 그 ID)입니다. 지정하지 않으면 Scheduler는 컨테이너 없이 초기화됩니다.
- **config** - (*object*) Scheduler의 구성 설정을 담고 있는 객체
- **xy** - (*object*) [스케줄러 요소의 크기](api/other/xy.md) 정보가 담긴 객체
- **templates** - (*object*) 템플릿이 담긴 객체
- **events** - (*object*) 이벤트 핸들러를 담은 객체

새 인스턴스의 이벤트 핸들러를 지정할 때는 다음 형식을 사용해야 합니다:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: function(id, e){
            const task = scheduler.getEvent(id);
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

- **data** - (*object|string*) 로드할 데이터가 담긴 객체 또는 데이터를 로드할 URL
- **plugins** - (*object*) 활성화해야 하는 확장 기능
- **locale** - (*string|object*) 활성화할 두 글자 언어 코드 또는 로케일 객체

참고, 매개변수 없이 **Scheduler.getSchedulerInstance()** 메서드를 호출하면 기본 구성 설정을 가진 Scheduler 객체가 반환됩니다. 따라서 새 인스턴스를 구성하고 초기화한 뒤 데이터를 로드하는 방식으로 진행해야 합니다.

다음은 간단한 예: 2개의 스케줄러를 서로 아래에 두기

~~~js
window.addEventListener("DOMContentLoaded", function(){
    const scheduler1  = Scheduler.getSchedulerInstance();
    scheduler1.init('scheduler_here',new Date(2027,5,30),"week");
    scheduler1.load("/data/events")
    
    const scheduler2 = Scheduler.getSchedulerInstance();
    scheduler2.init('scheduler_here_2',new Date(2027,5,30),"month");
    scheduler2.load("/data/events")    
)};

<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>    
</body>
~~~

## Scheduler 및 DataProcessor 인스턴스의 소멸자

버전 6.0부터 dhtmlxScheduler 객체에는 필요하지 않은 Scheduler 인스턴스를 해제하는 [destructor](api/method/destructor.md)가 있습니다.

다음과 같이 사용할 수 있습니다:

~~~js
const myScheduler = Scheduler.getSchedulerInstance();
 
// 스케줄러 인스턴스 제거
myScheduler.destructor();
~~~

소멸자는 다음 작업을 수행합니다:

- 스케줄러 인스턴스에 로드된 데이터 지우기
- 데이터프로세서가 스케줄러에 연결되어 있으면 제거하기
- DOM에서 스케줄러 분리하기
- [scheduler.event()](api/method/event.md) 메서드를 통해 첨부된 모든 DOM 이벤트 분리하기

### Angular에서의 소멸자 사용

다음은 Angular 프레임워크를 사용하는 동안 스케줄러 인스턴스를 해제하는 예제입니다:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Scheduler.getSchedulerInstance();

     // 구성 및 초기화
  }
  
  ngOnDestroy() {
     this.$scheduler.destructor();
     this.$scheduler = null;
  }
}
~~~

### DataProcessor 분리

DataProcessor의 소멸자를 호출하면 DataProcessor 인스턴스가 제거되고 스케줄러에서 분리됩니다. 예:

~~~js
const scheduler = Scheduler.getSchedulerInstance();
const dp = new scheduler.DataProcessor("url");
dp.init(scheduler);

// 데이터 프로세서를 제거하고 스케줄러에서 분리
dp.destructor();
~~~

:::note
GPL 또는 상용 에디션과 같이 다중 인스턴스의 스케줄러 객체 생성을 허용하지 않는 패키지를 사용하는 경우, 스케줄러 소멸자를 호출하면 페이지를 새로 고침할 때까지 스케줄러에 접근할 수 없게 됩니다.
:::