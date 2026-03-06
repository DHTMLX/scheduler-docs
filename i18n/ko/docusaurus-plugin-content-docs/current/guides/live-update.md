---
title: "Live Updates 모드 (레거시)"
sidebar_label: "Live Updates 모드 (레거시)"
---

# Live Updates 모드 (레거시)

:::warning
설명된 기능은 더 이상 사용되지 않으며 유지 관리되지 않습니다.
:::
:::note
이 문서는 DHTMLX Scheduler의 레거시 Live Updates 모드에 대해 다룹니다. 최신 버전에 대한 정보는 [여기](guides/multiuser-live-updates.md)에서 확인하세요.
:::

Live Update 모드는 여러 사용자의 데이터를 실시간으로 동기화합니다.

한 사용자가 변경을 하면, 그 변경 사항이 즉시 다른 모든 사용자에게 표시됩니다.

이 모드는 `Faye` 소켓 라이브러리를 사용하여 페이지 전체를 새로고침하지 않고(해당 컴포넌트만 업데이트됨) 빠르고 유연하게 변경 사항을 반영합니다.

여기서는 이 기능을 시작하는 간단한 가이드를 제공합니다.

## 기본 원리

Live Updates는 한 클라이언트에서 발생한 변경 사항을 연결된 모든 다른 클라이언트에 브로드캐스트하는 방식으로 작동합니다. 이를 위해 양방향 통신이 가능한 WebSocket 연결을 사용합니다.

이 버전에서는 Live Updates 모듈이 `DataProcessor` 모듈을 확장하여 `Faye` 클라이언트 라이브러리와, 클라이언트 간 메시지 분배를 담당하는 백엔드 앱을 함께 사용합니다.

설정에는 다음과 같은 세 가지 구성 요소가 포함됩니다:

1. Scheduler와 `DataProcessor` 모듈이 포함된 **프론트엔드**
2. 데이터베이스에서 CRUD 작업을 수행하는 **백엔드**
3. 클라이언트 연결을 관리하는 **live-updates 허브**

사용자가 데이터를 업데이트하면:

- **프론트엔드**가 변경 사항을 **백엔드**로 전송합니다.
- 동시에, **프론트엔드**는 동일한 변경 사항을 **live-updates 허브**로 전송합니다.
- **live-updates 허브**는 이 변경 사항을 모든 연결된 클라이언트에 브로드캐스트합니다.
- **live-updates 허브**에서 업데이트를 받은 **프론트엔드**는 백엔드 CRUD 작업을 트리거하지 않고 Scheduler 데이터에 해당 변경 사항을 적용합니다.

## 시작하기 전에

이 튜토리얼을 따라 하려면, 데이터베이스에서 데이터를 불러오고 변경 사항을 저장하는 서버 사이드 로직이 통합된 dhtmlxScheduler 앱이 필요합니다. (자세한 내용은 [여기](integrations/howtostart-guides.md) 참고)

간단한 예시는 다음과 같습니다:

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2025,5,24), "week");
        scheduler.load("api/scheduler");

        const dp = scheduler.createDataProcessor({
            url: "/events",
            mode: "REST"
        });
    }
</script>
~~~

## Live Updates 구성하기

:::note
이 Live Updates 구현은 더 이상 지원되지 않으며, 메인 패키지에 포함되어 있지 않습니다.
:::

### 1단계. 설치

1. Scheduler용 **Live Updates 플러그인** 다운로드: [download link](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. **Live Updates 백엔드** 앱 다운로드: [download link](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. 백엔드 앱의 readme 파일을 참고하여 **Live Updates 백엔드**를 실행합니다.

### 2단계. 프론트엔드 구성

Live Update 모드를 활성화하려면, 프론트엔드 앱에 두 개의 파일을 추가해야 합니다:

- **live_updates.js** - 앞 단계에서 받은 플러그인 파일
- **client.js** - WebSocket 백엔드 앱에서 동적으로 생성되는 파일

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

이 예시는 WebSocket 앱에 직접 연결합니다. 실제 환경에서는 보통 이 URL을 메인 앱을 통해 프록시하여, 보조 앱의 주소와 포트를 숨기는 것이 좋습니다. 이를 위해 리버스 프록시를 설정할 수 있습니다.

**메인 앱을 통한 프록시 요청(Node.js 예시):**

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**프론트엔드:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### 3단계. Live Updates 활성화

`DataProcessor` 인스턴스에서 **live_updates()** 메서드를 호출하여 해당 모드를 활성화합니다. 반드시 `DataProcessor`가 먼저 초기화되어 있어야 하며, 메서드의 파라미터로 WebSocket 엔트리 포인트 URL을 전달합니다.

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

전체 데모 애플리케이션은 [여기](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip)에서 다운로드할 수 있습니다.
