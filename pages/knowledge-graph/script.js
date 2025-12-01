/**
 * 知识图谱页面脚本
 */

document.addEventListener('DOMContentLoaded', function () {
    initKnowledgeGraph();
});

// 知识图谱数据
const graphData = {
    nodes: [
        // 体质节点
        { id: 'balanced', name: '平和质', type: 'constitution', icon: '☯', color: '#2E8B57' },
        { id: 'qi-deficiency', name: '气虚质', type: 'constitution', icon: '☁', color: '#87CEEB' },
        { id: 'yang-deficiency', name: '阳虚质', type: 'constitution', icon: '❄', color: '#4169E1' },
        { id: 'yin-deficiency', name: '阴虚质', type: 'constitution', icon: '🔥', color: '#DC143C' },
        { id: 'phlegm-dampness', name: '痰湿质', type: 'constitution', icon: '💧', color: '#D2691E' },
        { id: 'damp-heat', name: '湿热质', type: 'constitution', icon: '🌡', color: '#FF8C00' },
        { id: 'blood-stasis', name: '血瘀质', type: 'constitution', icon: '🩸', color: '#800080' },
        { id: 'qi-stagnation', name: '气郁质', type: 'constitution', icon: '🌀', color: '#2F4F4F' },
        { id: 'special', name: '特禀质', type: 'constitution', icon: '🌸', color: '#FF69B4' },

        // 食材节点
        { id: 'ginger', name: '生姜', type: 'food', property: 'warm', icon: '🫚', color: '#B8860B' },
        { id: 'lamb', name: '羊肉', type: 'food', property: 'warm', icon: '🍖', color: '#B8860B' },
        { id: 'cinnamon', name: '桂圆', type: 'food', property: 'warm', icon: '🟤', color: '#B8860B' },
        { id: 'walnut', name: '核桃', type: 'food', property: 'warm', icon: '🥜', color: '#B8860B' },
        { id: 'astragalus', name: '黄芪', type: 'food', property: 'warm', icon: '🌿', color: '#B8860B' },
        { id: 'yam', name: '山药', type: 'food', property: 'neutral', icon: '🥔', color: '#BDB76B' },
        { id: 'jujube', name: '红枣', type: 'food', property: 'warm', icon: '🔴', color: '#B8860B' },
        { id: 'mung-bean', name: '绿豆', type: 'food', property: 'cold', icon: '🟢', color: '#4169E1' },
        { id: 'bitter-gourd', name: '苦瓜', type: 'food', property: 'cold', icon: '🥒', color: '#4169E1' },
        { id: 'watermelon', name: '西瓜', type: 'food', property: 'cold', icon: '🍉', color: '#4169E1' },
        { id: 'pear', name: '梨', type: 'food', property: 'cool', icon: '🍐', color: '#87CEEB' },
        { id: 'lily', name: '百合', type: 'food', property: 'cool', icon: '🌸', color: '#87CEEB' },
        { id: 'tremella', name: '银耳', type: 'food', property: 'neutral', icon: '🍄', color: '#BDB76B' },
        { id: 'barley', name: '薏米', type: 'food', property: 'cool', icon: '🌾', color: '#87CEEB' },
        { id: 'hawthorn', name: '山楂', type: 'food', property: 'warm', icon: '🔴', color: '#B8860B' },
        { id: 'rose', name: '玫瑰花', type: 'food', property: 'warm', icon: '🌹', color: '#B8860B' },
        { id: 'chrysanthemum', name: '菊花', type: 'food', property: 'cool', icon: '🌼', color: '#87CEEB' },
        { id: 'wolfberry', name: '枸杞', type: 'food', property: 'neutral', icon: '🔴', color: '#BDB76B' },

        // 症状节点
        { id: 'fatigue', name: '疲劳乏力', type: 'symptom', icon: '😴', color: '#CD5C5C' },
        { id: 'cold-hands', name: '手脚冰凉', type: 'symptom', icon: '🥶', color: '#CD5C5C' },
        { id: 'dry-mouth', name: '口干舌燥', type: 'symptom', icon: '💧', color: '#CD5C5C' },
        { id: 'obesity', name: '形体肥胖', type: 'symptom', icon: '⚖', color: '#CD5C5C' },
        { id: 'oily-face', name: '面部油腻', type: 'symptom', icon: '😓', color: '#CD5C5C' },
        { id: 'dark-skin', name: '肤色晦暗', type: 'symptom', icon: '🌑', color: '#CD5C5C' },
        { id: 'depression', name: '情绪低落', type: 'symptom', icon: '😔', color: '#CD5C5C' },
        { id: 'allergy', name: '易过敏', type: 'symptom', icon: '🤧', color: '#CD5C5C' },

        // 经络节点
        { id: 'spleen', name: '脾经', type: 'meridian', icon: '🔶', color: '#4682B4' },
        { id: 'kidney', name: '肾经', type: 'meridian', icon: '🔷', color: '#4682B4' },
        { id: 'liver', name: '肝经', type: 'meridian', icon: '🟩', color: '#4682B4' },
        { id: 'heart', name: '心经', type: 'meridian', icon: '❤', color: '#4682B4' },
        { id: 'lung', name: '肺经', type: 'meridian', icon: '🫁', color: '#4682B4' },
        { id: 'stomach', name: '胃经', type: 'meridian', icon: '🟠', color: '#4682B4' }
    ],
    links: [
        // 气虚质相关
        { source: 'qi-deficiency', target: 'fatigue', type: 'related' },
        { source: 'qi-deficiency', target: 'astragalus', type: 'suitable' },
        { source: 'qi-deficiency', target: 'yam', type: 'suitable' },
        { source: 'qi-deficiency', target: 'jujube', type: 'suitable' },
        { source: 'qi-deficiency', target: 'spleen', type: 'related' },
        { source: 'qi-deficiency', target: 'mung-bean', type: 'avoid' },

        // 阳虚质相关
        { source: 'yang-deficiency', target: 'cold-hands', type: 'related' },
        { source: 'yang-deficiency', target: 'ginger', type: 'suitable' },
        { source: 'yang-deficiency', target: 'lamb', type: 'suitable' },
        { source: 'yang-deficiency', target: 'cinnamon', type: 'suitable' },
        { source: 'yang-deficiency', target: 'walnut', type: 'suitable' },
        { source: 'yang-deficiency', target: 'kidney', type: 'related' },
        { source: 'yang-deficiency', target: 'watermelon', type: 'avoid' },
        { source: 'yang-deficiency', target: 'bitter-gourd', type: 'avoid' },

        // 阴虚质相关
        { source: 'yin-deficiency', target: 'dry-mouth', type: 'related' },
        { source: 'yin-deficiency', target: 'pear', type: 'suitable' },
        { source: 'yin-deficiency', target: 'lily', type: 'suitable' },
        { source: 'yin-deficiency', target: 'tremella', type: 'suitable' },
        { source: 'yin-deficiency', target: 'wolfberry', type: 'suitable' },
        { source: 'yin-deficiency', target: 'kidney', type: 'related' },
        { source: 'yin-deficiency', target: 'lamb', type: 'avoid' },
        { source: 'yin-deficiency', target: 'ginger', type: 'avoid' },

        // 痰湿质相关
        { source: 'phlegm-dampness', target: 'obesity', type: 'related' },
        { source: 'phlegm-dampness', target: 'barley', type: 'suitable' },
        { source: 'phlegm-dampness', target: 'spleen', type: 'related' },

        // 湿热质相关
        { source: 'damp-heat', target: 'oily-face', type: 'related' },
        { source: 'damp-heat', target: 'mung-bean', type: 'suitable' },
        { source: 'damp-heat', target: 'bitter-gourd', type: 'suitable' },
        { source: 'damp-heat', target: 'chrysanthemum', type: 'suitable' },
        { source: 'damp-heat', target: 'lamb', type: 'avoid' },

        // 血瘀质相关
        { source: 'blood-stasis', target: 'dark-skin', type: 'related' },
        { source: 'blood-stasis', target: 'hawthorn', type: 'suitable' },
        { source: 'blood-stasis', target: 'rose', type: 'suitable' },
        { source: 'blood-stasis', target: 'liver', type: 'related' },

        // 气郁质相关
        { source: 'qi-stagnation', target: 'depression', type: 'related' },
        { source: 'qi-stagnation', target: 'rose', type: 'suitable' },
        { source: 'qi-stagnation', target: 'chrysanthemum', type: 'suitable' },
        { source: 'qi-stagnation', target: 'liver', type: 'related' },

        // 特禀质相关
        { source: 'special', target: 'allergy', type: 'related' },
        { source: 'special', target: 'lung', type: 'related' },

        // 食材与经络关系
        { source: 'yam', target: 'spleen', type: 'related' },
        { source: 'yam', target: 'lung', type: 'related' },
        { source: 'astragalus', target: 'spleen', type: 'related' },
        { source: 'wolfberry', target: 'liver', type: 'related' },
        { source: 'wolfberry', target: 'kidney', type: 'related' },
        { source: 'lily', target: 'heart', type: 'related' },
        { source: 'lily', target: 'lung', type: 'related' }
    ]
};

