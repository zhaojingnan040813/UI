/**
 * 智能体质膳食推荐系统 · 公共脚本
 * Common Scripts
 */

// =====================================================
// 全局状态管理
// =====================================================
const DietarySage = {
    // 用户数据
    userData: {
        constitution: null,
        preferences: null,
        contextStatus: []
    },

    // 初始化
    init() {
        this.loadUserData();
        this.initNavigation();
        this.initAnimations();
    },

    // 加载用户数据
    loadUserData() {
        const saved = localStorage.getItem('dietarySageUser');
        if (saved) {
            try {
                this.userData = JSON.parse(saved);
            } catch (e) {
                console.warn('Failed to load user data:', e);
            }
        }
    },

    // 保存用户数据
    saveUserData() {
        localStorage.setItem('dietarySageUser', JSON.stringify(this.userData));
    },

    // 设置体质
    setConstitution(type, data) {
        this.userData.constitution = { type, data };
        this.saveUserData();
    },

    // 设置偏好
    setPreferences(prefs) {
        this.userData.preferences = prefs;
        this.saveUserData();
    },

    // 初始化导航
    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const currentPage = window.location.pathname;

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && currentPage.includes(href.replace('./', ''))) {
                item.classList.add('active');
            }
        });
    },

    // 初始化动画
    initAnimations() {
        // 淡入动画观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
};

// =====================================================
// 工具函数
// =====================================================
const Utils = {
    // 防抖
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化数字
    formatNumber(num) {
        return new Intl.NumberFormat('zh-CN').format(num);
    },

    // 随机ID
    generateId(prefix = 'id') {
        return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 深拷贝
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // 延迟执行
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // 获取节气
    getSolarTerm() {
        const terms = [
            { name: '小寒', tip: '宜温补肾阳' },
            { name: '大寒', tip: '宜滋阴润燥' },
            { name: '立春', tip: '宜养肝疏发' },
            { name: '雨水', tip: '宜健脾祛湿' },
            { name: '惊蛰', tip: '宜清热润肺' },
            { name: '春分', tip: '宜平肝养血' },
            { name: '清明', tip: '宜清淡养肝' },
            { name: '谷雨', tip: '宜祛湿健脾' },
            { name: '立夏', tip: '宜养心安神' },
            { name: '小满', tip: '宜清热利湿' },
            { name: '芒种', tip: '宜清热解暑' },
            { name: '夏至', tip: '宜养心护阳' },
            { name: '小暑', tip: '宜清热消暑' },
            { name: '大暑', tip: '宜防暑祛湿' },
            { name: '立秋', tip: '宜润肺养阴' },
            { name: '处暑', tip: '宜滋阴润燥' },
            { name: '白露', tip: '宜养肺防燥' },
            { name: '秋分', tip: '宜平补养阴' },
            { name: '寒露', tip: '宜润燥养肺' },
            { name: '霜降', tip: '宜温补脾胃' },
            { name: '立冬', tip: '宜温补肾阳' },
            { name: '小雪', tip: '宜温补御寒' },
            { name: '大雪', tip: '宜温阳散寒' },
            { name: '冬至', tip: '宜温补肾精' }
        ];

        // 简化处理，实际应根据日期计算
        const month = new Date().getMonth();
        const index = Math.floor(month * 2) % 24;
        return terms[index];
    }
};

// =====================================================
// 动画效果
// =====================================================
const Animations = {
    // 淡入
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';

        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },

    // 淡出
    fadeOut(element, duration = 300) {
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = Math.max(1 - progress / duration, 0);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        requestAnimationFrame(animate);
    },

    // 错开动画
    staggeredFadeIn(elements, delay = 50) {
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.4s ease';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay * index);
        });
    },

    // 数字滚动
    countUp(element, target, duration = 1000) {
        let start = null;
        const initial = 0;

        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(initial + (target - initial) * progress);
            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
};

// =====================================================
// 通知系统
// =====================================================
const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            this.container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            padding: 12px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            font-size: 14px;
            color: #333;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#6B9B7A' : type === 'error' ? '#C84B31' : '#7BA8A8'};
        `;
        toast.textContent = message;

        this.container.appendChild(toast);

        // 滑入
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // 自动消失
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    success(message) {
        this.show(message, 'success');
    },

    error(message) {
        this.show(message, 'error');
    },

    info(message) {
        this.show(message, 'info');
    }
};

// =====================================================
// 页面初始化
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    DietarySage.init();
});

// 导出
window.DietarySage = DietarySage;
window.Utils = Utils;
window.Animations = Animations;
window.Toast = Toast;
