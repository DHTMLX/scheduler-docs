---
title: "dhtmlxScheduler с Node.js"
sidebar_label: "dhtmlxScheduler с Node.js"
---

# dhtmlxScheduler с Node.js

В этом руководстве описывается процесс создания Scheduler с использованием Node.js и REST API на стороне сервера. Если вы работаете с другими технологиями, ознакомьтесь с вариантами интеграции, приведёнными ниже:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

В нашем примере Scheduler на Node.js будет взаимодействовать с сервером через REST API. К счастью, для Node.js уже существует несколько готовых решений, поэтому нет необходимости разрабатывать всё с нуля.

В этом руководстве используется фреймворк [Express](http://expressjs.com/) и MySQL для хранения данных.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/scheduler-howto-node).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

Начните с создания нового приложения с помощью yarn или npm:

~~~
$ mkdir scheduler-howto-nodejs
$ cd ./scheduler-howto-nodejs
$ yarn init // или npm init
~~~

В процессе инициализации вам потребуется ответить на несколько простых вопросов:

~~~
$ question name (scheduler-howto-nodejs):
$ question version (1.0.0):
$ question description: My scheduler backend
$ question entry point (index.js): server.js
$ question repository url:
$ question author: Me
$ question license (MIT): MIT
$ question private:
$ success Saved package.json
~~~

В результате будет создан файл *package.json*, который может выглядеть следующим образом:

~~~
{
    "name": "scheduler-backend",
    "version": "1.0.0",
    "main": "server.js",
    "author": "Me",
    "license": "MIT",
}
~~~

### Добавление зависимостей и установка модулей

Как уже упоминалось, в примере используются [Express](http://expressjs.com/) и MySQL.

:::note
Убедитесь, что ваш сервер MySQL настроен, либо воспользуйтесь сервисом, например, [Free MySQL Hosting](https://www.freemysqlhosting.net/).
:::

Установите express, mysql, body-parser и date-format-lite следующей командой:

~~~
$ yarn add express mysql body-parser date-format-lite
~~~

или

~~~
$ npm install express mysql body-parser date-format-lite
~~~

Поскольку в качестве точки входа был выбран **server.js**, создайте этот файл со следующим содержимым:

~~~js title="server.js"
const express = require("express"); // используем Express
const bodyParser = require("body-parser"); // для разбора POST-запросов
const app = express(); // создаём приложение
const port = 3000; // порт для прослушивания

// Необходимо для разбора POST-запросов
// строка ниже используется для разбора application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// запуск сервера
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
~~~

Далее обновите ваш **package.json**, добавив секцию "scripts":

~~~
"scripts": {
    "start": "node server.js"
}
~~~

После этого ваш **package.json** должен выглядеть так:

~~~
{
    "name": "scheduler-howto-node",
    "version": "1.0.0",
    "main": "server.js",
    "license": "MIT",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "body-parser": "^1.20.0",
        "date-format-lite": "^17.7.0",
        "express": "^4.18.1",
        "mysql": "^2.18.1",
    }
}
~~~

Теперь вы можете запустить сервер командой:

~~~
$ yarn start
~~~

или

~~~
$ npm start
~~~


## Шаг 2. Добавление Scheduler на страницу

Создайте директорию для хранения файлов HTML, CSS и JS фронтенда:

~~~
$ mkdir ./public
~~~

В папке **public** создайте файл *index.html* со следующим содержимым:

~~~js title="public/index.html"
<!doctype html>
<html>
    <head>
        <title>DHTMLX Sсheduler example</title>
        <meta charset="utf-8">
        <!-- scheduler -->
        <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"
            charset="utf-8"></script>
      <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css"
              rel="stylesheet" type="text/css" charset="utf-8">
        <style>
            html, body{
                margin:0px;
                padding:0px;
                height:100%;
                overflow:hidden;
            }
        </style>
    </head>
    <body>
        <div id="scheduler_here" class="dhx_cal_container">
            <div class="dhx_cal_navline">
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date"></div>
                <div class="dhx_cal_tab" name="day_tab"></div>
                <div class="dhx_cal_tab" name="week_tab"></div>
                <div class="dhx_cal_tab" name="month_tab"></div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
        </div>
        <script>
            scheduler.config.load_date="%Y-%m-%d %H:%i";
            scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
            scheduler.setLoadMode("day");
 
            // загрузка данных с бэкенда
            scheduler.load("/events");
 
            // подключение бэкенда к scheduler
            const dp = scheduler.createDataProcessor({
                url: "/events",
                mode: "REST"
            });
        </script>
    </body>
</html>
~~~

Этот код создаёт базовую HTML-разметку, подключает dhtmlxScheduler с CDN и инициализирует scheduler с помощью метода [init](api/method/init.md). Обратите внимание, что и body документа, и контейнер scheduler имеют высоту 100%, чтобы компонент корректно занимал всё доступное пространство.

### Настройка маршрутов

Чтобы сделать новую страницу доступной, добавьте следующий код в **server.js** перед строкой `"app.listen(...);"`:

~~~js title="server.js"
// отдаём статические страницы из директории "./public"
app.use(express.static(__dirname + "/public"));
~~~

Перезапустите приложение, чтобы изменения вступили в силу.

Теперь, открыв *http://localhost:3000/* в браузере, вы увидите страницу *index.html*.

![howtostart_nodejs_init](/img/howtostart_nodejs_init.png)

## Шаг 3. Подготовка базы данных

После того, как интерфейс scheduler готов, следующим шагом будет подключение к базе данных и определение методов для чтения и записи событий.

### Создание базы данных

Сначала создайте базу данных. Это можно сделать с помощью любого удобного клиента MySQL или через консоль.

Через MySQL-клиент выполните следующий код:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

Либо сохраните этот SQL в файл *dump.sql* и импортируйте его через консоль MySQL:

~~~
$ mysql -uuser -ppass scheduler < dump.sql
~~~

Далее определите настройки подключения к MySQL в **server.js** как константу для дальнейшего использования:

~~~js title="server.js"
// MySQL будет использоваться для доступа к базе данных, util — для promisify запросов
const util = require("util");
const mysql = require('mysql');

// используйте свои параметры для подключения к базе данных
const mysqlConfig = {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "scheduler"
};
~~~

После этого подключитесь к базе данных из вашего приложения следующим образом:

~~~js title="server.js"
// открываем соединение с mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);
~~~

Здесь используется [pool соединений](https://github.com/mysqljs/mysql#pooling-connections) и обёртка для запросов в Promises с помощью [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original). Это не строго обязательно, но делает код чище и проще для поддержки.

На следующем этапе доступ к базе данных будет инкапсулирован в отдельном классе Storage, который реализует соединение и CRUD-операции.


## Шаг 4. Реализация CRUD

### Реализация доступа к данным

Вся логика для чтения и записи данных будет организована в модуле `Storage`. Этот класс принимает соединение с MySQL и реализует CRUD-операции для заданной таблицы: получение всех событий, добавление новых, обновление существующих и удаление событий.

Создайте файл *storage.js* и добавьте следующий код:

~~~js title="storage.js"
require("date-format-lite"); // добавляем форматирование дат

class Storage {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events";
    }

    // получение событий из таблицы, поддержка динамической загрузки при наличии параметров
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        let result = await this._db.query(query, queryParams);

        result.forEach((entry) => {
            // форматирование даты и времени
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // создание нового события
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`) VALUES (?,?,?)",
            [this.table, data.start_date, data.end_date, data.text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // обновление события
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // удаление события
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;
~~~

### Маршрутизация

Далее необходимо настроить маршруты, чтобы scheduler на странице мог обращаться к storage.

Для этого создайте ещё один вспомогательный модуль с именем `router`:

~~~js title="router.js"
function callMethod (method) {
    return async (req, res) => {
        let result;

        try {
            result = await method(req, res);
        } catch (e) {
            result =  {
                action: "error",
                message: e.message
            }
        }

        res.send(result);
    }
};

module.exports = {
    setRoutes (app, prefix, storage) {
        app.get(`${prefix}`, callMethod((req) => {
            return storage.getAll(req.query);
        }));

        app.post(`${prefix}`, callMethod((req) => {
            return storage.insert(req.body);
        }));

        app.put(`${prefix}/:id`, callMethod((req) => {
            return storage.update(req.params.id, req.body);
        }));

        app.delete(`${prefix}/:id`, callMethod((req) => {
            return storage.delete(req.params.id);
        }));
    }
};
~~~

Этот модуль настраивает приложение на прослушивание URL-запросов, которые будет отправлять scheduler, и вызывает соответствующие методы storage.

Имейте в виду, что все методы обёрнуты в блоки `try-catch` для перехвата ошибок и возврата корректного ответа об ошибке клиенту. Подробнее о [обработке ошибок](https://docs.dhtmlx.com/scheduler/server_integration.html#errorhandling) можно прочитать по ссылке.

Также обратите внимание, что сообщение об ошибке возвращается непосредственно в ответе API. Это удобно во время разработки, однако в production рекомендуется скрывать такие сообщения, чтобы не раскрывать чувствительную информацию, например, детали ошибок MySQL.

### Совместная работа компонентов

Когда все части готовы, вы можете подключить Storage к приложению через Router:

~~~js title="server.js"
const router = require("./router");

// открываем соединение с mysql
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// добавляем обработчики для основных CRUD-запросов
const Storage = require("./storage");
const storage = new Storage(connectionPool);
router.setRoutes(app, "/events", storage);
~~~

После перезапуска приложения вы сможете создавать, удалять и изменять события в планировщике, и все изменения будут сохраняться после перезагрузки страницы.

![howtostart_nodejs_crud](/img/howtostart_nodejs_crud.png)

## Динамическая загрузка

В данный момент планировщик загружает все записи из таблицы *events* при запуске. Это хорошо работает, если объём данных небольшой. Однако для приложений, связанных с планированием или бронированием, где старые записи не удаляются и не архивируются, объём данных быстро растёт. Через несколько месяцев приложение может загружать по нескольку мегабайт данных при каждом открытии страницы.

Динамическая загрузка помогает избежать этой проблемы. Планировщик добавляет отображаемый диапазон дат в параметры запроса, и сервер возвращает только события, попадающие в этот диапазон. Каждый раз при изменении диапазона дат планировщик запрашивает соответствующий сегмент данных.

Чтобы включить динамическую загрузку на клиенте, используйте опцию *setLoadMode* с одним из значений: "day", "week" или "month". Обычно хорошо работает "day".

Начните с активации динамической загрузки на клиентской стороне с помощью метода [setLoadMode](api/method/setloadmode.md):

~~~js title="public/index.html"
scheduler.config.load_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/
 
// загружаем данные с сервера
scheduler.load("/events");
~~~

Планировщик будет добавлять параметры `from` и `to` в строку запроса, поэтому вы можете добавить простой оператор `WHERE`, чтобы загружать только нужный диапазон дат:

~~~js title="storage.js"
async getAll(params) {
    let query = "SELECT * FROM ??";
    let queryParams = [
        this.table
    ];

    if (params.from && params.to) { /*!*/
        query += " WHERE `end_date` >= ? AND `start_date` < ?";
        queryParams.push(params.from);
        queryParams.push(params.to);
    }

    let result = await this._db.query(query, queryParams);

    result.forEach((entry) => {
    // форматируем дату и время
        entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
        entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
    });
    return result;
}
~~~

## Повторяющиеся события

Для поддержки [повторяющихся событий](guides/recurring-events.md) (например, "повторять событие ежедневно") потребуется выполнить несколько дополнительных шагов.

### Включение расширения

Активируйте расширение повторяющихся событий на странице планировщика:

~~~js title="public/index.html"
<!-- расширение повторяющихся задач для планировщика -->
scheduler.plugins({
    recurring: true
});
~~~

### Обновление модели данных

Далее, обновите модель данных, добавив три дополнительных поля:

- event_pid
- event_length
- rec_type

Вы можете добавить эти столбцы в существующую таблицу events следующими SQL-командами:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '""';
~~~

Либо создайте таблицу с нуля:

~~~
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 `event_pid` bigint(20) unsigned DEFAULT '0',
 `event_length` bigint(20) unsigned DEFAULT '0',
 `rec_type` varchar(25) DEFAULT '""',
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

### Обновление backend

Наконец, обновите [методы storage](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries) для поддержки повторяющихся событий.

Сначала обновите метод `insert`, чтобы добавить новые столбцы в SQL-запрос.

Также обработайте особый случай, когда при удалении одного экземпляра из серии повторяющихся событий необходимо создать новую запись. Клиент вызовет для этого действие *insert*:

~~~js title="storage.js"
// создать новое событие
async insert(data) {
   let sql = "INSERT INTO ?? " +
      "(`start_date`, `end_date`, `text`, `event_pid`, `event_length`, `rec_type`) " + /*!*/
      "VALUES (?, ?, ?, ?, ?, ?)"; /*!*/

   const result = await this._db.query(
      sql,
      [
         this.table,
         data.start_date,
         data.end_date,
         data.text,
         data.event_pid || 0, //!
         data.event_length || 0, //!
         data.rec_type //!
      ]);

   // удаление одного экземпляра из серии повторяющихся событий
   let action = "inserted"; /*!*/
   if (data.rec_type == "none") { /*!*/
     action = "deleted"; /*!*/
   } /*!*/

   return {
     action: action,
     tid: result.insertId
   };
}
~~~

Метод `update` требует аналогичных изменений в SQL-запросе.

Кроме того, при изменении серии повторяющихся событий все изменённые экземпляры этой серии должны быть удалены:

~~~js title="storage.js"
// обновить событие
async update(id, data) {
  if (data.rec_type && data.rec_type != "none") { /*!*/
      // все изменённые экземпляры должны быть удалены при обновлении серии повторяющихся событий
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      await this._db.query(
        "DELETE FROM ?? WHERE `event_pid`= ?;",
        [this.table, id]);
  }

  await this._db.query(
      "UPDATE ?? SET " +
      "`start_date` = ?, `end_date` = ?, `text` = ?, " +
      "`event_pid` = ?, `event_length`= ?, `rec_type` = ? "+ /*!*/
      "WHERE id = ?",
      [
          this.table,
          data.start_date,
          data.end_date,
          data.text,
          data.event_pid || 0, /*!*/
          data.event_length || 0, /*!*/
          data.rec_type, /*!*/
          id
      ]);

  return {
     action: "updated"
  };
}
~~~

Наконец, обновите метод `delete`, чтобы обработать два особых случая:

- Если у удаляемого события заполнено поле `event_pid`, значит удаляется изменённый экземпляр повторяющейся серии. Вместо удаления записи установите `rec_type='none'`, чтобы планировщик пропустил этот экземпляр.
- Если удаляется вся серия повторяющихся событий, необходимо также удалить все изменённые экземпляры этой серии.

~~~js title="storage.js"
// удалить событие
async delete(id) {
    // логика для поддержки повторяющихся событий
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    let event = await this._db.query(
        "SELECT * FROM ?? WHERE id="?" LIMIT 1;",
        [this.table, id]);

    if (event.event_pid) {
        // удаление изменённого экземпляра из серии повторяющихся событий
        // Вместо удаления обновляем rec_type на "none"
        event.rec_type = "none";
        return await this.update(id, event);
    }

    if (event.rec_type && event.rec_type != "none") {
        // удаляется серия повторяющихся событий, удаляем все изменённые экземпляры
        await this._db.query(
            "DELETE FROM ?? WHERE `event_pid`=? ;",
            [this.table, id]);
    }

    await this._db.query(
        "DELETE FROM ?? WHERE `id`= ?;",
        [this.table, id]);

    return {
        action: "deleted"
    }
}
~~~

## Безопасность приложения

dhtmlxScheduler - это клиентский компонент, ориентированный на гибкость, и не содержит встроенных средств безопасности. Поскольку только клиентский код не может обеспечить надёжную защиту, ответственность за безопасность приложения лежит на backend-разработчике.

Ключевые моменты:

- SQL-инъекции: В этом примере используются параметризованные SQL-запросы, что помогает предотвратить атаки типа SQL injection.

- XSS-атаки: Клиент не фильтрует пользовательский ввод перед отправкой на сервер, как и сервер не фильтрует данные перед отображением.

Одним из простых способов снизить риски является использование модуля [`helmet`](https://github.com/helmetjs/helmet), который добавляет базовые заголовки безопасности.

Установите *helmet* следующим образом:

~~~
$ yarn install helmet
~~~

Затем добавьте эту строку в *server.js* перед `app.listen(...)`:

~~~js title="server.js"
const helmet = require("helmet");
app.use(helmet());
~~~

## Обработка ошибок

Благодаря настройке `router`, backend API возвращает статус `error`, если возникает исключение.

На клиентской стороне вы можете обработать эти ошибки с помощью события [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) объекта dataProcessor:

~~~js title="public/index.html"
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
   if (action == "error") {
       // обработка ошибки
        alert("Server error: " + response.message);
   }
});
~~~

## Устранение неполадок

Если вы выполнили все шаги по интеграции Scheduler с Node.js, но события не отображаются на странице, ознакомьтесь со статьёй [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней описаны способы выявления и устранения распространённых проблем.


## Что дальше

На этом этапе у вас есть полностью рабочий Scheduler. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-node) - вы можете клонировать репозиторий или скачать его для использования в своих проектах.

Вы также можете изучить [руководства по различным возможностям Scheduler](/guides/) или ознакомиться с туториалами по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