let svg, simulation, nodesGroup, linksGroup;
let currentFilter = { type: 'all', property: null };
let showLabels = true;

function initKnowledgeGraph() {
    setupSvg();
    setupSimulation();
    renderGraph();
    setupFilters();
    setupToolbar();
    setupDetailPanel();
    setupSearch();

    document.getElementById('graphLoading').classList.add('hidden');
}

function setupSvg() {
    const canvas = document.getElementById('graphCanvas');
    svg = document.getElementById('graphSvg');

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    linksGroup = svg.querySelector('.graph-links');
    nodesGroup = svg.querySelector('.graph-nodes');
}

function setupSimulation() {
    const canvas = document.getElementById('graphCanvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    simulation = {
        nodes: graphData.nodes.map(d => ({
            ...d,
            x: width / 2 + (Math.random() - 0.5) * 300,
            y: height / 2 + (Math.random() - 0.5) * 300
        })),
        links: graphData.links.map(d => ({
            ...d,
            source: graphData.nodes.find(n => n.id === d.source),
            target: graphData.nodes.find(n => n.id === d.target)
        }))
    };

    // 简单的力导向布局
    layoutNodes(width, height);
}

function layoutNodes(width, height) {
    const centerX = width / 2;
    const centerY = height / 2;

    // 按类型分组布局
    const constitutions = simulation.nodes.filter(n => n.type === 'constitution');
    const foods = simulation.nodes.filter(n => n.type === 'food');
    const symptoms = simulation.nodes.filter(n => n.type === 'symptom');
    const meridians = simulation.nodes.filter(n => n.type === 'meridian');

    // 体质节点围绕中心
    constitutions.forEach((node, i) => {
        const angle = (i / constitutions.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 150;
        node.x = centerX + Math.cos(angle) * radius;
        node.y = centerY + Math.sin(angle) * radius;
    });

    // 食材节点在外圈
    foods.forEach((node, i) => {
        const angle = (i / foods.length) * Math.PI * 2;
        const radius = 300;
        node.x = centerX + Math.cos(angle) * radius;
        node.y = centerY + Math.sin(angle) * radius;
    });

    // 症状节点在右侧
    symptoms.forEach((node, i) => {
        node.x = width - 100;
        node.y = 100 + i * 60;
    });

    // 经络节点在左侧
    meridians.forEach((node, i) => {
        node.x = 100;
        node.y = 100 + i * 60;
    });
}

function renderGraph() {
    renderLinks();
    renderNodes();
    updateCounts();
}

function renderLinks() {
    linksGroup.innerHTML = '';

    simulation.links.forEach(link => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('graph-link', link.type);
        line.setAttribute('x1', link.source.x);
        line.setAttribute('y1', link.source.y);
        line.setAttribute('x2', link.target.x);
        line.setAttribute('y2', link.target.y);
        line.dataset.source = link.source.id;
        line.dataset.target = link.target.id;
        linksGroup.appendChild(line);
    });
}

