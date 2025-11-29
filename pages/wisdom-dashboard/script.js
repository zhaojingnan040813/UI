/**
 * 页面C：智能推荐大盘
 * Wisdom Dashboard Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // =====================================================
    // 数据定义
    // =====================================================
    const recipes = [
        {
            id: 1,
            name: '山药排骨汤',
            emoji: '🍲',
            nature: '温',
            flavors: ['甘'],
            meridians: ['脾', '肺', '肾'],
            match: 95,
            time: 60,
            difficulty: '简单',
            desc: '补脾养胃，��肺止咳，补肾固精',
            ingredients: [
                { name: '排骨', amount: '500g', icon: '🦴' },
                { name: '山药', amount: '300g', icon: '🥔' },
                { name: '枸杞', amount: '10g', icon: '🔴' },
                { name: '生姜', amount: '3片', icon: '🫚' },
                { name: '料酒', amount: '适量', icon: '🍶' }
            ],
            steps: [
                '排骨洗净，冷水下锅，加料酒焯水去腥',
                '山药去皮切滚刀块，泡入清水防止氧化',
                '砂锅加水，放入排骨和姜片，大火煮沸',
                '转小火炖煮40分钟',
                '加入山药，继续炖煮15分钟',
                '出锅前加入枸杞，调盐即可'
            ],
            analysis: '山药性平味甘，入脾、肺、肾三经，具有补脾养胃、生津益肺、补肾涩精的功效。配合排骨的温补之力，特别适合阳虚体质者在霜降时节食用，可温煦脾胃、固护阳气。'
        },
        {
            id: 2,
            name: '银耳莲子羹',
            emoji: '🥣',
            nature: '平',
            flavors: ['甘'],
            meridians: ['心', '脾', '肾'],
            match: 88,
            time: 45,
            difficulty: '简单',
            desc: '滋阴润肺，养心安神，健脾益肾',
            ingredients: [
                { name: '银耳', amount: '1朵', icon: '🍄' },
                { name: '莲子', amount: '30g', icon: '⚪' },
                { name: '红枣', amount: '6颗', icon: '🔴' },
                { name: '枸杞', amount: '10g', icon: '🔴' },
                { name: '冰糖', amount: '适量', icon: '🧊' }
            ],
            steps: [
                '银耳提前泡发2小时，去蒂撕成小朵',
                '莲子去芯，红枣洗净',
                '银耳放入锅中，加足量清水',
                '大火煮沸后转小火慢炖1小时',
                '加入莲子、红枣继续炖30分钟',
                '最后加入枸杞和冰糖，搅匀即可'
            ],
            analysis: '银耳性平味甘，滋阴润肺、养胃生津；莲子养心安神、益肾固精；红枣补中益气、养血安神。三者配伍，是秋冬季节滋阴润燥的上佳选择。'
        },
        {
            id: 3,
            name: '当归生姜羊肉汤',
            emoji: '🐑',
            nature: '热',
            flavors: ['甘', '辛'],
            meridians: ['脾', '肾'],
            match: 92,
            time: 90,
            difficulty: '中等',
            desc: '温中补虚，祛寒止痛，养血活血',
            ingredients: [
                { name: '羊肉', amount: '500g', icon: '🥩' },
                { name: '当归', amount: '15g', icon: '🌿' },
                { name: '生姜', amount: '30g', icon: '🫚' },
                { name: '料酒', amount: '适量', icon: '🍶' },
                { name: '盐', amount: '适量', icon: '🧂' }
            ],
            steps: [
                '羊肉洗净切块，冷水下锅焯水',
                '当归洗净，生姜切厚片',
                '砂锅加水，放入所有材料',
                '大火煮沸，撇去浮沫',
                '转小火炖煮1.5小时',
                '加盐调味即可'
            ],
            analysis: '此方出自《金匮要略》，当归补血活血，生姜温中散寒，羊肉温补脾肾。三者同用，温而不燥，补而不滞，是阳虚体质者冬季进补的经典良方。'
        },
        {
            id: 4,
            name: '红枣桂圆粥',
            emoji: '🥘',
            nature: '温',
            flavors: ['甘'],
            meridians: ['心', '脾'],
            match: 85,
            time: 40,
            difficulty: '简单',
            desc: '补血养心，健脾益气，安神定志',
            ingredients: [
                { name: '大米', amount: '100g', icon: '🍚' },
                { name: '红枣', amount: '8颗', icon: '🔴' },
                { name: '桂圆肉', amount: '20g', icon: '🟤' },
                { name: '红糖', amount: '适量', icon: '🟫' }
            ],
            steps: [
                '大米淘洗干净，浸泡30分钟',
                '红枣去核，桂圆肉洗净',
                '锅中加水，放入大米',
                '大火煮沸后转小火',
                '加入红枣和桂圆',
                '熬至粥稠，加红糖调味'
            ],
            analysis: '红枣补中益气、养血安神；桂圆肉补心脾、益气血。此粥特别适合气血不足、心脾两虚者，可改善面色萎黄、心悸失眠等症状。'
        },
        {
            id: 5,
            name: '百合雪梨汤',
            emoji: '🍐',
            nature: '凉',
            flavors: ['甘'],
            meridians: ['肺', '心'],
            match: 78,
            time: 30,
            difficulty: '简单',
            desc: '润肺止咳，清心安神，生津润燥',
            ingredients: [
                { name: '雪梨', amount: '2个', icon: '🍐' },
                { name: '百合', amount: '30g', icon: '🤍' },
                { name: '冰糖', amount: '适量', icon: '🧊' },
                { name: '枸杞', amount: '5g', icon: '🔴' }
            ],
            steps: [
                '雪梨去皮去核，切块',
                '百合洗净，泡发',
                '锅中加水，放入雪梨',
                '大火煮沸后加入百合',
                '转小火煮20分钟',
                '加入冰糖和枸杞即可'
            ],
            analysis: '雪梨清热润肺、生津止渴；百合润肺止咳、清心安神。此汤适合阴虚内热、肺燥咳嗽者，但阳虚体质者不宜多食。'
        },
        {
            id: 6,
            name: '黄芪党参鸡汤',
            emoji: '🐔',
            nature: '温',
            flavors: ['甘'],
            meridians: ['脾', '肺'],
            match: 90,
            time: 90,
            difficulty: '中等',
            desc: '补气健脾，益肺固表，增强免疫',
            ingredients: [
                { name: '土鸡', amount: '半只', icon: '🐔' },
                { name: '黄芪', amount: '20g', icon: '🌿' },
                { name: '党参', amount: '15g', icon: '🌿' },
                { name: '红枣', amount: '6颗', icon: '🔴' },
                { name: '枸杞', amount: '10g', icon: '🔴' }
            ],
            steps: [
                '鸡肉洗净斩块，焯水去血沫',
                '黄芪、党参洗净',
                '所有材料放入炖盅',
                '加入适量清水',
                '隔水炖煮2小时',
                '出锅前加盐调味'
            ],
            analysis: '黄芪补气固表、利水消肿；党参补中益气、健脾益肺。配合鸡肉的温补之力，可大补元气，特别适合气虚体质者和体弱多病者食用。'
        }
    ];

    const seasonalIngredients = [
        { name: '山药', icon: '🥔', nature: '平' },
        { name: '红枣', icon: '🔴', nature: '温' },
        { name: '桂圆', icon: '🟤', nature: '温' },
        { name: '银耳', icon: '🍄', nature: '平' },
        { name: '莲子', icon: '⚪', nature: '平' },
        { name: '百合', icon: '🤍', nature: '凉' },
        { name: '枸杞', icon: '🔴', nature: '平' },
        { name: '核桃', icon: '🥜', nature: '温' },
        { name: '栗子', icon: '🌰', nature: '温' }
    ];

    const healthTips = [
        {
            text: '"霜降时节，天气渐寒，宜早睡早起，避免熬夜损耗阳气。"',
            source: '《黄帝内经》'
        },
        {
            text: '"秋冬养阴，春夏养阳。顺应四时，方能养生。"',
            source: '《素问·四气调神大论》'
        },
        {
            text: '"饮食有节，起居有常，不妄作劳，故能形与神俱。"',
            source: '《黄帝内经》'
        }
    ];

    // =====================================================
    // 状态管理
    // =====================================================
    let userData = {
        constitution: { type: 'balanced', data: { name: '平和质' } },
        preferences: null
    };

    let currentFilter = 'recommended';
    let currentTipIndex = 0;

    // =====================================================
    // DOM 元素
    // =====================================================
    const recipeList = document.getElementById('recipeList');
    const ingredientGrid = document.getElementById('ingredientGrid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('searchInput');
    const recipeModal = document.getElementById('recipeModal');
    const closeModal = document.getElementById('closeModal');
    const tipCarousel = document.getElementById('tipCarousel');
    const tipDots = document.querySelectorAll('.tip-dots .dot');

    // =====================================================
    // 初始化
    // =====================================================
    function init() {
        loadUserData();
        updateStatusSummary();
        renderRecipes();
        renderIngredients();
        initTipCarousel();
        initEventListeners();
    }

    function loadUserData() {
        const saved = localStorage.getItem('dietarySageUser');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                if (data.constitution) userData.constitution = data.constitution;
                if (data.preferences) userData.preferences = data.preferences;
            } catch (e) {
                console.warn('Failed to load user data:', e);
            }
        }
    }

    function updateStatusSummary() {
        // 更新体质显示
        const constitutionIcon = document.getElementById('constitutionIcon');
        const constitutionName = document.getElementById('constitutionName');

        const icons = {
            'balanced': '☯', 'qi-deficiency': '☁', 'yang-deficiency': '❄',
            'yin-deficiency': '🔥', 'phlegm-dampness': '💧', 'damp-heat': '🌡',
            'blood-stasis': '🩸', 'qi-stagnation': '🌀', 'special': '🌸'
        };

        constitutionIcon.textContent = icons[userData.constitution.type] || '☯';
        constitutionName.textContent = userData.constitution.data?.name || '平和质';

        // 更新偏好摘要
        const preferenceSummary = document.getElementById('preferenceSummary');
        if (userData.preferences) {
            const spicyLevel = userData.preferences.flavors?.spicy || 2;
            const spicyLabels = ['不吃辣', '微辣', '适中', '重辣', '变态辣'];
            preferenceSummary.textContent = spicyLabels[spicyLevel] + '口味';
        }

        // 更新状态摘要
        const contextSummary = document.getElementById('contextSummary');
        if (userData.preferences?.context?.length > 0) {
            const contextLabels = {
                menstrual: '生理期', stayup: '熬夜', cold: '感冒',
                exercise: '运动后', hangover: '宿醉', pregnant: '孕期'
            };
            const activeContexts = userData.preferences.context
                .map(c => contextLabels[c])
                .filter(Boolean);
            contextSummary.textContent = activeContexts.join('、') || '正常';
        }

        // 更新 AI 洞察
        updateAIInsight();
    }

    function updateAIInsight() {
        const insightEl = document.getElementById('aiInsight');
        const constitutionName = userData.constitution.data?.name || '平和质';
        const solarTerm = '霜降';

        let recommendations = [];
        let warnings = [];

        // 根据体质生成建议
        switch (userData.constitution.type) {
            case 'yang-deficiency':
                recommendations = [
                    '温补脾肾，可多食羊肉、核桃、桂圆',
                    '驱寒暖身，推荐生姜红糖水、当归羊肉汤'
                ];
                warnings = ['生冷寒凉，如西瓜、苦瓜、绿豆等'];
                break;
            case 'yin-deficiency':
                recommendations = [
                    '滋阴润燥，可多食银耳、百合、雪梨',
                    '清热生津，推荐枸杞菊花茶'
                ];
                warnings = ['辛辣燥热，如辣椒、羊肉、油炸食品'];
                break;
            case 'qi-deficiency':
                recommendations = [
                    '补气健脾，可多食山药、红枣、黄芪',
                    '益气养血，推荐党参鸡汤'
                ];
                warnings = ['耗气食物，如萝卜、槟榔等'];
                break;
            default:
                recommendations = [
                    '温补脾胃，可多食山药、红枣、桂圆',
                    '润燥养阴，推荐银耳、百合、雪梨'
                ];
                warnings = ['生冷寒凉，少食西瓜、苦瓜等'];
        }

        insightEl.innerHTML = `
            <p class="insight-greeting">根据您的<strong>${constitutionName}</strong>体质，结合当前<strong>${solarTerm}</strong>节气，为您精选以下食养方案：</p>
            <ul class="insight-list">
                ${recommendations.map(r => `<li><span class="insight-tag warm">宜</span>${r}</li>`).join('')}
                ${warnings.map(w => `<li><span class="insight-tag cold">忌</span>${w}</li>`).join('')}
            </ul>
        `;
    }

    // =====================================================
    // 菜谱渲染
    // =====================================================
    function renderRecipes(filter = 'recommended', searchTerm = '') {
        // 移除骨架屏
        const skeleton = recipeList.querySelector('.loading-skeleton');
        if (skeleton) skeleton.remove();

        // 过滤菜谱
        let filteredRecipes = [...recipes];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredRecipes = filteredRecipes.filter(r =>
                r.name.toLowerCase().includes(term) ||
                r.desc.toLowerCase().includes(term) ||
                r.ingredients.some(i => i.name.toLowerCase().includes(term))
            );
        }

        switch (filter) {
            case 'warming':
                filteredRecipes = filteredRecipes.filter(r => r.nature === '温' || r.nature === '热');
                break;
            case 'cooling':
                filteredRecipes = filteredRecipes.filter(r => r.nature === '凉' || r.nature === '寒');
                break;
            case 'quick':
                filteredRecipes = filteredRecipes.filter(r => r.time <= 30);
                break;
        }

        // 根据体质调整匹配度
        filteredRecipes = filteredRecipes.map(r => {
            let adjustedMatch = r.match;

            // 阳虚体质偏好温热
            if (userData.constitution.type === 'yang-deficiency') {
                if (r.nature === '温' || r.nature === '热') adjustedMatch += 5;
                if (r.nature === '凉' || r.nature === '寒') adjustedMatch -= 15;
            }

            // 阴虚体质偏好凉润
            if (userData.constitution.type === 'yin-deficiency') {
                if (r.nature === '凉') adjustedMatch += 5;
                if (r.nature === '热') adjustedMatch -= 15;
            }

            return { ...r, adjustedMatch: Math.min(99, Math.max(60, adjustedMatch)) };
        });

        // 按匹配度排序
        filteredRecipes.sort((a, b) => b.adjustedMatch - a.adjustedMatch);

        // 渲染卡片
        recipeList.innerHTML = filteredRecipes.map((recipe, index) => `
            <article class="recipe-card" data-id="${recipe.id}" style="animation-delay: ${0.1 + index * 0.05}s">
                <div class="recipe-card-image">
                    ${recipe.emoji}
                    <span class="card-match-badge">${recipe.adjustedMatch}% 匹配</span>
                    <div class="card-nature-tags">
                        <span class="nature-tag ${recipe.nature === '温' || recipe.nature === '热' ? 'warm' : 'cool'}">${recipe.nature}性</span>
                        <span class="nature-tag">${recipe.flavors.join('/')}</span>
                    </div>
                </div>
                <div class="recipe-card-body">
                    <h3 class="recipe-card-title">${recipe.name}</h3>
                    <p class="recipe-card-desc">${recipe.desc}</p>
                    <div class="recipe-card-meta">
                        <span class="meta-item">⏱ ${recipe.time}分钟</span>
                        <span class="meta-item">📊 ${recipe.difficulty}</span>
                        <span class="meta-item">🫀 入${recipe.meridians.join('、')}</span>
                    </div>
                </div>
            </article>
        `).join('');

        // 绑定点击事件
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const recipe = recipes.find(r => r.id === id);
                if (recipe) openRecipeModal(recipe);
            });
        });
    }

    // =====================================================
    // 食材渲染
    // =====================================================
    function renderIngredients() {
        ingredientGrid.innerHTML = seasonalIngredients.map(ing => `
            <div class="ingredient-item" title="${ing.name} - ${ing.nature}性">
                <span class="ingredient-icon">${ing.icon}</span>
                <span class="ingredient-name">${ing.name}</span>
                <span class="ingredient-nature">${ing.nature}性</span>
            </div>
        `).join('');
    }

    // =====================================================
    // 养生贴士轮播
    // =====================================================
    function initTipCarousel() {
        // 渲染所有贴士
        tipCarousel.innerHTML = healthTips.map((tip, index) => `
            <div class="tip-item ${index === 0 ? 'active' : ''}">
                <p>${tip.text}</p>
                <span class="tip-source">— ${tip.source}</span>
            </div>
        `).join('');

        // 自动轮播
        setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % healthTips.length;
            updateTipCarousel();
        }, 8000);

        // 点击切换
        tipDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTipIndex = index;
                updateTipCarousel();
            });
        });
    }

    function updateTipCarousel() {
        document.querySelectorAll('.tip-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentTipIndex);
        });

        tipDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTipIndex);
        });
    }

    // =====================================================
    // 弹窗
    // =====================================================
    function openRecipeModal(recipe) {
        // 填充数据
        document.getElementById('modalTitle').textContent = recipe.name;
        document.getElementById('modalDesc').textContent = recipe.desc;
        document.getElementById('modalImage').innerHTML = `<div class="image-placeholder">${recipe.emoji}</div>`;
        document.getElementById('modalNature').textContent = `${recipe.nature}性`;
        document.getElementById('modalFlavor').textContent = recipe.flavors.join('/');
        document.getElementById('modalMeridian').textContent = `入${recipe.meridians.join('、')}`;

        // 匹配度
        const score = recipe.adjustedMatch || recipe.match;
        document.getElementById('modalScore').textContent = score;
        document.getElementById('modalMatchReason').textContent = getMatchReason(recipe);

        // 设置环形进度
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (score / 100) * circumference;
        document.getElementById('scoreCircle').style.strokeDashoffset = offset;

        // 食材列表
        document.getElementById('modalIngredients').innerHTML = recipe.ingredients.map(ing => `
            <span class="ingredient-tag">${ing.icon} ${ing.name} ${ing.amount}</span>
        `).join('');

        // 烹饪步骤
        document.getElementById('modalSteps').innerHTML = recipe.steps.map((step, index) => `
            <div class="step-item">
                <span class="step-number">${index + 1}</span>
                <span class="step-text">${step}</span>
            </div>
        `).join('');

        // 食养分析
        document.getElementById('modalAnalysis').innerHTML = `<p>${recipe.analysis}</p>`;

        // 显示弹窗
        recipeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function getMatchReason(recipe) {
        const constitution = userData.constitution.type;
        const nature = recipe.nature;

        if (constitution === 'yang-deficiency' && (nature === '温' || nature === '热')) {
            return '温补之品，非常适合您的阳虚体质';
        }
        if (constitution === 'yin-deficiency' && nature === '凉') {
            return '清润之品，适合您的阴虚体质';
        }
        if (constitution === 'qi-deficiency') {
            return '补气健脾，适合您的气虚体质';
        }
        return '性味平和，适合日常调养';
    }

    function closeRecipeModal() {
        recipeModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // =====================================================
    // 事件监听
    // =====================================================
    function initEventListeners() {
        // 筛选标签
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.dataset.filter;
                renderRecipes(currentFilter, searchInput.value);
            });
        });

        // 搜索
        searchInput.addEventListener('input', Utils.debounce(() => {
            renderRecipes(currentFilter, searchInput.value);
        }, 300));

        // 关闭弹窗
        closeModal.addEventListener('click', closeRecipeModal);
        recipeModal.addEventListener('click', (e) => {
            if (e.target === recipeModal) closeRecipeModal();
        });

        // ESC 关闭弹窗
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeRecipeModal();
        });

        // 刷新洞察
        document.getElementById('refreshInsight').addEventListener('click', () => {
            updateAIInsight();
            Toast.info('已为您更新食养建议');
        });

        // 收藏按钮
        document.getElementById('addToFavorite').addEventListener('click', () => {
            Toast.success('已添加到收藏');
        });

        // 开始烹饪
        document.getElementById('startCooking').addEventListener('click', () => {
            closeRecipeModal();
            Toast.info('烹饪模式即将推出，敬请期待！');
        });

        // 加载更多
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            Toast.info('更多菜谱正在筹备中...');
        });
    }

    // =====================================================
    // 启动
    // =====================================================
    init();
});
