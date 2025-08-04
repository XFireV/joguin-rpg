// =================================================================================
// GERENCIADORES E LÓGICA PRINCIPAL
// =================================================================================

class WorldManager {
    constructor() {
        this.gameTime = new Date();
        this.gameTime.setHours(8, 0, 0);
        this.weather = "Ensolarado";
        this.season = "Primavera";
        this.dayDuration = 2 * 60 * 60 * 1000; // 2 horas em ms
        this.nightDuration = (2/5) * this.dayDuration; // 2/5 do dia
        this.seasonDuration = 20 * this.dayDuration; // 20 dias
        this.lastSeasonChange = Date.now();
        this.lastEventCheck = Date.now();
    }

    update(secondsPassed) {
        this.gameTime.setMinutes(this.gameTime.getMinutes() + secondsPassed);
        this.checkSeasonChange();
        this.checkGlobalEvents();
    }

    checkSeasonChange() {
        const elapsed = Date.now() - this.lastSeasonChange;
        if (elapsed >= this.seasonDuration) {
            const seasons = ["Primavera", "Verão", "Outono", "Inverno"];
            const currentIndex = seasons.indexOf(this.season);
            this.season = seasons[(currentIndex + 1) % seasons.length];
            this.lastSeasonChange = Date.now();
            
            // Mudar clima baseado na estação
            this.updateWeatherBySeason();
        }
    }

    updateWeatherBySeason() {
        const weatherBySeason = {
            "Primavera": ["Ensolarado", "Chuvoso", "Nublado"],
            "Verão": ["Ensolarado", "Muito Quente"],
            "Outono": ["Nublado", "Chuvoso", "Ventoso"],
            "Inverno": ["Nevando", "Frio", "Nublado"]
        };
        
        const options = weatherBySeason[this.season];
        this.weather = options[Math.floor(Math.random() * options.length)];
    }

    checkGlobalEvents() {
        const elapsed = Date.now() - this.lastEventCheck;
        if (elapsed >= 30 * 60 * 1000) { // Verificar a cada 30 minutos
            this.lastEventCheck = Date.now();
            
            if (Math.random() < 0.3) { // 30% de chance
                this.triggerGlobalEvent();
            }
        }
    }

    triggerGlobalEvent() {
        const events = {
            "Primavera": [
                "🌸 Festival da Primavera começou! Todos os trabalhos dão 20% mais XP!",
                "🌱 Época de plantio! Coletores de ervas encontram mais ingredientes!",
                "🦋 Migração das borboletas! Chance aumentada de encontrar itens raros!"
            ],
            "Verão": [
                "☀️ Onda de calor! Mineradores trabalham mais devagar, mas encontram mais ouro!",
                "🏖️ Temporada de aventuras! Exploradores ganham recompensas extras!",
                "🔥 Dragões estão mais ativos! Cuidado ao caçar!"
            ],
            "Outono": [
                "🍂 Colheita abundante! Lenhadores e coletores ganham recursos extras!",
                "🎃 Noite das Bruxas se aproxima! Magos sombrios aparecem com mais frequência!",
                "🌰 Época de preparação! Todos os trabalhos de coleta rendem 50% mais!"
            ],
            "Inverno": [
                "❄️ Tempestade de neve! Alguns trabalhos ficam indisponíveis!",
                "🎄 Festivais de inverno! Mercadores oferecem descontos especiais!",
                "🧊 Criaturas do gelo aparecem! Novos inimigos nos campos de caça!"
            ]
        };

        const seasonEvents = events[this.season];
        const event = seasonEvents[Math.floor(Math.random() * seasonEvents.length)];
        
        gameManager.ui.showGlobalEvent(event);
    }

