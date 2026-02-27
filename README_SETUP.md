# 📖 设置指南总览

## 🎯 目标

在首页添加 "Game Type" 筛选器，用于筛选圣诞桌游。

## ✅ 当前状态

- ✅ 所有代码已完成
- ✅ 所有脚本已创建
- ⏳ 需要添加数据库列

## 🚀 快速开始（3 种方法）

### 方法 1: 使用 pgAdmin（推荐）⭐

**适合**: 不想用命令行的用户

1. 下载 pgAdmin: https://www.pgadmin.org/download/
2. 连接到数据库（连接信息在下方）
3. 执行 SQL（SQL 在下方）
4. 运行 `npm run db:setup-game-types`
5. 运行 `npm run dev` 测试

📖 详细步骤: `SETUP_WITHOUT_DASHBOARD.md`

### 方法 2: 使用命令行（最快）⚡

**适合**: 熟悉命令行的用户

```bash
# Windows PowerShell
$env:PGPASSWORD="yiyebaofu"
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100); CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);"

# 然后运行
npm run db:setup-game-types
npm run dev
```

📖 详细步骤: `SETUP_WITHOUT_DASHBOARD.md`

### 方法 3: 创建新 Supabase 项目（如果旧项目无法访问）

**适合**: 原数据库无法连接的情况

1. 访问 https://supabase.com 创建新项目
2. 更新 `.env.local` 文件
3. 运行 `npm run db:seed:supabase` 导入数据
4. 运行 `npm run db:setup-all` 完成设置

📖 详细步骤: `ALTERNATIVE_SETUP.md`

---

## 📋 数据库连接信息

从 `.env.local` 文件中：

```
Host: db.wartfmwsbzmmgeydbyhs.supabase.co
Port: 5432
Database: postgres
Username: postgres
Password: yiyebaofu
SSL Mode: require
```

完整连接字符串：
```
postgresql://postgres:yiyebaofu@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres?sslmode=require
```

---

## 📝 需要执行的 SQL

```sql
-- 添加 type 列
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);

-- 验证
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'type';
```

---

## 🛠️ 可用的 npm 命令

```bash
# 添加数据库列（需要数据库连接）
npm run db:add-type-column

# 更新游戏类型数据
npm run db:setup-game-types

# 完整设置（添加列 + 更新数据）
npm run db:setup-all

# 重新导入所有游戏数据
npm run db:seed:supabase

# 启动开发服务器
npm run dev
```

---

## 📚 文档导航

### 快速开始
- **QUICK_START.md** - 3 步快速指南（假设可以访问 Dashboard）
- **SETUP_WITHOUT_DASHBOARD.md** ⭐ - 无需 Dashboard 的设置方法

### 详细文档
- **DATABASE_SETUP_STEPS.md** - 完整的数据库设置步骤
- **ALTERNATIVE_SETUP.md** - 所有替代方案
- **CURRENT_STATUS.md** - 当前状态和待办事项

### 技术文档
- **TYPE_FILTER_IMPLEMENTATION.md** - 技术实现细节
- **CHRISTMAS_TABLE_GAMES_FILTER_GUIDE.md** - 使用指南
- **IMPLEMENTATION_SUMMARY_CN.md** - 实现总结

---

## 🔍 故障排除

### 问题: 数据库连接失败

**错误**: `ENOTFOUND` 或 `connection timeout`

**解决方案**:
1. 检查网络连接
2. 尝试使用 VPN
3. 使用 pgAdmin 等图形工具
4. 考虑创建新的 Supabase 项目

### 问题: 找不到 Supabase 账户

**解决方案**:
1. 使用 pgAdmin 或其他 PostgreSQL 客户端
2. 或创建新的 Supabase 项目
3. 查看 `SETUP_WITHOUT_DASHBOARD.md`

### 问题: SQL 执行失败

**错误**: `permission denied`

**解决方案**:
- 确保使用正确的用户名和密码
- 使用 pgAdmin 的 Query Tool
- 检查 SSL 设置

---

## ✨ 完成后的效果

设置完成后，你将能够：

1. 在首页使用 "Game Type" 筛选器
2. 选择 "Table Game" 筛选出 15 个圣诞桌游
3. 组合多个筛选条件
4. 通过 URL 参数分享筛选结果

---

## 🎯 推荐流程

### 如果你有 PostgreSQL 客户端工具

```
1. 打开 pgAdmin/DBeaver
2. 连接到数据库
3. 执行 SQL
4. 运行 npm run db:setup-game-types
5. 运行 npm run dev
6. 测试功能
```

### 如果你熟悉命令行

```
1. 打开终端
2. 运行 psql 命令（见上方）
3. 运行 npm run db:setup-game-types
4. 运行 npm run dev
5. 测试功能
```

### 如果数据库无法连接

```
1. 访问 https://supabase.com
2. 创建新项目
3. 更新 .env.local
4. 运行 npm run db:seed:supabase
5. 运行 npm run db:setup-all
6. 运行 npm run dev
7. 测试功能
```

---

## 📞 获取帮助

1. 先查看 `SETUP_WITHOUT_DASHBOARD.md`
2. 如果还有问题，查看 `ALTERNATIVE_SETUP.md`
3. 检查 `DATABASE_SETUP_STEPS.md` 的故障排除部分

---

## 🎉 下一步

选择一个适合你的方法，开始设置吧！

**推荐**: 如果不确定，先尝试 `SETUP_WITHOUT_DASHBOARD.md` 中的 pgAdmin 方法。
