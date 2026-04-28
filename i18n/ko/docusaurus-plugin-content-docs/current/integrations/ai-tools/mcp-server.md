--- 
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "MCP 서버를 사용하여 AI 코딩 어시스턴트를 DHTMLX 문서에 연결합니다"
---

# DHTMLX MCP Server

Claude, Cursor, ChatGPT 등의 AI 코딩 어시스턴트는 라이브러리 특정 API를 다룰 때 구식이거나 부정확한 코드를 생성할 수 있습니다. DHTMLX MCP 서버는 현재 문서와 API 참조에 직접 접근하도록 함으로써 이 문제를 해결합니다.

## MCP란

Model Context Protocol (MCP)는 AI 어시스턴트에게 특정 도구 및 라이브러리에 대한 외부 맥락을 제공하기 위한 표준입니다.

대형 언어 모델은 특정 날짜까지의 데이터로 학습되며 최근 API 변경이나 새로운 기능을 자동으로 반영하지 않습니다. DHTMLX MCP 서버는 RAG(Retrieval-Augmented Generation) 시스템을 통해 전체 최신 문서를 노출하여 이 격차를 메웁니다.

**서버 URL:** `https://docs.dhtmlx.com/mcp`

:::note
DHTMLX MCP 서버는 Scheduler뿐만 아니라 모든 주요 DHTMLX 제품을 포괄하는 공유 서비스입니다. 이 섹션의 구성 지침은 사용 중인 DHTMLX 구성 요소에 관계없이 적용됩니다.
:::

## 지원되는 제품

연결되면 AI 도구가 문서를 검색하고, 현재 API를 기반으로 코드 스니펫을 생성하며, 아래 제품들에 대한 구성 질문에 답할 수 있습니다:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid 및 기타)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## 개인정보 보호

MCP 서버는 호스팅 서비스입니다. 로컬에서 실행되지 않으며 파일에 접근하지 않습니다. 사용자의 개인 정보는 저장되지 않습니다. 쿼리는 디버깅 및 서비스 개선을 위해 로깅될 수 있습니다. 무로그 정책이 엄격한 상업적 옵션이 필요한 경우 info@dhtmlx.com으로 문의하십시오.

## 설정 방법

아래에서 AI 도구를 선택하고 해당 지침을 따르십시오.

### Claude Code

권장 방법은 CLI를 통해서입니다:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

또는 아래를 수동으로 `mcp.json`에 추가하십시오:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

### Cursor

1. Settings 열기 (Mac에서 Cmd+Shift+J, Windows/Linux에서 Ctrl+Shift+J)
2. **Tools & MCP**로 이동
3. **Add Custom MCP** 클릭
4. 아래 구성을 붙여넣기:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

연결 후에는 채팅에서 바로 "Check DHTMLX docs for how to configure recurring events in Scheduler"와 같은 프롬프트를 사용할 수 있습니다.

### Gemini CLI

설정 파일을 `~/.gemini/settings.json`에서 열고 추가하십시오:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

변경 사항을 적용하려면 Gemini CLI를 재시작하십시오.

### Antigravity (Google)

1. 명령 팔레트를 열기
2. "mcp add" 입력
3. "HTTP" 선택
4. URL 입력: `https://docs.dhtmlx.com/mcp`
5. 이름 입력: `dhtmlx-mcp`

### Other Tools

대부분의 최신 AI 코딩 도구는 설정을 통해 MCP를 지원합니다. "Model Context Protocol", "Context Sources" 또는 유사한 옵션을 찾아 `https://docs.dhtmlx.com/mcp`를 사용자 정의 소스로 추가하십시오.

### ChatGPT

참고로 ChatGPT와의 MCP 통합은 응답 시간이 느려질 수 있습니다(쿼리당 약 20초 정도). 더 빠른 사용 경험을 원하면 위에 언급한 도구 중 하나를 사용하는 것을 고려하십시오.

ChatGPT를 구성하려면:

1. **Settings** → **Apps & Connectors**로 이동
2. **Advanced settings** 클릭
3. **Developer mode** 활성화
4. Connectors 화면으로 돌아가 **Create** 버튼 클릭
5. 아래를 입력:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. **Create** 클릭

설정 후에는 어떤 DHTMLX 구성 요소와 함께 작업하더라도 ChatGPT에 DHTMLX MCP 서버를 참조하도록 요청할 수 있습니다.

## 최상의 결과를 위한 팁

프롬프트를 작성할 때 더 정확한 결과를 얻으려면 DHTMLX 문서를 명시적으로 참조하십시오. 예를 들면:

- "Using DHTMLX docs, how do I change the time scale in Scheduler?"
- "Check DHTMLX MCP for Scheduler recurring events configuration"

프롬프트가 구체적일수록 출력이 더 정확해집니다.