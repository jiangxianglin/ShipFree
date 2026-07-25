# 开发手册：改游戏数据 / Seed（开 RLS 之后）

> 开发时改库、跑脚本前先看本文。  
> 安全约定：**密码与 service_role 只放本地 `.env.local`，永不写进 md、永不 commit。**

---

## 1. 密钥怎么用

| 变量 | 放哪 | 能否进前端 | 用途 |
|------|------|------------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` + 托管平台 | 可以（公开） | 连 Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 同上 | 可以（公开） | 网站**只读** games |
| `SUPABASE_SERVICE_ROLE_KEY` | **仅**本地 `.env.local`（及 CI 密钥库） | **禁止** `NEXT_PUBLIC_` | seed / 批量写入 |
| `DATABASE_URL` | 仅服务端 / 本地 `.env.local` | **禁止**公开 | Drizzle、直连 Postgres |

开了 RLS 之后：anon 只能 `SELECT`；用 anon 跑 seed / 插入会失败。写入请用 **service_role** 或 **DATABASE_URL**。

---

## 2. 配置 `SUPABASE_SERVICE_ROLE_KEY`（一次性）

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard) → 你的项目  
2. **Project Settings** → **API**  
3. 复制 **`service_role`**（标有 secret，不要截图发群）  
4. 写入本地 `ShipFree/.env.local`：

```env
SUPABASE_SERVICE_ROLE_KEY=eyJ...你的service_role...
```

注意：

- 变量名**不要**写成 `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`
- `.env.local` 已被 `.gitignore` 忽略，不要 `git add -f`
- 改完 `.env.local` 后，若终端里已在跑脚本，重新开一个终端再跑

`.env.example` 里只有占位符，可作对照，不要填真密钥再提交。

---

## 3. 脚本应读哪个 key

**正确（写入 / seed）：**

```ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
}
```

**错误（开 RLS 后批量写会失败）：**

```ts
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
```

网站运行时的查询（`src/db/queries/games.ts`、`src/lib/supabase/*`）继续用 **anon** 即可，不要改成 service_role。

---

## 4. 日常怎么改数据（推荐顺序）

### 小改动（改 1～几条）

1. Supabase → **Table Editor** → `games`  
2. 直接改字段 / 加一行  

适合：改标题、描述、标签、修一条 slug。

### 批量 / 可重复（seed、同步博客游戏）

1. 确认 `.env.local` 已有 `SUPABASE_SERVICE_ROLE_KEY`  
2. 脚本已改为读 service role（见上）  
3. 在项目根目录执行，例如：

```bash
npm run db:seed:supabase
```

或：

```bash
npx tsx scripts/某脚本.ts
```

### 用 Postgres 直连（迁移、复杂 SQL）

使用 `DATABASE_URL`（Drizzle / `psql` / SQL Editor）：

```env
DATABASE_URL=postgresql://postgres:YOUR_DB_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres?sslmode=require
```

- 密码只放 `.env.local` / 托管环境变量  
- 文档里只写 `YOUR_DB_PASSWORD` 占位符  

---

## 5. 需要改成 service role 的脚本清单

以下文件当前（或历史上）用 anon 做写入，**开 RLS 后批量写前必须改成 `SUPABASE_SERVICE_ROLE_KEY`**：

| 路径 | 用途 |
|------|------|
| `src/db/seed/games-supabase.ts` | 主 seed |
| `scripts/reseed-games.ts` | 重新灌数据 |
| `scripts/sync-missing-blog-games.ts` | 同步博客缺的游戏 |
| `scripts/sync-student-audience-tags.ts` | 标签同步 |
| `scripts/setup-game-types.ts` | game type |
| `scripts/add-type-column-and-update.ts` | 列/类型更新 |
| `scripts/add-christmas-table-games.ts` | 圣诞桌游 |
| `scripts/update-to-christmas-game.ts` | 更新圣诞类型 |
| `scripts/check-and-update-supabase.js` | 检查并更新 |
| `scripts/run-migration.ts` | 迁移相关 |
| 其它 `scripts/*` 里对 `games` 做 insert/update/delete 的 | 同上 |

**只读检查**（若仅 SELECT）可暂时继续用 anon；一旦要写，一律 service role。

**不要改成 service role：**

- `src/lib/supabase/client.ts`（浏览器）  
- `src/lib/supabase/server.ts` / `middleware.ts`（请求会话用 anon）  
- `src/db/queries/games.ts`（站点读库）

---

## 6. 自检清单

跑 seed 前：

- [ ] `.env.local` 有 `SUPABASE_SERVICE_ROLE_KEY`（无 `NEXT_PUBLIC_` 前缀）  
- [ ] `git status` 看不到 `.env.local`  
- [ ] 脚本读的是 `SUPABASE_SERVICE_ROLE_KEY`  
- [ ] 网站页面仍用 anon，本地 `/games` 能打开  

跑完后：

- [ ] Table Editor 能看到新/改的数据  
- [ ] 本地或线上页面刷新后内容正确  

若报错类似 `new row violates row-level security policy` → 仍在用 anon 写入，检查脚本与 `.env.local`。

---

## 7. 和安全步骤的关系

- 密码轮换、RLS、删调试 API：见安全排查结论与操作步骤（对话记录 / 安全审计）  
- 本文只覆盖：**开 RLS 之后开发怎么安全地改数据**  
- 相关设置文档：`README_SETUP.md`、`ONE_PAGE_GUIDE.md`（其中密码请保持占位符）
