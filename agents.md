# Geeker-Admin Project Context

## Project Overview

Geeker-Admin is a robust admin dashboard template built with Vue 3, TypeScript, and Element Plus. It features a comprehensive set of pre-built components, directives, and utility functions designed for enterprise-level application development.

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Element Plus
- **State Management**: Pinia
- **Router**: Vue Router
- **CSS Utility**: UnoCSS (Wind preset)
- **Linting/Formatting**: ESLint, Prettier, Stylelint

## Build Configuration

The project uses a custom granularity strategy for building to optimize caching:

- **Dependencies**: Split into `libs/package@version-[hash].js`.
- **Source Code**:
  - `components`: Split by directory (e.g., `components-ProTable-[hash].js`).
  - `views`: Split by page directory (e.g., `system-accountManage-[hash].js`).
  - `common`: Utils, stores, and routers are separated.
- **Vite Config**: `vite.config.ts` handles complex `manualChunks` logic, including pnpm compatibility and ignore lists for empty chunks.

## Key Directories

- `src/api`: Axios service definitions.
- `src/components`: Reusable, typed components (ProTable, Grid, etc.).
- `src/hooks`: Composable functions.
- `src/stores`: Pinia stores.
- `src/utils`: Helper functions.
- `src/views`: Page components matching route structure.

## Development Guidelines

- **Component Naming**: Use PascalCase for components.
- **Type Safety**: Ensure strict type checking with `vue-tsc`.
- **Commits**: Follow Conventional Commits specification.

## Key Components

### ProTable (`src/components/ProTable`)

A high-order component wrapping `el-table` that integrates search, pagination, and data requesting.

#### usage

```vue
<ProTable
  ref="proTable"
  page-id="SystemUser"
  :columns="columns"
  :request-api="getTableList"
  :init-param="initParam"
  :toolbar-left="['add', 'delete', 'import', 'export']"
/>
```

#### Core Props

- **pageId**: `string` (Required) - Unique ID for the table (used for column settings caching).
- **columns**: `ColumnProps[]` - Defines table columns and search form items.
  - `prop`: Field name.
  - `label`: Column header.
  - `search`: `{ el: 'input', key: '...' }` - Configures search form behavior.
  - `enum`: Dictionary data for formatting or select options.
- **requestApi**: `(params) => Promise` - Function to fetch data. `ProTable` handles loading state and parameter assembly.
- **dataCallback**: `(data) => any` - Transform data before rendering.
- **pagination**: `boolean` (Default: `true`) - Enable/disable pagination.
- **initParam**: `object` - Initial parameters passed to `requestApi`.
- **toolbarLeft**: `Array` - Configure buttons on the top left.
- **toolbarRight**: `Array` - Configure tools on the top right (refresh, setting, etc.).

#### Slots

- **Default**: Custom column content (via `bloody` scoping in `columns` or direct slot).
- **toolButton**: Custom toolbar buttons (Left side).
- **Expand**: For expandable rows.

#### Exposed Methods

- `getTableList()`: Manually trigger data refresh.
- `search()`: Trigger search (resets to page 1).
- `reset()`: Reset search form and reload.
- `element`: Access to underlying `el-table` ref.