function renderNodes() {
    nodesGroup.innerHTML = '';

    simulation.nodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('graph-node');
        g.dataset.id = node.id;
        g.dataset.type = node.type;
        g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

        // 圆形背景
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const radius = node.type === 'constitution' ? 30 : 20;
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', node.color);
        g.appendChild(circle);

        // 图标
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.classList.add('node-icon');
        icon.setAttribute('dy', '0.35em');
        icon.textContent = node.icon;
        g.appendChild(icon);

        // 标签
        if (showLabels) {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('dy', radius + 14);
            label.textContent = node.name;
            g.appendChild(label);
        }

        // 事件
        g.addEventListener('click', () => showNodeDetail(node));
        g.addEventListener('mouseenter', () => highlightConnections(node));
        g.addEventListener('mouseleave', () => resetHighlight());

        // 拖拽
        makeDraggable(g, node);

        nodesGroup.appendChild(g);
    });
}

function makeDraggable(element, node) {
    let isDragging = false;
    let startX, startY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - node.x;
        startY = e.clientY - node.y;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        node.x = e.clientX - startX;
        node.y = e.clientY - startY;

        element.setAttribute('transform', `translate(${node.x}, ${node.y})`);
        updateLinkPositions(node);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.style.cursor = 'pointer';
    });
}

