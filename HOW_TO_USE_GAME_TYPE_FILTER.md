# 🎮 如何使用 Game Type 筛选器

## 📍 位置

Game Type 筛选器位于首页的筛选工具栏中：

```
首页 (http://localhost:3000)
  ↓
"Find the Perfect Icebreaker, Energiser or Team-Building Game"
  ↓
第二个下拉菜单：Game Type
```

## 🎯 可用的选项

Game Type 下拉菜单包含以下选项：

1. **All Game Types** - 显示所有游戏
2. **Table Game** ⭐ - 桌游（包含 15 个圣诞桌游）
3. **Christmas Game** 🎄 - 圣诞主题游戏
4. **Icebreaker** - 破冰游戏
5. **Energizer** - 激活游戏
6. **Quick Start** - 快速开始游戏
7. **Conversation Starter** - 对话启动游戏
8. **Interactive** - 互动游戏
9. **Creative** - 创意游戏

## 🎄 筛选圣诞桌游

### 方法 1: 使用 "Table Game" 选项

1. 访问 http://localhost:3000
2. 找到筛选工具栏
3. 在 **"Game Type"** 下拉菜单中选择 **"Table Game"**
4. 点击 **"Search Activities"**
5. 应该看到 15 个圣诞桌游

### 方法 2: 使用 "Christmas Game" 选项

目前数据库中的圣诞游戏都设置为 "Table Game"，所以选择 "Christmas Game" 不会显示结果。

如果你想让这些游戏也能通过 "Christmas Game" 筛选，我可以帮你更新数据库。

## 🔍 如果看不到 Game Type 选项

### 步骤 1: 清除浏览器缓存

**Chrome/Edge**:
1. 按 `Ctrl + Shift + Delete`
2. 选择"缓存的图片和文件"
3. 点击"清除数据"

**或者使用硬刷新**:
- Windows: `Ctrl + F5` 或 `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### 步骤 2: 检查开发服务器

确保开发服务器正在运行：
```bash
# 应该看到
✓ Starting...
✓ Ready in XXXms
```

访问: http://localhost:3000

### 步骤 3: 检查页面布局

筛选工具栏应该有 4 列：

```
┌─────────────────────────────────────────────────────────────┐
│  Activity Type  │  Game Type  │  Time  │  Difficulty       │
└─────────────────────────────────────────────────────────────┘
```

如果只看到 3 列，说明代码没有更新。

## 📸 预期效果

### 筛选前
- 工具栏显示 4 个下拉菜单
- Game Type 默认显示 "All game types"

### 选择 "Table Game" 后
- 点击 "Search Activities"
- 显示 "Found 15 games matching your criteria"
- 显示 15 个圣诞桌游卡片

### 游戏列表应包含
1. Holiday Fortunes
2. Christmas Roll & Poll
3. Two Truths and a Tinsel
4. Share a Favorite Holiday Memory
5. The Great Christmas Candy Pass
6. Message Under a Plate
7. Christmas Connection
8. Around the World Traditions
9. Holiday Bingo
10. What's on Your Phone? Christmas Edition
11. Christmas Pick a Side
12. Ornament Guess
13. Topics Tables
14. Guess the Gift by Sound
15. Photo Booth Prompt Jar

## 🔧 故障排除

### 问题 1: 看不到 Game Type 下拉菜单

**可能原因**:
- 浏览器缓存了旧版本
- 开发服务器没有重新编译

**解决方案**:
1. 硬刷新页面 (`Ctrl + F5`)
2. 清除浏览器缓存
3. 重启开发服务器

### 问题 2: 选择 "Table Game" 没有结果

**可能原因**:
- 数据库连接问题
- 游戏数据未正确设置

**解决方案**:
```bash
# 重新运行设置脚本
npm run db:setup-game-types

# 检查数据库
npx tsx scripts/check-existing-games.ts
```

### 问题 3: 选择 "Christmas Game" 没有结果

**说明**: 这是正常的！

当前所有圣诞桌游的 `type` 字段都设置为 "Table Game"。

如果你想让它们也能通过 "Christmas Game" 筛选，需要：
1. 将游戏的 type 改为 "Christmas Game"
2. 或者为游戏添加多个 type 标签（需要修改数据结构）

## 💡 建议

### 当前设计
- 圣诞桌游 → 使用 "Table Game" 筛选
- 其他圣诞游戏 → 使用 "Christmas Game" 筛选

### 如果你想改变
我可以帮你：
1. 将所有圣诞桌游改为 "Christmas Game"
2. 添加一个专门的 "Christmas Table Game" 选项
3. 支持多标签筛选（游戏可以同时是 Table Game 和 Christmas Game）

## 🎯 快速测试

打开浏览器控制台（F12），运行：

```javascript
// 检查筛选器是否存在
document.querySelector('[value="Table Game"]')
// 应该返回一个元素

// 检查所有 Game Type 选项
Array.from(document.querySelectorAll('select option')).map(o => o.textContent)
// 应该包含 "Table Game", "Christmas Game" 等
```

## 📞 需要帮助？

如果还是看不到 Game Type 选项：

1. 截图发给我，显示筛选工具栏
2. 打开浏览器控制台（F12），查看是否有错误
3. 告诉我你看到了几个下拉菜单（应该是 4 个）

---

**当前状态**: 
- ✅ 代码已更新
- ✅ 数据库已设置
- ✅ 开发服务器运行在 http://localhost:3000
- ⏳ 等待浏览器刷新
