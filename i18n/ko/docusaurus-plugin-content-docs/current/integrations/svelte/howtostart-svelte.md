---
title: "dhtmlxScheduler와 Svelte 연동"
sidebar_label: "dhtmlxScheduler와 Svelte 연동"
---

# dhtmlxScheduler와 Svelte 연동

이 가이드는 Svelte의 기본 개념과 패턴에 대한 이해를 전제로 합니다. 만약 익숙하지 않다면, [Svelte 공식 문서](https://svelte.dev/)의 시작하기 튜토리얼을 참고하세요.

DHTMLX Scheduler는 Svelte와 잘 호환됩니다. 동작하는 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Scheduler with Svelte Demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## 프로젝트 생성

새 프로젝트를 만들기 전에 [Vite](https://vite.dev/) (선택 사항)와 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요.

Vite로 Svelte 프로젝트를 시작하려면 다음 명령어를 실행하세요:

~~~
npm create vite@latest
~~~

자세한 내용은 [관련 문서](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit)를 참고하세요.

### 의존성 설치

다음으로 앱 디렉터리로 이동합니다. 프로젝트 이름을 **scheduler-svelte**로 하고, **svelte** 옵션을 선택하세요. 그런 다음 아래 명령어를 실행합니다:

~~~
cd scheduler-svelte
~~~

이후, 원하는 패키지 매니저로 의존성을 설치하고 앱을 실행하세요:

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

Svelte 프로젝트가 [http://localhost:5173](http://localhost:5173)에서 실행될 것입니다.

![Scheduler Svelte app running](/img/scheduler_svelte_app_run.png)

## Scheduler 생성

DHTMLX Scheduler를 추가하려면 터미널에서 **Ctrl+C**를 눌러 앱을 중지하세요. 그 다음 Scheduler 패키지를 설치합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 **npm/yarn**을 통해 당사 프라이빗 저장소에서 제공합니다. 액세스하려면 
[이 안내](guides/installation.md#npm---evaluation-and-pro-versions)를 따르세요.

Evaluation 버전을 받았다면 다음과 같이 설치하세요:

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

Scheduler를 앱에 추가하기 위해 새로운 Svelte 컴포넌트를 만듭니다. ***src/*** 디렉터리에 ***Scheduler.svelte*** 파일을 생성하세요.

### 소스 파일 임포트

***Scheduler.svelte***를 열고 Scheduler 관련 파일을 임포트합니다. 설치 방식에 따라 다릅니다:

- 로컬 폴더에서 설치한 경우, 임포트는 다음과 같습니다:

~~~js title="Scheduler.svelte"
import { Scheduler } from "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- trial 버전을 사용하는 경우, 임포트는 다음과 같습니다:

~~~js title="Scheduler.svelte"
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

이 가이드에서는 **trial** 버전을 사용합니다.

### 컨테이너 지정 및 Scheduler 추가

Scheduler를 표시하려면 렌더링할 컨테이너 엘리먼트를 정의해야 합니다. 아래 코드를 참고하세요:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.init(container, new Date(2023, 9, 6), "week");

        return () => scheduler.destructor();
    });
</script>

<div bind:this="{container}"></div>
~~~

Scheduler 컨테이너가 전체 body를 채우도록 하려면, ***src/***의 ***app.css***에서 기본 스타일을 제거하고 아래와 같이 추가하세요:

~~~js title="src/app.css"
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 3단계. 앱에 Scheduler 추가

다음으로 Scheduler 컴포넌트를 앱에 포함합니다. ***src/App.svelte***를 열고 기본 내용을 아래와 같이 교체하세요:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
</script>

<Scheduler/>
~~~

앱을 실행하면 빈 Scheduler가 화면에 나타납니다:

![Scheduler Svelte init](/img/scheduler_init.png)

## 4단계. 데이터 제공

이벤트를 표시하려면 Scheduler에 데이터를 전달해야 합니다. ***src/***에 ***data.js*** 파일을 만들고 샘플 데이터를 추가하세요:

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

그런 다음, 이 데이터를 ***App.svelte***에서 Scheduler 컴포넌트에 prop으로 전달하세요:

~~~js title="App.svelte"
<script>
  import Scheduler from "./Scheduler.svelte";
  import { getData } from "./data.js";
</script>

<Scheduler data="{getData()}" />
~~~

***Scheduler.svelte*** 내부에서 **scheduler.parse()**를 사용해 prop을 적용합니다:

~~~js title="Scheduler.svelte"
<script>
    import { onMount } from "svelte";
    
    import { Scheduler } from "@dhx/trial-scheduler";
    import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css"
    export let data; /*!*/

    let scheduler;
    let container;
    onMount(() => {
        scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace"
        scheduler.init(container, new Date(2024, 5, 10), "week");

        return () => scheduler.destructor();
    });

    $: scheduler?.parse(data); /*!*/
</script>

<div bind:this="{container}"></div>
~~~

앱을 새로고침하면 이벤트가 표시된 Scheduler가 나타납니다:

![Scheduler Svelte events](/img/scheduler_events.png)

## 5단계. 데이터 저장

Scheduler에서 변경된 내용을 처리하려면 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 핸들러를 사용하세요. 이 핸들러는 서버 백엔드와의 통신을 가능하게 해줍니다. 핸들러는 함수 또는 라우터 객체가 될 수 있습니다. dhtmlxScheduler는 Promise 응답을 지원하므로, 작업이 올바르게 완료될 때까지 대기합니다.

**createDataProcessor()**로 **DataProcessor**를 생성하고 변경 사항을 다음과 같이 감지할 수 있습니다:

~~~js
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

백엔드에서 새 레코드 생성 시 이벤트 ID가 변경되는 경우(일반적인 케이스), Promise가 **(id: databaseId)** 또는 **(tid: databaseId)** 객체를 반환해야 Scheduler가 해당 이벤트를 올바르게 갱신할 수 있습니다. 자세한 내용은 [서버 사이드 연동](guides/server-integration.md)을 참고하세요.

이로써 Svelte Scheduler 설정이 완료되었습니다. 전체 데모는 GitHub에서 확인할 수 있습니다: [svelte-scheduler-demo](https://github.com/DHTMLX/svelte-scheduler-demo).

## XSS, CSRF 및 SQL 인젝션 공격

Scheduler 자체는 SQL 인젝션, XSS, CSRF와 같은 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션 보안은 백엔드 개발자의 책임입니다.

컴포넌트의 취약점과 권장 보안 대책은 [Application Security](guides/app-security.md) 문서를 참고하세요.
