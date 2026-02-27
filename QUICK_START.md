# 🚀 快速开始 - 添加 Game Type 筛选功能

## ⚡ 3 步完成设置

### 步骤 1️⃣: 添加数据库列（2 分钟）

1. 打开 Supabase Dashboard: https://supabase.com/dashboard
2. 进入 SQL Editor
3. 复制粘贴以下 SQL 并点击 Run:

```sql
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);
```

### 步骤 2️⃣: 更新游戏数据（1 分钟）

在项目目录运行:

```bash
npm run db:setup-game-types
```

### 步骤 3️⃣: 测试功能（1 分钟）

```bash
npm run dev
```

访问 http://localhost:3000，在筛选器中选择 "Game Type" → "Table Game"

---

## ✅ 完成！

现在你可以：
- ✨ 使用 Game Type 筛选器
- 🎄 筛选出所有圣诞桌游
- 🎮 组合多个筛选条件
- 🔗 通过 URL 参数直接筛选

---

## 📚 详细文档

- 完整步骤: `DATABASE_SETUP_STEPS.md`
- 使用指南: `CHRISTMAS_TABLE_GAMES_FILTER_GUIDE.md`
- 技术文档: `TYPE_FILTER_IMPLEMENTATION.md`
- 实现总结: `IMPLEMENTATION_SUMMARY_CN.md`

---

## 🆘 遇到问题？

### SQL 执行失败
→ 确保在 Supabase Dashboard 的 SQL Editor 中执行

### 游戏未找到
→ 先运行 `npm run db:seed:supabase` 添加游戏数据

### 筛选器不工作
→ 清除浏览器缓存，重启开发服务器

---

**需要帮助？** 查看 `DATABASE_SETUP_STEPS.md` 中的故障排除部分
