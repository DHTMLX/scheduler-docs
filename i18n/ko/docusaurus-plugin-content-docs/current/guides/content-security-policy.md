---
title: "콘텐츠 보안 정책(CSP) 준수"
sidebar_label: "콘텐츠 보안 정책(CSP) 준수"
---

# 콘텐츠 보안 정책(CSP) 준수

:::warning
 이 기능은 버전 6.0부터 더 이상 지원되지 않습니다. 대신, 날짜 포매팅 메서드의 내부 구현 모드를 설정하세요. [자세한 내용 확인](api/config/csp.md).
:::

콘텐츠 보안 정책(Content Security Policy, CSP)은 무단 JavaScript 실행을 방지하기 위해 설계된 웹 표준입니다.

dhtmlxScheduler 라이브러리에는 애플리케이션에서 CSP가 활성화된 경우 dhtmlxScheduler가 원활하게 동작하도록 돕는 **ext/dhtmlxscheduler_csp.js** 확장 기능이 포함되어 있습니다. 이 확장 기능은 앱의 보안을 강화해줍니다.

Scheduler로 구축된 앱에서 CSP 지원을 활성화하려면, *dhtmlxscheduler.js* 바로 다음에 *dhtmlxscheduler_csp.js*를 추가하면 됩니다:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>
~~~

*dhtmlxscheduler_csp.js* 확장 기능은 기본 Scheduler 위에서 동작하며, 안전하지 않은 코드(주로 날짜 포매터와 파서)를 대체합니다. 컴포넌트의 여러 부분에서 인라인 스타일이 사용되므로, 인라인 스타일 허용이 필요하다는 점에 유의하세요.

일부 상황에서는 CSP 친화적인 메서드가 성능을 다소 저하시킬 수 있으므로, 기본적으로 활성화되어 있지 않으며 명시적으로 활성화해야 합니다.
