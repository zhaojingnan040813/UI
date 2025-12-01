/**
 * 中医九种体质调理系统 - 通用工具函数
 */

// 九种体质数据
const CONSTITUTION_DATA = {
    'balanced': {
        id: 'balanced',
        name: '平和质',
        icon: '☯',
        color: '#2E8B57',
        lightColor: '#2E8B5720',
        description: '阴阳调和，气血充盈',
        fullDescription: '平和质是最理想的体质状态，阴阳气血调和，脏腑功能正常，是健康的标志。',
        traits: ['精力充沛', '睡眠良好', '性格开朗', '面色红润', '目光有神'],
        causes: ['先天禀赋良好', '后天调养得当', '生活规律', '心态平和'],
        diet: {
            suitable: ['五谷杂粮', '新鲜蔬果', '适量肉类', '清淡饮食'],
            avoid: ['过度进补', '偏食挑食', '暴饮暴食']
        },
        lifestyle: ['规律作息', '适度运动', '保持心情愉悦', '定期体检'],
        proportion: 32.75
    },
    'qi-deficiency': {
        id: 'qi-deficiency',
        name: '气虚质',
        icon: '☁',
        color: '#87CEEB',
        lightColor: '#87CEEB20',
        description: '元气不足，疲乏气短',
        fullDescription: '气虚质是指元气不足，以疲乏、气短、自汗等气虚表现为主要特征的体质状态。',
        traits: ['容易疲劳', '气短懒言', '易出汗', '声音低弱', '易感冒'],
        causes: ['先天不足', '久病体虚', '过度劳累', '年老体衰', '饮食不节'],
        diet: {
            suitable: ['黄芪', '党参', '山药', '大枣', '鸡肉', '牛肉', '糯米'],
            avoid: ['生冷食物', '油腻食物', '萝卜', '空心菜']
        },
        lifestyle: ['避免过度劳累', '适当运动', '充足睡眠', '避免汗出当风'],
        proportion: 12.71
    },
    'yang-deficiency': {
        id: 'yang-deficiency',
        name: '阳虚质',
        icon: '❄',
        color: '#4169E1',
        lightColor: '#4169E120',
        description: '阳气不足，畏寒怕冷',
        fullDescription: '阳虚质是指阳气不足，以畏寒怕冷、手足不温等虚寒表现为主要特征的体质状态。',
        traits: ['手脚冰凉', '喜热饮食', '精神不振', '大便溏薄', '小便清长'],
        causes: ['先天不足', '久病损阳', '过食寒凉', '年老阳衰', '房劳过度'],
        diet: {
            suitable: ['羊肉', '韭菜', '生姜', '桂圆', '核桃', '虾', '胡椒'],
            avoid: ['冷饮', '西瓜', '梨', '苦瓜', '绿豆', '螃蟹']
        },
        lifestyle: ['注意保暖', '温水泡脚', '艾灸保健', '适当日光浴', '避免熬夜'],
        proportion: 9.04
    },
    'yin-deficiency': {
        id: 'yin-deficiency',
        name: '阴虚质',
        icon: '🔥',
        color: '#DC143C',
        lightColor: '#DC143C20',
        description: '阴液亏少，虚热内生',
        fullDescription: '阴虚质是指体内阴液亏少，以口燥咽干、手足心热等虚热表现为主要特征的体质状态。',
        traits: ['口燥咽干', '手足心热', '睡眠不佳', '大便干燥', '潮热盗汗'],
        causes: ['先天不足', '久病伤阴', '房事过度', '过食辛辣', '情志内伤'],
        diet: {
            suitable: ['银耳', '百合', '枸杞', '鸭肉', '甲鱼', '蜂蜜', '梨'],
            avoid: ['辛辣食物', '羊肉', '韭菜', '葱姜', '烧烤', '煎炸']
        },
        lifestyle: ['避免熬夜', '节制房事', '情绪平和', '避免剧烈运动', '午休养神'],
        proportion: 8.89
    },
    'phlegm-dampness': {
        id: 'phlegm-dampness',
        name: '痰湿质',
        icon: '💧',
        color: '#D2691E',
        lightColor: '#D2691E20',
        description: '痰湿凝聚，形体肥胖',
        fullDescription: '痰湿质是指痰湿凝聚，以形体肥胖、腹部肥满、口黏苔腻等为主要特征的体质状态。',
        traits: ['体形偏胖', '口黏腻', '痰多', '胸闷', '面部油腻'],
        causes: ['过食肥甘', '缺乏运动', '脾胃虚弱', '环境潮湿', '先天禀赋'],
        diet: {
            suitable: ['薏米', '冬瓜', '赤小豆', '白萝卜', '海带', '陈皮'],
            avoid: ['肥肉', '甜食', '油炸', '奶油', '冷饮', '糯米']
        },
        lifestyle: ['坚持运动', '控制饮食', '避免久坐', '保持干燥', '规律作息'],
        proportion: 9.03
    },
    'damp-heat': {
        id: 'damp-heat',
        name: '湿热质',
        icon: '🌡',
        color: '#FF8C00',
        lightColor: '#FF8C0020',
        description: '湿热内蕴，面垢油光',
        fullDescription: '湿热质是指湿热内蕴，以面垢油光、口苦、苔黄腻等湿热表现为主要特征的体质状态。',
        traits: ['面部油腻', '口苦口臭', '易生痤疮', '大便黏滞', '小便短黄'],
        causes: ['过食辛辣', '嗜酒过度', '久居湿地', '滥用补品', '情志不畅'],
        diet: {
            suitable: ['绿豆', '苦瓜', '冬瓜', '黄瓜', '薏米', '茯苓'],
            avoid: ['辛辣食物', '油腻食物', '甜食', '烟酒', '羊肉', '韭菜']
        },
        lifestyle: ['保持清洁', '清淡饮食', '规律运动', '戒烟限酒', '情绪稳定'],
        proportion: 9.88
    },
    'blood-stasis': {
        id: 'blood-stasis',
        name: '血瘀质',
        icon: '🩸',
        color: '#800080',
        lightColor: '#80008020',
        description: '血行不畅，肤色晦暗',
        fullDescription: '血瘀质是指血行不畅，以肤色晦暗、舌质紫暗等血瘀表现为主要特征的体质状态。',
        traits: ['肤色偏暗', '易生斑点', '唇色暗紫', '健忘', '口唇紫暗'],
        causes: ['气滞血瘀', '寒凝血脉', '外伤久病', '情志抑郁', '久坐不动'],
        diet: {
            suitable: ['山楂', '黑木耳', '玫瑰花', '红糖', '醋', '桃仁'],
            avoid: ['高脂食物', '油炸食品', '冷冻食品', '肥肉']
        },
        lifestyle: ['多做运动', '保持心情舒畅', '避免久坐', '热水泡脚', '按摩活血'],
        proportion: 7.95
    },
    'qi-stagnation': {
        id: 'qi-stagnation',
        name: '气郁质',
        icon: '🌀',
        color: '#2F4F4F',
        lightColor: '#2F4F4F20',
        description: '气机郁滞，情绪敏感',
        fullDescription: '气郁质是指长期情志不畅、气机郁滞，以神情抑郁、忧虑脆弱等为主要特征的体质状态。',
        traits: ['情绪波动', '多愁善感', '胸闷不舒', '易叹气', '咽有异物感'],
        causes: ['长期压力', '情志不遂', '性格内向', '重大打击', '肝气不舒'],
        diet: {
            suitable: ['玫瑰花', '佛手', '香橼', '金橘', '萝卜', '麦芽'],
            avoid: ['咖啡', '浓茶', '酒精', '辛辣刺激']
        },
        lifestyle: ['多与人交流', '培养兴趣爱好', '户外运动', '学会放松', '规律作息'],
        proportion: 8.73
    },
    'special': {
        id: 'special',
        name: '特禀质',
        icon: '🌸',
        color: '#FF69B4',
        lightColor: '#FF69B420',
        description: '先天特殊，易过敏',
        fullDescription: '特禀质是指先天失常，以生理缺陷、过敏反应等为主要特征的体质状态。',
        traits: ['易过敏', '遗传性', '适应力差', '易打喷嚏', '皮肤易起疹'],
        causes: ['先天禀赋不足', '遗传因素', '环境因素', '免疫功能异常'],
        diet: {
            suitable: ['新鲜蔬果', '优质蛋白', '粗粮', '适量坚果'],
            avoid: ['已知过敏原', '海鲜', '芒果', '菠萝', '酒精']
        },
        lifestyle: ['远离过敏原', '增强体质', '规律作息', '保持环境清洁', '外出戴口罩'],
        proportion: 4.91
    }
};

