---
title: "페이지에서 여러 개의 스케줄러 만들기"
sidebar_label: "페이지에서 여러 개의 스케줄러 만들기"
---

# 페이지에서 여러 개의 스케줄러 만들기

:::info
이 기능은 Scheduler PRO 버전(2021년 10월 6일부터 상용, Enterprise, Ultimate 라이선스)에서만 사용할 수 있습니다.
:::

아마도 라이브러리 작업의 아주 초기 단계에서부터 dhtmlxScheduler가 정적 객체이며, 즉 페이지상에 _오직 하나의 인스턴스_만 존재할 수 있다는 것을 이미 보셨을 것입니다.

이제 PRO 버전에서는 이 진술을 재구성하여: 페이지에 _여러 개의 인스턴스_가 존재할 수 있다고 말해야 합니다. 기본 인스턴스인 scheduler는 여전히 전역 객체 **scheduler** 를 통해 접근할 수 있지만, 새 스케줄러 객체를 생성할 수도 있습니다.

## Scheduler 인스턴스 구성

새로운 dhtmlxScheduler 인스턴스를 생성하려면 `Scheduler.getSchedulerInstance()` 메서드를 사용합니다:

~~~js
// 명령어의 'Scheduler'는 대문자로 시작합니다
const scheduler = Scheduler.getSchedulerInstance();
~~~

메서드는 구성 객체를 매개변수로 받을 수 있습니다:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    plugins: {
        recurring: true
    },
    container: "scheduler_here",
    config: {
        hour_date: "%h:%i",
        details_on_create: true
    },
    data: {
        events: [
            { id: 1, start_date: "2027-04-18 09:00", end_date: "2027-04-18 12:00", text: "영어 수업", subject: 'english' },
            { id: 2, start_date: "2027-04-20 10:00", end_date: "2027-04-21 16:00", text: "수학 시험", subject: 'math' },
            { id: 3, start_date: "2027-04-21 10:00", end_date: "2027-04-21 14:00", text: "과학 수업", subject: 'science' },
            { id: 4, start_date: "2027-04-23 16:00", end_date: "2027-04-23 17:00", text: "영어 수업", subject: 'english' },
            { id: 5, start_date: "2027-04-22 09:00", end_date: "2027-04-22 17:00", text: "일반 이벤트" }
        ]
    }
});
~~~

구성 객체에는 다음과 같은 속성을 포함할 수 있습니다:

- `container` - (*string|HTMLElement*) Scheduler가 표시될 HTML 컨테이너(또는 그 아이디). 지정하지 않으면 Scheduler가 컨테이너 없이 초기화됩니다.
- `config` - (*object*) Scheduler의 구성 설정이 들어 있는 객체
- `xy` - (*object*) [스케줄러 요소의 크기](api/other/xy.md) 를 담은 객체
- `templates` - (*object*) 템플릿이 들어 있는 객체
- `events` - (*object*) 이벤트 핸들러가 들어 있는 객체

새로운 Scheduler 인스턴스의 이벤트 핸들러를 지정할 때는 다음 형식을 사용해야 합니다:

~~~js
const scheduler = Scheduler.getSchedulerInstance({
    events: {
        onEventCreated: (id) => {
            const createdEvent = scheduler.getEvent(id);
            createdEvent.owner = null;
            return true;
        },
        onClick: (id) => {
            alert(scheduler.getEvent(id).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) 불러올 데이터 객체 또는 데이터가 위치한 URL
- `plugins` - (*object*) 활성화해야 하는 확장 기능
- `locale` - (*string|object*) 활성화해야 하는 두 글자 언어 코드 또는 로케일 객체

**참고**, 매개변수 없이 `Scheduler.getSchedulerInstance()` 메서드를 호출하면 기본 구성 설정의 스케줄러 객체가 반환됩니다. 따라서 새 인스턴스를 구성하고 초기화한 뒤 데이터를 채우는 것이 일반적입니다.

간단한 예를 들어 보겠습니다: 두 개의 스케줄러를 하나는 다른 아래에 두고 배치하기:

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstScheduler = Scheduler.getSchedulerInstance();
    firstScheduler.init("scheduler_here", new Date(2027, 5, 30), "week");
    firstScheduler.load("/data/events");

    const secondScheduler = Scheduler.getSchedulerInstance();
    secondScheduler.init("scheduler_here_2", new Date(2027, 5, 30), "month");
    secondScheduler.load("/data/events");
});
~~~

~~~html
<body>
    <div id="scheduler_here" style="width:100%; height: 50%;"></div>
    <div id="scheduler_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

## Scheduler 및 DataProcessor 인스턴스의 소멸자

버전 6.0부터 dhtmlxScheduler 객체에는 필요 없는 Scheduler 인스턴스를 해제하는 데 사용할 수 있는 [`destructor()`](api/method/destructor.md) 메서드가 있습니다.

Scheduler 인스턴스의 소멸자는 다음과 같이 사용할 수 있습니다:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();

// destroying a Scheduler instance
schedulerInstance.destructor();
~~~

소멸자는 다음 작업을 수행합니다:

- 스케줄러 인스턴스에 로드된 데이터 제거
- dataProcessor를 제거(스케줄러에 연결되어 있을 경우)
- DOM에서 스케줄러 분리
- [scheduler.event()](api/method/event.md) 메서드를 통해 연결된 모든 DOM 이벤트 분리

### Angular에서 소멸자 사용

다음은 Angular 프레임워크를 사용하면서 스케줄러 인스턴스를 해제하는 예시입니다:

~~~js
@Component({selector: 'app-scheduler', template: `...`})
class MySchedulerComponent implements OnDestroy {
    ngOnInit() {
        this.$scheduler = Scheduler.getSchedulerInstance();

        // 구성 및 초기화
    }

    ngOnDestroy() {
        this.$scheduler.destructor();
        this.$scheduler = null;
    }
}
~~~

### dataProcessor 분리하기

dataProcessor의 소멸자를 호출하면 dataProcessor 인스턴스가 제거되고 Scheduler에서 분리됩니다. 예를 들면:

~~~js
const schedulerInstance = Scheduler.getSchedulerInstance();
const dataProcessor = schedulerInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// dataProcessor를 제거하고 Scheduler에서 분리
dataProcessor.destructor();
~~~

:::note
다중 인스턴스 생성을 허용하지 않는 패키지(GPL 또는 Commercial 에디션)를 사용하는 경우, Scheduler 소멸자를 호출하면 페이지를 새로고침할 때까지 스케줄러에 접근할 수 없게 됩니다.
:::