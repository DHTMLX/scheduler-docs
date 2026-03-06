---
sidebar_label: "preserve_length"
title: "preserve_length config"
description: "сохраняет видимую длину события неизменной при его перетаскивании по нелинейной временной шкале"
---

# preserve_length

### Description

@short: Сохраняет видимую длину события неизменной при его перетаскивании по нелинейной временной шкале

@signature: preserve_length: boolean

### Example

~~~jsx
scheduler.config.preserve_length = true;
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Details

Этот режим включен по умолчанию.

При активном режиме событие сохраняет свою видимую длину во время drag-and-drop, а не фактическую длину, определяемую датами начала и окончания.
<br> Например, если в Month view отображается событие длительностью два дня, а выходные скрыты, перетаскивание события так, чтобы оно охватывало пятницу и понедельник, приведет к реальной длительности в 4 дня между началом и концом. Однако scheduler сохранит видимую длину на уровне 2 дней.
