--- 
title: "React와 함께하는 dhtmlxScheduler"
sidebar_label: "React와 함께하는 dhtmlxScheduler"
---

# React와 함께하는 dhtmlxScheduler

이 문서를 사용하려면 [React](https://react.dev/)의 기본 개념과 패턴에 익숙해야 합니다. 익히지 않았다면 시작하기 튜토리얼을 위한 [React 문서](https://react.dev/learn)를 참조하십시오.

DHTMLX Scheduler는 React와 호환됩니다. GitHub에서 해당 예제를 확인할 수 있습니다: [DHTMLX Scheduler with React Demo](https://github.com/DHTMLX/react-scheduler-demo).

## 프로젝트 만들기

새 프로젝트를 만들기 시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치해야 합니다.

다음 명령으로 기본 React 프로젝트를 만들 수 있습니다:

~~~ 
npx create-vite my-react-scheduler-app --template react
~~~

### 의존성 설치

다음으로 앱 디렉터리로 이동합니다. 프로젝트를 **my-react-scheduler-app**로 설정하고 실행합시다:

~~~ 
cd my-react-scheduler-app
~~~

그 후 의존성을 설치하고 개발 서버를 시작해야 합니다. 이를 위해 패키지 관리자를 사용해야 합니다:

- yarn을 사용하는 경우 아래 명령을 실행합니다:

~~~ 
yarn install
yarn dev
~~~

- npm을 사용하는 경우 아래 명령을 실행합니다:

~~~ 
npm install
npm run dev
~~~

이제 React 프로젝트가 `http://localhost:5173` 에서 실행 중이어야 합니다.

![Scheduler React app running](/img/scheduler_react_app_run.png)

## Scheduler 만들기

이제 DHTMLX Scheduler 코드를 가져와야 합니다. 먼저 명령줄에서 **Ctrl+C**를 눌러 앱을 중지한 뒤 Scheduler 패키지 설치를 진행할 수 있습니다.

### 1단계. 패키지 설치

라이브러리의 PRO 버전은 우리의 프라이빗 저장소에서 **npm/yarn** 설치로 이용 가능합니다. 아래 [지침](guides/installation.md#npm---evaluation-and-pro-versions)을 따라 접근 권한을 얻으십시오.

Scheduler의 Evaluation 버전을 얻은 후, 아래 명령으로 설치할 수 있습니다:

- npm의 경우:

~~~ 
npm install @dhx/trial-scheduler
~~~

- yarn의 경우:

~~~ 
yarn add @dhx/trial-scheduler
~~~

또는 라이브러리의 zip 패키지가 **npm** 모듈로 구성되어 있기 때문에, [로컬 폴더에서 설치](guides/installation.md#installing-the-package-from-a-local-folder) 할 수 있습니다.

### 2단계. 컴포넌트 생성

이제 애플리케이션에 Scheduler를 추가하기 위한 React 컴포넌트를 생성해야 합니다. ***src/components/Scheduler*** 폴더를 만들어 봅시다. 여기에서 ***Scheduler.jsx***, ***Scheduler.css***, 그리고 ***index.js*** 파일을 생성합니다.

***Scheduler.css*** 파일을 만들고 *scheduler-container*에 대한 스타일을 추가합니다:

~~~ css title="src/components/Scheduler/Scheduler.css"
.scheduler-container {
    height: 100vh;
    width: 100vw;
}
~~~

Scheduler 컨테이너가 바디의 전체 공간을 차지하도록 하려면 ***src*** 폴더에 위치한 기본 스타일 파일인 App.css의 기본 스타일을 제거하고 아래의 스타일을 추가해야 합니다:

~~~ css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

그리고 아래 내용으로 ***index.js*** 파일을 추가합니다:

~~~ js title="src/components/Scheduler/index.js"
import Scheduler from './Scheduler';
import './Scheduler.css';
export default Scheduler;
~~~

### 소스 파일 가져오기

새로 생성한 ***Scheduler.jsx*** 파일을 열고 Scheduler 소스 파일을 가져옵니다. 참고로:

- 로컬 폴더에서 Scheduler 패키지를 설치한 경우 가져오기 경로는 아래와 같이 보일 수 있습니다:

~~~ js title="Scheduler.jsx"
import { Scheduler } from 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
~~~

- Trial 버전을 설치하기로 선택한 경우 가져오기 경로는 아래와 같이 될 수 있습니다:

~~~ js title="Scheduler.jsx"
import { Scheduler } from '@dhx/trial-scheduler';
import '@dhx/trial-scheduler/codebase/dhtmlxscheduler.css';
~~~

이 튜토리얼에서는 **trial** 버전의 Scheduler를 사용할 것입니다.

### 컨테이너 설정 및 Scheduler 추가

페이지에 Scheduler를 표시하려면 컴포넌트를 렌더링할 컨테이너를 설정해야 합니다. 아래 코드로 ***Scheduler.jsx*** 파일을 생성합니다:

~~~ js title="src/components/Scheduler/Scheduler.jsx"
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

이제 컴포넌트를 앱에 추가할 시간입니다. ***src/App.jsx***를 열고 기본 콘텐츠 대신 *Scheduler* 컴포넌트를 아래 코드로 삽입하여 사용합니다:

~~~ js title="src/App.jsx"
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

그 후 앱을 시작하면 페이지에 빈 Scheduler가 표시되어야 합니다:

![Scheduler React init](/img/scheduler_init.png)

## 4단계. 데이터 제공

Scheduler에 데이터를 추가하려면 데이터 세트를 제공해야 합니다. ***src/*** 디렉터리에 ***data.js*** 파일을 만들고 데이터를 추가합시다:

~~~ js title="src/data.js"
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

그리고 ***App.jsx***에서 Scheduler 컴포넌트에 props(데이터)를 전달해야 합니다:

~~~ js title="App.jsx"
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

그리고 Scheduler 컴포넌트의 **scheduler.parse()** 메서드에서 props를 사용합니다:

~~~ js title="Scheduler.jsx"
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

이제 앱 페이지를 다시 열면 이벤트가 있는 Scheduler가 표시되어야 합니다:

![Scheduler React events](/img/scheduler_events.png)

## 5단계. 데이터 저장

Scheduler에서 수행된 변경 사항을 캡처하려면 서버 측 백엔드와의 “통신”을 가능하게 하는 [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 핸들러를 사용할 수 있습니다. 핸들러는 함수나 라우터 객체로 선언할 수 있습니다. dhtmlxScheduler는 핸들러의 Promise 응답을 허용하므로 작업의 완료를 올바르게 처리합니다.

다음과 같이 API 메서드인 **createDataProcessor()**를 통해 **DataProcessor**를 생성하고 변경 사항을 캡처할 수 있습니다:

~~~ 
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

서비스가 새 레코드를 만든 뒤 이벤트 id를 변경하는 경우가 흔튼데, Promise가 데이터베이스 ID를 가진 객체를 반환하도록 하여(예: **(id: databaseId)** 또는 **(tid: databaseId)**) Scheduler가 새 데이터베이스 id를 레코드에 적용할 수 있도록 해야 합니다. 서버 측에 대한 자세한 내용은 [guides/server-integration.md](guides/server-integration.md)를 참조하십시오.

자, React Scheduler가 준비되었습니다. 전체 데모를 GitHub에서 확인하려면 [GitHub의 전체 데모 확인하기](https://github.com/DHTMLX/react-scheduler-demo)를 참고하세요.

## XSS, CSRF 및 SQL Injection 공격

Scheduler는 SQL 인젝션이나 XSS 및 CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 방지하는 방법을 제공하지 않는다는 점에 주의하십시오. 애플리케이션의 보안을 유지하는 책임은 백엔드를 구현하는 개발자에게 있습니다.

구성 요소의 가장 취약한 지점과 애플리케이션 보안을 강화하기 위한 조치를 알아보려면 [Application Security](guides/app-security.md) 문서를 참조하십시오.