// 节气数据
const SOLAR_TERMS = [
    { name: '立春', advice: '宜养肝', date: [2, 4], season: 'spring' },
    { name: '雨水', advice: '宜健脾', date: [2, 19], season: 'spring' },
    { name: '惊蛰', advice: '宜清肝', date: [3, 6], season: 'spring' },
    { name: '春分', advice: '宜平衡', date: [3, 21], season: 'spring' },
    { name: '清明', advice: '宜养肝', date: [4, 5], season: 'spring' },
    { name: '谷雨', advice: '宜祛湿', date: [4, 20], season: 'spring' },
    { name: '立夏', advice: '宜养心', date: [5, 6], season: 'summer' },
    { name: '小满', advice: '宜清热', date: [5, 21], season: 'summer' },
    { name: '芒种', advice: '宜清补', date: [6, 6], season: 'summer' },
    { name: '夏至', advice: '宜养阳', date: [6, 21], season: 'summer' },
    { name: '小暑', advice: '宜消暑', date: [7, 7], season: 'summer' },
    { name: '大暑', advice: '宜清热', date: [7, 23], season: 'summer' },
    { name: '立秋', advice: '宜润肺', date: [8, 8], season: 'autumn' },
    { name: '处暑', advice: '宜养阴', date: [8, 23], season: 'autumn' },
    { name: '白露', advice: '宜润燥', date: [9, 8], season: 'autumn' },
    { name: '秋分', advice: '宜平衡', date: [9, 23], season: 'autumn' },
    { name: '寒露', advice: '宜养阴', date: [10, 8], season: 'autumn' },
    { name: '霜降', advice: '宜温补', date: [10, 24], season: 'autumn' },
    { name: '立冬', advice: '宜温补', date: [11, 8], season: 'winter' },
    { name: '小雪', advice: '宜藏精', date: [11, 22], season: 'winter' },
    { name: '大雪', advice: '宜温补', date: [12, 7], season: 'winter' },
    { name: '冬至', advice: '宜滋补', date: [12, 22], season: 'winter' },
    { name: '小寒', advice: '宜温阳', date: [1, 6], season: 'winter' },
    { name: '大寒', advice: '宜散寒', date: [1, 20], season: 'winter' }
];