    getFormattedTime() {
        const hours = this.gameTime.getHours().toString().padStart(2, '0');
        const minutes = this.gameTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getWeatherIcon() {
        const icons = {
            "Ensolarado": "ph-bold ph-sun",
            "Chuvoso": "ph-bold ph-cloud-rain",
            "Nublado": "ph-bold ph-cloud",
            "Nevando": "ph-bold ph-snowflake",
            "Muito Quente": "ph-bold ph-thermometer-hot",
            "Frio": "ph-bold ph-thermometer-cold",
            "Ventoso": "ph-bold ph-wind"
        };
        return icons[this.weather] || "ph-bold ph-sun";
    }

    getSeasonIcon() {
        const icons = {
            "Primavera": "ph-bold ph-flower",
            "Verão": "ph-bold ph-sun",
            "Outono": "ph-bold ph-leaf",
            "Inverno": "ph-bold ph-snowflake"
        };
        return icons[this.season];
    }
}

class UIManager {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.currentCombat = null;
        this.shop = new Shop();
        this.cacheDOM();
    }

    cacheDOM() {
        this.hubButtons = document.querySelectorAll('.hub-button');
        this.backButtons = document.querySelectorAll('.back-button');
        this.statusContent = document.getElementById('status-content');
        this.inventoryWeight = document.getElementById('inventory-weight');
        this.inventoryList = document.getElementById('inventory-list');
        this.shopContent = document.getElementById('shop-content');
        this.shopTimer = document.getElementById('shop-timer');
        this.professionContent = document.getElementById('profession-content');
        this.jobsContent = document.getElementById('jobs-content');
        this.worldContent = document.getElementById('world-content');
        this.castlesContent = document.getElementById('castles-content');
        this.timeDisplay = document.getElementById('time-display');
        this.weatherDisplay = document.getElementById('weather-display');
        this.seasonDisplay = document.getElementById('season-display');
        this.eventBanner = document.getElementById('global-event-banner');
        this.eventText = document.getElementById('event-text');
        this.combatModal = document.getElementById('combat-modal');
    }

    showScreen(screenId) {
        this.screens.forEach(screen => {
            screen.classList.toggle('active', screen.id === screenId);
        });
    }

    showGlobalEvent(eventText) {
        this.eventText.textContent = eventText;
        this.eventBanner.classList.remove('hidden');
        
        // Auto-fechar após 10 segundos
        setTimeout(() => {
            this.eventBanner.classList.add('hidden');
        }, 10000);
    }

    renderStatus(player) {
        const createStatLine = (label, value) => `<div class="stat-line"><span>${label}:</span> <span>${value}</span></div>`;

        // Atributos
        let attributesHtml = ``;
        for (const stat in player.stats) {
            const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
            attributesHtml += `<div class="stat-line"><span>${statName}:</span> <span>${player.stats[stat]} <button data-stat="${stat}" ${player.attributePoints === 0 ? 'disabled' : ''}>+</button></span></div>`;
        }

        // Equipamentos
        let equipmentHtml = ``;
        for (const slot in player.equipment) {
            const item = player.equipment[slot];
            const itemName = item ? `<span class="rarity-${DB.items[item.id].rarity}">${DB.items[item.id].name}</span>` : '---';
            const slotName = slot.charAt(0).toUpperCase() + slot.slice(1);
            equipmentHtml += `<div class="stat-line"><span>${slotName}:</span> <span>${itemName}</span></div>`;
        }

        // Habilidades
        let skillsHtml = player.skills.map(skillId => `<li><span class="rarity-Raro">${DB.skills[skillId].name}</span> - ${DB.skills[skillId].description}</li>`).join('') || '<li>Nenhuma habilidade aprendida</li>';

        // Status Effects
        let statusEffectsHtml = player.statusEffects.map(effect => 
            `<span class="status-effect ${effect.type}">${effect.type} (${effect.duration})</span>`
        ).join('') || '<span>Nenhum efeito ativo</span>';

        this.statusContent.innerHTML = `
            <div class="status-section">
                <h3>Informações Básicas</h3>
                <div class="status-grid">
                    ${createStatLine("Nível", player.level)}
                    ${createStatLine("XP", `${player.xp} / ${player.xpToNextLevel}`)}
                    ${createStatLine("HP", `${player.hp} / ${player.getMaxHp()}`)}
                    ${createStatLine("MP", `${player.mp} / ${player.getMaxMp()}`)}
                    ${createStatLine("Ouro", player.gold)}
                    ${createStatLine("Classe", player.class || "Nenhuma")}
                    ${createStatLine("Profissão", player.profession ? `${DB.professions[player.profession.id].name} (Nvl ${player.profession.level})` : "Nenhuma")}
                    ${createStatLine("Pontos de Atributo", player.attributePoints)}
                </div>
            </div>
            <div class="status-section">
                <h3>Atributos</h3>
                <div class="status-grid">${attributesHtml}</div>
            </div>
            <div class="status-section">
                <h3>Estatísticas de Combate</h3>
                <div class="status-grid">
                    ${createStatLine("Ataque", player.getAttack())}
                    ${createStatLine("Defesa", player.getDefense())}
                    ${createStatLine("Agilidade", player.getAgility())}
                </div>
            </div>
            <div class="status-section">
                <h3>Equipamentos</h3>
                <div class="status-grid">${equipmentHtml}</div>
            </div>
            <div class="status-section">
                <h3>Habilidades Conhecidas</h3>
                <ul>${skillsHtml}</ul>
            </div>
            <div class="status-section">
                <h3>Efeitos de Status</h3>
                <div class="status-effects">${statusEffectsHtml}</div>
            </div>
        `;
    }

