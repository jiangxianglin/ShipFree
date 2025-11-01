# 数据库连接修复说明

## 问题诊断

测试显示数据库连接失败：
```
Error: getaddrinfo ENOTFOUND db.wartfmwsbzmmgeydbyhs.supabase.co
```

这是因为 Vercel 的 serverless 环境无法使用 Supabase 的直连端口（5432）。

## 解决方案

Supabase 提供了两种连接方式：

### 1. 直连（Direct Connection）- 端口 5432
- 适用于长连接环境（如传统服务器）
- **不适用于 Vercel 等 serverless 环境**

### 2. 连接池（Pooler）- 端口 6543
- 适用于 serverless 环境
- **推荐用于 Vercel 部署**

## 修复步骤

### 步骤 1: 获取 Pooler 连接字符串

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击左侧菜单 "Project Settings" → "Database"
4. 找到 "Connection string" 部分
5. 选择 "Connection pooling" 标签（不是 "Direct connection"）
6. 选择 "Transaction" 模式
7. 复制连接字符串，格式类似：
   ```
   postgresql://postgres.wartfmwsbzmmgeydbyhs:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```

### 步骤 2: 更新 Vercel 环境变量

1. 登录 Vercel Dashboard
2. 进入你的项目 (icebreakergames)
3. 点击 "Settings" → "Environment Variables"
4. 找到 `DATABASE_URL` 变量
5. 更新为新的 Pooler 连接字符串
6. 确保添加 `?pgbouncer=true` 参数：
   ```
   postgresql://postgres.wartfmwsbzmmgeydbyhs:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. 点击 "Save"

### 步骤 3: 重新部署

环境变量更新后，Vercel 会自动触发重新部署。或者你可以手动触发：

1. 在 Vercel Dashboard 中点击 "Deployments"
2. 点击最新部署右侧的 "..." 菜单
3. 选择 "Redeploy"

### 步骤 4: 验证

部署完成后（约 1-2 分钟），运行测试：

```bash
node test-db-connection.js
```

应该看到：
```
✅ Database connection successful!
Found X games in database
```

如果显示 `Found 0 games`，说明需要运行 seed 文件。

### 步骤 5: 运行 Seed 文件（如果需要）

如果数据库中没有游戏数据：

1. 登录 Supabase Dashboard
2. 点击左侧菜单 "SQL Editor"
3. 点击 "New query"
4. 复制 `seed-games.sql` 的全部内容
5. 粘贴到编辑器
6. 点击 "Run" 执行

### 步骤 6: 测试 Sitemap

```bash
node test-sitemap-www.js
```

应该看到 15 个游戏 URL。

## 本地开发环境

本地开发可以继续使用直连（端口 5432），不需要修改 `.env.local`。

## 注意事项

- Pooler 连接字符串必须包含 `?pgbouncer=true` 参数
- 密码中如果有特殊字符，需要进行 URL 编码
- Transaction 模式适合大多数应用场景
- 不要将 Pooler 连接字符串提交到 Git

## 常见问题

### Q: 为什么本地可以连接，Vercel 不行？
A: 本地是长连接环境，Vercel 是 serverless 环境，需要使用连接池。

### Q: 什么是 pgbouncer？
A: PgBouncer 是一个连接池管理器，Supabase 使用它来管理 serverless 环境的数据库连接。

### Q: Transaction 模式和 Session 模式有什么区别？
A: Transaction 模式每个事务使用一个连接，适合 serverless；Session 模式每个会话使用一个连接，适合传统应用。

## 参考资料

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
