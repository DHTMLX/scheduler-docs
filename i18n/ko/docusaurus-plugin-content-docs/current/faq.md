---
title: "FAQ"
sidebar_label: "FAQ"
---

# FAQ

## 샘플 여는 방법 {#howtoopensamples}

컴포넌트 패키지에는 샘플을 로컬에서 실행할 수 있도록 도와주는 데모 백엔드 앱이 포함되어 있습니다. [Node.js](https://nodejs.org/en/)가 필요하며, 데모에서는 인메모리 스토리지를 사용하므로 별도의 데이터베이스 설정이 필요하지 않습니다.

### 예제 실행 단계 

1) 데모 Node.js 백엔드 앱 사용: 

- 패키지를 폴더에 압축 해제합니다.
- 터미널(혹은 cmd, PowerShell)을 엽니다.
- `npm install`을 실행합니다.
- `npm run start`를 실행합니다.
- 브라우저에서 `http://localhost:9200`을 엽니다.
- 인덱스 페이지가 보이며, 이는 **https://docs.dhtmlx.com/scheduler/samples/**의 온라인 샘플과 동일합니다.

2) Apache 웹 서버 사용

- Apache 웹 서버를 설치합니다. 방법을 잘 모를 경우 [XAMPP](https://www.apachefriends.org/index.html) 사용을 고려하세요.
- Scheduler 샘플을 Apache 문서 루트 디렉터리(*xampp/htdocs* - XAMPP 사용 시)에 넣습니다.
- Apache 웹 서버를 시작한 후 **http://localhost/yourfolder**를 통해 예제에 접근합니다.

3) IDE 내장 개발 웹 서버 사용

일부 IDE에서는 내장 개발 웹 서버를 제공합니다. 예시: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html)


사용 중인 IDE가 이와 유사한 기능을 기본적으로 제공하거나 플러그인으로 지원하는지 확인하세요.

### 왜 웹 서버가 필요한가요?

일부 예제는 AJAX(xhr)를 통해 JSON 파일에서 데이터를 불러옵니다. 이를 위해서는 예제를 웹 서버를 통해 열어야 합니다.

예제를 더블 클릭해서 파일로 열면, 브라우저가 이 모드에서는 AJAX 호출을 차단합니다. 그 결과, 컴포넌트가 데이터 파일을 불러올 수 없고, 오른쪽 상단에 *Invalid data* 팝업이 표시됩니다.

이 현상을 확인하려면 브라우저의 URL을 확인하세요. 만약 *file:///*로 시작한다면, 예를 들어:


**file:///D:/www/scheduler-eval/samples/20_multiple/01_basic.html** 

이 경우 데이터 파일 로딩이 동작하지 않습니다.

웹 서버에서 예제를 열면 URL이 다음과 같이 표시됩니다(*http://*는 생략될 수 있음):


**http://localhost/scheduler-eval/samples/20_multiple/01_basic.html**


## 스케줄러가 제대로 렌더링되지 않음

스케줄러가 페이지에 올바르게 표시되지 않는 경우, 컨테이너의 CSS 스타일을 확인하세요. 컨테이너에는 픽셀 또는 퍼센트 단위의 유효한 크기가 설정되어 있어야 합니다.


- 크기가 퍼센트로 설정되어 있다면, 부모 컨테이너에도 높이가 지정되어야 합니다. 
- 스케줄러가 body에 직접 위치할 경우, 퍼센트 기반 높이 처리를 위해 아래 CSS를 적용하세요:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*필수*/
    overflow:hidden;
}
~~~


## Internet Explorer에서 스케줄러가 올바르게 렌더링되지 않음

스케줄러가 Internet Explorer에서만 제대로 표시되지 않는다면, 페이지에 전체 DOCTYPE 선언이 사용되고 있는지 확인하세요.
스케줄러는 IE의 표준 모드에서는 정상 작동하지만, quirks 모드에서는 설계되지 않았습니다.

예를 들어, HTML5 DOCTYPE은 다음과 같습니다:

~~~html
<!DOCTYPE html>
~~~


## 커스텀 뷰가 초기 뷰일 때 스케줄러 초기화 실패

스케줄러의 초기 뷰는 [init](api/method/init.md) 메서드를 통해 초기화 시 지정됩니다. 그러나, 커스텀 뷰에서 사용하는 템플릿이 아직 완전히 처리되지 않은 시점에 초기화가 진행되면 실패할 수 있습니다.


이 문제를 피하려면, 모든 템플릿이 완전히 처리된 후 발생하는 [onTemplatesReady](api/event/ontemplatesready.md) 이벤트 핸들러 내에서 커스텀 뷰를 생성하세요:

