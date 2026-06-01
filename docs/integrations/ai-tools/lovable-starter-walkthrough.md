---
title: "React Scheduler Lovable Starter Walkthrough"
sidebar_label: "Lovable Starter Walkthrough"
description: "Reproduce the DHTMLX React Scheduler resource booking demo in Lovable using a fixed sequence of prompts and a Supabase backend"
---

# React Scheduler Lovable Starter Walkthrough

This guide explains how to reproduce the [React Scheduler Lovable Starter](https://github.com/DHTMLX/react-scheduler-lovable-starter) - a resource booking app with a Supabase backend - in your own Lovable workspace. The published repo and its [`docs/`](https://github.com/DHTMLX/react-scheduler-lovable-starter/tree/main/docs) folder are the source of truth; this page is the entry point that explains how the pieces fit together.

## What you get at the end

A working app with:

- a routed shell (Dashboard, Calendar, Resources, Reports, Settings)
- a Scheduler Timeline workspace for resource booking
- location-scoped resources and bookings loaded from Supabase
- persistent booking CRUD
- recurring booking support with series rows, exception rows, and deleted-occurrence tombstones
- status, resource, and type filters
- undo/redo for create, update, and delete operations
- resource-specific business-hour highlighting
- conflict blocking for overlapping bookings on the same resource
- outside-working-hours warnings
- a demo-only role model (viewer / scheduler / admin)
- a Supabase schema, demo policies, and seed data

The starter targets the Lovable stack: React 19 + TypeScript + Vite + TanStack Start + TanStack Router + Tailwind + shadcn/ui, with TanStack Query, Zustand, Supabase, and DHTMLX React Scheduler added on top.

## Prerequisites

- A Lovable account
- A Supabase project (free tier is enough)
- Optional: Node.js 19+ and npm if you plan to run the result locally

## Two ways to use the recipe

The [`docs/`](https://github.com/DHTMLX/react-scheduler-lovable-starter/tree/main/docs) folder serves two audiences:

1. **Reproduce the build from scratch.** Send the prompts to Lovable in order. You will end up with the same app shell, Scheduler Timeline configuration, Supabase schema, and booking workflow. This is the recommended path if you want to learn the pattern.
2. **Use the published repo as a starting template.** Clone the GitHub repo, point it at your own Supabase project, and skip the Lovable prompts entirely. This is faster if you just want a running starter.

## Reproducing the build in Lovable

The full prompt sequence is in <a href="https://github.com/DHTMLX/react-scheduler-lovable-starter/blob/main/docs/00-build-plan.md">docs/00-build-plan.md</a>. The high-level flow:

1. Run prompt <a href="https://github.com/DHTMLX/react-scheduler-lovable-starter/blob/main/docs/01-create-app-shell.md">01-create-app-shell.md</a> to scaffold routes, navigation, placeholder pages, and the project architecture file.
2. Paste the contents of <a href="https://github.com/DHTMLX/react-scheduler-lovable-starter/blob/main/docs/00-knowledge.md">00-knowledge.md</a> into your Lovable project's Knowledge Base. This locks in the React Scheduler package name, CSS import, explicit container height, date-handling rules, recurring-event rules, Timeline setup, and Supabase mapping boundaries.
3. Decide your backend before step 03. The starter uses Supabase. If you want a backend-free variant, you can skip the Supabase steps and keep mock data only.
4. Run the remaining prompts in order from `02` through `11`. Each prompt covers one feature area: Scheduler core, Supabase read path, CRUD, permissions, browser verification, Scheduler UX, conflict checks, final verification, event styling, and secondary app pages.

A typical run produces a working app in 11 prompt-sized steps. The exact prompts and their scope are version-controlled in the repo.

## Manual fixes you may need

Generated code is rarely perfect on the first try, especially around Scheduler persistence and Timeline behavior. The repo records every manual edit applied during the original build in <a href="https://github.com/DHTMLX/react-scheduler-lovable-starter/blob/main/docs/00-manual-edits.md">docs/00-manual-edits.md</a>. Treat that file as both a known-issues list and an example of how to keep your own Lovable build log when generated output drifts from the desired pattern.

The current set of recorded fixes covers Scheduler date normalization at the CRUD boundary, undo/redo ID reconciliation, Timeline store synchronization, recurring-event persistence.

## Supabase setup

The repo's [`db/`](https://github.com/DHTMLX/react-scheduler-lovable-starter/tree/main/db) folder contains the schema and deterministic seed data as ordered SQL files. Apply them in order in the Supabase SQL editor, then fill in the Vite and server environment variables from your project settings.

For local development, copy `.env.example` to `.env` and set:

- `VITE_APP_SUPABASE_URL`
- `VITE_APP_SUPABASE_PUBLISHABLE_KEY`
- `APP_SUPABASE_URL`
- `APP_SUPABASE_SERVICE_ROLE_KEY`

The browser client reads the `VITE_APP_*` values. The server client uses the service role key for server-side create, update, and delete operations.

The schema supports multiple locations, location-scoped resources, demo users, and Scheduler events. The `events` table stores plain bookings, recurring series rows, modified occurrences, and deleted-occurrence tombstones in one table.

## Going to production

The starter uses the public trial package `@dhtmlx/trial-react-scheduler`. When the prototype is approved for production, swap to the commercial React Scheduler package according to the official [DHTMLX React Scheduler installation guide](https://docs.dhtmlx.com/scheduler/integrations/react/installation/).

Permissions in the starter are demo-only. Replace the demo identity flow with real authentication before exposing the app to end users.

## What to read next

- [DHTMLX MCP Server](/integrations/ai-tools/mcp-server/) - connect MCP to Lovable for accurate API references
- [Installation React Scheduler](/integrations/react/installation/) - private-registry setup and the trial-to-commercial package swap
- [React Scheduler Overview](/integrations/react/overview/) - the underlying component reference
