/**
 * 智能体质膳食推荐系统 · 体质数字孪生
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const constitutionCards = document.querySelectorAll('.constitution-card');
    const bodyScanner = document.querySelector('.body-scanner');
    const currentConstitutionEl = document.getElementById('currentConstitution');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const nextBtn = document.getElementById('nextBtn');

    // State
    let selectedConstitution = null;
    let chatHistory = [];

    // Constitution Data
    const constitutionData = {
        'balanced': {
            name: '平和质',
            effects: {
                cold: [],
                hot: []
            },
            yinYang: [50, 50],
            qi: 80,
            description: '阴阳调和，气血充盈，身体健康'
        },
        'qi-deficiency': {
            name: '气虚质',
            effects: {
                cold: ['belly-cold'],
                hot: []
            },
            yinYang: [55, 45],
            qi: 40,
            description: '元气不足，容易疲劳乏力'
        },
        'yang-deficiency': {
            name: '阳虚质',
            effects: {
                cold: ['belly-cold', 'hands-cold-l', 'hands-cold-r', 'feet-cold-l', 'feet-cold-r'],
                hot: []
            },
            yinYang: [70, 30],
            qi: 50,
            description: '阳气不足，畏寒怕冷，手脚冰凉'
        },
        'yin-deficiency': {
            name: '阴虚质',
            effects: {
                cold: [],
                hot: ['head-hot', 'hands-cold-l', 'hands-cold-r']
            },
            yinYang: [30, 70],
            qi: 55,
            description: '阴液亏少，手足心热，口燥咽干'
        },
        'phlegm-dampness': {
            name: '痰湿质',
            effects: {
                cold: ['belly-cold'],
                hot: []
            },
            yinYang: [60, 40],
            qi: 45,
            description: '痰湿凝聚，形体肥胖，身重困倦'
        },
        'damp-heat': {
            name: '湿热质',
            effects: {
                cold: [],
                hot: ['head-hot', 'stomach-hot']
            },
            yinYang: [35, 65],
            qi: 50,
            description: '湿热内蕴，面垢油光，口苦口臭'
        },
        'blood-stasis': {
            name: '血瘀质',
            effects: {
                cold: ['hands-cold-l', 'hands-cold-r'],
                hot: []
            },
            yinYang: [50, 50],
            qi: 45,
            description: '血行不畅，肤色晦暗，易生斑点'
        },
        'qi-stagnation': {
            name: '气郁质',
            effects: {
                cold: [],
                hot: ['head-hot']
            },
            yinYang: [45, 55],
            qi: 50,
            description: '气机郁滞，情绪敏感，多愁善感'
        },
        'special': {
            name: '特禀质',
            effects: {
                cold: [],
                hot: ['head-hot']
            },
            yinYang: [50, 50],
            qi: 55,
            description: '先天特殊，容易过敏'
        }
    };

    // AI Chat Questions
    const chatQuestions = [
        {
            question: '请问您平时怕冷还是怕热？',
            replies: [
                { text: '比较怕冷，喜欢温暖', value: 'cold-sensitive' },
                { text: '比较怕热，喜欢凉爽', value: 'heat-sensitive' },
                { text: '冷热都还好', value: 'neutral' },
                { text: '手脚容易冰凉', value: 'cold-extremities' }
            ]
        },
        {
            question: '您的精力状态如何？',
            replies: [
                { text: '精力充沛', value: 'energetic' },
                { text: '容易疲劳', value: 'fatigue' },
                { text: '一般般', value: 'normal' },
                { text: '经常觉得累', value: 'tired' }
            ]
        },
        {
            question: '您的情绪状态怎样？',
            replies: [
                { text: '心情平和稳定', value: 'calm' },
                { text: '容易焦虑紧张', value: 'anxious' },
                { text: '情绪波动较大', value: 'moody' },
                { text: '偶尔低落', value: 'low' }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = [];

    // =====================================================
    // Tab Switching
    // =====================================================
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update button states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabId}`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // =====================================================
    // Constitution Card Selection
    // =====================================================
    constitutionCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;

            // Update card states
            constitutionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // Update constitution
            selectConstitution(type);
        });
    });

    function selectConstitution(type) {
        selectedConstitution = type;
        const data = constitutionData[type];

        if (!data) return;

        // Update display
        currentConstitutionEl.textContent = data.name;
        bodyScanner.dataset.constitution = type;

        // Update body effects
        updateBodyEffects(data.effects);

        // Update indicators
        updateIndicators(data.yinYang, data.qi);

        // Enable next button
        nextBtn.disabled = false;

        // Add visual feedback
        currentConstitutionEl.classList.add('fade-in');
        setTimeout(() => {
            currentConstitutionEl.classList.remove('fade-in');
        }, 500);
    }

    function updateBodyEffects(effects) {
        // Reset all effects
        document.querySelectorAll('.cold-effect, .hot-effect').forEach(el => {
            el.classList.remove('active');
        });

        // Apply cold effects
        effects.cold.forEach(effectClass => {
            const el = document.querySelector(`.${effectClass}`);
            if (el) {
                el.classList.add('active');
            }
        });

        // Apply hot effects
        effects.hot.forEach(effectClass => {
            const el = document.querySelector(`.${effectClass}`);
            if (el) {
                el.classList.add('active');
            }
        });
    }

    function updateIndicators(yinYang, qi) {
        const yinBar = document.querySelector('.bar-fill.yin');
        const yangBar = document.querySelector('.bar-fill.yang');
        const qiBar = document.querySelector('.bar-fill.qi');

        if (yinBar) yinBar.style.width = `${yinYang[0]}%`;
        if (yangBar) yangBar.style.width = `${yinYang[1]}%`;
        if (qiBar) qiBar.style.width = `${qi}%`;
    }

    // =====================================================
    // Chat Functionality
    // =====================================================
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? '我' : '養';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        if (typeof content === 'string') {
            const p = document.createElement('p');
            p.textContent = content;
            contentDiv.appendChild(p);
        } else {
            contentDiv.appendChild(content);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addQuestionWithReplies(questionText, replies) {
        const container = document.createElement('div');

        const p = document.createElement('p');
        p.textContent = questionText;
        container.appendChild(p);

        const repliesDiv = document.createElement('div');
        repliesDiv.className = 'quick-replies';

        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = reply.text;
            btn.dataset.value = reply.value;
            btn.addEventListener('click', () => handleQuickReply(reply.text, reply.value));
            repliesDiv.appendChild(btn);
        });

        container.appendChild(repliesDiv);
        addMessage(container);
    }

    function handleQuickReply(text, value) {
        // Add user message
        addMessage(text, true);

        // Store answer
        userAnswers.push(value);

        // Move to next question or finish
        currentQuestionIndex++;

        if (currentQuestionIndex < chatQuestions.length) {
            // Show next question after delay
            setTimeout(() => {
                const nextQ = chatQuestions[currentQuestionIndex];
                addQuestionWithReplies(nextQ.question, nextQ.replies);
            }, 800);
        } else {
            // Analyze and show result
            setTimeout(() => {
                analyzeAndShowResult();
            }, 800);
        }
    }

    function analyzeAndShowResult() {
        // Simple analysis logic based on answers
        let suggestedType = 'balanced';

        // Check for cold sensitivity
        if (userAnswers.includes('cold-sensitive') || userAnswers.includes('cold-extremities')) {
            suggestedType = 'yang-deficiency';
        }

        // Check for heat sensitivity
        if (userAnswers.includes('heat-sensitive')) {
            suggestedType = 'yin-deficiency';
        }

        // Check for fatigue
        if (userAnswers.includes('fatigue') || userAnswers.includes('tired')) {
            suggestedType = 'qi-deficiency';
        }

        // Check for emotional issues
        if (userAnswers.includes('anxious') || userAnswers.includes('moody')) {
            suggestedType = 'qi-stagnation';
        }

        const data = constitutionData[suggestedType];

        // Show analysis result
        const resultContainer = document.createElement('div');

        const p1 = document.createElement('p');
        p1.textContent = '根据您的回答，我初步分析您的体质为：';
        resultContainer.appendChild(p1);

        const resultP = document.createElement('p');
        resultP.innerHTML = `<strong style="color: var(--primary-dark); font-size: 1.1em;">${data.name}</strong>`;
        resultContainer.appendChild(resultP);

        const descP = document.createElement('p');
        descP.textContent = data.description;
        descP.style.color = 'var(--text-secondary)';
        descP.style.fontSize = '0.9em';
        resultContainer.appendChild(descP);

        const tipP = document.createElement('p');
        tipP.textContent = '您可以点击左侧人体模型查看体质特征，或在"手动选择"标签页中进行调整。';
        tipP.style.marginTop = '12px';
        tipP.style.color = 'var(--gold)';
        tipP.style.fontSize = '0.85em';
        resultContainer.appendChild(tipP);

        addMessage(resultContainer);

        // Auto select the constitution
        selectConstitution(suggestedType);

        // Highlight the corresponding card
        constitutionCards.forEach(card => {
            if (card.dataset.type === suggestedType) {
                card.classList.add('selected');
            }
        });
    }

    // Quick reply handlers for initial questions
    quickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            const reply = btn.dataset.reply;
            const text = btn.textContent;

            // Add user message
            addMessage(text, true);

            // Store answer
            userAnswers.push(reply);

            // Disable clicked buttons
            btn.closest('.quick-replies').querySelectorAll('.quick-reply').forEach(b => {
                b.disabled = true;
                b.style.opacity = '0.5';
            });

            // Show next question
            setTimeout(() => {
                if (currentQuestionIndex < chatQuestions.length) {
                    const nextQ = chatQuestions[currentQuestionIndex];
                    addQuestionWithReplies(nextQ.question, nextQ.replies);
                    currentQuestionIndex++;
                } else {
                    analyzeAndShowResult();
                }
            }, 800);
        });
    });

    // Send button handler
    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                addMessage('感谢您的回答，我已经记录下来了。请继续回答接下来的问题，以便更准确地分析您的体质。');
            }, 500);
        }
    });

    // Enter key to send
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    // =====================================================
    // Acupoint Tooltips
    // =====================================================
    const acupoints = document.querySelectorAll('.acupoint');

    acupoints.forEach(point => {
        point.addEventListener('mouseenter', (e) => {
            const name = point.dataset.point;
            if (name) {
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'acupoint-tooltip';
                tooltip.textContent = name;
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--text-primary);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    pointer-events: none;
                    z-index: 1000;
                    white-space: nowrap;
                `;

                document.body.appendChild(tooltip);

                const rect = point.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;

                point._tooltip = tooltip;
            }
        });

        point.addEventListener('mouseleave', () => {
            if (point._tooltip) {
                point._tooltip.remove();
                point._tooltip = null;
            }
        });
    });

    // =====================================================
    // Next Button Handler
    // =====================================================
    nextBtn.addEventListener('click', () => {
        if (selectedConstitution) {
            // Store selection and proceed
            localStorage.setItem('dietarySageUser', JSON.stringify({
                constitution: {
                    type: selectedConstitution,
                    data: constitutionData[selectedConstitution]
                }
            }));

            // Navigate to preference tuner page
            window.location.href = './pages/preference-tuner/index.html';
        } else {
            alert('请先选择您的体质类型');
        }
    });

    // =====================================================
    // Initial Animation
    // =====================================================
    function initAnimations() {
        // Stagger animation for cards
        constitutionCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 50);
        });
    }

    // Initialize
    initAnimations();

    // Disable next button initially
    nextBtn.disabled = true;
});
