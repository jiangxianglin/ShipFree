# Sitemap 修复说明

## 问题
1. Sitemap 使用了错误的路由结构 (`sitemap.xml/route.ts`)，导致生成 `/sitemap.xml/` 而不是 `/sitemap.xml`
2. 数据库中的游戏数据缺少 `slug` 字段，导致游戏详情页无法包含在 sitemap 中

## 修复内容

### 1. 更新 Sitemap 路由
- ✅ 删除: `src/app/sitemap.xml/route.ts`
- ✅ 创建: `src/app/sitemap.ts` (使用 Next.js 标准 sitemap 功能)
- ✅ 域名已设置为: `https://icebreakergames.site`
- ✅ 包含所有游戏详情页: `/games/{slug}`

### 2. 更新游戏数据种子文件
- ✅ 更新: `seed-games.sql`
- ✅ 为每个游戏添加了 slug 字段
- ✅ Slug 格式: kebab-case (例如: `two-truths-and-a-lie`)

## 部署步骤

### 1. 重新运行数据库种子文件
在 Supabase SQL Editor 中执行:

```sql
-- 如果需要，先清空现有数据
TRUNCATE TABLE games CASCADE;

-- 然后运行更新后的 seed-games.sql 文件
```

### 2. 部署代码到 Vercel
```bash
git add .
git commit -m "Fix sitemap: use correct route structure and include game detail pages"
git push
```

### 3. 验证 Sitemap
部署完成后，访问以下 URL 验证:
- https://icebreakergames.site/sitemap.xml

应该看到:
- ✅ 主页: `https://icebreakergames.site`
- ✅ 游戏列表页: `https://icebreakergames.site/games`
- ✅ 15 个游戏详情页: `https://icebreakergames.site/games/{slug}`
- ✅ 隐私政策和服务条款页面

### 4. 测试脚本
运行测试脚本验证 sitemap:
```bash
node test-sitemap.js
```

## Sitemap 结构

新的 sitemap 包含以下页面:

| URL | Priority | Change Frequency |
|-----|----------|------------------|
| / | 1.0 | weekly |
| /games | 0.9 | daily |
| /games/{slug} | 0.8 | weekly |
| /privacy-policy | 0.5 | monthly |
| /tos | 0.5 | monthly |

## 游戏 Slug 列表

1. two-truths-and-a-lie
2. human-bingo
3. virtual-background-story
4. speed-networking
5. the-name-game
6. desert-island-scenario
7. one-word-check-in
8. find-your-match
9. show-and-tell
10. would-you-rather
11. emoji-introduction
12. common-ground
13. the-question-web
14. scavenger-hunt
15. appreciation-circle

## 注意事项

- Sitemap 会自动从数据库读取游戏数据
- 每小时重新验证一次 (revalidate: 3600)
- 如果数据库查询失败，会返回基本的 sitemap（只包含主页和游戏列表页）
- 确保数据库中的游戏都有有效的 slug 字段