function updateLinkPositions(node) {
    const links = linksGroup.querySelectorAll('.graph-link');
    links.forEach(link => {
        if (link.dataset.source === node.id) {
            link.setAttribute('x1', node.x);
            link.setAttribute('y1', node.y);
        }
        if (link.dataset.target === node.id) {
            link.setAttribute('x2', node.x);
            link.setAttribute('y2', node.y);
        }
    });
}

function highlightConnections(node) {
    const connectedIds = new Set([node.id]);

    simulation.links.forEach(link => {
        if (link.source.id === node.id) connectedIds.add(link.target.id);
        if (link.target.id === node.id) connectedIds.add(link.source.id);
    });

    nodesGroup.querySelectorAll('.graph-node').forEach(n => {
        if (!connectedIds.has(n.dataset.id)) {
            n.style.opacity = '0.2';
        }
    });

    linksGroup.querySelectorAll('.graph-link').forEach(link => {
        if (link.dataset.source === node.id || link.dataset.target === node.id) {
            link.classList.add('highlighted');
        } else {
            link.classList.add('dimmed');
        }
    });
}

function resetHighlight() {
    nodesGroup.querySelectorAll('.graph-node').forEach(n => {
        n.style.opacity = '';
    });

    linksGroup.querySelectorAll('.graph-link').forEach(link => {
        link.classList.remove('highlighted', 'dimmed');
    });
}

