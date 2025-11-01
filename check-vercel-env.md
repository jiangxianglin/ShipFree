# Vercel 环境变量检查清单

## 当前问题
数据库连接仍然失败，错误显示还在使用旧的直连地址：
```
db.wartfmwsbzmmgeydbyhs.supabase.co (端口 5432)
```

应该使用 Pooler 地址（类似）：
```
aws-0-ap-southeast-1.pooler.supabase.com (端口 6543)
```

## 可能的原因

### 1. 环境变量没有正确保存
- 检查 Vercel Dashboard 中的环境变量是否真的更新了
- 确认没有拼写错误

### 2. 环境变量作用域不正确
- 确保环境变量应用到了 **Production** 环境
- 不只是 Preview 或 Development

### 3. 没有触发重新部署
- 更新环境变量后需要重新部署才能生效

## 详细检查步骤

### 步骤 1: 验证 Vercel 环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 点击 **Settings** → **Environment Variables**
4. 找到 `DATABASE_URL` 变量
5. 检查：
   - ✅ 值是否包含 `pooler.supabase.com`？
   - ✅ 端口是否是 `6543`？
   - ✅ 是否包含 `?pgbouncer=true`？
   - ✅ 是否勾选了 **Production** 环境？

### 步骤 2: 正确的连接字符串格式

你的连接字符串应该类似这样：

```
postgresql://postgres.wartfmwsbzmmgeydbyhs:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**关键点：**
- 主机名包含 `.pooler.supabase.com`
- 端口是 `6543`（不是 5432）
- 末尾有 `?pgbouncer=true`

### 步骤 3: 获取正确的 Pooler 连接字符串

如果不确定连接字符串是否正确：

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 点击左侧 **Project Settings** (齿轮图标)
4. 点击 **Database**
5. 滚动到 **Connection string** 部分
6. 点击 **Connection pooling** 标签（不是 URI）
7. 模式选择 **Transaction**
8. 复制显示的连接字符串
9. 手动添加 `?pgbouncer=true` 到末尾

### 步骤 4: 更新并重新部署

1. 在 Vercel 中更新 `DATABASE_URL`
2. 确保勾选 **Production** 环境
3. 点击 **Save**
4. 转到 **Deployments** 标签
5. 点击最新部署右侧的 **...** 菜单
6. 选择 **Redeploy**
7. 等待部署完成（1-2 分钟）

### 步骤 5: 清除缓存（如果需要）

如果重新部署后还是不行：

1. 在 Vercel Deployments 页面
2. 点击 **...** 菜单
3. 选择 **Redeploy** 并勾选 **Use existing Build Cache** 为 OFF

## 验证步骤

部署完成后，运行：

```bash
node test-db-connection.js
```

**成功的输出应该是：**
```
✅ Database connection successful!
Found 15 games in database
```

**如果还是失败，检查错误信息：**
- 如果还是 `ENOTFOUND db.wartfmwsbzmmgeydbyhs...`：环境变量没有更新
- 如果是 `ENOTFOUND aws-0-xxx.pooler...`：Pooler 地址可能不正确
- 如果是认证错误：密码可能不正确

## 常见错误

### 错误 1: 忘记添加 ?pgbouncer=true
```
❌ postgresql://...pooler.supabase.com:6543/postgres
✅ postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true
```

### 错误 2: 环境变量只应用到 Preview
- 必须勾选 **Production** 环境

### 错误 3: 密码包含特殊字符
如果密码包含特殊字符（如 @, #, %, 等），需要 URL 编码：
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`

## 截图参考位置

### Supabase 中获取 Pooler 连接字符串：
```
Project Settings → Database → Connection string → Connection pooling (标签)
```

### Vercel 中设置环境变量：
```
Project Settings → Environment Variables → DATABASE_URL
勾选: ☑ Production ☑ Preview ☑ Development
```

## 如果还是不行

1. 检查 Supabase 项目是否暂停（免费版会自动暂停）
2. 检查 Supabase 数据库是否可以从外部访问
3. 尝试在 Vercel 部署日志中查看详细错误信息
4. 考虑使用 Supabase 的 REST API 而不是直接数据库连接
