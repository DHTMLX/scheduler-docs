---
title: "스케줄러 설치 방법"
sidebar_label: "스케줄러 설치 방법"
---

# 스케줄러 설치 방법

dhtmlxScheduler 패키지를 프로젝트에 추가하는 방법에는 여러 가지가 있습니다. [Bower](https://bower.io/)나 [npm](https://www.npmjs.com/)과 같은 패키지 매니저를 사용할 수 있습니다.

또는, CDN에서 필요한 JS와 CSS 파일을 직접 포함할 수도 있습니다.

## npm - 평가판 및 PRO 버전 {#npm---evaluation-and-pro-versions}

**프로페셔널 평가판 버전**

[체험판 Scheduler 패키지](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml)를 다운로드한 후, README 파일의 안내에 따라 설치할 수 있습니다. 
체험판 Scheduler 버전은 30일 동안만 사용 가능합니다.

**프로페셔널 버전**

DHTMLX의 프라이빗 npm 접근은 [Client's Area](https://dhtmlx.com/clients/)에서 npm 로그인과 비밀번호를 생성하여 이용할 수 있습니다. 자세한 설치 가이드도 해당 페이지에서 제공됩니다. 프라이빗 npm 접근은 Scheduler 라이선스가 유효한 동안에만 가능합니다.

## npm - 표준 무료 버전 {#npmstandardfreeversion}

Scheduler의 표준 버전은 [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler)에서 아래 명령어로 설치할 수 있습니다:

~~~html
npm install dhtmlx-scheduler
~~~

:::note
Scheduler의 표준 버전만 [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler)에서 제공됩니다.
:::

## Bower {#bower}

[Bower](https://bower.io/)를 통해 Scheduler의 표준 버전을 설치하려면 아래 명령어를 실행하세요:

~~~html
bower install scheduler
~~~

## CDN {#cdn}

CDN에서 JS와 CSS 파일을 포함하려면 **dhtmlxscheduler.js**와 **dhtmlxscheduler.css** 파일을 직접 링크하면 됩니다:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
    type="text/javascript"></script>  
~~~

다양한 dhtmlxScheduler 버전에 대한 CDN 링크 전체 목록은 [별도 문서](guides/cdn-links-list.md)에서 확인할 수 있습니다.

## PRO 에디션을 프로젝트에 추가하기 {#adding-pro-edition-into-project}

CDN, Bower, npm 등 공개 소스에서 제공되는 컴포넌트의 표준 에디션은 GPL 라이선스로 배포됩니다.

프로페셔널 및 평가판 버전의 경우, [프라이빗 npm 레지스트리](#npm---evaluation-and-pro-versions)를 사용하여 패키지를 설치할 수 있습니다.

이 방법을 사용할 수 없는 경우, Pro 버전을 프로젝트에 추가하는 두 가지 대안이 있습니다:
 
- Pro 버전을 수동으로 프로젝트에 추가
- 로컬 디렉터리에서 npm을 통해 Pro 버전 설치

### 로컬 폴더에서 패키지 설치하기 {#installing-the-package-from-a-local-folder}

**npm**을 사용할 때, Pro 패키지는 [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) 또는 [`npm link`](https://docs.npmjs.com/cli/link/) 명령어로 로컬 폴더에서 설치할 수 있습니다.  
아래는 두 가지 방법에 대한 단계별 안내입니다:

### npm install

1. Scheduler 패키지를 로컬 디렉터리에 복사합니다.
2. 프로젝트 디렉터리로 이동합니다.
3. `npm install ../scheduler-local-package-path` 명령을 실행합니다.

### npm link

1. Scheduler 패키지를 로컬 디렉터리에 복사합니다.
2. 패키지 폴더에서 `npm link`를 실행합니다.
3. 프로젝트 디렉터리로 이동합니다.
4. `npm link dhtmlx-scheduler`를 실행합니다.

dhtmlxScheduler의 표준 버전과 PRO 버전의 상세 비교는 관련 문서 [Standard vs PRO Library Versions](guides/editions-comparison.md)에서 확인할 수 있습니다.
