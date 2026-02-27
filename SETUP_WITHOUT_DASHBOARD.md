# 🚀 无需 Dashboard 的快速设置

## 最简单的方法：使用 pgAdmin

### 步骤 1: 下载并安装 pgAdmin

下载地址: https://www.pgadmin.org/download/

- Windows: 下载 .exe 安装包
- Mac: 下载 .dmg 文件
- Linux: 使用包管理器安装

### 步骤 2: 连接到数据库

1. 打开 pgAdmin
2. 右键点击 "Servers" → "Register" → "Server"
3. 填写连接信息：

**General 标签**:
- Name: `Ice Breaker Games` (随便起名)

**Connection 标签**:
- Host: `db.wartfmwsbzmmgeydbyhs.supabase.co`
- Port: `5432`
- Database: `postgres`
- Username: `postgres`
- Password: `yiyebaofu`

**SSL 标签**:
- SSL mode: `Require`

4. 点击 "Save"

### 步骤 3: 执行 SQL

1. 在左侧树形菜单中展开你的服务器
2. 展开 "Databases" → "postgres"
3. 右键点击 "postgres" → "Query Tool"
4. 复制粘贴以下 SQL：

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

5. 点击 ▶️ (Execute) 按钮
6. 应该看到成功消息

### 步骤 4: 更新游戏数据

回到项目目录，运行：

```bash
npm run db:setup-game-types
```

### 步骤 5: 测试

```bash
npm run dev
```

访问 http://localhost:3000，测试 Game Type 筛选器！

---

## 备选方案：使用 DBeaver（更简单）

DBeaver 是一个免费的数据库工具，界面更友好。

### 下载

https://dbeaver.io/download/

### 连接步骤

1. 打开 DBeaver
2. 点击 "New Database Connection"
3. 选择 "PostgreSQL"
4. 填写连接信息（同上）
5. 点击 "Test Connection"
6. 如果成功，点击 "Finish"

### 执行 SQL

1. 在左侧找到你的连接
2. 右键 → "SQL Editor" → "New SQL Script"
3. 粘贴 SQL（同上）
4. 点击 ▶️ 执行

---

## 最快的方法：使用命令行（如果你有 psql）

### Windows PowerShell

```powershell
# 设置密码
$env:PGPASSWORD="yiyebaofu"

# 执行 SQL
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100); CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);"

# 验证
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'games' AND column_name = 'type';"
```

### Mac/Linux Terminal

```bash
# 设置密码
export PGPASSWORD="yiyebaofu"

# 执行 SQL
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100); CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);"

# 验证
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'games' AND column_name = 'type';"
```

---

## 如果数据库连接失败

### 可能的原因

1. ❌ Supabase 项目已暂停或删除
2. ❌ 网络连接问题
3. ❌ 防火墙阻止

### 解决方案

#### 选项 1: 创建新的 Supabase 项目

1. 访问 https://supabase.com
2. 注册新账号（或使用 GitHub 登录）
3. 创建新项目
4. 更新 `.env.local` 文件中的连接信息
5. 运行 `npm run db:seed:supabase` 导入数据

#### 选项 2: 使用本地 PostgreSQL

1. 安装 PostgreSQL: https://www.postgresql.org/download/
2. 创建本地数据库
3. 更新 `.env.local` 连接字符串
4. 运行迁移和种子脚本

---

## 完整的 SQL（复制粘贴即可）

```sql
-- ============================================
-- 添加 type 列到 games 表
-- ============================================

-- 1. 添加列
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- 2. 创建索引（提高查询性能）
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);

-- 3. 添加列注释
COMMENT ON COLUMN games.type IS 'Game type: Table Game, Christmas Game, Icebreaker, etc.';

-- 4. 验证列已添加
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'games' 
  AND column_name = 'type';

-- 5. 查看当前 games 表结构
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'games' 
ORDER BY ordinal_position;
```

---

## 验证成功

执行 SQL 后，你应该看到：

```
column_name | data_type         | character_maximum_length | is_nullable
------------|-------------------|--------------------------|-------------
type        | character varying | 100                      | YES
```

---

## 下一步

✅ SQL 执行成功后，运行：

```bash
# 更新游戏类型数据
npm run db:setup-game-types

# 启动开发服务器
npm run dev
```

🎉 完成！访问 http://localhost:3000 测试筛选功能！

---

## 需要帮助？

- 查看 `ALTERNATIVE_SETUP.md` 了解更多方案
- 查看 `DATABASE_SETUP_STEPS.md` 了解详细步骤
- 如果还有问题，可以考虑创建新的 Supabase 项目