function showNodeDetail(node) {
    const panel = document.getElementById('detailPanel');
    const content = document.getElementById('detailContent');

    const typeNames = {
        constitution: '体质类型',
        food: '食材',
        symptom: '症状表现',
        meridian: '经络'
    };

    // 获取关联节点
    const relatedNodes = [];
    simulation.links.forEach(link => {
        if (link.source.id === node.id) {
            relatedNodes.push({ node: link.target, relation: link.type, direction: 'out' });
        }
        if (link.target.id === node.id) {
            relatedNodes.push({ node: link.source, relation: link.type, direction: 'in' });
        }
    });

    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon" style="background: ${node.color}20">${node.icon}</div>
            <div>
                <div class="detail-title">${node.name}</div>
                <div class="detail-type">${typeNames[node.type]}</div>
            </div>
        </div>
        
        ${node.property ? `
        <div class="detail-section">
            <div class="detail-section-title">食材属性</div>
            <div class="detail-tags">
                <span class="detail-tag">${getPropertyName(node.property)}</span>
            </div>
        </div>
        ` : ''}
        
        ${relatedNodes.length > 0 ? `
        <div class="detail-section">
            <div class="detail-section-title">关联关系 (${relatedNodes.length})</div>
            <div class="related-nodes">
                ${relatedNodes.map(r => `
                    <div class="related-node-item" data-id="${r.node.id}">
                        <div class="related-node-icon" style="background: ${r.node.color}30">${r.node.icon}</div>
                        <span class="related-node-name">${r.node.name}</span>
                        <span class="related-node-relation ${r.relation}">${getRelationName(r.relation)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    `;

    // 关联节点点击事件
    content.querySelectorAll('.related-node-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetNode = simulation.nodes.find(n => n.id === item.dataset.id);
            if (targetNode) showNodeDetail(targetNode);
        });
    });

    panel.classList.add('active');
}

function getPropertyName(property) {
    const names = {
        hot: '热性',
        warm: '温性',
        neutral: '平性',
        cool: '凉性',
        cold: '寒性'
    };
    return names[property] || property;
}

function getRelationName(relation) {
    const names = {
        suitable: '适宜',
        avoid: '忌用',
        related: '关联'
    };
    return names[relation] || relation;
}

function setupFilters() {
    // 节点类型筛选
    document.querySelectorAll('.checkbox-item input').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // 体质筛选
    document.querySelectorAll('.constitution-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.constitution-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter.type = btn.dataset.type;
            applyFilters();
        });
    });

    // 属性筛选
    document.querySelectorAll('.property-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                currentFilter.property = null;
            } else {
                document.querySelectorAll('.property-filter').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter.property = btn.dataset.property;
            }
            applyFilters();
        });
    });
}

function applyFilters() {
    const visibleTypes = [];
    document.querySelectorAll('.checkbox-item input:checked').forEach(checkbox => {
        visibleTypes.push(checkbox.dataset.filter);
    });

    nodesGroup.querySelectorAll('.graph-node').forEach(node => {
        const nodeType = node.dataset.type;
        const nodeData = simulation.nodes.find(n => n.id === node.dataset.id);

        let visible = visibleTypes.includes(nodeType);

        // 体质筛选
        if (visible && currentFilter.type !== 'all' && nodeType === 'constitution') {
            visible = node.dataset.id === currentFilter.type;
        }

        // 属性筛选
        if (visible && currentFilter.property && nodeType === 'food') {
            visible = nodeData.property === currentFilter.property;
        }

        node.style.display = visible ? '' : 'none';
    });

    // 更新连线显示
    linksGroup.querySelectorAll('.graph-link').forEach(link => {
        const sourceNode = nodesGroup.querySelector(`[data-id="${link.dataset.source}"]`);
        const targetNode = nodesGroup.querySelector(`[data-id="${link.dataset.target}"]`);

        const visible = sourceNode?.style.display !== 'none' && targetNode?.style.display !== 'none';
        link.style.display = visible ? '' : 'none';
    });

    updateCounts();
}

function setupToolbar() {
    document.getElementById('zoomIn').addEventListener('click', () => {
        zoomGraph(1.2);
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        zoomGraph(0.8);
    });

    document.getElementById('resetView').addEventListener('click', () => {
        setupSimulation();
        renderGraph();
    });

    document.getElementById('toggleLabels').addEventListener('click', (e) => {
        showLabels = !showLabels;
        e.target.closest('.toolbar-btn').classList.toggle('active', showLabels);
        renderNodes();
    });
}

function zoomGraph(factor) {
    const canvas = document.getElementById('graphCanvas');
    const centerX = canvas.clientWidth / 2;
    const centerY = canvas.clientHeight / 2;

    simulation.nodes.forEach(node => {
        node.x = centerX + (node.x - centerX) * factor;
        node.y = centerY + (node.y - centerY) * factor;
    });

    renderGraph();
}

function setupDetailPanel() {
    document.getElementById('closeDetail').addEventListener('click', () => {
        document.getElementById('detailPanel').classList.remove('active');
    });
}

function setupSearch() {
    const searchInput = document.getElementById('graphSearch');
    const suggestions = document.getElementById('searchSuggestions');

    searchInput.addEventListener('input', TCM.debounce((e) => {
        const query = e.target.value.trim().toLowerCase();

        if (!query) {
            suggestions.innerHTML = '';
            return;
        }

        const matches = simulation.nodes.filter(node =>
            node.name.toLowerCase().includes(query)
        ).slice(0, 5);

        suggestions.innerHTML = matches.map(node => `
            <div class="search-suggestion-item" data-id="${node.id}">
                <span>${node.icon}</span>
                <span>${node.name}</span>
            </div>
        `).join('');

        suggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const node = simulation.nodes.find(n => n.id === item.dataset.id);
                if (node) {
                    showNodeDetail(node);
                    highlightNode(node);
                }
                suggestions.innerHTML = '';
                searchInput.value = '';
            });
        });
    }, 300));
}

function highlightNode(node) {
    nodesGroup.querySelectorAll('.graph-node').forEach(n => {
        n.classList.remove('highlighted');
    });

    const nodeEl = nodesGroup.querySelector(`[data-id="${node.id}"]`);
    if (nodeEl) {
        nodeEl.classList.add('highlighted');

        // 滚动到节点位置
        const canvas = document.getElementById('graphCanvas');
        const centerX = canvas.clientWidth / 2;
        const centerY = canvas.clientHeight / 2;

        const offsetX = centerX - node.x;
        const offsetY = centerY - node.y;

        simulation.nodes.forEach(n => {
            n.x += offsetX;
            n.y += offsetY;
        });

        renderGraph();
    }
}

function updateCounts() {
    const visibleNodes = nodesGroup.querySelectorAll('.graph-node:not([style*="display: none"])').length;
    const visibleLinks = linksGroup.querySelectorAll('.graph-link:not([style*="display: none"])').length;

    document.getElementById('nodeCount').textContent = `节点: ${visibleNodes}`;
    document.getElementById('edgeCount').textContent = `关系: ${visibleLinks}`;
}
