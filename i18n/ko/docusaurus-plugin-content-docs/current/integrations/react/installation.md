--- 
title: React Scheduler 설치
sidebar_label: 설치
description: "npm을 통해 React Scheduler의 평가 버전 또는 상용 버전을 설치하는 방법."
---

# React Scheduler 설치

React Scheduler는 두 가지 배포판으로 제공됩니다:

1. **평가 버전**(Evaluation version) 공개 npm에서 이용 가능하며, 체험 워터마크가 포함되고 기술 지원에 접근할 수 있는 무료 평가 기간과 함께 사용할 수 있습니다.
2. **Professional (상용) 버전** 비공개 DHTMLX npm 저장소에서 이용 가능하며 프로덕션 사용을 위한 것입니다.

두 패키지는 동일한 API를 공유합니다.

## 평가 버전 설치(공개 npm)

평가 빌드는 npm에서 [@dhtmlx/trial-react-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-react-scheduler)로 이용 가능합니다:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

또는 Yarn으로:

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

이 빌드는 완전히 작동하지만, 라이브러리가 평가 모드로 실행 중임을 나타내는 메시지가 표시됩니다.

### 선택 사항: 전체 평가 기간 시작(권장)

테스트 패키지는 제한 없이 설치되지만, 공식 평가를 웹사이트에서 시작할 수도 있습니다
[https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml).

정식 평가를 시작하면 평가 기간 동안 무료 기술 지원을 받을 수 있습니다.

**오프라인 예제 다운로드(zip)**

평가 양식에는 오프라인에서 사용할 수 있는 예제가 포함된 ZIP 파일도 함께 제공됩니다.

또한 공식 GitHub에서 추가 예제 및 데모 프로젝트를 확인할 수 있습니다. [React Scheduler Demos on GitHub](https://github.com/DHTMLX/?q=react-scheduler&type=all&language=&sort=).

## Professional 버전(비공개 npm)

Professional 버전은 프로덕션 애플리케이션에 사용되며 상용 라이선스 및 기술 지원에 대한 완전한 액세스를 포함합니다.

상용 라이선스를 얻으면 [고객 영역](https://dhtmlx.com/clients/)에서 개인 npm 자격 증명을 생성할 수 있습니다.

로그인/비밀번호를 생성한 후, npm을 구성합니다:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

그런 다음 Professional 패키지를 설치합니다:

~~~bash
npm install @dhx/react-scheduler
~~~

또는 Yarn으로:

~~~bash
yarn add @dhx/react-scheduler
~~~

## 다음 단계

설치 후에는 다음을 계속 진행합니다:

- [빠른 시작](integrations/react/quick-start.md)
- [개요](integrations/react/overview.md)
- [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)
- [프레임워크 가이드](/category/framework-integrations/)