    renderInventory(player) {
        const currentWeight = player.getCurrentWeight().toFixed(2);
        this.inventoryWeight.textContent = `Peso: ${currentWeight} / ${player.inventoryMaxWeight} kg`;

        this.inventoryList.innerHTML = '';
        if (player.inventory.length === 0) {
            this.inventoryList.innerHTML = '<li>Inventário vazio.</li>';
            return;
        }

        player.inventory.forEach(item => {
            const itemData = DB.items[item.id];
            const li = document.createElement('li');
            li.className = 'inventory-item';

            let useButton = '';
            if (itemData.type === 'Grimoire') {
                useButton = `<button class="action-button" data-action="use-grimoire" data-item-id="${item.id}">Usar</button>`;
            } else if (itemData.type === 'Consumable') {
                useButton = `<button class="action-button" data-action="use-consumable" data-item-id="${item.id}">Usar</button>`;
            } else if (itemData.type === 'Equipment') {
                useButton = `<button class="action-button" data-action="equip-item" data-item-id="${item.id}">Equipar</button>`;
            }

            li.innerHTML = `
                <span class="item-name rarity-${itemData.rarity}">${itemData.name}</span>
                <span>${item.quantity}x</span>
                <span>${(itemData.weight * item.quantity).toFixed(2)} kg</span>
                <span>${useButton}</span>
            `;
            this.inventoryList.appendChild(li);
        });
    }

    renderShop(player) {
        if (this.shop.shouldUpdate()) {
            this.shop.generateItems();
        }

        this.shopTimer.textContent = `Próxima atualização em: ${this.shop.getTimeToNextUpdate()}`;
        this.shopContent.innerHTML = '';

        if (this.shop.items.length === 0) {
            this.shopContent.innerHTML = '<p>A loja está vazia no momento.</p>';
            return;
        }

        this.shop.items.forEach(shopItem => {
            const itemData = DB.items[shopItem.id];
            const div = document.createElement('div');
            div.className = 'shop-item';

            const canBuy = player.gold >= shopItem.price;
            
            div.innerHTML = `
                <span class="item-name rarity-${itemData.rarity}">${itemData.name}</span>
                <span>${shopItem.quantity}x</span>
                <span>${shopItem.price} ouro</span>
                <button class="action-button" data-action="buy-item" data-item-id="${shopItem.id}" data-price="${shopItem.price}" data-quantity="${shopItem.quantity}" ${!canBuy ? 'disabled' : ''}>Comprar</button>
            `;
            this.shopContent.appendChild(div);
        });
    }

