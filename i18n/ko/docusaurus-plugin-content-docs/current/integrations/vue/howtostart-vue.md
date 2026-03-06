---
title: "dhtmlxScheduler와 Vue.js"
sidebar_label: "dhtmlxScheduler와 Vue.js"
---

# dhtmlxScheduler와 Vue.js

이 가이드는 [Vue](https://vuejs.org/)의 기본 개념과 패턴을 이해하고 있다고 가정합니다. 복습이 필요하다면, [Vue 3 공식 문서](https://vuejs.org/guide/introduction.html#getting-started)에서 유용한 시작 튜토리얼을 참고할 수 있습니다.

DHTMLX Scheduler는 Vue와 원활하게 작동합니다. 관련 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Scheduler with Vue Demo](https://github.com/DHTMLX/vue-scheduler-demo).

## 프로젝트 생성

새 프로젝트를 시작하기 전에 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요.

Vue 프로젝트를 생성하려면 다음 명령어를 실행하세요:

~~~
npm create vue@latest
~~~ 

이 명령어는 공식 Vue 프로젝트 스캐폴딩 도구인 **create-vue**를 설치하고 실행합니다. 자세한 내용은 
[Vue.js Quick Start](https://vuejs.org/guide/quick-start.html#creating-a-vue-application)를 참고하세요.

### 의존성 설치

다음으로 앱 디렉토리로 이동합니다. 이 가이드에서는 프로젝트 이름을 **scheduler-vue**로 지정하고 다음을 실행합니다:

~~~
cd scheduler-vue
~~~

그런 다음, 패키지 매니저를 사용하여 의존성을 설치하고 개발 서버를 시작합니다:

- **yarn**을 사용하는 경우:

~~~
yarn install
yarn dev
~~~

- **npm**을 사용하는 경우:

~~~
npm install
npm run dev
~~~

이제 Vue 프로젝트가 [http://localhost:5173](http://localhost:5173)에서 접근 가능합니다.

![Scheduler Vue.js app running](/img/scheduler_vue_app_run.png)

## Scheduler 생성

Scheduler를 추가하기 전에, 터미널에서 **Ctrl+C**를 눌러 실행 중인 앱을 중지하세요. 이후 Scheduler 패키지 설치를 진행합니다.

## 1단계. 패키지 설치

PRO 버전 라이브러리는 **npm/yarn**을 통해 당사 프라이빗 저장소에서 제공됩니다. 접근 권한을 얻으려면 
[이 안내](guides/installation.md#npm---evaluation-and-pro-versions)를 따르세요.

Scheduler의 Evaluation 버전을 받았다면, 다음과 같이 설치할 수 있습니다:

- npm:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

또는, 라이브러리 zip 패키지가 **npm** 모듈 구조이므로 
[로컬 폴더에서 설치](guides/installation.md#installing-the-package-from-a-local-folder)할 수도 있습니다.

## 2단계. 컴포넌트 생성

Scheduler를 앱에 통합하기 위해 Vue 컴포넌트를 생성합니다. ***src/components/*** 디렉토리에 ***Scheduler.vue*** 파일을 새로 만드세요.

### 소스 파일 임포트

***Scheduler.vue***를 열고 Scheduler 소스 파일을 임포트합니다. 설치 방식에 따라 다음과 같이 다릅니다:

- 로컬 폴더 설치 시 임포트 예시:

~~~js title="Scheduler.vue"
import { Scheduler } from "dhtmlx-scheduler";
…
<style>
  @import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

- trial 버전 사용 시 임포트 예시:

~~~js title="Scheduler.vue"
import { Scheduler } from "@dhx/trial-scheduler";
…
<style>
  @import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
</style>
~~~

이 튜토리얼에서는 **trial** 버전의 Scheduler를 사용합니다.

### 컨테이너 설정 및 Scheduler 추가

Scheduler를 페이지에 렌더링하려면 컨테이너 엘리먼트를 지정해야 합니다. 관련 코드는 다음과 같습니다:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 9, 6), "week");
    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

Scheduler 컨테이너가 전체 body를 채우도록 하려면, ***src/assets*** 폴더의 ***main.css***에서 기본 스타일을 제거하고 아래와 같이 교체하세요:

~~~js title="src/assets/main.css"
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 3단계. 앱에 Scheduler 추가

다음으로 Scheduler 컴포넌트를 앱에 추가합니다. ***src/App.vue***를 열고 기본 내용을 아래와 같이 교체하세요:

~~~js title="src/App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  components: { Scheduler },
};
</script>

<template>
  <Scheduler/>
</template>
~~~

앱을 실행하면 페이지에 빈 Scheduler가 표시됩니다:

![Scheduler Vue init](/img/scheduler_init.png)

## 4단계. 데이터 제공

Scheduler에 이벤트를 표시하려면 데이터를 공급해야 합니다. ***src/*** 디렉토리에 ***data.js*** 파일을 만들고 샘플 이벤트를 추가하세요:

~~~js title="src/data.js"
export function getData() {
    const data = [
        {
            start_date: "2024-06-10 6:00",
            end_date: "2024-06-10 8:00",
            text: "Event 1",
            id: 1,
        },
        {
            start_date: "2024-06-13 10:00",
            end_date: "2024-06-13 18:00",
            text: "Event 2",
            id: 2,
        },
    ];
    return data;
}
~~~

이 데이터를 ***App.vue***에서 Scheduler 컴포넌트의 props로 전달합니다:

~~~js title="App.vue"
<script>
import Scheduler from "./components/Scheduler.vue";
import { getData } from "./data";

export default {
  components: { Scheduler },
  data() {
    return {
      events: getData(),
    };
  },
};
</script>

<template>
  <Scheduler :events="events" />
</template>
~~~

그리고 **Scheduler** 컴포넌트 내에서 **scheduler.parse()** 메서드에 props를 사용하세요:

~~~js title="Scheduler.vue"
<script>
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default {
  props: ["events"],
  mounted() {
    let scheduler = Scheduler.getSchedulerInstance();
    let date = scheduler.init(this.$refs.cont, new Date(2023, 5, 10), "week");
    scheduler.parse(this.events);

    this.scheduler = scheduler;
  },
  unmounted() {
    this.scheduler.destructor();
    this.$refs.cont.innerHTML = "";
  },
};
</script>

<template>
  <div ref="cont"></div>
</template>
~~~

앱 페이지를 새로고침하면 이벤트가 표시된 Scheduler가 나타납니다:

![Scheduler Vue events](/img/scheduler_events.png)

## 5단계. 데이터 저장

Scheduler 내에서 발생하는 변경 사항을 추적하려면, [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 핸들러를 사용할 수 있습니다. 이 핸들러는 서버 백엔드와의 통신을 도와줍니다. 함수 혹은 라우터 객체로 정의할 수 있으며, dhtmlxScheduler는 handler에서 Promise 응답을 지원하므로 액션 완료를 올바르게 처리할 수 있습니다.

**createDataProcessor()** API 메서드를 사용하여 **DataProcessor**를 생성하고, 아래와 같이 변경 사항을 감지할 수 있습니다:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

백엔드에서 새 레코드를 생성 후 이벤트 ID를 변경하는 경우(일반적인 시나리오), Promise에서 **(id: databaseId)** 또는 **(tid: databaseId)**를 반환해야 합니다. 이렇게 하면 Scheduler가 데이터베이스의 새 ID로 레코드를 업데이트할 수 있습니다. 자세한 내용은 [server side integration](guides/server-integration.md)을 참고하세요.

이제 Vue Scheduler 설정이 완료되었습니다. 전체 데모는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/vue-scheduler-demo](https://github.com/DHTMLX/vue-scheduler-demo).

## XSS, CSRF 및 SQL 인젝션 공격

Scheduler 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션 보안은 개발자, 특히 백엔드 구현자의 책임입니다.

컴포넌트의 취약점을 이해하고 애플리케이션의 보안을 강화하는 방법은 [Application Security](guides/app-security.md) 문서를 참고하세요.
