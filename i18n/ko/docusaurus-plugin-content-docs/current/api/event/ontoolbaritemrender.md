---
sidebar_label: onToolbarItemRender
title: "onToolbarItemRender 이벤트"
description: "Toolbar 컨테이너 항목이 마운트될 때 발생합니다"
---

# onToolbarItemRender

### 설명

@short: Toolbar 컨테이너 항목이 마운트될 때 발생합니다

@signature: onToolbarItemRender: (id: string | number, node: HTMLElement) =\> void

### 매개변수

- `id` - (필수) *string | number* - 컨테이너 항목 ID
- `node` - (필수) *HTMLElement* - 빈 컨테이너 요소

### 예제

~~~jsx
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "search" || node.firstChild) return;
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    node.appendChild(input);
});
~~~

### 세부 정보

[Toolbar](guides/toolbar.md) 플러그인이 필요합니다. 각 `{ id, comp: "container" }` 항목이 Toolbar에 삽입된 후 이벤트가 발생합니다. 제공된 노드를 교체하지 말고 그 안에 콘텐츠를 넣으세요. 헤더 설정이 변경되지 않으면 노드는 유지됩니다.

### 관련 가이드

- [Toolbar](guides/toolbar.md)