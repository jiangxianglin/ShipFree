# 手动数据收集操作指南

## ⚠️ 重要说明

这是一个**人工手动任务**。AI助手无法访问外部网站，因此需要人工完成以下步骤。

## 📋 任务概述

从8个URL资源中收集破冰游戏数据，目标是找到**至少10-20个新游戏**（不与现有15个游戏重复）。

## 🔗 8个数据源URL

1. https://www.sessionlab.com/blog/icebreaker-games/
2. https://teambuilding.com/blog/icebreaker-games
3. https://sapro.moderncampus.com/blog/60-awesome-icebreakers-for-orientation-and-beyond
4. https://www.playmeo.com/activities/?type=ice-breakers-get-to-know-you-games
5. https://www.digiformag.com/en/the-top-8-engaging-ice-breaking-exercises-for-professional-trainers/
6. https://www.figma.com/resource-library/icebreaker-ideas/
7. https://www.maryville.edu/cse/wp-content/uploads/sites/62/2016/09/Icebreakers-Team-Builders.pdf
8. https://livestorm.co/ice-breaker-games

## 📝 操作步骤

### 第1步：准备工作
1. 打开 `ShipFree/data/raw-games-collection.json` 文件
2. 打开 `ShipFree/data/game-template.json` 查看数据格式
3. 打开 `ShipFree/data/COLLECTION_GUIDE.md` 了解详细要求
4. 查看现有的15个游戏（在 `ShipFree/src/db/seed/games-supabase.ts`），避免重复

### 第2步：访问每个URL
逐个访问上面列出的8个URL，浏览游戏列表。

### 第3步：选择游戏
对于每个网站上的游戏，检查：
- ✅ 是否与现有15个游戏不同？
- ✅ 是否有足够的信息（标题、描述、玩法）？
- ✅ 是否适合我们的6个类别之一？

### 第4步：提取信息
对于每个选中的游戏，提取以下信息：

**必填字段：**
- `title`: 游戏名称
- `description`: 游戏描述（至少20个字符）
- `category`: 六个类别之一
  - Team Building
  - Virtual Meeting
  - Classroom
  - Training
  - Conference
  - Social Event
- `tags`: 至少1个标签（数组格式）

**推荐字段：**
- `players`: 参与人数（如 "5-20 people"）
- `duration`: 时长（如 "15-20 minutes"）
- `difficulty`: Easy / Medium / Hard
- `materials`: 所需材料
- `steps`: 步骤说明（用 \n 分隔）

**追踪字段：**
- `source`: 记录来源URL

### 第5步：格式化数据
按照以下JSON格式添加到 `raw-games-collection.json` 的 `games` 数组中：

```json
{
  "title": "Game Name",
  "description": "Detailed description of the game...",
  "category": "Team Building",
  "players": "5-20 people",
  "duration": "15-20 minutes",
  "difficulty": "Easy",
  "materials": "None required",
  "steps": "Step 1: Do this\nStep 2: Do that\nStep 3: Continue...",
  "tags": ["tag1", "tag2", "tag3"],
  "source": "https://example.com/..."
}
```

### 第6步：验证数据
每添加一个游戏后，检查：
- [ ] JSON语法正确（逗号、引号、括号）
- [ ] 所有必填字段都有值
- [ ] category是6个有效值之一
- [ ] tags至少有1个
- [ ] description至少20个字符

## 🎯 目标

- **最少收集**: 10个新游戏
- **理想收集**: 15-20个新游戏
- **质量优先**: 宁可少而精，不要多而差

## ✅ 现有的15个游戏（避免重复）

1. Two Truths and a Lie
2. Human Bingo
3. Virtual Background Story
4. Speed Networking
5. The Name Game
6. Desert Island Scenario
7. One Word Check-In
8. Find Your Match
9. Show and Tell
10. Would You Rather
11. Emoji Introduction
12. Common Ground
13. The Question Web
14. Scavenger Hunt
15. Appreciation Circle

## 📊 类别分配建议

尽量平衡各个类别的游戏数量：
- Team Building: 多收集一些（最受欢迎）
- Virtual Meeting: 重要（远程工作趋势）
- Classroom: 教育场景
- Training: 企业培训
- Conference: 大型活动
- Social Event: 社交场合

## 💡 提示

1. **避免过于复杂的游戏**：选择容易理解和执行的
2. **注意版权**：改写描述，不要直接复制
3. **保持一致性**：使用相似的语言风格和格式
4. **标签要具体**：如 "virtual-friendly", "no-prep", "active" 等
5. **步骤要清晰**：用简单的英语写明每个步骤

## 🔄 完成后

当你完成数据收集后：
1. 保存 `raw-games-collection.json` 文件
2. 确认JSON格式有效（可以用JSON验证工具）
3. 通知AI助手继续下一个任务（任务6：创建数据处理脚本）

## ❓ 常见问题

**Q: 如果一个游戏不确定属于哪个类别？**
A: 选择最主要的使用场景。如果实在不确定，选择 "Team Building"（最通用）。

**Q: 如果游戏信息不完整怎么办？**
A: 尽量补充。如果实在缺少关键信息，跳过这个游戏。

**Q: 需要翻译吗？**
A: 不需要。所有内容用英文即可。

**Q: 如何判断是否重复？**
A: 主要看游戏的核心玩法。名字不同但玩法相似的算重复。

---

**预计时间**: 2-3小时（取决于你的熟悉程度）

**开始时间**: ___________
**完成时间**: ___________
**收集游戏数量**: ___________
