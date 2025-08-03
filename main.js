// =================================================================================
// GERENCIADORES E LÓGICA PRINCIPAL
// =================================================================================
class WorldManager {
    constructor() {
        this.gameTime = new Date();
        this.gameTime.setHours(8, 0, 0);
        this.weather = "Ensolarado";
        this.temperature = 25;
    }
    update(secondsPassed) {
        this.gameTime.setMinutes(this.gameTime.getMinutes() + secondsPassed);
    }
    getFormattedTime() {
        const hours = this.gameTime.getHours().toString().padStart(2, '0');
        const minutes = this.gameTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    getWeatherIcon() {
        switch(this.weather) {
            case "Chuvoso": return "ph-bold ph-cloud-rain";
            case "Nublado": return "ph-bold ph-cloud";
            default: return "ph-bold ph-sun";
        }
    }
}

class UIManager {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.cacheDOM();
    }

    cacheDOM() {
        this.hubButtons = document.querySelectorAll('.hub-button');
        this.backButtons = document.querySelectorAll('.back-button');
        this.statusContent = document.getElementById('status-content');
        this.inventoryWeight = document.getElementById('inventory-weight');
        this.inventoryList = document.getElementById('inventory-list');
        this.professionContent = document.getElementById('profession-content');
        this.timeDisplay = document.getElementById('time-display');
        this.weatherDisplay = document.getElementById('weather-display');
    }

    showScreen(screenId) {
        this.screens.forEach(screen => {
            screen.classList.toggle('active', screen.id === screenId);
        });
    }

    renderStatus(player) {
        const createStatLine = (label, value) => `<div class="stat-line"><span>${label}:</span> <span>${value}</span></div>`;

        // Atributos
        let attributesHtml = ``;
        for (const stat in player.stats) {
            attributesHtml += `<div class="stat-line"><span>${stat.charAt(0).toUpperCase() + stat.slice(1)}:</span> <span>${player.stats[stat]} <button data-stat="${stat}" ${player.attributePoints === 0 ? 'disabled' : ''}>+</button></span></div>`;
        }

        // Equipamentos
        let equipmentHtml = ``;
        for (const slot in player.equipment) {
            const item = player.equipment[slot];
            const itemName = item ? DB.items[item.id].name : '---';
            equipmentHtml += createStatLine(slot.charAt(0).toUpperCase() + slot.slice(1), itemName);
        }

        // Habilidades
        let skillsHtml = player.skills.map(skillId => `<li>${DB.skills[skillId].name}</li>`).join('') || '<li>Nenhuma</li>';

        this.statusContent.innerHTML = `
            <div class="status-section">
                <h3>Informações Básicas</h3>
                <div class="status-grid">
                    ${createStatLine("Nível", player.level)}
                    ${createStatLine("XP", `${player.xp} / ${player.xpToNextLevel}`)}
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
                <h3>Equipamento</h3>
                <div class="status-grid">${equipmentHtml}</div>
            </div>
            <div class="status-section">
                <h3>Habilidades Conhecidas</h3>
                <ul>${skillsHtml}</ul>
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

    renderProfession(player) {
        if (!player.profession) {
            this.professionContent.innerHTML = `<p>Você não tem uma profissão.</p><button data-action="learn-profession" data-prof-id="p001">Tornar-se Ferreiro</button>`;
            return;
        }

        const profData = DB.professions[player.profession.id];
        let recipesHtml = profData.recipes
            .filter(r => player.profession.level >= r.requiredLevel)
            .map(recipe => {
                const materials = Object.entries(recipe.materials).map(([matId, qty]) => `${DB.items[matId].name} x${qty}`).join(', ');
                return `<li class="inventory-item">
                    <span>${recipe.name}</span>
                    <span>Materiais: ${materials}</span>
                    <button data-action="craft-item" data-recipe-id="${recipe.id}">Criar</button>
                </li>`;
            }).join('');

        this.professionContent.innerHTML = `
            <h3>${profData.name} - Nível ${player.profession.level}</h3>
            <p>XP: ${player.profession.xp} / 100</p>
            <h4>Receitas Disponíveis:</h4>
            <ul>${recipesHtml}</ul>
        `;
    }

    renderWorldInfo(world) {
        this.timeDisplay.textContent = world.getFormattedTime();
        this.weatherDisplay.innerHTML = `<i class="${world.getWeatherIcon()}"></i> ${world.weather}`;
    }
}

class GameManager {
    constructor() {
        this.player = new Player();
        this.world = new WorldManager();
        this.ui = new UIManager();

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

        // Listeners específicos das telas
        document.getElementById('status-content').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && e.target.dataset.stat) {
                if (this.player.addAttribute(e.target.dataset.stat)) {
                    this.ui.renderStatus(this.player);
                }
            }
        });

        document.getElementById('inventory-list').addEventListener('click', (e) => {
            if (e.target.dataset.action === 'use-grimoire') {
                const itemId = e.target.dataset.itemId;
                const message = this.player.learnSkillFromGrimoire(itemId);
                alert(message); // Usando alert simples por enquanto
                this.updateUI('inventory-screen');
            }
        });

        document.getElementById('profession-content').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'learn-profession') {
                this.player.profession = { id: e.target.dataset.profId, level: 1, xp: 0 };
                this.updateUI('profession-screen');
            } else if (action === 'craft-item') {
                const recipeId = e.target.dataset.recipeId;
                const recipe = DB.professions[this.player.profession.id].recipes.find(r => r.id === recipeId);

                if (this.player.hasMaterials(recipe.materials)) {
                    for(const matId in recipe.materials) {
                        this.player.removeItem(matId, recipe.materials[matId]);
                    }
                    this.player.addItem(recipe.result, 1);
                    this.player.profession.xp += 10; // Ganha XP de profissão
                    alert(`Você criou: ${DB.items[recipe.result].name}!`);
                    this.updateUI('profession-screen');
                } else {
                    alert("Materiais insuficientes!");
                }
            }
        });
    }

    updateUI(activeScreen) {
        // Atualiza a UI da tela ativa para garantir que os dados estão corretos
        const currentActiveScreen = activeScreen || document.querySelector('.screen.active')?.id;
        switch (currentActiveScreen) {
            case 'status-screen':
                this.ui.renderStatus(this.player);
                break;
            case 'inventory-screen':
                this.ui.renderInventory(this.player);
                break;
            case 'profession-screen':
                this.ui.renderProfession(this.player);
                break;
        }
    }
}

window.onload = () => new GameManager();
