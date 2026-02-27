# 🔧 替代设置方案 - 无需 Supabase Dashboard

如果你无法访问 Supabase Dashboard 或数据库连接失败，可以使用以下替代方案。

---

## 方案 1: 使用 PostgreSQL 客户端工具 ⭐ 推荐

### 可用的工具

1. **pgAdmin** (图形界面) - https://www.pgadmin.org/download/
2. **DBeaver** (图形界面) - https://dbeaver.io/download/
3. **psql** (命令行) - PostgreSQL 自带
4. **TablePlus** (图形界面，Mac/Windows) - https://tableplus.com/
5. **DataGrip** (JetBrains，付费) - https://www.jetbrains.com/datagrip/

### 连接信息

从 `.env.local` 文件中获取：

```
Host: db.wartfmwsbzmmgeydbyhs.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: yiyebaofu
SSL Mode: require
```

或使用完整连接字符串：
```
postgresql://postgres:yiyebaofu@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres?sslmode=require
```

### 执行 SQL

连接成功后，执行以下 SQL：

```sql
-- 1. 添加 type 列
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- 2. 创建索引
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);

-- 3. 添加注释
COMMENT ON COLUMN games.type IS 'Game type classification: Table Game, Christmas Game, Icebreaker, Energizer, etc.';

-- 4. 验证
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'type';
```

---

## 方案 2: 使用 psql 命令行

如果你安装了 PostgreSQL，可以使用 psql：

### Windows

```powershell
# 设置环境变量
$env:PGPASSWORD="yiyebaofu"

# 连接并执行 SQL
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100); CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);"
```

### Mac/Linux

```bash
# 设置环境变量
export PGPASSWORD="yiyebaofu"

# 连接并执行 SQL
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100); CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);"
```

---

## 方案 3: 使用 SQL 文件

### 步骤 1: 准备 SQL 文件

我已经创建了 SQL 文件：`migrations/001-add-type-column.sql`

### 步骤 2: 使用 psql 执行文件

```bash
# Windows PowerShell
$env:PGPASSWORD="yiyebaofu"
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -f migrations/001-add-type-column.sql

# Mac/Linux
export PGPASSWORD="yiyebaofu"
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -f migrations/001-add-type-column.sql
```

---

## 方案 4: 手动创建新的 Supabase 项目

如果原项目无法访问，可以创建新项目：

### 步骤 1: 创建新项目

1. 访问 https://supabase.com
2. 注册/登录账号
3. 创建新项目
4. 记录新的连接信息

### 步骤 2: 更新 .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-new-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
DATABASE_URL=postgresql://postgres:your-password@db.your-new-project.supabase.co:5432/postgres?sslmode=require
```

### 步骤 3: 创建表结构

在新项目的 SQL Editor 中执行：

```sql
-- 创建 games 表
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  players VARCHAR(100),
  duration VARCHAR(100),
  difficulty VARCHAR(50),
  materials TEXT,
  steps TEXT,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  image TEXT,
  type VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);
CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
CREATE INDEX IF NOT EXISTS idx_games_difficulty ON games(difficulty);
```

### 步骤 4: 导入游戏数据

```bash
npm run db:seed:supabase
```

---

## 方案 5: 使用在线 PostgreSQL 工具

### Adminer (轻量级)

1. 下载 Adminer: https://www.adminer.org/
2. 放到本地 Web 服务器（如 XAMPP, WAMP）
3. 访问 Adminer 并连接数据库
4. 执行 SQL

### 在线 SQL 编辑器

一些在线工具可以连接到 PostgreSQL：
- https://sqliteonline.com/ (支持 PostgreSQL)
- https://www.db-fiddle.com/ (支持 PostgreSQL)

---

## 故障排除

### 问题 1: 连接超时

**可能原因**:
- 网络问题
- 防火墙阻止
- Supabase 项目已暂停

**解决方案**:
1. 检查网络连接
2. 尝试使用 VPN
3. 检查防火墙设置
4. 确认 Supabase 项目状态

### 问题 2: 认证失败

**错误**: `password authentication failed`

**解决方案**:
1. 确认密码正确
2. 检查 .env.local 文件
3. 尝试重置数据库密码

### 问题 3: SSL 连接问题

**错误**: `SSL connection error`

**解决方案**:
```bash
# 尝试禁用 SSL 验证（仅用于测试）
psql "postgresql://postgres:yiyebaofu@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres?sslmode=disable"
```

---

## 验证设置

执行 SQL 后，验证列是否添加成功：

```sql
-- 检查列
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'type';

-- 应该返回:
-- column_name | data_type      | character_maximum_length
-- type        | character varying | 100
```

---

## 完成后的步骤

添加列成功后：

### 步骤 1: 更新游戏数据

```bash
npm run db:setup-game-types
```

### 步骤 2: 测试功能

```bash
npm run dev
```

访问 http://localhost:3000 并测试筛选器。

---

## 快速命令参考

```bash
# 方案 1: 直接添加列（如果网络正常）
npm run db:add-type-column

# 方案 2: 完整设置（添加列 + 更新数据）
npm run db:setup-all

# 方案 3: 仅更新数据（列已存在）
npm run db:setup-game-types

# 方案 4: 重新导入所有游戏数据
npm run db:seed:supabase
```

---

## 需要帮助？

如果以上方案都不行：

1. 检查 Supabase 项目是否还存在
2. 考虑创建新的 Supabase 项目
3. 或者使用本地 PostgreSQL 数据库进行开发

---

**推荐顺序**:
1. 先尝试方案 1（PostgreSQL 客户端工具）
2. 如果不行，尝试方案 4（创建新项目）
3. 最后考虑使用本地数据库
