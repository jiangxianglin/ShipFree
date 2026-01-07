-- Insert SessionLab categorized games into the database
-- This script adds the new games from SessionLab with Chinese descriptions

-- What Are You Bringing to the Meeting?
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Weather Check-in
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Have You Ever? (Stand Up If)
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- 5-4-3-2-1 Grounding Technique
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- One Word at a Time
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Count Up
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Chat Waterfall
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Emoji Check-In
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Portrait Gallery
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
'https://www.sessionlab.com/blog/icebreaker-games/');

-- Marshmallow Challenge (if not exists)
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Marshmallow Challenge', 
'使用意大利面、胶带、绳子建造最高的塔，顶部放棉花糖。这个著名的团队建设挑战练习原型制作和团队合作，经常产生意想不到的结果。', 
'Team Building', 
'8-40 people', 
'18-25 minutes', 
'Medium', 
'意大利面，胶带，绳子，棉花糖', 
'步骤1：组成4-5人的团队
步骤2：建造最高的自立结构
步骤3：棉花糖必须在顶部
步骤4：测量并庆祝最高的塔', 
'工程,协作,解决问题,竞争,团队合作提升', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO NOTHING;

-- Add more games as needed...
-- This is a sample of the key SessionLab games
-- The full script would include all 25+ new games from the merged collection