# 🚀 部署前安全检查清单

**项目**: Ice Breaker Games  
**检查日期**: 2025-10-30  
**检查人**: Kiro AI Assistant

---

## ✅ 安全检查结果

| 检查项 | 状态 | 说明 |
|--------|------|------|
| API 密钥没有写在代码中 | ✅ 通过 | 所有密钥都通过环境变量引用 |
| 环境变量配置正确（本地+Vercel） | ⚠️ 待配置 | 本地已配置，Vercel需要手动配置 |
| GitHub 未上传敏感文件 | ✅ 通过 | .env.local 已加入 .gitignore |
| Supabase 已启用并配置 RLS | ⚠️ 待检查 | 需要在 Supabase 控制台检查 |
| 已设置身份认证（Supabase Auth） | ⚠️ 待配置 | 当前为公开访问，v1.1 将添加 |
| 客户端未存储敏感信息 | ✅ 通过 | 仅使用 ANON_KEY，无敏感数据 |
| 已设置 API 使用额度 | ⚠️ 待配置 | 需要在 Supabase 控制台设置 |

---

## 📋 详细检查报告

### 1. ✅ API 密钥没有写在代码中

**检查方法**: 搜索所有 .ts/.tsx 文件中的硬编码密钥

**结果**: 
- ✅ 未发现硬编码的 API 密钥
- ✅ 所有配置都通过 `process.env` 引用
- ✅ Supabase 客户端正确使用环境变量

**相关文件**:
```typescript
// ShipFree/src/lib/supabase/server.ts
process.env.NEXT_PUBLIC_SUPABASE_URL!
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ShipFree/src/lib/supabase/client.ts
process.env.NEXT_PUBLIC_SUPABASE_URL!
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

---

### 2. ⚠️ 环境变量配置正确（本地+Vercel）

**本地环境 (.env.local)**: ✅ 已配置
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wartfmwsbzmmgeydbyhs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:***@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres
```

**Vercel 环境**: ⚠️ 需要手动配置

**操作步骤**:
1. 登录 Vercel Dashboard
2. 选择项目 → Settings → Environment Variables
3. 添加以下变量（所有环境：Production, Preview, Development）:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `DATABASE_URL` (如果使用 Drizzle ORM)

**注意**: 
- ⚠️ 不要在 Vercel 中使用 `NEXT_PUBLIC_` 前缀暴露敏感密钥
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是安全的（仅限公开操作）

---

### 3. ✅ GitHub 未上传敏感文件

**检查结果**:
- ✅ `.env.local` 已加入 `.gitignore`
- ✅ `.env*.local` 已加入 `.gitignore`
- ✅ Git 状态显示 `.env.local` 为 Untracked（未跟踪）

**当前 Git 状态**:
```
Untracked files:
  .env.local  ← 未被跟踪，安全 ✅
```

**已更新 .gitignore**:
```gitignore
# env files
.env
.env.local
.env*.local
```

---

### 4. ⚠️ Supabase 已启用并配置 RLS

**当前状态**: 需要手动检查

**操作步骤**:
1. 登录 Supabase Dashboard: https://supabase.com/dashboard
2. 选择项目: `wartfmwsbzmmgeydbyhs`
3. 进入 Authentication → Policies
4. 检查 `games` 表的 RLS 策略

**推荐策略**（v1.0 公开访问）:
```sql
-- 允许所有人读取游戏数据
CREATE POLICY "Allow public read access to games"
ON games FOR SELECT
TO public
USING (true);

-- 禁止公开写入（仅管理员）
-- 不创建 INSERT/UPDATE/DELETE 策略
```

**v1.1 用户功能**（收藏、评论）:
```sql
-- 用户只能管理自己的收藏
CREATE POLICY "Users can manage their own favorites"
ON favorites FOR ALL
TO authenticated
USING (auth.uid() = user_id);
```

**检查命令**:
```sql
-- 在 Supabase SQL Editor 中运行
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'games';
```

---

### 5. ⚠️ 已设置身份认证（Supabase Auth）

**当前状态**: v1.0 不需要认证（公开访问）

**v1.0 功能**:
- ✅ 游戏浏览（无需登录）
- ✅ 游戏详情（无需登录）
- ✅ 搜索和筛选（无需登录）

**v1.1 计划**:
- ⚠️ 用户注册/登录
- ⚠️ 收藏功能
- ⚠️ 个人中心