    renderProfession(player) {
        if (!player.profession) {
            let professionsHtml = '<div class="profession-selector">';
            Object.entries(DB.professions).forEach(([id, prof]) => {
                professionsHtml += `
                    <div class="profession-card" data-action="learn-profession" data-prof-id="${id}">
                        <h4>${prof.name}</h4>
                        <p>${prof.description}</p>
                    </div>
                `;
            });
            professionsHtml += '</div>';
            
            this.professionContent.innerHTML = `
                <h3>Escolha uma Profissão</h3>
                ${professionsHtml}
            `;
            return;
        }

        const profData = DB.professions[player.profession.id];
        const xpToNext = player.profession.level * 100;
        
        let recipesHtml = '<div class="recipes-list">';
        profData.recipes.forEach(recipe => {
            const canCraft = player.profession.level >= recipe.requiredLevel && player.hasMaterials(recipe.materials);
            const materials = Object.entries(recipe.materials).map(([matId, qty]) => 
                `<span class="rarity-${DB.items[matId].rarity}">${DB.items[matId].name}</span> x${qty}`
            ).join(', ');
            
            recipesHtml += `
                <div class="inventory-item">
                    <div>
                        <strong class="rarity-${DB.items[recipe.result].rarity}">${recipe.name}</strong>
                        <br><small>Materiais: ${materials}</small>
                        <br><small>Nível necessário: ${recipe.requiredLevel}</small>
                    </div>
                    <span>+${recipe.xp} XP</span>
                    <span></span>
                    <button class="action-button" data-action="craft-item" data-recipe-id="${recipe.id}" ${!canCraft ? 'disabled' : ''}>Criar</button>
                </div>
            `;
        });
        recipesHtml += '</div>';

        this.professionContent.innerHTML = `
            <div class="status-section">
                <h3>${profData.name} - Nível ${player.profession.level}</h3>
                <p>XP: ${player.profession.xp} / ${xpToNext}</p>
            </div>
            <h4>Receitas Disponíveis:</h4>
            ${recipesHtml}
        `;
    }

    renderJobs(player) {
        let jobsHtml = '';
        
        if (player.currentJob) {
            const job = DB.jobs[player.currentJob.id];
            const elapsed = Date.now() - player.currentJob.startTime;
            const remaining = Math.max(0, player.currentJob.duration - elapsed);
            const progress = Math.min(100, (elapsed / player.currentJob.duration) * 100);
            
            jobsHtml += `
                <div class="status-section">
                    <h3>Trabalho Atual: ${job.name}</h3>
                    <p>Progresso: ${progress.toFixed(1)}%</p>
                    <p>Tempo restante: ${Math.ceil(remaining / 1000)}s</p>
                    <button class="action-button" data-action="complete-job" ${remaining > 0 ? 'disabled' : ''}>Finalizar</button>
                </div>
            `;
        }

        jobsHtml += '<h3>Trabalhos Disponíveis</h3>';
        
        Object.entries(DB.jobs).forEach(([id, job]) => {
            const isWorking = player.currentJob && player.currentJob.id === id;
            
            jobsHtml += `
                <div class="job-item">
                    <div>
                        <strong>${job.name}</strong>
                        <br><small>${job.description}</small>
                        <br><small>Duração: ${Math.floor(job.duration / 60)} minutos</small>
                        <br><small>Recompensa: ${job.rewards.gold} ouro</small>
                    </div>
                    <span></span>
                    <span></span>
                    <button class="action-button" data-action="start-job" data-job-id="${id}" ${player.currentJob || isWorking ? 'disabled' : ''}>Iniciar</button>
                </div>
            `;
        });

        this.jobsContent.innerHTML = jobsHtml;
    }

