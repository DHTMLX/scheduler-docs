---
title: "dhtmlxScheduler와 Angular 연동"
sidebar_label: "dhtmlxScheduler와 Angular 연동"
---

# dhtmlxScheduler와 Angular 연동

이 가이드는 Angular의 기본 개념과 패턴에 대한 이해를 전제로 합니다. 만약 익숙하지 않다면, [Angular 공식 문서](https://angular.io/docs)에서 초보자를 위한 튜토리얼을 참고하는 것이 좋습니다.

DHTMLX Scheduler는 Angular와 매끄럽게 연동됩니다. 실제 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Scheduler with Angular Demo](https://github.com/DHTMLX/angular-scheduler-demo).

## 프로젝트 생성

새 프로젝트를 시작하기 전에 [Angular CLI](https://angular.io/cli)와 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요. 그런 다음 아래 명령어를 실행합니다:

~~~
ng new my-angular-scheduler-app
~~~

이 명령어는 필요한 모든 도구와 의존성을 설정해 주므로 추가 단계가 필요하지 않습니다.

### 의존성 설치

다음으로 앱 폴더로 이동합니다:

~~~
cd my-angular-scheduler-app
~~~

아래 명령어 중 하나로 앱을 실행할 수 있습니다:

~~~
yarn start
~~~

또는

~~~
npm start
~~~

이제 앱은 [http://localhost:4200](http://localhost:4200)에서 접근 가능합니다.

![Scheduler with Angular](/img/scheduler_angular_front.png)

## Scheduler 생성

DHTMLX Scheduler를 추가하려면, 먼저 실행 중인 앱을 **Ctrl+C**로 중지하세요. 이후 Scheduler 패키지 설치를 진행합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 **npm/yarn**을 통해 프라이빗 저장소에서 제공됩니다. 
[이 안내](guides/installation.md#npm---evaluation-and-pro-versions)를 따라 접근 권한을 얻으세요.

Evaluation 버전을 받았다면, 다음과 같이 설치합니다:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

또는, 라이브러리의 zip 패키지는 **npm** 모듈 구조이므로 
[로컬 폴더에서 설치](guides/installation.md#installing-the-package-from-a-local-folder)할 수도 있습니다.

## 2단계. 컴포넌트 생성

Scheduler를 통합할 새로운 컴포넌트를 만듭니다. ***src/app/*** 디렉터리 내에 ***scheduler*** 폴더를 만들고, ***scheduler.component.ts***, ***scheduler.component.css***, ***scheduler.component.html*** 파일을 추가하세요.

***scheduler.component.html***에는 아래와 같이 Scheduler 템플릿을 추가합니다:

~~~js title="scheduler/scheduler.component.html"
<div #scheduler_here class="dhx_cal_container">
   <div class="dhx_cal_navline">
       <div class="dhx_cal_prev_button"></div>
       <div class="dhx_cal_next_button"></div>
       <div class="dhx_cal_today_button"></div>
       <div class="dhx_cal_date"></div>
       <div class="dhx_cal_tab" data-tab="day"></div>
       <div class="dhx_cal_tab" data-tab="week"></div>
       <div class="dhx_cal_tab" data-tab="month"></div>
   </div>
   <div class="dhx_cal_header"></div>
   <div class="dhx_cal_data"></div>
</div>
~~~

Scheduler 스타일은 ***scheduler.component.css***에 별도로 선언합니다. 예시:

~~~js title="scheduler/scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
:host {
   display: block;
   position: relative;
   height: 100%;
   width: 100%;
}
~~~

Scheduler 컨테이너가 전체 body를 채우도록, ***src*** 폴더의 ***styles.css***에도 다음 스타일을 추가하세요:

~~~js title="src/styles.css"
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

### 소스 파일 임포트

***scheduler.component.ts***와 ***scheduler.component.css***에서 Scheduler 소스 파일을 임포트합니다. 설치 방식에 따라 아래와 같습니다:

- 로컬 폴더에서 설치한 경우, 임포트 예시:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- trial 버전 사용 시, 임포트 예시:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';
~~~

~~~js title="scheduler.component.css"
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

이 튜토리얼에서는 **trial** 버전을 사용합니다.

### 컨테이너 지정 및 Scheduler 추가

Scheduler를 페이지에 표시하려면, 렌더링할 컨테이너를 지정해야 합니다. 아래 코드를 참고하세요:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

여기서 **ngOnInit()** 라이프사이클 후크는 Scheduler를 초기화하고, **ngOnDestroy()**에서는 컴포넌트가 파괴될 때 [**scheduler.destructor()**](api/method/destructor.md)를 호출하여 정리합니다.

## 3단계. 앱에 Scheduler 추가

다음으로, 기본 내용을 Scheduler 컴포넌트로 교체합니다. ***src/app/app.component.ts***를 열어 다음과 같이 수정합니다:

~~~js title="src/app/app.component.ts"
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<scheduler></scheduler>`,
})
export class AppComponent {
  name = '';
}
~~~

***src/app/***에 ***app.module.ts*** 파일을 만들고 *SchedulerComponent*를 포함시킵니다:

~~~js title="src/app/app.module.ts"
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
 
@NgModule({
  declarations: [AppComponent, SchedulerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

마지막으로 ***src/main.ts*** 파일의 내용을 아래와 같이 교체합니다:

~~~js title="src/main.ts"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

앱을 다시 시작하면, 빈 Scheduler가 페이지에 나타납니다.

![Adding Scheduler into an app](/img/scheduler_angular_init.png)

## 4단계. 데이터 제공

Angular Scheduler에서 데이터 로딩을 활성화하려면 이벤트 서비스를 추가해야 합니다. 그 전에 이벤트 모델을 정의해야 합니다.

이벤트 모델을 생성하려면 아래 명령어를 사용하세요:

~~~
ng generate class models/event --skip-tests
~~~

***models*** 폴더 내 새로 생성된 ***event.ts*** 파일에 다음 코드를 추가합니다:

~~~js title="models/event.ts"
export class Event {
    id!:  number;
    start_date!: string;
    end_date!: string;
    text!: string;
}
~~~

다음으로 이벤트 서비스를 생성합니다. 이 서비스는 특정 이벤트를 관리하는 클래스입니다. Angular에서는 서비스를 의존성 주입(Dependency Injection) 방식으로 사용할 수 있습니다. 서비스에는 앱에서 필요한 데이터, 함수 또는 기능이 포함될 수 있습니다. 여기서는 스케줄러에 이벤트를 제공하는 데이터 서비스를 만듭니다.

이벤트 서비스를 생성하려면 아래 명령어를 실행하세요:

~~~
ng generate service services/event --flat --skip-tests
~~~

***services*** 폴더 내 새로 생성된 ***event.service.ts*** 파일에 다음 코드를 추가합니다:

~~~js title="services/event.service.ts"
import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2023-05-16 09:00", end_date: "2023-05-16 13:00", 
                text: "Event 1" },
            { id: 2, start_date: "2023-05-18 10:00", end_date: "2023-05-18 14:00", 
                text: "Event 2" },
        ]);
    }
}
~~~

**@Injectable()** 데코레이터는 이 서비스를 주입 가능한 서비스로 표시합니다. 이 서비스는 나중에 컴포넌트에 주입됩니다.

현재 **get()** 메서드는 하드코딩된 이벤트로 이뤄진 Promise를 반환합니다. 서버에서 데이터를 불러오고 Promise를 반환하도록 확장할 수도 있습니다. 스케줄러 컴포넌트는 **EventService**를 사용해 이벤트를 가져오게 됩니다. 이를 위해 ***scheduler.component.ts***에서 **EventService**를 임포트합니다:

~~~js title="scheduler.component.ts"
import {EventService} from "../services/event.service";
~~~

그리고 **@Component** 데코레이터에 **EventService**를 provider로 지정합니다:

~~~js title="scheduler.component.ts"
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})
~~~

이렇게 하면 *SchedulerComponent*가 생성될 때마다 새로운 서비스 인스턴스가 제공됩니다. 서비스 주입을 위해 **SchedulerComponent** 클래스에 다음과 같이 생성자를 추가합니다:

~~~js title="scheduler.component.ts"
constructor(private eventService: EventService){}
~~~

**ngOnInit()** 메서드를 아래와 같이 업데이트하세요:

- 이벤트 로딩을 위한 날짜 포맷을 설정(XML 포맷 사용)
- 서비스를 호출해 이벤트를 가져오고, 데이터를 받은 후 스케줄러에 전달

~~~js title="scheduler.component.ts"
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 9, 7));
this.eventService.get()
    .then((data) => {
         scheduler.parse(data);
    });
~~~

최종 ***scheduler.component.ts*** 파일은 아래와 같습니다:

~~~js title="scheduler.component.ts"
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
    ViewChild, ViewEncapsulation } from "@angular/core";
import {EventService} from "../services/event.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this.eventService.get().then((data) => {scheduler.parse(data);});
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

앱 페이지를 다시 열면 Scheduler에 이벤트가 표시됩니다.

![Scheduler with Angular events](/img/scheduler_angular_events.png)

## 5단계. 데이터 저장

Scheduler에서 변경 사항을 추적하려면, 백엔드와 통신하기 위해 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 핸들러를 사용할 수 있습니다. 이 핸들러는 함수 또는 라우터 객체로 정의할 수 있습니다. dhtmlxScheduler는 핸들러에서 Promise 응답을 지원하므로, 작업이 올바르게 처리됩니다.

**DataProcessor**는 **createDataProcessor()** API 메서드를 사용하여 다음과 같이 변경 사항을 감지할 수 있습니다:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

서비스가 새 레코드를 생성한 후 이벤트 ID를 수정하는 경우(일반적임), Promise는 **(id: databaseId)** 또는 **(tid: databaseId)** 형태의 객체를 반환해야 합니다. 이렇게 하면 Scheduler가 새 데이터베이스 ID로 레코드를 업데이트할 수 있습니다.

서버 측 통합에 대한 자세한 내용은 [여기](guides/server-integration.md)에서 확인할 수 있습니다.

이제 Angular Scheduler 설정이 완료되었습니다. [GitHub에서 전체 데모를 확인해보세요](https://github.com/DHTMLX/angular-scheduler-demo).

## XSS, CSRF 및 SQL 인젝션 공격

Scheduler 자체는 SQL 인젝션, XSS 또는 CSRF 공격과 같은 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션 보안은 백엔드 개발자의 책임입니다.

잠재적인 취약점 및 권장 보안 관행에 대한 자세한 내용은 [Application Security](guides/app-security.md) 문서를 참고하세요.