**Supabase Auth 配置**（v1.1 需要）:
1. 进入 Authentication → Providers
2. 启用 Email Provider
3. 配置 Email Templates
4. 可选：启用 Google/GitHub OAuth

---

### 6. ✅ 客户端未存储敏感信息

**检查结果**:
- ✅ 仅使用 `NEXT_PUBLIC_SUPABASE_ANON_KEY`（公开密钥）
- ✅ 未在客户端存储用户密码或敏感数据
- ✅ 未使用 localStorage 存储敏感信息
- ✅ 数据库密码仅在服务端使用

**安全说明**:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是设计为公开的
- 它只能执行 RLS 策略允许的操作
- 真正的安全由 Supabase RLS 保证

---

### 7. ⚠️ 已设置 API 使用额度

**需要配置的服务**:

#### Supabase 配额
1. 登录 Supabase Dashboard
2. 进入 Settings → Billing
3. 检查当前计划和配额:
   - Free Plan: 500MB 数据库，50,000 月活用户
   - 建议：设置使用警报

#### Vercel 配额
1. 登录 Vercel Dashboard
2. 进入 Settings → Usage
3. 检查:
   - Bandwidth: 100GB/月（Free）
   - Build Minutes: 6000 分钟/月（Free）
   - Serverless Function Execution: 100GB-Hours/月（Free）

**推荐操作**:
- ⚠️ 在 Supabase 设置使用警报（80% 配额时通知）
- ⚠️ 在 Vercel 设置 Spending Limit（防止意外费用）

---

## 🔒 额外安全建议

### 1. 数据库安全
- [ ] 启用 Supabase RLS（Row Level Security）
- [ ] 定期备份数据库
- [ ] 限制数据库直连（仅通过 Supabase API）

### 2. API 安全
- [ ] 考虑添加 Rate Limiting（防止滥用）
- [ ] 监控 API 使用情况
- [ ] 设置 CORS 策略

### 3. 前端安全
- [ ] 启用 Content Security Policy (CSP)
- [ ] 使用 HTTPS（Vercel 自动提供）
- [ ] 定期更新依赖包

### 4. 监控和日志
- [ ] 设置 Vercel Analytics
- [ ] 配置 Sentry 错误追踪（可选）
- [ ] 监控 Supabase 日志

---

## 📝 Vercel 部署步骤

### 1. 连接 GitHub
```bash
# 确保代码已推送到 GitHub
git add .
git commit -m "feat: prepare for v1.0 deployment"
git push origin main
```

### 2. 导入项目到 Vercel
1. 访问 https://vercel.com/new
2. 选择 GitHub 仓库
3. 配置项目:
   - Framework Preset: Next.js
   - Root Directory: `ShipFree`
   - Build Command: `pnpm build`
   - Output Directory: `.next`

### 3. 配置环境变量
在 Vercel 项目设置中添加:
```
NEXT_PUBLIC_SUPABASE_URL=https://wartfmwsbzmmgeydbyhs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:***@db.wartfmwsbzmmgeydbyhs.supabase.co:5432/postgres
```

### 4. 部署
- 点击 "Deploy" 按钮
- 等待构建完成（约 2-3 分钟）
- 访问生成的 URL 测试

### 5. 配置自定义域名（可选）
1. 进入 Settings → Domains
2. 添加域名: `icebreakergames.site`
3. 配置 DNS 记录（按 Vercel 提示操作）

---

## ✅ 部署后验证清单

部署完成后，请验证以下功能:

- [ ] 首页正常加载
- [ ] 游戏列表页面显示所有游戏
- [ ] 游戏详情页面正常工作
- [ ] 导航链接正常
- [ ] 移动端响应式正常
- [ ] SEO meta 标签正确
- [ ] 图片正常加载
- [ ] 无控制台错误
- [ ] Lighthouse 分数 > 90

---

## 🚨 紧急回滚计划

如果部署后发现严重问题:

1. **Vercel 回滚**:
   - 进入 Deployments
   - 找到上一个稳定版本
   - 点击 "Promote to Production"

2. **数据库回滚**:
   - Supabase 自动备份（每天）
   - 可在 Database → Backups 恢复

3. **代码回滚**:
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## 📞 支持联系方式

- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **项目文档**: `icebreaker_site_doc.md`

---

**最后更新**: 2025-10-30  
**下次检查**: 部署后 24 小时内