    renderWorld(player) {
        let worldHtml = '<h3>Campos de Caça</h3>';
        
        Object.entries(DB.huntingGrounds).forEach(([id, area]) => {
            worldHtml += `
                <div class="hunt-area">
                    <div>
                        <strong>${area.name}</strong>
                        <br><small>${area.description}</small>
                        <br><small>Nível recomendado: ${area.levelRange}</small>
                    </div>
                    <span></span>
                    <span></span>
                    <button class="action-button" data-action="enter-hunt" data-area-id="${id}">Explorar</button>
                </div>
            `;
        });

        this.worldContent.innerHTML = worldHtml;
    }

    renderCastles(player) {
        let castlesHtml = '<h3>Castelos Disponíveis</h3>';
        
        // Mostrar renda dos castelos possuídos
        if (player.ownedCastles.length > 0) {
            let totalIncome = 0;
            player.ownedCastles.forEach(castleId => {
                totalIncome += DB.castles[castleId].income;
            });
            
            castlesHtml += `
                <div class="status-section">
                    <h3>Seus Castelos (${player.ownedCastles.length})</h3>
                    <p>Renda total: ${totalIncome} ouro a cada 6 horas</p>
                    <button class="action-button" data-action="collect-income">Coletar Renda</button>
                </div>
            `;
        }
        
        Object.entries(DB.castles).forEach(([id, castle]) => {
            const owned = player.ownedCastles.includes(id);
            const canBuy = player.gold >= castle.cost && !owned;
            
            castlesHtml += `
                <div class="castle-item">
                    <div>
                        <strong>${castle.name}</strong> ${owned ? '(Possuído)' : ''}
                        <br><small>${castle.description}</small>
                        <br><small>Nível: ${castle.level} | Renda: ${castle.income} ouro/6h</small>
                    </div>
                    <span>Custo: ${castle.cost}</span>
                    <span></span>
                    <button class="action-button" data-action="buy-castle" data-castle-id="${id}" ${!canBuy ? 'disabled' : ''}>${owned ? 'Possuído' : 'Comprar'}</button>
                </div>
            `;
        });

        this.castlesContent.innerHTML = castlesHtml;
    }

    renderWorldInfo(world) {
        this.timeDisplay.textContent = world.getFormattedTime();
        this.weatherDisplay.innerHTML = `<i class="${world.getWeatherIcon()}"></i> ${world.weather}`;
        this.seasonDisplay.innerHTML = `<i class="${world.getSeasonIcon()}"></i> ${world.season}`;
    }

    startCombat(player, enemy) {
        this.currentCombat = new CombatSystem(player, enemy);
        this.renderCombat();
        this.combatModal.classList.remove('hidden');
    }

    renderCombat() {
        if (!this.currentCombat) return;

        const combat = this.currentCombat;
        const player = combat.player;
        const enemy = combat.enemy;

        // Status dos combatentes
        const playerStatusEffects = player.statusEffects.map(e => 
            `<span class="status-effect ${e.type}">${e.type}</span>`
        ).join('');
        
        const enemyStatusEffects = enemy.statusEffects.map(e => 
            `<span class="status-effect ${e.type}">${e.type}</span>`
        ).join('');

        document.getElementById('combat-info').innerHTML = `
            <div class="combat-character">
                <h4>Você (Nível ${player.level})</h4>
                <p>HP: ${player.hp}/${player.getMaxHp()}</p>
                <p>MP: ${player.mp}/${player.getMaxMp()}</p>
                <div class="status-effects">${playerStatusEffects}</div>
            </div>
            <div class="combat-character">
                <h4>${enemy.name} (Nível ${enemy.level})</h4>
                <p>HP: ${enemy.hp}/${enemy.stats.maxHp}</p>
                <div class="status-effects">${enemyStatusEffects}</div>
            </div>
        `;

        // Ações disponíveis
        let actionsHtml = `<button class="action-button" data-combat-action="attack">Atacar</button>`;
        
        player.skills.forEach(skillId => {
            const skill = DB.skills[skillId];
            const canUse = player.mp >= skill.cost;
            actionsHtml += `<button class="action-button" data-combat-action="skill" data-skill-id="${skillId}" ${!canUse ? 'disabled' : ''}>${skill.name} (${skill.cost} MP)</button>`;
        });
        
        actionsHtml += `<button class="action-button" data-combat-action="flee">Fugir</button>`;
        
        document.getElementById('combat-actions').innerHTML = actionsHtml;

        // Log de combate
        document.getElementById('combat-log').innerHTML = combat.log.join('<br>');
    }

