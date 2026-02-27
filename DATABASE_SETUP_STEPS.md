# 数据库设置步骤 - 添加 Game Type 功能

## 当前状态

✅ 代码已更新完成
⚠️ 需要手动添加数据库列

## 步骤 1: 添加 type 列到数据库

### 方法 A: 使用 Supabase Dashboard（推荐）

1. **打开 Supabase Dashboard**
   - 访问: https://supabase.com/dashboard
   - 登录你的账号
   - 选择项目: `wartfmwsbzmmgeydbyhs`

2. **打开 SQL Editor**
   - 在左侧菜单中点击 "SQL Editor"
   - 点击 "New query" 创建新查询

3. **执行以下 SQL**

```sql
-- 添加 type 列
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);

-- 添加列注释
COMMENT ON COLUMN games.type IS 'Game type classification: Table Game, Christmas Game, Icebreaker, Energizer, etc.';

-- 验证列已添加
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'type';
```

4. **点击 "Run" 执行 SQL**

5. **验证结果**
   - 应该看到查询成功的消息
   - 最后一个 SELECT 语句应该返回 type 列的信息

### 方法 B: 使用 PostgreSQL 客户端

如果你有 PostgreSQL 客户端（如 pgAdmin, DBeaver 等）：

```bash
# 连接字符串
postgresql://postgres:yiyebaofu@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres?sslmode=require
```

然后执行上面的 SQL。

## 步骤 2: 更新游戏数据

添加列后，运行以下命令更新游戏类型：

```bash
npm run db:setup-game-types
```

这个脚本会：
1. ✅ 检查数据库连接
2. ✅ 验证 type 列存在
3. ✅ 为 15 个圣诞桌游设置 `type = 'Table Game'`
4. ✅ 为其他圣诞主题游戏设置 `type = 'Christmas Game'`
5. ✅ 显示更新摘要和验证结果

### 预期输出

```
🎮 Setting up game types for Christmas table games...

📋 Step 1: Checking database connection...
✅ Database connection successful

📋 Step 2: Checking if 'type' column exists...
✅ 'type' column exists

📋 Step 3: Fetching all games from database...
✅ Found XX games in database

📋 Step 4: Updating Christmas table games...
Target games to update:
   1. Holiday Fortunes
   2. Christmas Roll & Poll
   ... (15 games total)

✅ Updated: "Holiday Fortunes" → type: "Table Game"
✅ Updated: "Christmas Roll & Poll" → type: "Table Game"
...

📊 UPDATE SUMMARY
============================================================
✅ Successfully updated: 15 games
⏭️  Skipped (already set): 0 games
⚠️  Not found in database: 0 games

✅ Total Table Games: 15
✅ Total Christmas Games: X

✨ Setup completed successfully!
```

## 步骤 3: 测试筛选功能

1. **启动开发服务器**
```bash
npm run dev
```

2. **访问首页**
```
http://localhost:3000
```

3. **测试筛选器**
   - 找到 "Find the Perfect Icebreaker, Energiser or Team-Building Game" 工具栏
   - 在 "Game Type" 下拉菜单中选择 "Table Game"
   - 点击 "Search Activities"
   - 应该看到所有圣诞桌游

4. **验证结果**
   - 应该显示 15 个圣诞桌游
   - 每个游戏卡片应该正确显示
   - 筛选计数应该准确

## 步骤 4: 验证博客页面集成

1. **访问圣诞桌游博客页面**
```
http://localhost:3000/blog/christmas-table-icebreaker-games
```

2. **检查游戏卡片**
   - 页面应该显示 15 个游戏
   - 每个游戏应该有详细信息

3. **测试游戏链接**
   - 点击游戏卡片上的 "View Full Details" 链接
   - 应该跳转到对应的游戏详情页

## 故障排除

### 问题 1: SQL 执行失败

**错误**: `permission denied for table games`

**解决方案**:
- 确保你使用的是有足够权限的账号
- 在 Supabase Dashboard 中，使用 SQL Editor 执行（它使用 service role）

### 问题 2: 脚本报告游戏未找到

**错误**: `⚠️  Not found in DB: "Holiday Fortunes"`

**解决方案**:
1. 检查数据库中是否有这些游戏
2. 如果没有，需要先添加游戏数据：
```bash
npm run db:seed:supabase
```

### 问题 3: 筛选器不显示结果

**可能原因**:
1. 游戏的 type 字段未设置
2. 数据库连接问题
3. 前端缓存问题

**解决方案**:
1. 重新运行 `npm run db:setup-game-types`
2. 清除浏览器缓存
3. 重启开发服务器

### 问题 4: 类型错误

**错误**: TypeScript 编译错误

**解决方案**:
```bash
# 检查类型错误
npx tsc --noEmit

# 如果有错误，查看具体文件并修复
```

## 完成检查清单

在完成所有步骤后，验证以下内容：

- [ ] SQL 成功执行，type 列已添加
- [ ] 索引已创建
- [ ] 脚本成功运行，15 个游戏已更新
- [ ] 首页筛选器显示 "Game Type" 选项
- [ ] 选择 "Table Game" 能筛选出圣诞桌游
- [ ] 游戏计数正确显示
- [ ] 博客页面正常显示所有游戏
- [ ] 游戏详情页链接正常工作
- [ ] 没有 TypeScript 或运行时错误

## 相关文件

### SQL 文件
- `migrations/001-add-type-column.sql` - 添加列的 SQL
- `scripts/update-christmas-games-type.sql` - 更新数据的 SQL

### TypeScript 脚本
- `scripts/setup-game-types.ts` - 主要设置脚本
- `scripts/run-migration.ts` - 迁移辅助脚本
- `scripts/add-type-column-and-update.ts` - 备用更新脚本

### 文档
- `TYPE_FILTER_IMPLEMENTATION.md` - 技术实现文档
- `CHRISTMAS_TABLE_GAMES_FILTER_GUIDE.md` - 使用指南
- `IMPLEMENTATION_SUMMARY_CN.md` - 实现总结

## 下一步

完成数据库设置后：

1. ✅ 测试所有筛选器组合
2. ✅ 验证响应式设计
3. ✅ 检查性能
4. ✅ 准备部署到生产环境

## 生产环境部署

在部署到生产环境前：

1. **备份数据库**
```sql
-- 在 Supabase Dashboard 中创建备份
```

2. **在生产环境执行相同的 SQL**
```sql
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);
```

3. **运行更新脚本**（使用生产环境的环境变量）

4. **验证功能**

5. **监控错误日志**

## 支持

如果遇到问题：

1. 查看 Supabase Dashboard 的日志
2. 检查浏览器控制台错误
3. 查看服务器日志
4. 参考文档中的故障排除部分

---

**最后更新**: 2026-02-27
**版本**: 1.0.0
