---
title: Установка React Scheduler
sidebar_label: Установка
description: "Как установить оценочную или коммерческую версию React Scheduler через npm."
---

# Установка React Scheduler

React Scheduler доступен в двух дистрибутивах:

1. **Оценочная версия** общедоступна на npm, включает водяной знак пробной версии и может дополнительно сопровождаться бесплатным периодом оценки, который предоставляет доступ к технической поддержке.
2. **Профессиональная (коммерческая) версия** доступна из приватного npm-репозитория DHTMLX и предназначена для использования в продакшн-среде.

Оба пакета содержат один и тот же API.

## Установка Оценочной версии (публичный npm)

Оценочная сборка доступна на npm как [@dhtmlx/trial-react-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-react-scheduler):

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

Или с Yarn:

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Эта сборка полностью функциональна, но выводит сообщение о том, что библиотека работает в режиме оценки.

### Опционально: начать полный период оценки (рекомендуется)

Хотя установка пробной версии не имеет ограничений, вы также можете начать официальный период оценки через сайт по адресу
[https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml).

Начало формальной оценки даёт вам бесплатную техническую поддержку в течение пробного периода.

**Скачивание офлайн-примеров (zip)**

Форма оценки также включает ZIP-файл с готовыми к офлайн-использованию примерами.

Вы также можете изучить дополнительные примеры и демонстрационные проекты на официальном GitHub, перейдя по [React Scheduler Demos on GitHub](https://github.com/DHTMLX/?q=react-scheduler&type=all&language=&sort=).

## Профессиональная версия (приватный npm)

Профессиональная версия предназначена для продакшн-приложений и включает коммерческую лицензию и полный доступ к технической поддержке.

После получения коммерческой лицензии вы можете сгенерировать свои приватные учетные данные npm в [Личном кабинете](https://dhtmlx.com/clients/).

После генерации логина/пароля настройте npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Затем установите профессиональный пакет:

~~~bash
npm install @dhx/react-scheduler
~~~

Или, с Yarn:

~~~bash
yarn add @dhx/react-scheduler
~~~

## Следующие шаги

После установки продолжайте со следующими разделами:

- [Быстрый старт](integrations/react/quick-start.md)
- [Обзор](integrations/react/overview.md)
- [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- [Руководства по интеграции с фреймворками](/category/framework-integrations/)