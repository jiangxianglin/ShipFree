# 圣诞桌游筛选功能使用指南

## 快速开始

现在可以使用首页的筛选工具栏来筛选圣诞桌游了！

### 筛选步骤

1. 打开首页 `http://localhost:3000`
2. 找到 "Find the Perfect Icebreaker, Energiser or Team-Building Game" 筛选工具栏
3. 在 **"Game Type"** 下拉菜单中选择 **"Table Game"**
4. 点击 **"Search Activities"** 按钮
5. 查看筛选结果

## 博客页面中的 15 个圣诞桌游

以下是 `/blog/christmas-table-icebreaker-games` 页面中的所有游戏：

### Quick Start Games (5-10 min)
1. **Holiday Fortunes** - 气球抽签游戏
2. **Christmas Roll & Poll** - 骰子问答游戏
3. **Ornament Guess** - 猜装饰品数量

### Conversation Starter Games (10-20 min)
4. **Two Truths and a Tinsel** - 圣诞版两真一假
5. **Share a Favorite Holiday Memory** - 分享节日回忆
6. **Around the World Traditions** - 世界各地圣诞传统

### Interactive Games (15-30 min)
7. **The Great Christmas Candy Pass** - 圣诞糖果问答
8. **Message Under a Plate** - 盘子下的秘密信息
9. **Christmas Connection** - 圣诞连接游戏

### Creative & Fun Games
10. **Holiday Bingo** - 节日宾果
11. **What's on Your Phone? Christmas Edition** - 手机寻宝
12. **Christmas Pick a Side** - 圣诞选边站

### Special Games
13. **Topics Tables** - 主题桌游（大型聚会）
14. **Guess the Gift by Sound** - 听声音猜礼物
15. **Photo Booth Prompt Jar** - 照片提示罐

## 确保游戏可被筛选

要确保这些游戏能通过筛选器找到，需要满足以下条件：

### 数据库要求

每个游戏记录必须包含：

```sql
-- 示例：Holiday Fortunes
INSERT INTO games (
  id, slug, title, description, category, 
  players, duration, difficulty, materials, 
  steps, tags, type
) VALUES (
  'uuid-here',
  'holiday-fortunes',
  'Holiday Fortunes',
  '...',
  'Social Event',
  '5-30 people',
  '10-15 minutes',
  'Easy',
  'Balloons, paper slips',
  '...',
  ARRAY['christmas', 'table-game', 'dinner-party'],
  'Table Game'  -- 关键字段！
);
```

### 关键字段

1. **type**: 必须设置为 `'Table Game'`
2. **tags**: 应包含 `'christmas'` 或 `'Christmas Games'`
3. **category**: 通常是 `'Social Event'` 或其他合适的类别

## 筛选器选项

### Game Type 选项

- **All Game Types** - 显示所有游戏
- **Table Game** ⭐ - 桌游（圣诞桌游使用此选项）
- **Christmas Game** - 圣诞主题游戏
- **Icebreaker** - 破冰游戏
- **Energizer** - 激活游戏
- **Quick Start** - 快速开始游戏
- **Conversation Starter** - 对话启动游戏
- **Interactive** - 互动游戏
- **Creative** - 创意游戏

### 组合筛选示例

#### 筛选圣诞桌游
```
Game Type: Table Game
Activity Type: Social Event
Time: Any time
```

#### 筛选快速圣诞游戏
```
Game Type: Table Game
Time: Quick (5-10 min)
```

#### 筛选大型聚会圣诞游戏
```
Game Type: Table Game
People: Large (20+)
```

## 数据更新脚本

如果数据库中的游戏还没有 `type` 字段，运行以下脚本：

### 1. 添加 type 列（如果不存在）

```sql
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);
```

### 2. 更新圣诞桌游

```sql
-- 将所有圣诞游戏标记为 Table Game
UPDATE games 
SET type = 'Table Game' 
WHERE tags @> ARRAY['christmas']::text[] 
   OR tags @> ARRAY['Christmas Games']::text[]
   OR tags @> ARRAY['table-game']::text[];

-- 或者根据具体游戏标题更新
UPDATE games 
SET type = 'Table Game'
WHERE title IN (
  'Holiday Fortunes',
  'Christmas Roll & Poll',
  'Two Truths and a Tinsel',
  'Share a Favorite Holiday Memory',
  'The Great Christmas Candy Pass',
  'Message Under a Plate',
  'Christmas Connection',
  'Around the World Traditions',
  'Holiday Bingo',
  'What''s on Your Phone? Christmas Edition',
  'Christmas Pick a Side',
  'Ornament Guess',
  'Topics Tables',
  'Guess the Gift by Sound',
  'Photo Booth Prompt Jar'
);
```

## 验证筛选功能

### 测试步骤

1. **基本筛选测试**
   - 选择 "Table Game"
   - 点击 "Search Activities"
   - 应该看到所有桌游

2. **组合筛选测试**
   - Game Type: Table Game
   - Activity Type: Social Event
   - 应该看到社交活动类的桌游

3. **清除筛选测试**
   - 点击 "Clear All"
   - 所有筛选器应重置
   - 不显示结果

4. **URL 参数测试**
   - 访问 `/games?type=Table%20Game`
   - 应该自动应用筛选

### 预期结果

- 筛选结果应显示匹配的游戏数量
- 游戏卡片应正确显示
- 筛选器可以组合使用
- 清除功能正常工作

## 故障排除

### 问题：选择 "Table Game" 后没有结果

**解决方案：**
1. 检查数据库中游戏的 `type` 字段是否已设置
2. 运行更新脚本设置 type 值
3. 确认游戏记录存在于数据库中

### 问题：筛选器不工作

**解决方案：**
1. 检查浏览器控制台是否有错误
2. 确认 TypeScript 编译没有错误
3. 重启开发服务器

### 问题：游戏显示但不在博客页面中

**解决方案：**
1. 检查游戏的 tags 是否包含 'christmas'
2. 确认游戏标题与博客页面中的标题匹配
3. 更新游戏数据以匹配博客内容

## 下一步

1. ✅ 确保数据库中有所有 15 个圣诞桌游
2. ✅ 为每个游戏设置正确的 `type` 值
3. ✅ 测试筛选功能
4. ✅ 验证博客页面链接到正确的游戏详情页
5. ✅ 考虑添加更多游戏类型选项

## 相关文件

- 类型定义: `src/types/game.ts`
- 首页筛选: `src/components/home/HomeFilterSection.tsx`
- 游戏筛选: `src/components/games/GameFilter.tsx`
- 筛选网格: `src/components/games/FilterableGameGrid.tsx`
- 数据库 Schema: `src/db/schema.ts`
- 迁移文件: `drizzle/0001_wise_sersi.sql`
- 更新脚本: `scripts/update-christmas-games-type.sql`
