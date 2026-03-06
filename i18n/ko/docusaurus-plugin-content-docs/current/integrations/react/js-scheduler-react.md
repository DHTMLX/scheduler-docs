---
title: "dhtmlxScheduler와 React"
sidebar_label: "dhtmlxScheduler와 React"
---

# dhtmlxScheduler와 React

이 가이드는 [React](https://react.dev/)의 기본 개념과 패턴에 대한 이해가 있다고 가정합니다. React가 처음이라면 [React 공식 문서](https://legacy.reactjs.org/docs/getting-started.html)에서 입문 튜토리얼을 먼저 참고하는 것이 좋습니다.

DHTMLX Scheduler는 React와 잘 호환됩니다. 관련 예제는 GitHub에서 확인할 수 있습니다: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## 프로젝트 생성

프로젝트를 생성하기 전에 [Node.js](https://nodejs.org/en/)가 설치되어 있는지 확인하세요.

간단한 React 프로젝트를 설정하려면 다음 명령어를 실행하세요:

~~~
npx create-vite my-react-scheduler-app --template react
~~~

### 의존성 설치

다음으로, 앱 디렉토리로 이동합니다. 이 예제에서는 **my-react-scheduler-app**을 사용합니다:

~~~
cd my-react-scheduler-app
~~~

그런 다음, 원하는 패키지 매니저를 사용하여 의존성을 설치하고 개발 서버를 시작하세요:

- yarn을 사용하는 경우:

~~~
yarn install
yarn dev
~~~

- npm을 사용하는 경우:

~~~
npm install
npm run dev
~~~

React 프로젝트가 **[http://localhost:5173](http://localhost:5173)** 에서 실행되고 있어야 합니다.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Scheduler 생성

DHTMLX Scheduler를 추가하려면, 먼저 명령줄에서 **Ctrl+C**를 눌러 앱을 중지하세요. 이후 Scheduler 패키지를 설치합니다.

## 1단계. 패키지 설치

라이브러리의 PRO 버전은 당사 프라이빗 저장소에서 **npm/yarn**을 통해 제공됩니다. 접근 방법은 
[이 안내](guides/installation.md#npm---evaluation-and-pro-versions)를 참고하세요.

Scheduler의 Evaluation 버전을 받았다면, 다음 명령어 중 하나로 설치하세요:

- npm 사용 시:

~~~
npm install @dhx/trial-scheduler
~~~

- yarn 사용 시:

~~~
yarn add @dhx/trial-scheduler
~~~

또는, 라이브러리의 zip 패키지는 **npm** 모듈 구조이므로 
[로컬 폴더에서 설치](guides/installation.md#installing-the-package-from-a-local-folder)할 수도 있습니다.

## 2단계. 컴포넌트 생성

이제 React 컴포넌트를 만들어 앱에 Scheduler를 추가합니다. ***src/components/Scheduler*** 폴더를 만들고, 그 안에 ***Scheduler.jsx***, ***Scheduler.css***, ***index.js*** 파일을 생성하세요.

먼저 *scheduler-container* 스타일을 적용할 ***Scheduler.css***를 만듭니다:

~~~js title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Scheduler 컨테이너가 body 전체를 채우도록 하려면, ***src*** 폴더의 ***App.css***에서 기본 스타일을 제거하고 다음을 추가하세요:

~~~
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

그런 다음 ***index.js*** 파일에 아래 내용을 추가합니다:

~~~js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### 소스 파일 임포트

***Scheduler.jsx***를 열고 Scheduler 소스 파일을 임포트합니다. 패키지 설치 방식에 따라 임포트 경로가 달라질 수 있습니다:

- 로컬 폴더에서 설치한 경우:

~~~js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- trial 버전 사용 시:

~~~js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

이 튜토리얼에서는 **trial** 버전을 사용합니다.

### 컨테이너 설정 및 Scheduler 추가

Scheduler를 페이지에 렌더링하려면 컨테이너를 설정해야 합니다. ***Scheduler.jsx***에 다음 코드를 작성하세요:

~~~js title="src/components/Scheduler/Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView( ) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

## 3단계. 앱에 Scheduler 추가

이제 Scheduler 컴포넌트를 앱에 추가합니다. ***src/App.jsx***를 열고 기본 내용을 다음으로 교체하세요:

~~~js title="src/App.jsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
            <Scheduler/>
        </div>
    );
}
export default App;
~~~

앱을 다시 실행하면 빈 Scheduler가 페이지에 표시됩니다:

![Scheduler React init](/img/scheduler_init.png)

## 4단계. 데이터 제공

Scheduler에 일정을 표시하려면 데이터셋을 제공해야 합니다. ***src*** 디렉토리에 ***data.js***를 생성하고 몇 가지 이벤트를 추가하세요:

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

그런 다음, 이 데이터를 ***App.jsx***에서 Scheduler 컴포넌트에 props로 전달합니다:

~~~js title="App.jsx"
import { getData } from "./data.js";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
        <div className="scheduler-container">
               <Scheduler events="{getData()}/">
        </div>
    );
}
export default App;
~~~

Scheduler 컴포넌트 내에서 **scheduler.parse()** 메서드에 props를 사용하세요:

~~~js title="Scheduler.jsx"
import { useEffect, useRef } from "react";
import { Scheduler } from "@dhx/trial-scheduler";
import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";

export default function SchedulerView({events}) {
    let container = useRef();
    useEffect(() => {
        let scheduler = Scheduler.getSchedulerInstance();
        scheduler.skin = "terrace";
        scheduler.config.header = [
            "day",
            "week",
            "month",
            "date",
            "prev",
            "today",
            "next",
        ];

        scheduler.init(container.current, new Date(2024, 5, 10));
        scheduler.parse(events);
        return () => {
            scheduler.destructor();
            container.current.innerHTML = "";
        };
    }, []);

    return (
        <div ref="{container}" style="{{" width: "100%", height: "100%" }}></div>
    );
}
~~~

이제 앱 페이지를 새로고침하면 이벤트가 로드된 Scheduler가 표시됩니다:

![Scheduler React events](/img/scheduler_events.png)

## 5단계. 데이터 저장

Scheduler에서 변경된 내용을 처리하려면 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 핸들러를 사용할 수 있습니다. 이를 통해 서버 백엔드와 통신할 수 있습니다. 핸들러는 함수 또는 라우터 객체가 될 수 있습니다. dhtmlxScheduler는 핸들러의 Promise 응답도 지원하므로, 작업 완료 처리가 올바르게 이루어집니다.

**createDataProcessor()**를 사용하여 **DataProcessor**를 생성하고 다음과 같이 변경 사항을 감지할 수 있습니다:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

백엔드에서 새 항목을 생성한 후 이벤트 id가 변경되는 경우(일반적임), Promise에서 **(id: databaseId)** 또는 **(tid: databaseId)** 객체를 반환해야 합니다. 이렇게 하면 Scheduler가 새 데이터베이스 id로 레코드를 업데이트할 수 있습니다. 자세한 내용은 [server side integration](guides/server-integration.md)을 참고하세요.

이로써 React Scheduler 설정이 완료되었습니다. 전체 데모는 GitHub에서 확인할 수 있습니다: [DHTMLX react-scheduler-demo](https://github.com/DHTMLX/react-scheduler-demo).

## XSS, CSRF 및 SQL Injection 공격

Scheduler 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호 기능을 제공하지 않습니다. 이러한 위험으로부터 애플리케이션을 보호하는 것은 백엔드 개발자의 책임입니다.

일반적인 취약점과 보안 강화 방법은 [Application Security](guides/app-security.md) 문서를 참고하세요.
