// =================================================================================
// GERENCIADORES E LÓGICA PRINCIPAL - VERSÃO 0.14
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
        this.activeEvents = []; // Eventos ativos
    }

    update(secondsPassed) {
        this.gameTime.setMinutes(this.gameTime.getMinutes() + secondsPassed);
        this.checkSeasonChange();
        this.checkGlobalEvents();
        this.updateActiveEvents();
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
            "Primavera": ["Ensolarado", "Chuvoso", "Nublado", "Ventoso"],
            "Verão": ["Ensolarado", "Muito Quente", "Seco"],
            "Outono": ["Nublado", "Chuvoso", "Ventoso", "Frio"],
            "Inverno": ["Nevando", "Frio", "Nublado", "Ventoso"]
        };
        
        const options = weatherBySeason[this.season];
        this.weather = options[Math.floor(Math.random() * options.length)];
    }

    checkGlobalEvents() {
        const elapsed = Date.now() - this.lastEventCheck;
        if (elapsed >= 15 * 60 * 1000) { // Verificar a cada 15 minutos
            this.lastEventCheck = Date.now();
            
            if (Math.random() < 0.4) { // 40% de chance
                this.triggerGlobalEvent();
            }
        }
    }

    triggerGlobalEvent() {
        const events = {
            "Primavera": [
                { text: "🌸 Festival da Primavera começou! Todos os trabalhos dão 25% mais XP!", effect: "xp_boost", duration: 3600 },
                { text: "🌱 Época de plantio! Coletores de ervas encontram mais ingredientes!", effect: "herb_boost", duration: 7200 },
                { text: "🦋 Migração das borboletas! Chance aumentada de encontrar itens raros!", effect: "luck_boost", duration: 1800 },
                { text: "🌧️ Chuva revigorante! Regeneração de HP/MP aumentada!", effect: "regen_boost", duration: 2700 },
                { text: "🌿 Despertar da natureza! Habilidades de cura são mais efetivas!", effect: "heal_boost", duration: 3600 }
            ],
            "Verão": [
                { text: "☀️ Onda de calor! Mineradores trabalham mais devagar, mas encontram mais ouro!", effect: "mining_boost", duration: 5400 },
                { text: "🏖️ Temporada de aventuras! Exploradores ganham recompensas extras!", effect: "adventure_boost", duration: 7200 },
                { text: "🔥 Dragões estão mais ativos! Cuidado ao caçar, mas loot é melhor!", effect: "dragon_activity", duration: 3600 },
                { text: "🌞 Sol escaldante! Habilidades de fogo causam mais dano!", effect: "fire_boost", duration: 1800 },
                { text: "💎 Cristais se formam no calor! Chance de encontrar gemas raras!", effect: "crystal_formation", duration: 4500 }
            ],
            "Outono": [
                { text: "🍂 Colheita abundante! Lenhadores e coletores ganham recursos extras!", effect: "harvest_boost", duration: 6000 },
                { text: "🎃 Noite das Bruxas se aproxima! Magos sombrios aparecem com mais frequência!", effect: "dark_magic", duration: 3600 },
                { text: "🌰 Época de preparação! Todos os trabalhos de coleta rendem 60% mais!", effect: "gathering_boost", duration: 5400 },
                { text: "🍁 Folhas mágicas no ar! Consumíveis são mais efetivos!", effect: "potion_boost", duration: 2700 },
                { text: "🧙‍♀️ Energia arcana flutuante! MP regenera mais rápido!", effect: "mana_flow", duration: 3600 }
            ],
            "Inverno": [
                { text: "❄️ Tempestade de neve! Alguns trabalhos ficam indisponíveis!", effect: "winter_storm", duration: 7200 },
                { text: "🎄 Festivais de inverno! Mercadores oferecem descontos especiais!", effect: "winter_sale", duration: 10800 },
                { text: "🧊 Criaturas do gelo aparecem! Novos inimigos nos campos de caça!", effect: "ice_creatures", duration: 5400 },
                { text: "⛄ Magia do inverno! Habilidades de gelo são mais poderosas!", effect: "ice_boost", duration: 2700 },
                { text: "🌨️ Nevasca purificadora! Remove todos os efeitos negativos!", effect: "purification", duration: 0 }
            ]
        };

        // Eventos especiais raros
        const specialEvents = [
            { text: "🌟 Eclipse Solar! Todas as habilidades custam 50% menos MP!", effect: "eclipse", duration: 900 },
            { text: "💫 Chuva de meteoros! XP de combate dobrado!", effect: "meteor_shower", duration: 1800 },
            { text: "🌙 Lua Cheia! Transformações e habilidades especiais são mais poderosas!", effect: "full_moon", duration: 3600 },
            { text: "⚡ Tempestade mágica! Todos os atributos temporariamente aumentados!", effect: "magic_storm", duration: 1200 },
            { text: "🎭 Carnaval dos Deuses! Loot de todos os inimigos triplicado!", effect: "divine_carnival", duration: 2700 },
            { text: "🔥 Invasão Demoníaca! Monstros mais fortes, mas loot melhor!", effect: "demon_invasion", duration: 3600 },
            { text: "🌊 Tsunami Mágico! Habilidades de água são mais poderosas!", effect: "magic_tsunami", duration: 2400 },
            { text: "⚔️ Torneio dos Heróis! XP de combate triplicado!", effect: "hero_tournament", duration: 5400 },
            { text: "💎 Era de Cristal! Chance de encontrar itens raros aumentada!", effect: "crystal_age", duration: 7200 },
            { text: "🌪️ Ventos do Destino! Movimento e agilidade aumentados!", effect: "destiny_winds", duration: 1800 },
            { text: "🕰️ Distorção Temporal! Tempo passa mais rápido!", effect: "time_distortion", duration: 3600 },
            { text: "🌈 Arco-íris Mágico! Todos os elementos são mais poderosos!", effect: "magic_rainbow", duration: 2700 },
            { text: "🌌 Portal Dimensional! Chance de encontrar itens únicos!", effect: "dimensional_portal", duration: 1800 },
            { text: "⚜️ Bênção Real! Todos os atributos aumentados em 50%!", effect: "royal_blessing", duration: 3600 },
            { text: "🔮 Profecia Mágica! Habilidades especiais desbloqueadas!", effect: "magic_prophecy", duration: 5400 },
            { text: "🎪 Festival dos Elementos! Habilidades elementais são mais poderosas!", effect: "elemental_festival", duration: 7200 },
            { text: "⚔️ Guerra dos Deuses! Combate mais intenso, recompensas maiores!", effect: "gods_war", duration: 10800 },
            { text: "🌍 Convergência Dimensional! Realidade alterada temporariamente!", effect: "dimensional_convergence", duration: 3600 },
            { text: "💫 Chuva de Estrelas! XP e loot multiplicados por 5!", effect: "star_shower", duration: 1800 },
            { text: "🔥 Apocalipse Controlado! Poder supremo temporário!", effect: "controlled_apocalypse", duration: 900 }
        ];

        let eventPool = events[this.season];
        
        // 10% de chance de evento especial
        if (Math.random() < 0.1) {
            eventPool = specialEvents;
        }

        const event = eventPool[Math.floor(Math.random() * eventPool.length)];
        
        this.activeEvents.push({
            ...event,
            startTime: Date.now(),
            id: Date.now() + Math.random()
        });
        
        gameManager.ui.showGlobalEvent(event.text);
    }

    updateActiveEvents() {
        const now = Date.now();
        this.activeEvents = this.activeEvents.filter(event => {
            if (event.duration === 0) return false; // Eventos instantâneos
            return (now - event.startTime) < (event.duration * 1000);
        });
    }

    getActiveEventBonuses() {
        const bonuses = {};
        this.activeEvents.forEach(event => {
            bonuses[event.effect] = true;
        });
        return bonuses;
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
            "Ventoso": "ph-bold ph-wind",
            "Seco": "ph-bold ph-sun-dim"
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
        this.setupSkillSlots();
    }

    cacheDOM() {
        console.log('🔍 Cacheando elementos do DOM...');
        
        // Cachear elementos imediatamente
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
        
        // Novos elementos
        this.equipmentSlots = document.querySelectorAll('.equipment-slot');
        this.skillSlots = document.querySelectorAll('.skill-slot');
        this.equipmentAvailable = document.getElementById('equipment-available');
        this.skillsAvailable = document.getElementById('skills-available');
        this.structuresContent = document.getElementById('structures-content');
        
        console.log('✅ DOM cacheado:', {
            hubButtons: this.hubButtons.length,
            backButtons: this.backButtons.length,
            screens: this.screens.length,
            statusContent: !!this.statusContent,
            worldContent: !!this.worldContent
        });
        
        // Verificar se elementos críticos foram encontrados
        if (this.hubButtons.length === 0) {
            console.warn('⚠️ Nenhum hub button encontrado!');
        }
        if (this.backButtons.length === 0) {
            console.warn('⚠️ Nenhum back button encontrado!');
        }
        if (!this.statusContent) {
            console.warn('⚠️ Status content não encontrado!');
        }
        if (!this.worldContent) {
            console.warn('⚠️ World content não encontrado!');
        }
    }

    setupSkillSlots() {
        const skillSlotsContainer = document.querySelector('.skill-slots');
        if (skillSlotsContainer) {
            skillSlotsContainer.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const slot = document.createElement('div');
                slot.className = 'skill-slot empty';
                slot.dataset.slotIndex = i;
                slot.textContent = `Slot ${i + 1}`;
                skillSlotsContainer.appendChild(slot);
            }
        }
    }

    showScreen(screenId) {
        console.log('🖥️ Mostrando tela:', screenId);
        
        // Verificar se a tela existe
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) {
            console.error('❌ Tela não encontrada:', screenId);
            return false;
        }
        
        // Esconder todas as telas
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar tela selecionada
        targetScreen.classList.add('active');
        console.log('✅ Tela ativada:', screenId);
        
        return true;
    }

    showGlobalEvent(eventText) {
        this.eventText.textContent = eventText;
        this.eventBanner.classList.remove('hidden');
        
        // Auto-fechar após 12 segundos
        setTimeout(() => {
            this.eventBanner.classList.add('hidden');
        }, 12000);
    }

    renderStatus(player) {
        console.log('📊 Renderizando status do jogador...');
        
        try {
            if (!this.statusContent) {
                console.error('❌ Status content não encontrado!');
                return;
            }
            
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

        // Habilidades equipadas
        let equippedSkillsHtml = player.equippedSkills.map(skillId => 
            `<li><span class="rarity-Raro">${DB.skills[skillId].name}</span> - ${DB.skills[skillId].description}</li>`
        ).join('') || '<li>Nenhuma habilidade equipada</li>';

        // Status Effects
        let statusEffectsHtml = player.statusEffects.map(effect => 
            `<span class="status-effect ${effect.type}">${effect.type} (${effect.duration})</span>`
        ).join('') || '<span>Nenhum efeito ativo</span>';

        // Buffs temporários
        let tempBuffsHtml = player.getActiveBuffs().map(buff => {
            const remaining = Math.ceil((buff.duration * 1000 - (Date.now() - buff.startTime)) / 1000);
            return `<span class="temp-buff ${buff.type}">${buff.type} (${remaining}s)</span>`;
        }).join('') || '<span>Nenhum buff ativo</span>';

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
                    ${createStatLine("Poder Mágico", player.getMagicPower())}
                </div>
            </div>
            <div class="status-section">
                <h3>Equipamentos</h3>
                <div class="status-grid">${equipmentHtml}</div>
            </div>
            <div class="status-section">
                <h3>Habilidades Equipadas (${player.equippedSkills.length}/${player.maxEquippedSkills})</h3>
                <ul>${equippedSkillsHtml}</ul>
            </div>
            <div class="status-section">
                <h3>Efeitos de Status</h3>
                <div class="status-effects">${statusEffectsHtml}</div>
            </div>
            <div class="status-section">
                <h3>Buffs Temporários</h3>
                <div class="temp-buffs">${tempBuffsHtml}</div>
            </div>
        `;
        
        console.log('✅ Status renderizado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao renderizar status:', error);
        }
    }

    renderEquipment(player) {
        // Atualizar slots de equipamentos visuais
        document.querySelectorAll('.equipment-slot').forEach(slot => {
            const slotType = slot.dataset.slot;
            const equippedItem = player.equipment[slotType];
            
            slot.classList.toggle('equipped', !!equippedItem);
            
            if (equippedItem) {
                const itemData = DB.items[equippedItem.id];
                slot.innerHTML = `
                    <i class="${slot.querySelector('i').className}"></i>
                    <span class="rarity-${itemData.rarity}">${itemData.name}</span>
                    <button class="action-button unequip" data-action="unequip" data-slot="${slotType}">Remover</button>
                `;
            } else {
                const originalContent = slot.dataset.originalContent || slot.innerHTML;
                slot.dataset.originalContent = originalContent;
                slot.innerHTML = originalContent;
            }
        });

        // Mostrar equipamentos disponíveis
        const availableEquipment = player.inventory.filter(item => 
            DB.items[item.id].type === 'Equipment'
        );

        this.equipmentAvailable.innerHTML = '';
        if (availableEquipment.length === 0) {
            this.equipmentAvailable.innerHTML = '<p>Nenhum equipamento disponível</p>';
            return;
        }

        availableEquipment.forEach(item => {
            const itemData = DB.items[item.id];
            const div = document.createElement('div');
            div.className = 'inventory-item';
            div.innerHTML = `
                <span class="item-name rarity-${itemData.rarity}">${itemData.name}</span>
                <span>${item.quantity}x</span>
                <span>${itemData.slot}</span>
                <button class="action-button equip" data-action="equip-equipment" data-item-id="${item.id}">Equipar</button>
            `;
            this.equipmentAvailable.appendChild(div);
        });
    }

    renderSkills(player) {
        // Atualizar slots de habilidades visuais
        document.querySelectorAll('.skill-slot').forEach((slot, index) => {
            const equippedSkill = player.equippedSkills[index];
            
            slot.classList.toggle('equipped', !!equippedSkill);
            slot.classList.toggle('empty', !equippedSkill);
            
            if (equippedSkill) {
                const skillData = DB.skills[equippedSkill];
                slot.innerHTML = `
                    <span class="rarity-${skillData.element || 'Raro'}">${skillData.name}</span>
                    <button class="action-button unequip" data-action="unequip-skill" data-skill-id="${equippedSkill}">X</button>
                `;
            } else {
                slot.innerHTML = `Slot ${index + 1}`;
            }
        });

        // Mostrar habilidades disponíveis
        this.skillsAvailable.innerHTML = '';
        if (player.skills.length === 0) {
            this.skillsAvailable.innerHTML = '<p>Nenhuma habilidade conhecida. Use grimórios para aprender!</p>';
            return;
        }

        player.skills.forEach(skillId => {
            const skillData = DB.skills[skillId];
            const isEquipped = player.equippedSkills.includes(skillId);
            const canEquip = !isEquipped && player.equippedSkills.length < player.maxEquippedSkills;
            
            const div = document.createElement('div');
            div.className = 'skill-item';
            div.innerHTML = `
                <div>
                    <strong class="rarity-${skillData.element || 'Raro'}">${skillData.name}</strong>
                    <span class="skill-element ${skillData.element || 'arcane'}">${skillData.element || 'arcane'}</span>
                    <br><small>${skillData.description}</small>
                    <br><small>Custo: ${skillData.cost} MP | Tipo: ${skillData.type}</small>
                </div>
                <span>${skillData.type}</span>
                <span>
                    ${isEquipped ? 
                        `<button class="action-button unequip" data-action="unequip-skill" data-skill-id="${skillId}">Desequipar</button>` :
                        `<button class="action-button equip" data-action="equip-skill" data-skill-id="${skillId}" ${!canEquip ? 'disabled' : ''}>Equipar</button>`
                    }
                </span>
            `;
            this.skillsAvailable.appendChild(div);
        });
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
                useButton = `<button class="action-button use" data-action="use-grimoire" data-item-id="${item.id}">Usar</button>`;
            } else if (itemData.type === 'Consumable') {
                useButton = `<button class="action-button use" data-action="use-consumable" data-item-id="${item.id}">Usar</button>`;
            } else if (itemData.type === 'Equipment') {
                useButton = `<button class="action-button equip" data-action="equip-item" data-item-id="${item.id}">Equipar</button>`;
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

        // Aplicar desconto de estruturas
        const discount = player.structureBonuses.shop_discount;

        this.shop.items.forEach(shopItem => {
            const itemData = DB.items[shopItem.id];
            const div = document.createElement('div');
            div.className = 'shop-item';

            const finalPrice = Math.floor(shopItem.price * (1 - discount));
            const canBuy = player.gold >= finalPrice;
            
            div.innerHTML = `
                <span class="item-name rarity-${itemData.rarity}">${itemData.name}</span>
                <span>${shopItem.quantity}x</span>
                <span>${finalPrice} ouro ${discount > 0 ? `<small>(${Math.floor(discount * 100)}% off)</small>` : ''}</span>
                <button class="action-button" data-action="buy-item" data-item-id="${shopItem.id}" data-price="${finalPrice}" data-quantity="${shopItem.quantity}" ${!canBuy ? 'disabled' : ''}>Comprar</button>
            `;
            this.shopContent.appendChild(div);
        });
    }

    renderProfession(player) {
        if (!player.profession) {
            let professionsHtml = '<div class="profession-selector">';
            Object.entries(DB.professions).forEach(([id, prof]) => {
                const bonusText = Object.entries(prof.bonus || {}).map(([key, value]) => 
                    `${key}: ${typeof value === 'number' ? (value > 1 ? `+${Math.floor((value - 1) * 100)}%` : `+${value}`) : value}`
                ).join(', ');
                
                professionsHtml += `
                    <div class="profession-card" data-action="learn-profession" data-prof-id="${id}">
                        <h4>${prof.name}</h4>
                        <p>${prof.description}</p>
                        <div class="profession-bonus">Bônus: ${bonusText}</div>
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
        
        // Aplicar bônus de velocidade de criação
        const craftingSpeed = player.structureBonuses.crafting_speed * player.getProfessionBonus('crafting_speed');
        
        let recipesHtml = '<div class="recipes-list">';
        profData.recipes.forEach(recipe => {
            const canCraft = player.profession.level >= recipe.requiredLevel && player.hasMaterials(recipe.materials);
            const materials = Object.entries(recipe.materials).map(([matId, qty]) => 
                `<span class="rarity-${DB.items[matId].rarity}">${DB.items[matId].name}</span> x${qty}`
            ).join(', ');
            
            recipesHtml += `
                <div class="recipe-item">
                    <div>
                        <strong class="rarity-${DB.items[recipe.result].rarity}">${recipe.name}</strong>
                        <div class="recipe-materials">Materiais: ${materials}</div>
                        <div class="recipe-requirements">Nível necessário: ${recipe.requiredLevel}</div>
                        ${craftingSpeed > 1 ? `<div class="recipe-requirements">Velocidade: +${Math.floor((craftingSpeed - 1) * 100)}%</div>` : ''}
                    </div>
                    <span>+${recipe.xp} XP</span>
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
        console.log('🌍 Renderizando tela do mundo...');
        
        try {
            if (!this.worldContent) {
                console.error('❌ World content não encontrado!');
                return;
            }
            
            if (!DB.huntingGrounds) {
                console.error('❌ DB.huntingGrounds não encontrado!');
                return;
            }
            
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
                        <button class="action-button" data-action="enter-hunting-ground" data-area-id="${id}">Explorar</button>
                    </div>
                `;
            });

            this.worldContent.innerHTML = worldHtml;
            console.log('✅ Mundo renderizado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao renderizar mundo:', error);
        }
    }

    renderStructures(player) {
        const builtStructuresHtml = player.ownedStructures.length > 0 ? 
            player.ownedStructures.map(structureId => {
                const structure = DB.structures[structureId];
                return `
                    <div class="structure-item">
                        <div class="structure-info">
                            <div class="structure-name">${structure.name}</div>
                            <div class="structure-description">${structure.description}</div>
                            <div class="structure-bonus">
                                ${Object.entries(structure.bonus).map(([key, value]) => 
                                    `${key}: ${typeof value === 'number' ? 
                                        (value > 1 ? `+${Math.floor((value - 1) * 100)}%` : `+${value}`) : 
                                        value}`
                                ).join(', ')}
                            </div>
                        </div>
                        <div class="structure-built">CONSTRUÍDA</div>
                        <span></span>
                    </div>
                `;
            }).join('') : '<p>Nenhuma estrutura construída.</p>';

        const availableStructuresHtml = Object.entries(DB.structures)
            .filter(([id]) => !player.ownedStructures.includes(id))
            .map(([id, structure]) => {
                const canBuild = player.canBuildStructure(id);
                const costHtml = Object.entries(structure.cost).map(([itemId, quantity]) => {
                    if (itemId === 'gold') {
                        return `<div class="structure-cost-item">💰 ${quantity} ouro</div>`;
                    } else {
                        const itemData = DB.items[itemId];
                        const hasEnough = player.hasItem(itemId, quantity);
                        return `<div class="structure-cost-item ${hasEnough ? '' : 'insufficient'}">
                            <span class="rarity-${itemData.rarity}">${itemData.name}</span> x${quantity}
                        </div>`;
                    }
                }).join('');

                return `
                    <div class="structure-item">
                        <div class="structure-info">
                            <div class="structure-name">${structure.name}</div>
                            <div class="structure-description">${structure.description}</div>
                            <div class="structure-bonus">
                                ${Object.entries(structure.bonus).map(([key, value]) => 
                                    `${key}: ${typeof value === 'number' ? 
                                        (value > 1 ? `+${Math.floor((value - 1) * 100)}%` : `+${value}`) : 
                                        value}`
                                ).join(', ')}
                            </div>
                        </div>
                        <div class="structure-cost">${costHtml}</div>
                        <button class="action-button" data-action="build-structure" data-structure-id="${id}" ${!canBuild ? 'disabled' : ''}>Construir</button>
                    </div>
                `;
            }).join('');

        document.getElementById('built-structures-list').innerHTML = builtStructuresHtml;
        document.getElementById('available-structures-list').innerHTML = availableStructuresHtml || '<p>Todas as estruturas já foram construídas!</p>';
    }

    renderCastles(player) {
        let castlesHtml = '<h3>Castelos Disponíveis</h3>';
        
        // Mostrar renda dos castelos possuídos
        if (player.ownedCastles.length > 0) {
            let totalIncome = 0;
            player.ownedCastles.forEach(castleId => {
                totalIncome += player.getCastleIncome(castleId);
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
            const level = player.castleLevels[id] || 1;
            const income = owned ? player.getCastleIncome(id) : castle.income;
            const canUpgrade = owned && level < castle.maxLevel && player.gold >= (castle.upgradeCost * level);
            
            castlesHtml += `
                <div class="castle-item">
                    <div class="castle-info">
                        <div class="castle-name">${castle.name} ${owned ? '(Possuído)' : ''}</div>
                        <div class="castle-level">Nível ${level}/${castle.maxLevel}</div>
                        <div>${castle.description}</div>
                        <div>Renda: ${income} ouro/6h</div>
                    </div>
                    <div>
                        ${owned ? `Nível ${level}` : `Custo: ${castle.cost}`}
                        ${owned && level < castle.maxLevel ? `<br>Upgrade: ${castle.upgradeCost * level}` : ''}
                    </div>
                    <div class="castle-actions">
                        ${!owned ? 
                            `<button class="action-button" data-action="buy-castle" data-castle-id="${id}" ${!canBuy ? 'disabled' : ''}>Comprar</button>` :
                            (level < castle.maxLevel ? 
                                `<button class="upgrade-button" data-action="upgrade-castle" data-castle-id="${id}" ${!canUpgrade ? 'disabled' : ''}>Melhorar</button>` :
                                '<span class="structure-built">MAX</span>'
                            )
                        }
                    </div>
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

        // Ações disponíveis - apenas habilidades equipadas
        let actionsHtml = `<button class="action-button" data-combat-action="attack">Atacar</button>`;
        
        player.equippedSkills.forEach(skillId => {
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
        this.world = new WorldManager();
        this.player = new Player();
        this.ui = new UIManager();
    }

    initialize() {
        console.log('🚀 Inicializando jogo...');
        
        // Configurar navegação imediatamente
        this.setupNavigation();
        
        // Aguardar um pouco mais para garantir que tudo esteja carregado
        setTimeout(() => {
            this.bindEvents();
            this.ui.showScreen('hub-screen');
            this.updateUI();
            setInterval(() => this.gameLoop(), 1000);
            console.log('✅ Jogo inicializado com sucesso!');
        }, 100);
    }

    setupNavigation() {
        console.log('🔧 Configurando navegação...');
        
        // Navegação principal - hub buttons
        const hubButtons = document.querySelectorAll('.hub-button');
        hubButtons.forEach((button) => {
            // Remover event listeners existentes para evitar duplicação
            button.removeEventListener('click', button._navigationHandler);
            
            // Criar novo handler
            button._navigationHandler = () => {
                console.log('🎯 Botão clicado:', button.textContent.trim());
                const screenId = button.dataset.screen;
                console.log('🎯 Mudando para tela:', screenId);
                
                if (screenId) {
                    this.ui.showScreen(screenId);
                    this.updateUI(screenId);
                    console.log('✅ Navegação realizada para:', screenId);
                } else {
                    console.error('❌ Screen ID não encontrado para botão:', button.textContent.trim());
                }
            };
            
            button.addEventListener('click', button._navigationHandler);
        });
        
        // Navegação de volta - back buttons
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach((button) => {
            // Remover event listeners existentes para evitar duplicação
            button.removeEventListener('click', button._backHandler);
            
            // Criar novo handler
            button._backHandler = () => {
                console.log('🎯 Botão voltar clicado');
                const screenId = button.dataset.screen;
                
                if (screenId) {
                    this.ui.showScreen(screenId);
                    this.updateUI(screenId);
                    console.log('✅ Voltou para tela:', screenId);
                } else {
                    console.error('❌ Screen ID não encontrado para botão voltar');
                }
            };
            
            button.addEventListener('click', button._backHandler);
        });
        
        console.log(`✅ Navegação configurada: ${hubButtons.length} hub buttons, ${backButtons.length} back buttons`);
    }

    gameLoop() {
        this.world.update(1);
        this.ui.renderWorldInfo(this.world);
        this.player.updateStatusEffects();
        
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
        console.log('Configurando event listeners...');
        
        // Configurar navegação imediatamente
        this.setupNavigation();
        
        // Aguardar um pouco para garantir que os elementos existam
        setTimeout(() => {
            this.ui.hubButtons = document.querySelectorAll('.hub-button');
            this.ui.backButtons = document.querySelectorAll('.back-button');
            
            console.log('hubButtons encontrados:', this.ui.hubButtons.length);
            console.log('backButtons encontrados:', this.ui.backButtons.length);
            
            // Reconfigurar navegação após cache do DOM
            this.setupNavigation();

            // Fechar evento global
            const closeEventBtn = document.getElementById('close-event');
            if (closeEventBtn) {
                closeEventBtn.addEventListener('click', () => {
                    this.ui.eventBanner.classList.add('hidden');
                });
            }

            // Status
            const statusContent = document.getElementById('status-content');
            if (statusContent) {
                statusContent.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON' && e.target.dataset.stat) {
                        if (this.player.addAttribute(e.target.dataset.stat)) {
                            this.ui.renderStatus(this.player);
                        }
                    }
                });
            }

            // Equipamentos
            document.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                
                if (action === 'equip-equipment') {
                    const itemId = e.target.dataset.itemId;
                    if (this.player.equipItem(itemId)) {
                        alert('Item equipado!');
                        this.updateUI('equipment-screen');
                    }
                } else if (action === 'unequip') {
                    const slot = e.target.dataset.slot;
                    if (this.player.unequipItem(slot)) {
                        alert('Item removido!');
                        this.updateUI('equipment-screen');
                    }
                }
            });

            // Habilidades
            document.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                
                if (action === 'equip-skill') {
                    const skillId = e.target.dataset.skillId;
                    if (this.player.equipSkill(skillId)) {
                        alert('Habilidade equipada!');
                        this.updateUI('skills-screen');
                    } else {
                        alert('Não foi possível equipar a habilidade!');
                    }
                } else if (action === 'unequip-skill') {
                    const skillId = e.target.dataset.skillId;
                    if (this.player.unequipSkill(skillId)) {
                        alert('Habilidade removida!');
                        this.updateUI('skills-screen');
                    }
                }
            });

            // Inventário
            const inventoryList = document.getElementById('inventory-list');
            if (inventoryList) {
                inventoryList.addEventListener('click', (e) => {
                    const action = e.target.dataset.action;
                    const itemId = e.target.dataset.itemId;
                    
                    if (action === 'use-grimoire') {
                        const message = this.player.learnSkillFromGrimoire(itemId);
                        alert(message);
                        this.updateUI('inventory-screen');
                    } else if (action === 'use-consumable') {
                        const result = this.player.useConsumable(itemId);
                        if (result.success) {
                            alert(result.message);
                            this.updateUI('inventory-screen');
                        } else {
                            alert(result.message);
                        }
                    } else if (action === 'equip-item') {
                        if (this.player.equipItem(itemId)) {
                            alert('Item equipado!');
                            this.updateUI('inventory-screen');
                        }
                    }
                });
            }

            // Loja
            const shopContent = document.getElementById('shop-content');
            if (shopContent) {
                shopContent.addEventListener('click', (e) => {
                    if (e.target.dataset.action === 'buy-item') {
                        const itemId = e.target.dataset.itemId;
                        const result = this.player.buyItem(itemId);
                        if (result.success) {
                            alert(`Comprou ${DB.items[itemId].name} por ${result.cost} ouro!`);
                            this.updateUI('shop-screen');
                        } else {
                            alert(result.message);
                        }
                    }
                });
            }

            // Profissão
            const professionContent = document.getElementById('profession-content');
            if (professionContent) {
                professionContent.addEventListener('click', (e) => {
                    if (e.target.dataset.action === 'select-profession') {
                        const profession = e.target.dataset.profession;
                        this.player.selectProfession(profession);
                        this.updateUI('profession-screen');
                    } else if (e.target.dataset.action === 'craft-item') {
                        const recipeId = e.target.dataset.recipeId;
                        this.craftItem(recipeId);
                    }
                });
            }

            // Trabalhos
            const jobsContent = document.getElementById('jobs-content');
            if (jobsContent) {
                jobsContent.addEventListener('click', (e) => {
                    if (e.target.dataset.action === 'start-job') {
                        const jobId = e.target.dataset.jobId;
                        const result = this.player.startJob(jobId);
                        if (result.success) {
                            alert(`Iniciou trabalho: ${DB.jobs[jobId].name}`);
                            this.updateUI('jobs-screen');
                        } else {
                            alert(result.message);
                        }
                    }
                });
            }

            // Mundo
            const worldContent = document.getElementById('world-content');
            if (worldContent) {
                worldContent.addEventListener('click', (e) => {
                    if (e.target.dataset.action === 'enter-hunting-ground') {
                        const areaId = e.target.dataset.areaId;
                        this.enterHuntingGround(areaId);
                    }
                });
            }

            // Estruturas
            document.addEventListener('click', (e) => {
                if (e.target.dataset.action === 'build-structure') {
                    const structureId = e.target.dataset.structureId;
                    const result = this.player.buildStructure(structureId);
                    if (result.success) {
                        alert(`Estrutura "${DB.structures[structureId].name}" construída!`);
                        this.updateUI('structures-screen');
                    } else {
                        alert(result.message);
                    }
                }
            });

            // Castelos
            const castlesContent = document.getElementById('castles-content');
            if (castlesContent) {
                castlesContent.addEventListener('click', (e) => {
                    if (e.target.dataset.action === 'conquer-castle') {
                        const castleId = e.target.dataset.castleId;
                        const result = this.player.conquerCastle(castleId);
                        if (result.success) {
                            alert(`Castelo "${DB.castles[castleId].name}" conquistado!`);
                            this.updateUI('castles-screen');
                        } else {
                            alert(result.message);
                        }
                    } else if (e.target.dataset.action === 'upgrade-castle') {
                        const castleId = e.target.dataset.castleId;
                        const result = this.player.upgradeCastle(castleId);
                        if (result.success) {
                            alert(`Castelo "${DB.castles[castleId].name}" melhorado!`);
                            this.updateUI('castles-screen');
                        } else {
                            alert(result.message);
                        }
                    }
                });
            }

            // Combate
            const combatActions = document.getElementById('combat-actions');
            if (combatActions) {
                combatActions.addEventListener('click', (e) => {
                    const action = e.target.dataset.action;
                    const skillId = e.target.dataset.skillId;
                    
                    if (action === 'attack') {
                        this.processCombatTurn('attack');
                    } else if (action === 'skill') {
                        this.processCombatTurn('skill', skillId);
                    } else if (action === 'item') {
                        this.processCombatTurn('item');
                    } else if (action === 'flee') {
                        this.processCombatTurn('flee');
                    }
                });
            }

            console.log('✅ Event listeners configurados com sucesso!');
        }, 300);
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
        if (Math.random() < 0.25) {
            const events = [
                { text: "Você encontrou um baú escondido!", item: "i008", quantity: 1 },
                { text: "Uma emboscada! Inimigo extra aparece!", effect: "extra_enemy" },
                { text: "Você encontrou algumas moedas no chão!", gold: Math.floor(Math.random() * 100) + 50 },
                { text: "Um mercador perdido oferece um desconto!", effect: "discount" },
                { text: "Fontes de energia mágica! MP restaurado!", effect: "restore_mp" },
                { text: "Ervas curativas! HP restaurado!", effect: "restore_hp" }
            ];
            
            const event = events[Math.floor(Math.random() * events.length)];
            alert(event.text);
            
            if (event.item) {
                this.player.addItem(event.item, event.quantity);
            } else if (event.gold) {
                this.player.gold += event.gold;
            } else if (event.effect === "restore_mp") {
                this.player.mp = this.player.getMaxMp();
            } else if (event.effect === "restore_hp") {
                this.player.hp = this.player.getMaxHp();
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
        // Aplicar bônus de eventos ativos
        const eventBonuses = this.world.getActiveEventBonuses();
        let xpMultiplier = 1;
        let lootMultiplier = 1;
        
        if (eventBonuses.xp_boost) xpMultiplier = 1.25;
        if (eventBonuses.meteor_shower) xpMultiplier = 2;
        if (eventBonuses.divine_carnival) lootMultiplier = 3;
        if (eventBonuses.luck_boost) lootMultiplier = 1.5;
        
        // Ganhar XP
        const baseXp = enemy.xpValue;
        const finalXp = Math.floor(baseXp * xpMultiplier);
        const gainedXp = this.player.gainXp(finalXp);
        
        // Loot
        let lootMessage = `Vitória! Você ganhou ${gainedXp} XP!\n\nItens encontrados:\n`;
        let foundItems = false;
        
        enemy.loot.forEach(lootItem => {
            let chance = lootItem.chance * lootMultiplier;
            if (Math.random() < chance) {
                this.player.addItem(lootItem.id, 1);
                lootMessage += `- ${DB.items[lootItem.id].name}\n`;
                foundItems = true;
            }
        });
        
        if (!foundItems) {
            lootMessage += "Nenhum item encontrado.";
        }
        
        // Bônus de gold por eventos
        if (eventBonuses.mining_boost || eventBonuses.adventure_boost) {
            const bonusGold = Math.floor(Math.random() * 50) + 25;
            this.player.gold += bonusGold;
            lootMessage += `\n+${bonusGold} ouro extra do evento!`;
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
        console.log('🔄 Atualizando UI para tela:', currentActiveScreen);
        
        if (!currentActiveScreen) {
            console.warn('⚠️ Nenhuma tela ativa encontrada');
            return;
        }
        
        try {
            switch (currentActiveScreen) {
                case 'status-screen':
                    console.log('📊 Renderizando status...');
                    this.ui.renderStatus(this.player);
                    break;
                case 'equipment-screen':
                    console.log('⚔️ Renderizando equipamentos...');
                    this.ui.renderEquipment(this.player);
                    break;
                case 'skills-screen':
                    console.log('🔮 Renderizando habilidades...');
                    this.ui.renderSkills(this.player);
                    break;
                case 'inventory-screen':
                    console.log('🎒 Renderizando inventário...');
                    this.ui.renderInventory(this.player);
                    break;
                case 'shop-screen':
                    console.log('🏪 Renderizando loja...');
                    this.ui.renderShop(this.player);
                    break;
                case 'profession-screen':
                    console.log('🔨 Renderizando profissão...');
                    this.ui.renderProfession(this.player);
                    break;
                case 'jobs-screen':
                    console.log('💼 Renderizando trabalhos...');
                    this.ui.renderJobs(this.player);
                    break;
                case 'world-screen':
                    console.log('🌍 Renderizando mundo...');
                    this.ui.renderWorld(this.player);
                    break;
                case 'structures-screen':
                    console.log('🏗️ Renderizando estruturas...');
                    this.ui.renderStructures(this.player);
                    break;
                case 'castles-screen':
                    console.log('🏰 Renderizando castelos...');
                    this.ui.renderCastles(this.player);
                    break;
                default:
                    console.warn('⚠️ Tela não reconhecida:', currentActiveScreen);
                    break;
            }
            console.log('✅ UI atualizada com sucesso para:', currentActiveScreen);
        } catch (error) {
            console.error('❌ Erro ao atualizar UI:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Inicializando RPG v0.14...');
    
    // Aguardar um pouco para garantir que todos os scripts estejam carregados
    setTimeout(() => {
        try {
            console.log('🔧 Criando GameManager...');
            const game = new GameManager();
            
            console.log('🚀 Inicializando jogo...');
            game.initialize();
            
            window.gameManager = game; // Para acesso global adicional
            console.log('✅ Jogo inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao inicializar o jogo:', error);
            console.error('Stack trace:', error.stack);
        }
    }, 100);
});