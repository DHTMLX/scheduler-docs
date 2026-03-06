---
title: "애플리케이션 보안"
sidebar_label: "애플리케이션 보안"
---

# 애플리케이션 보안

Scheduler 자체에는 SQL 인젝션, XSS, 또는 CSRF 공격과 같은 위협으로부터 애플리케이션을 보호하는 내장 기능이 포함되어 있지 않습니다. 애플리케이션의 보안을 보장하는 것은 주로 이를 개발하는 개발자의 책임입니다. 백엔드는 모든 입력 데이터를 철저히 검증, 이스케이프 또는 정제하고, 사용자 접근 규칙을 적절히 적용해야 합니다.

클라이언트 측 검증은 쉽게 우회되거나 조작될 수 있으므로, 보안 목적으로 신뢰해서는 안 됩니다. 클라이언트 검증의 주요 역할은 사용자가 잘못된 입력을 했을 때 서버 응답을 기다리지 않고 즉각적인 피드백을 제공하는 것입니다. 궁극적인 검증은 항상 서버 측에서 이루어져야 합니다.

아래에서는 일반적인 공격 유형과 이를 방지할 수 있는 방법을 안내합니다. 일반적으로, 플랫폼에서 백엔드 CRUD 작업의 모범 사례를 따르면 충분합니다.

## XSS 공격

XSS 공격은 안전하지 않은 백엔드 CRUD 구현, [Scheduler 템플릿 함수](api/overview/templates_overview.md), 그리고 [UI를 통한 사용자 입력](guides/lightbox-editors.md)에서 발생할 수 있습니다:

- Scheduler 데이터를 저장 및 로드하는 백엔드 API(개발자가 직접 구현해야 함)는 입력과 출력을 적절히 이스케이프하여 데이터의 안전성을 확보해야 합니다. [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver)를 사용할 경우, 클라이언트 입력을 자동으로 [이스케이프 및 정제](https://docs.dhtmlx.com/connector__php__app_security.html#protectionfromcrosssitescringxss)합니다. 직접 백엔드를 개발한다면, 데이터베이스에 저장되거나 Scheduler로 로드되는 데이터를 스스로 이스케이프 처리해야 합니다.

템플릿 함수와 라이트박스의 경우, 서버 측 데이터 정제가 누락된 경우에만 위험해질 수 있습니다. 백엔드를 안전하게 구성하면 XSS 공격을 충분히 방지할 수 있으며, 클라이언트 측 보호만으로는 안전한 백엔드 없이는 효과가 없습니다.

- [템플릿](api/overview/templates_overview.md)은 이스케이프나 전처리 없이 Scheduler의 inner HTML에 직접 콘텐츠를 출력합니다.

템플릿은 Scheduler 요소에 커스텀 마크업(서식 있는 텍스트, 아이콘, 버튼 등)을 허용하도록 설계되었습니다. 그러나 이로 인해 코드 인젝션의 위험이 생길 수 있습니다. 필요에 따라 보안 요구에 맞게 템플릿을 재정의할 수 있습니다.

**Related sample** [Template XSS](https://snippet.dhtmlx.com/5/db4ac67b8)

- 라이트박스는 기본적으로 클라이언트 입력에 대한 검증을 수행하지 않으므로, 이를 처리하지 않을 경우 XSS 취약점이 생길 수 있습니다. 자세한 내용은 [클라이언트 측 검증 문서](guides/validation.md)를 참고하세요.

**Related sample** [Lightbox XSS](https://snippet.dhtmlx.com/5/f30760ae0)


## SQL 인젝션

Scheduler는 전적으로 클라이언트 측에서 동작하므로, SQL 인젝션 방지는 백엔드의 책임입니다.

두 가지 중요한 사항:

- 라이트박스에는 기본 검증 기능이 없으므로, 검증이 구현되지 않은 경우 사용자가 편집 가능한 필드에 어떤 값이든 입력할 수 있습니다.
- 백엔드 API는 클라이언트 UI를 우회하여 악의적인 데이터가 포함된 PUT/POST 요청으로 직접 접근될 수 있습니다.

따라서 백엔드는 SQL 인젝션을 방지할 수 있는 조치를 반드시 구현해야 합니다. [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver)를 사용하고, [문서](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase)에서 안내한 대로 테이블을 구성하면 모든 입력이 자동으로 이스케이프 처리됩니다. 그렇지 않다면, 사용하는 플랫폼의 보안 모범 사례에 따라 CRUD 구현을 진행해야 합니다([여기를 참고](integrations/howtostart-guides.md)).


## CSRF 공격

백엔드에서 [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver)를 사용하는 경우, 커넥터의 설정을 통해 CSRF 보호를 활성화할 수 있습니다. 자세한 내용은 [CSRF 및 XSRF 공격 방지](https://docs.dhtmlx.com/connector__php__app_security.html#preventingcsrfandxsrfattacks) 관련 문서를 참고하세요.

dhtmlxConnector를 사용하지 않는 경우, CSRF 보호를 직접 구현해야 합니다. Scheduler가 백엔드로 전송하는 요청에 커스텀 토큰 또는 헤더를 추가하는 방법은 [이 문서](guides/server-integration.md#custom-request-headers-and-parameters)를 참고하세요.


## Content Security Policy

라이브러리에는 dhtmlxScheduler 애플리케이션을 Content Security Policy(CSP) 표준에 맞춰 설정할 수 있는 옵션이 포함되어 있습니다. 이를 통해 다양한 코드 인젝션 공격으로부터의 보호가 강화되고, 애플리케이션의 전반적인 보안 수준이 높아집니다.

[dhtmlxScheduler 애플리케이션에 CSP 적용 방법 자세히 보기](api/config/csp.md).