~~~js
scheduler.attachEvent("onTemplatesReady",function(){
    //여기에 커스텀 뷰 생성 코드를 작성하세요
});

scheduler.init(container, date, "custom view name");
~~~

## PHP 스크립트로 데이터를 불러올 때 XML 파싱 오류 발생

서버 측 스크립트가 XML 앞에 공백을 출력할 때 자주 발생하는 문제입니다.

커넥터 스크립트에 포함된 파일 중 


<b>&#60;?php</b> 와 <b>?&#62;</b> 태그 밖에 공백이 없는지 반드시 확인하세요. 


## 12시간제(비군사용) 시간 포맷 설정 방법

기본적으로 스케줄러는 24시간제(군사용) 포맷을 사용하여 13:00과 같이 표시됩니다. 


12시간제로 전환하여 1:00 PM처럼 표시하려면 [hour_date](api/config/hour_date.md) 속성을 설정하세요:

~~~js
scheduler.config.hour_date = "%g:%i%a"; /*!*/
scheduler.init('scheduler_here', new Date(), "month");
~~~

## 1시간 미만 이벤트와 1시간 이벤트가 동일하게 보임

기본 스케일 단위 높이(시간 높이)는 44px이고, 최소 이벤트 박스 높이는 40px(머티리얼 스킨 기준)입니다. 이로 인해 15분 이벤트와 1시간 이벤트가 동일한 크기로 보일 수 있습니다.

이벤트 크기를 스케일에 맞게 조정하는 다양한 방법이 있습니다. 자세한 내용은 ["스케일 및 이벤트 박스 크기 조정"](guides/sizing.md) 문서를 참고하세요.


## 캘린더 배경 그리드와 시간 스케일이 맞지 않음

기본이 아닌 확대/축소 수준에서 이런 현상이 발생할 수 있습니다.

이 현상은 현재는 피할 수 없는 동작입니다.
캘린더 레이아웃은 100%(기본) 확대/축소에서만 올바르게 표시되며, 그 외의 비율에서는 브라우저 스케일링으로 인해 일부 요소가 이동할 수 있습니다.


## 스케줄러 확장성 한계 및 최대 이벤트 개수

스케줄러의 확장성은 여러 요소에 따라 달라집니다.

Timeline 뷰에서는 행(row) 수가 렌더링 속도에 큰 영향을 미칩니다. 수백 개의 타임라인 섹션을 표시하면 설정에 따라 눈에 띄는 지연이 발생할 수 있습니다.

대량의 데이터를 처리하려면 [dynamic loading mode](guides/loading-data.md#dynamic-loading)를 활성화하세요. 이 모드에서는 스케줄러가 표시할 이벤트만(날짜 범위를 포함한 AJAX 요청을 통해 백엔드에서 필터링) 불러옵니다.

동적 로딩에서는 동시에 표시되는 이벤트 수가 주요 제한입니다. 일반적으로 수천 개의 이벤트도 성능 저하 없이 표시할 수 있지만, 뷰에 따라 다릅니다.

예를 들어, Day 또는 Week 뷰는 이벤트가 제한된 너비의 컬럼에 표시되므로 대량 이벤트 표시에는 적합하지 않습니다.

전체적으로, 이벤트 총 개수로 인한 문제는 드뭅니다. 하지만, 타임라인 섹션이 많을 경우(예: 200개 row), 리페인트 시간을 줄이기 위해 코드 최적화가 필요할 수 있습니다.


## 스케줄러가 아무 것도 표시하지 않음 {#schedulerdoesntshowanything}

주로 두 가지 상황이 있습니다:

1. 백엔드 API를 직접 설정하거나 [튜토리얼](integrations/howtostart-guides.md)을 따라 설정했지만 스케줄러에 이벤트가 표시되지 않는 경우.

또는

2. 백엔드에 변경사항 저장에 문제가 있는 경우.

이러한 문제의 진단 방법은 ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 참고하세요.

## 오른쪽 상단에 에러 알림이 표시됨 {#anerroralertappearsintherighttopcorner}

![error_alert](/img/error_alert.png)

이 메시지는 컴포넌트에서 문제가 발생할 때 나타납니다.

이 메시지는 보통 데이터 또는 애플리케이션 로직의 실제 문제를 나타내므로, 메시지를 숨기면 문제를 감출 뿐, 다른 곳에서 다시 나타날 수 있습니다.

앱을 사용자에게 배포하기 전에 이러한 메시지를 비활성화하려면 [show_errors](api/config/show_errors.md) 설정을 사용하세요:

~~~js
scheduler.config.show_errors = false;
~~~
