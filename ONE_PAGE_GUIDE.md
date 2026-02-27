# 📄 一页纸快速指南

## 🎯 目标
添加 "Game Type" 筛选器，筛选圣诞桌游

## ✅ 代码状态
所有代码已完成，只需添加数据库列

---

## 🚀 最简单的方法（3 步）

### 1️⃣ 下载并安装 pgAdmin
https://www.pgadmin.org/download/

### 2️⃣ 连接数据库

在 pgAdmin 中创建新连接：

| 字段 | 值 |
|------|-----|
| Host | `db.wartfmwsbzmmgeydbyhs.supabase.co` |
| Port | `5432` |
| Database | `postgres` |
| Username | `postgres` |
| Password | `yiyebaofu` |
| SSL Mode | `Require` |

### 3️⃣ 执行 SQL

在 Query Tool 中运行：

```sql
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);
```

---

## 🔄 然后运行

```bash
npm run db:setup-game-types
npm run dev
```

访问 http://localhost:3000 测试！

---

## 🆘 如果数据库连接失败

### 选项 A: 使用命令行（如果有 psql）

```bash
# Windows
$env:PGPASSWORD="yiyebaofu"
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);"

# Mac/Linux
export PGPASSWORD="yiyebaofu"
psql -h db.wartfmwsbzmmgeydbyhs.supabase.co -p 5432 -U postgres -d postgres -c "ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);"
```

### 选项 B: 创建新 Supabase 项目

1. 访问 https://supabase.com
2. 创建新项目
3. 更新 `.env.local` 文件
4. 运行 `npm run db:seed:supabase`
5. 运行 `npm run db:setup-all`

---

## 📚 详细文档

- **SETUP_WITHOUT_DASHBOARD.md** - 详细步骤
- **ALTERNATIVE_SETUP.md** - 所有替代方案
- **README_SETUP.md** - 完整指南

---

## ✨ 完成！

设置完成后，你可以在首页使用 "Game Type" 筛选器筛选圣诞桌游了！
