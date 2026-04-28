---
sidebar_label: DHTMLX MCP 服务器
title: DHTMLX MCP 服务器
description: "将 AI 编码助手连接到 DHTMLX 文档，使用 MCP 服务器"
---

# DHTMLX MCP 服务器

像 Claude、Cursor 或 ChatGPT 这样的 AI 编码助手在处理特定库的 API 时，可能会生成过时或不准确的代码。DHTMLX MCP 服务器通过直接访问当前的文档和 API 参考来解决这个问题。

## MCP 是什么

Model Context Protocol（MCP）是为 AI 助手提供关于特定工具和库的外部上下文的标准。

大型语言模型是在某个日期之前的数据上进行训练的，它们不会自动反映最近的 API 更改或新特性。DHTMLX MCP 服务器通过通过 RAG（检索增强生成）系统公开完整且最新的文档来弥补这一差距。

**服务器URL：** `https://docs.dhtmlx.com/mcp`

:::note
DHTMLX MCP 服务器是一个覆盖所有主要 DHTMLX 产品的共享服务，不仅仅是 Scheduler。此节中的配置说明适用于你正在使用的任何 DHTMLX 组件。
:::

## 支持的产品

连接后，AI 工具可以检索文档、基于当前 API 生成代码片段，并回答以下产品的配置问题：

- Gantt
- Scheduler
- Suite（Grid、Form、TreeGrid 等）
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## 隐私

MCP 服务器是一个托管服务。它不在本地运行，也不访问你的文件。不会存储关于用户的个人信息。查询可能会被记录以用于调试和服务改进。对于严格无日志策略的商业选项，请联系 `info@dhtmlx.com`。

## 设置

在下方选择你的 AI 工具，并按照相应的说明进行操作。

### Claude Code

推荐的方式是通过 CLI：

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

或者，手动将以下内容添加到你的 `mcp.json`：

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

1. 打开设置（Mac 上为 Cmd+Shift+J，Windows/Linux 上为 Ctrl+Shift+J）
2. 转到 **Tools & MCP**
3. 点击 **Add Custom MCP**
4. 粘贴以下配置：

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

连接后，你可以在聊天中直接使用诸如 "Check DHTMLX docs for how to configure recurring events in Scheduler" 的提示来查询。

### Gemini CLI

打开 `~/.gemini/settings.json` 并添加：

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

重启 Gemini CLI 以应用更改。

### Antigravity（Google）

1. 打开命令面板
2. 输入 "mcp add"
3. 选择 "HTTP"
4. 输入 URL：`https://docs.dhtmlx.com/mcp`
5. 输入名称：`dhtmlx-mcp`

### 其他工具

大多数现代 AI 编码工具都可以通过设置支持 MCP。查找 "Model Context Protocol"、"Context Sources" 或类似选项，并将 `https://docs.dhtmlx.com/mcp` 作为自定义来源添加。

### ChatGPT

请注意，ChatGPT 的 MCP 集成可能会导致更慢的响应时间（每次查询大约 20 秒）。如需更快的体验，请考虑使用上面列出的工具之一。

要配置 ChatGPT：

1. 转到 **Settings** → **Apps & Connectors**
2. 点击 **Advanced settings**
3. 启用 **Developer mode**
4. 返回 Connectors 屏幕，点击 **Create** 按钮
5. 填写以下信息：
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. 点击 **Create**

完成设置后，你可以在处理任何 DHTMLX 组件时，让 ChatGPT 查阅 DHTMLX MCP 服务器。

## 获得最佳结果的提示

在提问时，请明确参考 DHTMLX 文档以获得更准确的结果。示例：

- “如何使用 DHTMLX 文件更改調度器中的時間刻度？”
- “請查看 DHTMLX MCP 中的調度器重複事件配置”

提示越具体，输出越准确。