    endCombat() {
        this.currentCombat = null;
        this.combatModal.classList.add('hidden');
    }
}

class GameManager {
    constructor() {
        this.player = new Player();
        this.world = new WorldManager();
        this.ui = new UIManager();
        window.gameManager = this; // Para acesso global

        this.initialize();
    }

    initialize() {
        this.bindEvents();
        this.ui.showScreen('hub-screen');
        this.updateUI();
        setInterval(() => this.gameLoop(), 1000);
    }

    gameLoop() {
        this.world.update(1);
        this.ui.renderWorldInfo(this.world);
        
        // Verificar trabalho completo
        if (this.player.currentJob) {
            const completed = this.player.completeJob();
            if (completed) {
                const job = DB.jobs[completed.id];
                alert(`Trabalho "${job.name}" concluído! Você ganhou ${job.rewards.gold} ouro!`);
                this.updateUI('jobs-screen');
            }
        }
        
        // Coletar renda dos castelos automaticamente
        const income = this.player.collectCastleIncome();
        if (income > 0) {
            this.ui.showGlobalEvent(`💰 Você coletou ${income} ouro dos seus castelos!`);
        }
    }

    bindEvents() {
        // Navegação principal
        this.ui.hubButtons.forEach(button => {
            button.addEventListener('click', () => {
                const screenId = button.dataset.screen;
                this.ui.showScreen(screenId);
                this.updateUI(screenId);
            });
        });

        this.ui.backButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.ui.showScreen(button.dataset.screen);
            });
        });

        // Fechar evento global
        document.getElementById('close-event').addEventListener('click', () => {
            this.ui.eventBanner.classList.add('hidden');
        });

        // Status
        document.getElementById('status-content').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target.dataset.stat) {
                if (this.player.addAttribute(e.target.dataset.stat)) {
                    this.ui.renderStatus(this.player);
                }
            }
        });

        // Inventário
        document.getElementById('inventory-list').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const itemId = e.target.dataset.itemId;
            
            if (action === 'use-grimoire') {
                const message = this.player.learnSkillFromGrimoire(itemId);
                alert(message);
                this.updateUI('inventory-screen');
            } else if (action === 'use-consumable') {
                this.useConsumable(itemId);
            } else if (action === 'equip-item') {
                if (this.player.equipItem(itemId)) {
                    alert('Item equipado!');
                    this.updateUI('inventory-screen');
                }
            }
        });

        // Loja
        document.getElementById('shop-content').addEventListener('click', (e) => {
            if (e.target.dataset.action === 'buy-item') {
                const itemId = e.target.dataset.itemId;
                const price = parseInt(e.target.dataset.price);
                const quantity = parseInt(e.target.dataset.quantity);
                
                if (this.player.gold >= price) {
                    this.player.gold -= price;
                    this.player.addItem(itemId, quantity);
                    
                    // Remover item da loja
                    const shopItemIndex = this.ui.shop.items.findIndex(item => item.id === itemId);
                    if (shopItemIndex > -1) {
                        this.ui.shop.items.splice(shopItemIndex, 1);
                    }
                    
                    alert(`Você comprou ${DB.items[itemId].name} x${quantity}!`);
                    this.updateUI('shop-screen');
                } else {
                    alert('Ouro insuficiente!');
                }
            }
        });

        // Profissão
        document.getElementById('profession-content').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            
            if (action === 'learn-profession') {
                this.player.profession = { id: e.target.dataset.profId, level: 1, xp: 0 };
                this.updateUI('profession-screen');
            } else if (action === 'craft-item') {
                this.craftItem(e.target.dataset.recipeId);
            }
        });

        // Trabalhos
        document.getElementById('jobs-content').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            
            if (action === 'start-job') {
                const jobId = e.target.dataset.jobId;
                if (this.player.startJob(jobId)) {
                    alert(`Trabalho iniciado: ${DB.jobs[jobId].name}`);
                    this.updateUI('jobs-screen');
                }
            } else if (action === 'complete-job') {
                const completed = this.player.completeJob();
                if (completed) {
                    const job = DB.jobs[completed.id];
                    alert(`Trabalho concluído! Você ganhou ${job.rewards.gold} ouro!`);
                    this.updateUI('jobs-screen');
                }
            }
        });

        // Mundo
        document.getElementById('world-content').addEventListener('click', (e) => {
            if (e.target.dataset.action === 'enter-hunt') {
                this.enterHuntingGround(e.target.dataset.areaId);
            }
        });

        // Castelos
        document.getElementById('castles-content').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            
            if (action === 'buy-castle') {
                const castleId = e.target.dataset.castleId;
                if (this.player.buyCastle(castleId)) {
                    alert(`Castelo adquirido: ${DB.castles[castleId].name}!`);
                    this.updateUI('castles-screen');
                } else {
                    alert('Ouro insuficiente ou castelo já possuído!');
                }
            } else if (action === 'collect-income') {
                const income = this.player.collectCastleIncome();
                if (income > 0) {
                    alert(`Você coletou ${income} ouro dos seus castelos!`);
                    this.updateUI('castles-screen');
                } else {
                    alert('Nenhuma renda disponível para coleta!');
                }
            }
        });

        // Combate
        document.getElementById('combat-actions').addEventListener('click', (e) => {
            const action = e.target.dataset.combatAction;
            
            if (action === 'attack') {
                this.processCombatTurn('attack');
            } else if (action === 'skill') {
                this.processCombatTurn('skill', e.target.dataset.skillId);
            } else if (action === 'flee') {
                this.ui.endCombat();
                alert('Você fugiu do combate!');
            }
        });
    }

    useConsumable(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Consumable') return;
        
        if (!this.player.hasItem(itemId)) return;
        
        switch(item.effect) {
            case 'heal':
                this.player.heal(item.power);
                alert(`Você recuperou ${item.power} HP!`);
                break;
            case 'mana':
                this.player.mp = Math.min(this.player.mp + item.power, this.player.getMaxMp());
                alert(`Você recuperou ${item.power} MP!`);
                break;
            case 'cure_poison':
                this.player.statusEffects = this.player.statusEffects.filter(e => e.type !== STATUS_EFFECTS.POISON);
                alert('Veneno curado!');
                break;
        }
        
        this.player.removeItem(itemId, 1);
        this.updateUI('inventory-screen');
    }

    craftItem(recipeId) {
        if (!this.player.profession) return;
        
        const profData = DB.professions[this.player.profession.id];
        const recipe = profData.recipes.find(r => r.id === recipeId);
        
        if (!recipe) return;
        
        if (this.player.profession.level < recipe.requiredLevel) {
            alert('Nível de profissão insuficiente!');
            return;
        }
        
        if (!this.player.hasMaterials(recipe.materials)) {
            alert('Materiais insuficientes!');
            return;
        }
        
        // Remover materiais
        for(const matId in recipe.materials) {
            this.player.removeItem(matId, recipe.materials[matId]);
        }
        
        // Adicionar item criado
        this.player.addItem(recipe.result, 1);
        
        // Ganhar XP de profissão
        this.player.profession.xp += recipe.xp;
        const xpToNext = this.player.profession.level * 100;
        
        if (this.player.profession.xp >= xpToNext) {
            this.player.profession.level++;
            this.player.profession.xp -= xpToNext;
            alert(`Profissão subiu para nível ${this.player.profession.level}!`);
        }
        
        alert(`Você criou: ${DB.items[recipe.result].name}!`);
        this.updateUI('profession-screen');
    }

    enterHuntingGround(areaId) {
        const area = DB.huntingGrounds[areaId];
        
        // Evento aleatório antes do combate
        if (Math.random() < 0.2) {
            const events = [
                "Você encontrou um baú escondido!",
                "Uma emboscada! Inimigo extra aparece!",
                "Você encontrou algumas moedas no chão!",
                "Um mercador perdido oferece um desconto!"
            ];
            
            const event = events[Math.floor(Math.random() * events.length)];
            alert(event);
            
            if (event.includes("baú")) {
                this.player.addItem("i008", 1); // Gema azul
            } else if (event.includes("moedas")) {
                this.player.gold += Math.floor(Math.random() * 50) + 10;
            }
        }
        
        // Selecionar inimigo aleatório da área
        const enemyId = area.enemies[Math.floor(Math.random() * area.enemies.length)];
        const enemyData = DB.enemies[enemyId];
        const enemy = new Enemy(enemyData);
        
        this.ui.startCombat(this.player, enemy);
    }

    processCombatTurn(action, skillId = null) {
        const combat = this.ui.currentCombat;
        if (!combat) return;
        
        let combatEnded = false;
        
        if (combat.playerTurn) {
            if (action === 'attack') {
                combatEnded = combat.playerAttack();
            } else if (action === 'skill' && skillId) {
                combatEnded = combat.playerUseSkill(skillId);
            }
            
            if (combatEnded) {
                this.endCombatVictory(combat.enemy);
                return;
            }
        }
        
        combat.nextTurn();
        
        if (!combat.playerTurn) {
            setTimeout(() => {
                const playerDefeated = combat.enemyTurn();
                
                if (playerDefeated) {
                    this.endCombatDefeat();
                    return;
                }
                
                combat.nextTurn();
                this.ui.renderCombat();
            }, 1000);
        }
        
        this.ui.renderCombat();
    }

    endCombatVictory(enemy) {
        // Ganhar XP
        this.player.gainXp(enemy.xpValue);
        
        // Loot
        let lootMessage = `Vitória! Você ganhou ${enemy.xpValue} XP!\n\nItens encontrados:\n`;
        let foundItems = false;
        
        enemy.loot.forEach(lootItem => {
            if (Math.random() < lootItem.chance) {
                this.player.addItem(lootItem.id, 1);
                lootMessage += `- ${DB.items[lootItem.id].name}\n`;
                foundItems = true;
            }
        });
        
        if (!foundItems) {
            lootMessage += "Nenhum item encontrado.";
        }
        
        this.ui.endCombat();
        alert(lootMessage);
        this.updateUI();
    }

    endCombatDefeat() {
        this.ui.endCombat();
        alert('Você foi derrotado! Você perdeu um pouco de ouro...');
        this.player.gold = Math.max(0, this.player.gold - Math.floor(this.player.gold * 0.1));
        this.player.hp = Math.floor(this.player.getMaxHp() * 0.1);
        this.updateUI();
    }

    updateUI(activeScreen) {
        const currentActiveScreen = activeScreen || document.querySelector('.screen.active')?.id;
        
        switch (currentActiveScreen) {
            case 'status-screen':
                this.ui.renderStatus(this.player);
                break;
            case 'inventory-screen':
                this.ui.renderInventory(this.player);
                break;
            case 'shop-screen':
                this.ui.renderShop(this.player);
                break;
            case 'profession-screen':
                this.ui.renderProfession(this.player);
                break;
            case 'jobs-screen':
                this.ui.renderJobs(this.player);
                break;
            case 'world-screen':
                this.ui.renderWorld(this.player);
                break;
            case 'castles-screen':
                this.ui.renderCastles(this.player);
                break;
        }
    }
}

window.onload = () => new GameManager();