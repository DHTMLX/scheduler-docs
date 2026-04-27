---
title: "라이브 업데이트 모드(레거시)"
sidebar_label: "라이브 업데이트 모드(레거시)"
---

# 라이브 업데이트 모드(레거시)

:::warning
설명된 기능은 더 이상 사용되지 않으며 유지되지 않습니다.
:::

:::note
이 문서는 DHTMLX Scheduler의 라이브 업데이트 모드 레거시 구현에 대해 설명합니다. 현재 버전에 대한 자세한 내용은 [여기](guides/multiuser-live-updates.md)를 참조하십시오.
:::

라이브 업데이트는 실시간으로 동기화된 데이터 업데이트를 제공하는 모드입니다.

한 사용자가 변경하면 그 변경 사항이 다른 모든 사용자에게 즉시 보입니다.

이 모드는 프로세스를 가능하면 빠르고 유연하게 만들기 위해 `Faye` 소켓 라이브러리를 사용하고 페이지 새로고침이 필요하지 않습니다(적용된 컴포넌트만 업데이트합니다).

이 기사에서는 주제를 빠르게 심층적으로 파고들 수 있는 단계별 튜토리얼을 제공합니다.

## 기본 원리

라이브 업데이트는 한 연결된 클라이언트가 만든 변경 사항을 다른 모든 연결된 클라이언트에 브로드캐스트함으로써 달성됩니다. 이는 연결된 클라이언트와 백엔드 간의 양방향 메시지 교환을 위한 WebSocket 연결을 활용하는 방식으로 수행됩니다.

이 라이브 업데이트 모듈 버전에서는 `DataProcessor` 모듈을 확장하여 `Faye` 라이브러리 클라이언트를 사용하고, 클라이언트 간의 메시지를 전달하는 추가 백엔드 응용 프로그램을 통해 구현됩니다.

솔루션은 세 부분으로 구성됩니다:

1. **프런트엔드**: Scheduler와 `DataProcessor` 모듈.
2. **백엔드**: 지속 저장소에 대한 CRUD 작업을 구현합니다.
3. **라이브 업데이트 허브**: 클라이언트를 연결하는 역할을 담당합니다.

사용자가 데이터를 변경하면:

- **프런트엔드**가 변경 사항을 **백엔드**로 보냅니다.
- 동시에, **프런트엔드**가 같은 변경 사항을 **라이브 업데이트 허브**로 보냅니다.
- **라이브 업데이트 허브**가 변경 사항을 모든 연결된 클라이언트에 브로드캐스트합니다.
- **프런트엔드**가 **라이브 업데이트 허브**로부터 변경 사항을 수신하면, CRUD 백엔드에 변화를 트리거하지 않는 방식으로 Scheduler 데이터에 적용합니다.

## 시작하기 전에

이 튜토리얼을 시작하려면 서버 측 로직이 통합된 완전한 기능의 dhtmlxScheduler 애플리케이션이 필요합니다. 데이터베이스에서 데이터를 로드하고 변경 사항을 다시 저장하는 애플리케이션이어야 합니다. (자세한 내용은 [여기](integrations/howtostart-guides.md)를 참조하십시오.)

그런 애플리케이션의 기본 예는 다음과 같을 수 있습니다:

~~~js
<script>
    function init() {
        scheduler.init('scheduler_here', new Date(2027,5,24), "week");
        scheduler.load("api/scheduler");

        const dp = scheduler.createDataProcessor({
            url: "/events",
            mode: "REST"
        });
    }
</script>
~~~

## 라이브 업데이트 구성

:::note
이 라이브 업데이트 구현은 더 이상 권장되지 않으며 기본 패키지에 포함되지 않습니다.
:::

### 1단계. 설정

1. Scheduler용 **Live Updates 플러그인**을 다운로드합니다: [다운로드 링크](https://files.dhtmlx.com/30d/20deb2ff205dc16bc94a7e9fcef4c5fe/live_updates.zip)
2. **Live Updates 백엔드** 앱을 다운로드합니다: [다운로드 링크](https://files.dhtmlx.com/30d/57084e02b121f14bb14b6734d465ad41/websocket-backend.zip)
3. 포함된 읽어보기 파일의 지시에 따라 **Live Updates 백엔드**를 시작합니다.

### 2단계. 프런트 엔드 구성

라이브 업데이트 모드를 사용하려면 프런트엔드 앱에 두 개의 추가 파일을 포함해야 합니다:

- **live_updates.js** - 이전 단계에서 다운로드한 파일
- **client.js** - WebSocket 백엔드 앱에 의해 동적으로 생성되는 파일

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="http://localhost:8008/client.js"></script>
~~~

위 코드 샘플에서, 우리는 WebSocket 앱에 직접 연결합니다. 일반적으로는 보안을 위해 이 URL을 주 애플리케이션을 통해 라우팅하는 것이 좋습니다. 역방향 프록시를 사용하면 됩니다.

메인 앱(Node.js)로 요청 프록시하기:

~~~js
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

module.exports = function(app){
    app.all("/liveUpdates*", function(req, res) {
        proxy.web(req, res, {target: "http://localhost:8008"});
    });
}
~~~

**프런트 엔드:**

~~~js
<script src="./lib/dhtmlxscheduler/live_updates.js"></script>
<script src="/liveUpdates/client.js"></script>
~~~

### 3단계. 라이브 업데이트 활성화

이 모드는 `DataProcessor` 인스턴스의 **live_updates()** 메서드를 호출하여 활성화됩니다. 이를 작동시키려면 먼저 `DataProcessor`가 초기화되어 있어야 합니다. 매개변수로는 WebSocket 진입점의 URL을 받습니다.

~~~js
const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST"
});

dp.live_updates("/liveUpdates");
~~~

다음과 같은 완전한 데모 애플리케이션을 다운로드할 수 있습니다: [여기](https://files.dhtmlx.com/30d/0aea2facd959a8300bf7caec3f5a7f42/dhtmlxscheduler-live-updates.zip).