/**
 * 获取当前节气
 */
function getCurrentSolarTerm() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let currentTerm = SOLAR_TERMS[SOLAR_TERMS.length - 1];

    for (let i = 0; i < SOLAR_TERMS.length; i++) {
        const term = SOLAR_TERMS[i];
        const [termMonth, termDay] = term.date;

        if (month < termMonth || (month === termMonth && day < termDay)) {
            currentTerm = i > 0 ? SOLAR_TERMS[i - 1] : SOLAR_TERMS[SOLAR_TERMS.length - 1];
            break;
        }
        currentTerm = term;
    }

    return currentTerm;
}

/**
 * 获取用户体质
 */
function getUserConstitution() {
    try {
        const stored = localStorage.getItem('userConstitution');
        if (stored) {
            const data = JSON.parse(stored);
            return CONSTITUTION_DATA[data.type] || null;
        }
        return null;
    } catch (e) {
        console.error('获取用户体质失败:', e);
        return null;
    }
}

/**
 * 设置用户体质
 */
function setUserConstitution(type) {
    const data = CONSTITUTION_DATA[type];
    if (!data) return false;

    try {
        localStorage.setItem('userConstitution', JSON.stringify({
            type: type,
            name: data.name,
            selectedAt: new Date().toISOString()
        }));
        return true;
    } catch (e) {
        console.error('设置用户体质失败:', e);
        return false;
    }
}

/**
 * 显示提示
 */
function showToast(message, type = 'info', duration = 2000) {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

/**
 * 存储工具
 */
const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
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
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    }
};

/**
 * URL参数工具
 */
const URLParams = {
    get(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    },

    set(key, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    },

    getAll() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }
};

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 格式化日期
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 初始化页面通用功能
 */
function initCommon() {
    // 初始化节气显示
    const solarTermText = document.getElementById('solarTermText');
    if (solarTermText) {
        const currentTerm = getCurrentSolarTerm();
        solarTermText.textContent = `${currentTerm.name} · ${currentTerm.advice}`;
    }

    // 初始化用户体质显示
    const userConstitutionEl = document.getElementById('userConstitution');
    if (userConstitutionEl) {
        const constitution = getUserConstitution();
        if (constitution) {
            const iconEl = userConstitutionEl.querySelector('.constitution-icon');
            const nameEl = userConstitutionEl.querySelector('.constitution-name');
            if (iconEl) iconEl.textContent = constitution.icon;
            if (nameEl) nameEl.textContent = constitution.name;
        }
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initCommon);

// 导出到全局
window.TCM = {
    CONSTITUTION_DATA,
    SOLAR_TERMS,
    getCurrentSolarTerm,
    getUserConstitution,
    setUserConstitution,
    showToast,
    Storage,
    URLParams,
    debounce,
    throttle,
    formatDate
};
