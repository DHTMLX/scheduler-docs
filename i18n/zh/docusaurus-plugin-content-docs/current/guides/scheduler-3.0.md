---
title: "迁移到 Scheduler 3.0"
sidebar_label: "迁移到 Scheduler 3.0"
---

# 迁移到 Scheduler 3.0 

:::note
如果你希望继续使用当前的 scheduler 版本，无需做任何更改。下方展示的所有代码在 scheduler 2.3 中均可正常工作，但在 scheduler 3.0 中将会被淘汰。
:::

某些之前可访问的内部方法将在 scheduler 3.0 中不可用。

### 重置 lightbox

~~~js 
    scheduler._lightbox = null;

~~~

->

~~~js 
    //2.3+
    scheduler.resetLightbox();

~~~

### 当前状态

~~~js 
    scheduler._date
    scheduler._mode
    scheduler._min_date
    scheduler._max_date
    scheduler._editor_id
    scheduler._lightbox_id

~~~

->

~~~js 
    //2.3+
    scheduler.getState().date
    scheduler.getState().mode
    scheduler.getState().min_date
    scheduler.getState().max_date
    scheduler.getState().editor_id
    scheduler.getState().lightbox_id

~~~
