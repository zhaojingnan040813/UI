/**
 * 页面B：味蕾与场景调优
 * Preference Tuner Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // =====================================================
    // 状态管理
    // =====================================================
    const preferences = {
        flavors: {
            sour: 2,
            sweet: 2,
            bitter: 2,
            spicy: 2,
            salty: 2
        },
        exclusions: [],
        context: [],
        scene: {
            meal: 'lunch',
            people: '1',
            time: 'normal'
        }
    };

    const flavorLabels = {
        sour: ['不喜欢', '微酸', '适中', '喜酸', '嗜酸'],
        sweet: ['不喜欢', '微甜', '适中', '喜甜', '嗜甜'],
        bitter: ['不喜欢', '微苦', '适中', '喜苦', '嗜苦'],
        spicy: ['不吃辣', '微辣', '中辣', '重辣', '变态辣'],
        salty: ['清淡', '微咸', '适中', '偏咸', '重口']
    };

    const contextMessages = {
        menstrual: { icon: '🌸', text: '已开启生理期模式，将为您过滤寒凉食物', type: 'warm' },
        stayup: { icon: '🌙', text: '熬夜模式已开启，将推荐滋阴润燥食材', type: 'cool' },
        cold: { icon: '🤧', text: '感冒模式已开启，将推荐温和易消化食物', type: 'warm' },
        exercise: { icon: '💪', text: '运动模式已开启，将推荐高蛋白食材', type: 'cool' },
        hangover: { icon: '🍺', text: '宿醉模式已开启，将推荐解酒护肝食材', type: 'cool' },
        pregnant: { icon: '🤰', text: '孕期模式已开启，将严格过滤禁忌食材', type: 'warm' }
    };

    // =====================================================
    // DOM 元素
    // =====================================================
    const flavorSliders = document.querySelectorAll('.flavor-slider');
    const exclusionTags = document.querySelectorAll('.exclusion-tag');
    const contextItems = document.querySelectorAll('.context-item');
    const sceneButtons = document.querySelectorAll('.scene-btn');
    const selectedTagsContainer = document.getElementById('selectedTags');
    const selectedExclusionsDiv = document.getElementById('selectedExclusions');
    const customExclusionInput = document.getElementById('customExclusion');
    const addCustomBtn = document.getElementById('addCustomBtn');
    const contextToast = document.getElementById('contextToast');
    const nextBtn = document.getElementById('nextBtn');

    // =====================================================
    // 初始化
    // =====================================================
    function init() {
        loadSavedPreferences();
        initFlavorSliders();
        initExclusionTags();
        initContextToggles();
        initSceneButtons();
        initCustomExclusion();
        updateUserConstitution();
    }

    function loadSavedPreferences() {
        const saved = localStorage.getItem('dietarySagePreferences');
        if (saved) {
            try {
                Object.assign(preferences, JSON.parse(saved));
                applyPreferences();
            } catch (e) {
                console.warn('Failed to load preferences:', e);
            }
        }
    }

    function applyPreferences() {
        // 应用五味设置
        Object.entries(preferences.flavors).forEach(([flavor, value]) => {
            const slider = document.querySelector(`.flavor-slider[data-flavor="${flavor}"] .flavor-range`);
            if (slider) {
                slider.value = value;
                updateFlavorDisplay(flavor, value);
            }
        });

        // 应用禁忌设置
        preferences.exclusions.forEach(item => {
            const tag = document.querySelector(`.exclusion-tag[data-item="${item}"]`);
            if (tag) tag.classList.add('selected');
        });
        updateSelectedExclusions();

        // 应用场景设置
        if (preferences.scene) {
            document.querySelectorAll('.scene-btn[data-scene]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.scene === preferences.scene.meal);
            });
            document.querySelectorAll('.scene-btn[data-people]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.people === preferences.scene.people);
            });
            document.querySelectorAll('.scene-btn[data-time]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.time === preferences.scene.time);
            });
        }
    }

    function savePreferences() {
        localStorage.setItem('dietarySagePreferences', JSON.stringify(preferences));
    }

    // =====================================================
    // 五味滑块
    // =====================================================
    function initFlavorSliders() {
        flavorSliders.forEach(slider => {
            const flavor = slider.dataset.flavor;
            const range = slider.querySelector('.flavor-range');
            const valueDisplay = slider.querySelector('.flavor-value');

            range.addEventListener('input', () => {
                const value = parseInt(range.value);
                preferences.flavors[flavor] = value;
                updateFlavorDisplay(flavor, value);
                savePreferences();
            });
        });
    }

    function updateFlavorDisplay(flavor, value) {
        const slider = document.querySelector(`.flavor-slider[data-flavor="${flavor}"]`);
        const valueDisplay = slider.querySelector('.flavor-value');
        const labels = flavorLabels[flavor];
        valueDisplay.textContent = labels[value];

        // 更新滑块颜色强度
        const range = slider.querySelector('.flavor-range');
        const percentage = (value / 4) * 100;
        range.style.background = `linear-gradient(90deg,
            var(--border) 0%,
            var(--primary-light) ${percentage / 2}%,
            var(--primary) ${percentage}%,
            var(--border) ${percentage}%)`;
    }

    // =====================================================
    // 禁忌标签
    // =====================================================
    function initExclusionTags() {
        exclusionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const item = tag.dataset.item;
                tag.classList.toggle('selected');

                if (tag.classList.contains('selected')) {
                    if (!preferences.exclusions.includes(item)) {
                        preferences.exclusions.push(item);
                    }
                } else {
                    preferences.exclusions = preferences.exclusions.filter(i => i !== item);
                }

                updateSelectedExclusions();
                savePreferences();
            });
        });
    }

    function updateSelectedExclusions() {
        selectedTagsContainer.innerHTML = '';

        if (preferences.exclusions.length > 0) {
            selectedExclusionsDiv.classList.add('has-items');

            preferences.exclusions.forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'selected-tag';

                const sourceTag = document.querySelector(`.exclusion-tag[data-item="${item}"]`);
                const icon = sourceTag ? sourceTag.querySelector('.tag-icon')?.textContent || '🚫' : '🚫';
                const name = sourceTag ? sourceTag.querySelector('span:not(.tag-icon)')?.textContent || item : item;

                tag.innerHTML = `
                    ${icon} ${name}
                    <span class="remove-btn" data-item="${item}">×</span>
                `;

                tag.querySelector('.remove-btn').addEventListener('click', () => {
                    removeExclusion(item);
                });

                selectedTagsContainer.appendChild(tag);
            });
        } else {
            selectedExclusionsDiv.classList.remove('has-items');
        }
    }

    function removeExclusion(item) {
        preferences.exclusions = preferences.exclusions.filter(i => i !== item);

        const tag = document.querySelector(`.exclusion-tag[data-item="${item}"]`);
        if (tag) tag.classList.remove('selected');

        updateSelectedExclusions();
        savePreferences();
    }

    // =====================================================
    // 自定义禁忌
    // =====================================================
    function initCustomExclusion() {
        addCustomBtn.addEventListener('click', addCustomExclusion);

        customExclusionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addCustomExclusion();
            }
        });
    }

    function addCustomExclusion() {
        const value = customExclusionInput.value.trim();
        if (value && !preferences.exclusions.includes(value)) {
            preferences.exclusions.push(value);
            updateSelectedExclusions();
            savePreferences();
            customExclusionInput.value = '';

            Toast.success(`已添加禁忌：${value}`);
        }
    }

    // =====================================================
    // 状态开关
    // =====================================================
    function initContextToggles() {
        contextItems.forEach(item => {
            const toggle = item.querySelector('.toggle');
            const context = item.dataset.context;

            toggle.addEventListener('click', () => {
                const isActive = toggle.dataset.active === 'true';
                toggle.dataset.active = (!isActive).toString();
                toggle.classList.toggle('active', !isActive);
                item.classList.toggle('active', !isActive);

                if (!isActive) {
                    if (!preferences.context.includes(context)) {
                        preferences.context.push(context);
                    }
                    showContextToast(context);
                } else {
                    preferences.context = preferences.context.filter(c => c !== context);
                }

                savePreferences();
            });
        });
    }

    function showContextToast(context) {
        const msg = contextMessages[context];
        if (!msg) return;

        contextToast.querySelector('.toast-icon').textContent = msg.icon;
        contextToast.querySelector('.toast-text').textContent = msg.text;
        contextToast.className = `context-toast show ${msg.type}`;

        setTimeout(() => {
            contextToast.classList.remove('show');
        }, 3000);
    }

    // =====================================================
    // 场景按钮
    // =====================================================
    function initSceneButtons() {
        // 用餐时段
        document.querySelectorAll('.scene-btn[data-scene]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.scene-btn[data-scene]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                preferences.scene.meal = btn.dataset.scene;
                savePreferences();
            });
        });

        // 用餐人数
        document.querySelectorAll('.scene-btn[data-people]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.scene-btn[data-people]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                preferences.scene.people = btn.dataset.people;
                savePreferences();
            });
        });

        // 烹饪时间
        document.querySelectorAll('.scene-btn[data-time]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.scene-btn[data-time]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                preferences.scene.time = btn.dataset.time;
                savePreferences();
            });
        });
    }

    // =====================================================
    // 用户体质显示
    // =====================================================
    function updateUserConstitution() {
        const saved = localStorage.getItem('dietarySageUser');
        if (saved) {
            try {
                const userData = JSON.parse(saved);
                if (userData.constitution) {
                    const constitutionEl = document.getElementById('userConstitution');
                    const nameEl = constitutionEl.querySelector('.constitution-name');
                    const iconEl = constitutionEl.querySelector('.constitution-icon');

                    nameEl.textContent = userData.constitution.data?.name || '平和质';

                    // 根据体质类型设置图标
                    const icons = {
                        'balanced': '☯',
                        'qi-deficiency': '☁',
                        'yang-deficiency': '❄',
                        'yin-deficiency': '🔥',
                        'phlegm-dampness': '💧',
                        'damp-heat': '🌡',
                        'blood-stasis': '🩸',
                        'qi-stagnation': '🌀',
                        'special': '🌸'
                    };
                    iconEl.textContent = icons[userData.constitution.type] || '☯';
                }
            } catch (e) {
                console.warn('Failed to load user constitution:', e);
            }
        }
    }

    // =====================================================
    // 下一步按钮
    // =====================================================
    nextBtn.addEventListener('click', () => {
        // 保存所有偏好设置
        savePreferences();

        // 合并用户数据
        const userData = JSON.parse(localStorage.getItem('dietarySageUser') || '{}');
        userData.preferences = preferences;
        localStorage.setItem('dietarySageUser', JSON.stringify(userData));

        // 跳转到推荐页面
        window.location.href = '../wisdom-dashboard/index.html';
    });

    // =====================================================
    // 页面动画
    // =====================================================
    function animateCards() {
        const cards = document.querySelectorAll('.pref-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }

    // 初始化
    init();
    animateCards();
});
