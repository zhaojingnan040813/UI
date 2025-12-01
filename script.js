/**
 * 中医九种体质调理系统 - 首页脚本
 */

document.addEventListener('DOMContentLoaded', function () {
    initSolarTerm();
    initQuickSelectModal();
    initConstitutionCards();
    initConstitutionWheel();
    initCTAButtons();
});

// 九种体质数据
const constitutionData = {
    'balanced': {
        name: '平和质',
        icon: '☯',
        color: '#2E8B57',
        description: '阴阳调和，气血充盈',
        traits: ['精力充沛', '睡眠良好', '性格开朗']
    },
    'qi-deficiency': {
        name: '气虚质',
        icon: '☁',
        color: '#87CEEB',
        description: '元气不足，疲乏气短',
        traits: ['容易疲劳', '气短懒言', '易出汗']
    },
    'yang-deficiency': {
        name: '阳虚质',
        icon: '❄',
        color: '#4169E1',
        description: '阳气不足，畏寒怕冷',
        traits: ['手脚冰凉', '喜热饮食', '精神不振']
    },
    'yin-deficiency': {
        name: '阴虚质',
        icon: '🔥',
        color: '#DC143C',
        description: '阴液亏少，虚热内生',
        traits: ['口燥咽干', '手足心热', '睡眠不佳']
    },
    'phlegm-dampness': {
        name: '痰湿质',
        icon: '💧',
        color: '#D2691E',
        description: '痰湿凝聚，形体肥胖',
        traits: ['体形偏胖', '口黏腻', '痰多']
    },
    'damp-heat': {
        name: '湿热质',
        icon: '🌡',
        color: '#FF8C00',
        description: '湿热内蕴，面垢油光',
        traits: ['面部油腻', '口苦口臭', '易生痤疮']
    },
    'blood-stasis': {
        name: '血瘀质',
        icon: '🩸',
        color: '#800080',
        description: '血行不畅，肤色晦暗',
        traits: ['肤色偏暗', '易生斑点', '唇色暗紫']
    },
    'qi-stagnation': {
        name: '气郁质',
        icon: '🌀',
        color: '#2F4F4F',
        description: '气机郁滞，情绪敏感',
        traits: ['情绪波动', '多愁善感', '胸闷不舒']
    },
    'special': {
        name: '特禀质',
        icon: '🌸',
        color: '#FF69B4',
        description: '先天特殊，易过敏',
        traits: ['易过敏', '遗传性', '适应力差']
    }
};

// 节气数据
const solarTerms = [
    { name: '立春', advice: '宜养肝', date: [2, 4] },
    { name: '雨水', advice: '宜健脾', date: [2, 19] },
    { name: '惊蛰', advice: '宜清肝', date: [3, 6] },
    { name: '春分', advice: '宜平衡', date: [3, 21] },
    { name: '清明', advice: '宜养肝', date: [4, 5] },
    { name: '谷雨', advice: '宜祛湿', date: [4, 20] },
    { name: '立夏', advice: '宜养心', date: [5, 6] },
    { name: '小满', advice: '宜清热', date: [5, 21] },
    { name: '芒种', advice: '宜清补', date: [6, 6] },
    { name: '夏至', advice: '宜养阳', date: [6, 21] },
    { name: '小暑', advice: '宜消暑', date: [7, 7] },
    { name: '大暑', advice: '宜清热', date: [7, 23] },
    { name: '立秋', advice: '宜润肺', date: [8, 8] },
    { name: '处暑', advice: '宜养阴', date: [8, 23] },
    { name: '白露', advice: '宜润燥', date: [9, 8] },
    { name: '秋分', advice: '宜平衡', date: [9, 23] },
    { name: '寒露', advice: '宜养阴', date: [10, 8] },
    { name: '霜降', advice: '宜温补', date: [10, 24] },
    { name: '立冬', advice: '宜温补', date: [11, 8] },
    { name: '小雪', advice: '宜藏精', date: [11, 22] },
    { name: '大雪', advice: '宜温补', date: [12, 7] },
    { name: '冬至', advice: '宜滋补', date: [12, 22] },
    { name: '小寒', advice: '宜温阳', date: [1, 6] },
    { name: '大寒', advice: '宜散寒', date: [1, 20] }
];

/**
 * 初始化节气显示
 */
function initSolarTerm() {
    const solarTermText = document.getElementById('solarTermText');
    if (!solarTermText) return;

    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let currentTerm = solarTerms[solarTerms.length - 1];

    for (let i = 0; i < solarTerms.length; i++) {
        const term = solarTerms[i];
        const [termMonth, termDay] = term.date;

        if (month < termMonth || (month === termMonth && day < termDay)) {
            currentTerm = i > 0 ? solarTerms[i - 1] : solarTerms[solarTerms.length - 1];
            break;
        }
        currentTerm = term;
    }

    solarTermText.textContent = `${currentTerm.name} · ${currentTerm.advice}`;
}

/**
 * 初始化快速选择弹窗
 */
function initQuickSelectModal() {
    const modal = document.getElementById('quickSelectModal');
    const quickSelectBtn = document.getElementById('quickSelectBtn');
    const closeBtn = document.getElementById('closeQuickSelect');
    const selectItems = document.querySelectorAll('.quick-select-item');

    if (!modal || !quickSelectBtn) return;

    quickSelectBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    selectItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            selectConstitution(type);
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * 选择体质
 */
function selectConstitution(type) {
    const data = constitutionData[type];
    if (!data) return;

    localStorage.setItem('userConstitution', JSON.stringify({
        type: type,
        name: data.name,
        selectedAt: new Date().toISOString()
    }));

    showToast(`已选择 ${data.name}，正在跳转...`);

    setTimeout(() => {
        window.location.href = './pages/health-plan/index.html';
    }, 1000);
}

/**
 * 初始化体质卡片
 */
function initConstitutionCards() {
    const cards = document.querySelectorAll('.constitution-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            window.location.href = `./pages/constitution-detail/index.html?type=${type}`;
        });

        card.addEventListener('mouseenter', () => {
            const type = card.dataset.type;
            const data = constitutionData[type];
            if (data) {
                card.style.setProperty('--card-accent', data.color);
            }
        });
    });
}

/**
 * 初始化体质轮盘
 */
function initConstitutionWheel() {
    const nodes = document.querySelectorAll('.constitution-node');

    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = node.dataset.type;
            window.location.href = `./pages/constitution-detail/index.html?type=${type}`;
        });

        node.addEventListener('mouseenter', () => {
            const type = node.dataset.type;
            const data = constitutionData[type];
            if (data) {
                node.style.borderColor = data.color;
                node.style.boxShadow = `0 4px 20px ${data.color}40`;
            }
        });

        node.addEventListener('mouseleave', () => {
            node.style.borderColor = '';
            node.style.boxShadow = '';
        });
    });
}

/**
 * 初始化CTA按钮
 */
function initCTAButtons() {
    const startAssessBtn = document.getElementById('startAssessBtn');
    const ctaStartBtn = document.getElementById('ctaStartBtn');

    const handleStartAssess = () => {
        window.location.href = './pages/assessment/index.html';
    };

    if (startAssessBtn) {
        startAssessBtn.addEventListener('click', handleStartAssess);
    }

    if (ctaStartBtn) {
        ctaStartBtn.addEventListener('click', handleStartAssess);
    }
}

/**
 * 显示提示
 */
function showToast(message, duration = 2000) {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

/**
 * 存储工具
 */
const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }
};

window.TCM = {
    constitutionData,
    solarTerms,
    selectConstitution,
    showToast,
    storage
};
