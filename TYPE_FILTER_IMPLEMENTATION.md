# Type Filter Implementation Guide

## 概述

已成功在首页筛选工具栏中添加了"Game Type"选项，用于筛选不同类型的游戏，特别是圣诞桌游。

## 实现的更改

### 1. 类型定义 (src/types/game.ts)

添加了新的 `GameType` 类型和 `type` 字段到 `Game` 接口：

```typescript
export type GameType = 
  | "Icebreaker"
  | "Energizer"
  | "Team Building"
  | "Table Game"
  | "Christmas Game"
  | "Quick Start"
  | "Conversation Starter"
  | "Interactive"
  | "Creative";

export type Game = {
  // ... 其他字段
  type: GameType | null;
  // ...
};
```

### 2. 数据库 Schema (src/db/schema.ts)

在 `gamesTable` 中添加了 `type` 列：

```typescript
type: varchar("type", { length: 100 }),
```

### 3. 筛选组件更新

#### HomeFilterSection (src/components/home/HomeFilterSection.tsx)
- 添加了 `type` 到筛选状态
- 添加了 "Game Type" 下拉选择器
- 实现了 type 筛选逻辑
- 布局从 3 列改为 4 列以容纳新的筛选器

#### GameFilter (src/components/games/GameFilter.tsx)
- 添加了 `type` 到 `GameFilters` 类型
- 添加了 "Game Type" 下拉选择器
- 布局从 3 列改为 4 列

#### FilterableGameGrid (src/components/games/FilterableGameGrid.tsx)
- 添加了 `type` 筛选逻辑
- 支持从 URL 参数读取 type 筛选

### 4. 数据库迁移

生成了迁移文件：`drizzle/0001_wise_sersi.sql`

```sql
ALTER TABLE "games" ADD COLUMN "type" varchar(100);
```

### 5. 数据更新脚本

创建了两个 SQL 脚本：

#### migrations/add-type-column.sql
- 添加 type 列
- 为圣诞游戏设置默认 type 值

#### scripts/update-christmas-games-type.sql
- 根据游戏标题和标签为圣诞桌游设置具体的 type 值
- 将所有圣诞桌游标记为 "Table Game"

## 使用方法

### 在首页筛选圣诞桌游

1. 访问首页
2. 在筛选工具栏中找到 "Game Type" 下拉菜单
3. 选择 "Table Game" 或 "Christmas Game"
4. 点击 "Search Activities" 按钮
5. 系统将显示所有匹配的游戏

### 在游戏页面筛选

1. 访问 `/games` 页面
2. 使用相同的 "Game Type" 筛选器
3. 可以与其他筛选器（category, duration, difficulty, players）组合使用

### URL 参数

可以通过 URL 参数直接筛选：

```
/games?type=Table%20Game
/games?type=Christmas%20Game
/games?type=Table%20Game&category=Social%20Event
```

## 数据库更新步骤

要在生产环境中应用这些更改：

1. 运行迁移添加 type 列：
```bash
npx drizzle-kit push
```

2. 或手动执行 SQL：
```sql
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);
```

3. 更新现有游戏数据：
```bash
# 使用 Supabase SQL Editor 或其他数据库工具
# 执行 scripts/update-christmas-games-type.sql 中的 SQL
```

## 圣诞桌游博客页面集成

博客页面 `/blog/christmas-table-icebreaker-games` 中的所有 15 个游戏都应该：

1. 在数据库中有对应的记录
2. `type` 字段设置为 "Table Game"
3. `tags` 包含 "christmas" 或 "Christmas Games"
4. 可以通过首页筛选器的 "Table Game" 选项筛选出来

## 游戏类型说明

- **Table Game**: 适合在桌边进行的游戏，无需站立或移动
- **Christmas Game**: 圣诞主题游戏
- **Icebreaker**: 破冰游戏，帮助人们相互认识
- **Energizer**: 激活能量的游戏
- **Quick Start**: 5-10分钟的快速游戏
- **Conversation Starter**: 促进对话的游戏
- **Interactive**: 需要互动参与的游戏
- **Creative**: 需要创造力的游戏

## 测试

确保测试以下场景：

1. ✅ 选择 "Table Game" 能筛选出所有桌游
2. ✅ 选择 "Christmas Game" 能筛选出所有圣诞游戏
3. ✅ 组合筛选（type + category + duration 等）正常工作
4. ✅ URL 参数筛选正常工作
5. ✅ 清除筛选器恢复所有游戏
6. ✅ 筛选结果计数正确显示

## 注意事项

- 现有游戏的 `type` 字段可能为 `null`，需要手动更新
- 新添加的游戏应该在创建时设置 `type` 值
- 可以根据需要添加更多的 GameType 选项
