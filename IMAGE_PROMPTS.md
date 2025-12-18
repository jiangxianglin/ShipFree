# 网站插图提示词 (Image Prompts)

该文档包含了为 "Virtual Background Story" 页面生成插图的提示词。

为了确保新生成的图片与现有的 `Two Truths and a Lie` 图片风格一致，请遵循以下步骤：

1.  **获取风格参考**：在 Midjourney 中使用 `/describe` 命令上传现有的 `Two-Truths-and-a-Lie.png` 图片，获取其风格描述关键词（例如：`flat vector illustration`, `corporate memphis`, `vibrant colors`, `minimalist` 等）。
2.  **组合提示词**：将下方的 **[画面描述]** 与你获取的 **[风格后缀]** 组合使用。

---

## 游戏：Virtual Background Story (虚拟背景故事)

此游戏的核心是：在线会议中，参与者通过选择有趣的虚拟背景来分享背后的故事。

### 图片 1：游戏概念 (Hero Image)
**用途**：展示游戏的核心场景——视频会议中的多样化背景。
**画面描述**：
> A flat vector illustration of a video conference screen on a laptop. The screen shows a grid of 4 participants. Each participant has a distinct and creative virtual background: one is in outer space, one is on a tropical beach, one is in a cozy library, and one is in front of a famous landmark (like the Eiffel Tower). The participants are diverse and smiling. The atmosphere is fun and engaging.
**建议宽高比**：`--ar 16:9`

### 图片 2：准备阶段 (Setup/Action)
**用途**：展示参与者选择背景的过程。
**画面描述**：
> A flat vector illustration focusing on a single user sitting in front of a computer. The user is looking at a floating UI menu on the screen labeled "Choose Background". The menu displays various colorful icons or thumbnails representing different themes (nature, city, fantasy, abstract). The user looks excited to pick one. Simple, clean composition.
**建议宽高比**：`--ar 16:9` (或与原图一致)

### 图片 3：互动与分享 (Interaction)
**用途**：展示分享故事和听众反应的社交时刻。
**画面描述**：
> A flat vector illustration of the video call interface. One participant is highlighted or slightly larger, gesturing as if telling a story. Their background is an interesting travel photo. The other participants in the grid are listening attentively and laughing. Floating reaction emojis (hearts, thumbs up, laughing faces) are popping up on the screen, indicating positive feedback and connection.
**建议宽高比**：`--ar 16:9` (或与原图一致)

---

## 通用风格后缀 (参考)

如果你无法获取原图的具体风格，可以尝试添加以下通用的现代 SaaS 插图风格后缀：

> **Style Suffix**: flat vector illustration, modern corporate memphis style, vibrant and playful colors, clean lines, minimalism, tech-friendly, high quality, white background --no photorealistic, detailed shading
