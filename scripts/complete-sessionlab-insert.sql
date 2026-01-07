-- Complete SessionLab Games Insert Script
-- Generated on 2026-01-07T02:13:55.741Z
-- Total games to insert: 25

-- Begin transaction
BEGIN;

-- Game 1: What Are You Bringing to the Meeting?
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('What Are You Bringing to the Meeting?', 
'一个正念签到活动，参与者写下担忧和能量水平，然后将其搁置以获得更好的专注力。帮助团队成员从之前的任务中转换过来，全身心投入到当前会议中。', 
'Team Building', 
'5-30 people', 
'5-10 minutes', 
'Easy', 
'纸和笔', 
'步骤1：要求参与者与自己进行内心对话
步骤2：写下担忧、能量水平和想法
步骤3：在会议期间将这些搁置一边
步骤4：如果感到舒适，分享他们的感受', 
'正念,签到,专注,心理重置,会议破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 2: Weather Check-in
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Weather Check-in', 
'使用天气隐喻分享感受，进行快速的团体情绪检查。这个简单而有效的活动特别适合远程团队，让每个人都能以安全的方式分享当前状态。', 
'Virtual Meeting', 
'5-25 people', 
'3-8 minutes', 
'Easy', 
'无需材料', 
'步骤1：要求每个人用天气描述当前感受
步骤2：例如：''大部分是晴天，但有雨云在聚集''
步骤3：快速轮流分享
步骤4：确认团体的整体''天气''', 
'签到,隐喻,快速,远程友好,会议破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 3: Have You Ever? (Stand Up If)
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Have You Ever? (Stand Up If)', 
'参与者对''你曾经...''问题回答是的话就站起来。这是一个有效的破冰游戏，帮助团体开始看到联系并以低压力的方式分享关于自己的信息。', 
'Team Building', 
'8-50 people', 
'5-10 minutes', 
'Easy', 
'无需材料', 
'步骤1：向团体提出''你曾经...''问题
步骤2：能回答是的参与者站起来
步骤3：站着的人可以提出下一个问题
步骤4：继续进行5-8个问题', 
'运动,连接,低压力,包容性,会议破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 4: 5-4-3-2-1 Grounding Technique
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('5-4-3-2-1 Grounding Technique', 
'正念练习，调动所有感官帮助参与者保持专注。通过要求参与者调动所有感官并深呼吸，可以帮助他们回到当下，控制焦虑和压力。', 
'Team Building', 
'5-30 people', 
'3-5 minutes', 
'Easy', 
'无需材料', 
'步骤1：说出5样你能看到的东西
步骤2：说出4样你能触摸的东西
步骤3：说出3样你能听到的东西
步骤4：说出2样你能闻到的东西
步骤5：说出1样你能尝到的东西', 
'正念,接地,当下,减压,会议破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 5: One Word at a Time
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('One Word at a Time', 
'团体通过每人贡献一个词来创建句子。这个简单而有效的活动可以轻松适应任何团体，鼓励创造力和协作思维。', 
'Team Building', 
'6-20 people', 
'3-8 minutes', 
'Easy', 
'无需材料', 
'步骤1：给出一个主题或起始词
步骤2：围成圆圈，每人添加一个词
步骤3：尝试创建一个完整的句子
步骤4：加快速度或增加挑战以增加趣味', 
'创意,协作,快速,适应性强,5分钟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 6: Count Up
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Count Up', 
'团体按顺序数数，不能重叠说话或建立模式。这个看似简单的挑战需要耐心、意识和团队合作，是建立专注力和连接的绝佳方式。', 
'Team Building', 
'8-25 people', 
'3-10 minutes', 
'Medium', 
'无需材料', 
'步骤1：设定目标数字（如20）
步骤2：从1开始数，不能重叠或形成模式
步骤3：如果两人同时说话，重新开始
步骤4：达到目标时庆祝', 
'专注,倾听,团队合作,耐心,5分钟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 7: Apple, Orange and Banana
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Apple, Orange and Banana', 
'基于叫出的水果名称进行移动的身体激励器。参与者根据不同的水果指令做出相应动作，帮助团体同步并完全到达一个空间。', 
'Team Building', 
'8-30 people', 
'3-8 minutes', 
'Easy', 
'开放空间', 
'步骤1：围成圆圈，手放在前面人的肩膀上
步骤2：苹果=向前移动，橙子=向后，香蕉=旋转
步骤3：叫出水果，团体响应
步骤4：用多个指令混合增加趣味', 
'身体,激励器,趣味,同步,5分钟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 8: Name Game
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Name Game', 
'通过在添加自己的名字之前重复之前的名字来学习名字。这是一个有效的破冰游戏，适用于人们不知道彼此名字的课程、工作坊或会议开始时使用。', 
'Team Building', 
'8-20 people', 
'5-10 minutes', 
'Easy', 
'无需材料', 
'步骤1：坐成圆圈，每个人都能看到其他人
步骤2：第一个人说出他们的名字
步骤3：下一个人重复第一个名字，然后添加自己的
步骤4：继续在圆圈中建立链条', 
'名字,记忆,介绍,圆圈,5分钟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 9: Line Up
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Line Up', 
'非语言挑战，按给定标准排列而不说话。这是一个快速的破冰游戏，玩家必须在没有任何讨论或语言提示的情况下形成有序的队列。', 
'Team Building', 
'10-40 people', 
'5-10 minutes', 
'Easy', 
'无需材料', 
'步骤1：宣布排序标准（身高、生日等）
步骤2：参与者不说话地排列自己
步骤3：检查最终顺序
步骤4：总结非语言沟通策略', 
'非语言,协作,解决问题,运动,5分钟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 10: Chat Waterfall
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Chat Waterfall', 
'每个人同时输入答案然后一起发送，创造''瀑布''效果。这是一个高能量的虚拟破冰游戏，让每个人立即参与，特别适合大型团体。', 
'Virtual Meeting', 
'5-50 people', 
'3-8 minutes', 
'Easy', 
'带聊天功能的视频会议', 
'步骤1：问一个问题，如''最喜欢的零食''
步骤2：每个人输入答案但不发送
步骤3：数到3，每个人同时发送
步骤4：享受回应的瀑布效果', 
'高能量,视觉,同步,聊天,虚拟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 11: Emoji Check-In
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Emoji Check-In', 
'参与者仅使用表情符号表达他们的心情或能量。这个破冰游戏为情感表达创造空间，而不会让任何人感到被关注。', 
'Virtual Meeting', 
'5-50 people', 
'3-5 minutes', 
'Easy', 
'带表情符号反应或聊天的视频平台', 
'步骤1：要求每个人为当前心情选择表情符号
步骤2：通过反应或聊天分享
步骤3：可选：简要解释表情符号选择
步骤4：确认团体的整体能量', 
'快速,情感,视觉,签到,虚拟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 12: Remote Change 3 Things
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Remote Change 3 Things', 
'一个人在关闭摄像头时改变外观/背景的3样东西。这个活动激发笑声并鼓励注意细节，同时打破虚拟会议的常规。', 
'Virtual Meeting', 
'5-20 people', 
'5-10 minutes', 
'Easy', 
'视频会议平台', 
'步骤1：一个参与者关闭摄像头
步骤2：他们改变3样小东西（眼镜、帽子、背景）
步骤3：重新打开摄像头
步骤4：其他人猜测改变了什么', 
'观察,有趣,注意力,互动,虚拟破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 13: Two Truths and One Lie
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Two Truths and One Lie', 
'经典游戏，参与者分享关于自己的两个真相和一个谎言。这个永恒的破冰游戏能够揭示关于同事的惊人事实，建立融洽关系和轻松幽默。', 
'Team Building', 
'4-30 people', 
'10-15 minutes', 
'Easy', 
'无需材料', 
'步骤1：每个人准备两个真相和一个谎言
步骤2：分享所有三个陈述
步骤3：团体投票哪个是谎言
步骤4：揭示答案并讨论有趣的真相', 
'经典,讲故事,猜测,个人化,相互了解', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 14: Diversity Bingo
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Diversity Bingo', 
'带有关于经验陈述的宾果卡 - 找到匹配每个方格的人。这是一个很好的破冰游戏，帮助参与者了解彼此并分享使他们与众不同的地方。', 
'Team Building', 
'12-50 people', 
'10-20 minutes', 
'Easy', 
'宾果卡，笔', 
'步骤1：创建带有经验陈述的3x3宾果卡
步骤2：混合寻找匹配陈述的人
步骤3：为匹配项获得签名
步骤4：分享有趣的发现', 
'多样性,混合器,发现,包容性,相互了解', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 15: Unique and Shared
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Unique and Shared', 
'小组发现每个成员的共同点和独特特征。这是一个强大的破冰游戏，特别适合分组使用，尤其是在较长项目或培训计划开始时。', 
'Team Building', 
'8-30 people', 
'15-20 minutes', 
'Easy', 
'纸，笔', 
'步骤1：组成4-5人的小组
步骤2：找到每个人都有的共同点
步骤3：识别每个人的独特特征
步骤4：与更大的团体分享发现', 
'共同点,独特性,小组,发现,相互了解', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 16: Speed Dating Icebreaker
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Speed Dating Icebreaker', 
'快速连续的短对话以最大化网络建设。这个破冰游戏的目标是在极短的时间内与尽可能多的人进行一系列非常快速的对话。', 
'Team Building', 
'10-40 people', 
'15-25 minutes', 
'Easy', 
'计时器，椅子', 
'步骤1：将椅子排成对
步骤2：为每次对话设置3分钟计时器
步骤3：专注于专业信息交换
步骤4：计时器响起时轮换伙伴', 
'网络建设,专业,轮换,高效,相互了解', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 17: Portrait Gallery
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Portrait Gallery', 
'团队通过每15秒轮换艺术家来为彼此创作快速肖像。这个创意活动产生精彩多样的图像，可以在完成后展示在会议室中。', 
'Team Building', 
'10-30 people', 
'10-15 minutes', 
'Easy', 
'绘画材料，纸张', 
'步骤1：分为A队（模特）和B队（艺术家）
步骤2：艺术家画15秒，然后轮换
步骤3：继续直到每个人都画了每个人
步骤4：展示协作肖像', 
'创意,艺术,协作,趣味,趣味破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 18: Minefield
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Minefield', 
'蒙眼参与者在队友声音引导下穿越障碍物。这个有趣的身体游戏可以帮助建立信任和更有效的团体沟通。', 
'Team Building', 
'8-20 people', 
'10-15 minutes', 
'Medium', 
'眼罩，软障碍物（书籍、靠垫、玩具）', 
'步骤1：在地板上设置无害障碍物
步骤2：参与者轮流被蒙眼
步骤3：队友引导他们通过路线
步骤4：总结沟通和信任', 
'信任,沟通,身体,团队合作,趣味破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 19: Crazy Handshake
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Crazy Handshake', 
'配对创建独特的握手并在轮换伙伴关系中教给其他人。这是一个轻松而难忘的游戏，配对必须创建新的有趣握手。', 
'Team Building', 
'8-30 people', 
'10-15 minutes', 
'Easy', 
'无需材料', 
'步骤1：配对介绍自己并创建握手
步骤2：分开并与新人配对
步骤3：教授原始握手并创建新的
步骤4：重复并分享所有学到的握手', 
'创意,身体,难忘,伙伴关系,趣味破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 20: The Movie Pitch Icebreaker
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('The Movie Pitch Icebreaker', 
'小组基于主题创建和推介原创电影创意。这是一个有趣、快节奏的活动，小组创建原创电影创意并向团体推介。', 
'Team Building', 
'8-30 people', 
'15-20 minutes', 
'Easy', 
'无需材料', 
'步骤1：组成小组并给出主题
步骤2：创建电影标题、情节和演员阵容
步骤3：向团体推介，就像向工作室销售一样
步骤4：可选：投票选出最佳推介', 
'创意,讲故事,演示,团队合作,趣味破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 21: Bang!
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Bang!', 
'快节奏的淘汰游戏，警长指向和快速反应。这是一个快节奏的破冰游戏，你必须有快速反应，否则你会被淘汰。', 
'Team Building', 
'8-25 people', 
'5-10 minutes', 
'Easy', 
'无需材料', 
'步骤1：围成圆圈站立，一个人作为警长在中间
步骤2：警长指向某人，那人必须快速蹲下
步骤3：两边的人必须快速''拔''武器
步骤4：最慢的人成为新警长', 
'激励器,反应,淘汰,趣味,趣味破冰', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 22: Group Map
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Group Map', 
'参与者根据成长地在想象的世界地图上定位自己。这是一个有趣、活跃的破冰游戏，让人们移动，同时也了解彼此。', 
'Team Building', 
'20-100+ people', 
'10-15 minutes', 
'Easy', 
'大型开放空间', 
'步骤1：将房间指定为世界地图
步骤2：参与者按出生地/家乡定位自己
步骤3：简要分享他们的位置
步骤4：可选：分享从那个地方学到的价值观', 
'地理,文化,运动,大规模,大型团体', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 23: Passions Tic Tac Toe
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Passions Tic Tac Toe', 
'用激情填充井字游戏网格，然后找到有匹配兴趣的其他人。这个破冰游戏的目标是帮助参与者在活动开始时了解彼此。', 
'Team Building', 
'15-100+ people', 
'15-20 minutes', 
'Easy', 
'3x3网格，笔', 
'步骤1：用个人激情填充3x3网格
步骤2：混合寻找有相同激情的其他人
步骤3：为匹配的方格获得签名
步骤4：第一个连成三个的人获胜', 
'激情,网络建设,竞争,发现,大型团体', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 24: Helium Stick
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Helium Stick', 
'团队必须在每个人保持手指接触的同时将棍子降到地面。这是一个看似简单的游戏，需要团队在保持同步的同时合作。', 
'Team Building', 
'8-20 people', 
'10-15 minutes', 
'Medium', 
'长轻质棍子或杆子', 
'步骤1：排成两排面对面
步骤2：将棍子放在每个人的食指上
步骤3：在不失去接触的情况下将棍子降到地面
步骤4：如果有人失去接触就重新开始', 
'协调,耐心,团队合作,挑战,团队合作提升', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Game 25: Desert Island
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Desert Island', 
'团体决定在荒岛上生存保留哪些物品。这是一个经典的团队建设练习，将解决问题和谈判技能付诸考验。', 
'Team Building', 
'6-30 people', 
'15-25 minutes', 
'Medium', 
'物品清单，纸张', 
'步骤1：提供可用物品清单
步骤2：团体必须同意保留有限数量
步骤3：讨论和协商优先级
步骤4：总结决策过程', 
'决策,谈判,优先级,讨论,团队合作提升', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Commit transaction
COMMIT;

-- Update statistics
SELECT 'SessionLab games inserted successfully!' as status, COUNT(*) as total_games FROM games WHERE source LIKE '%sessionlab%';
