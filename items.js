// =================================================================================
// BANCO DE DADOS DE ITENS, RECEITAS E PROFISSÕES
// =================================================================================

const RARITIES = {
    COMUM: "Comum",
    INCOMUM: "Incomum",
    RARO: "Raro",
    ULTRA_RARO: "Ultra-Raro",
    RELIQUIA: "Relíquia",
    LENDARIO: "Lendário",
    MITICO: "Mítico"
};

const DB = {
    items: {
        // Recursos Básicos
        "i001": { name: "Galho", type: "Resource", weight: 0.2, rarity: RARITIES.COMUM, value: 2 },
        "i002": { name: "Pedra", type: "Resource", weight: 0.5, rarity: RARITIES.COMUM, value: 3 },
        "i003": { name: "Minério de Ferro", type: "Resource", weight: 1.0, rarity: RARITIES.INCOMUM, value: 15 },
        "i004": { name: "Essência Mágica Fraca", type: "Resource", weight: 0.1, rarity: RARITIES.INCOMUM, value: 25 },
        "i005": { name: "Couro Bruto", type: "Resource", weight: 0.8, rarity: RARITIES.COMUM, value: 8 },
        "i006": { name: "Fibra de Algodão", type: "Resource", weight: 0.1, rarity: RARITIES.COMUM, value: 5 },
        "i007": { name: "Minério de Prata", type: "Resource", weight: 1.2, rarity: RARITIES.RARO, value: 45 },
        "i008": { name: "Gema Azul", type: "Resource", weight: 0.3, rarity: RARITIES.RARO, value: 80 },
        "i009": { name: "Essência Mágica Forte", type: "Resource", weight: 0.1, rarity: RARITIES.ULTRA_RARO, value: 120 },
        "i010": { name: "Minério de Ouro", type: "Resource", weight: 1.5, rarity: RARITIES.ULTRA_RARO, value: 200 },

        // Consumíveis
        "c001": { name: "Poção de Vida Fraca", type: "Consumable", weight: 0.3, rarity: RARITIES.COMUM, value: 20, effect: "heal", power: 50 },
        "c002": { name: "Poção de Vida", type: "Consumable", weight: 0.3, rarity: RARITIES.INCOMUM, value: 50, effect: "heal", power: 100 },
        "c003": { name: "Poção de Vida Forte", type: "Consumable", weight: 0.3, rarity: RARITIES.RARO, value: 120, effect: "heal", power: 200 },
        "c004": { name: "Poção de Mana", type: "Consumable", weight: 0.3, rarity: RARITIES.INCOMUM, value: 40, effect: "mana", power: 50 },
        "c005": { name: "Antídoto", type: "Consumable", weight: 0.2, rarity: RARITIES.COMUM, value: 30, effect: "cure_poison" },

        // Grimórios
        "g001": { name: "Grimório: Bola de Fogo", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 150, teaches: "s001" },
        "g002": { name: "Grimório: Cura", type: "Grimoire", weight: 1.0, rarity: RARITIES.INCOMUM, value: 100, teaches: "s002" },
        "g003": { name: "Grimório: Raio", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 180, teaches: "s003" },
        "g004": { name: "Grimório: Escudo Mágico", type: "Grimoire", weight: 1.0, rarity: RARITIES.INCOMUM, value: 120, teaches: "s004" },
        "g005": { name: "Grimório: Veneno", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 160, teaches: "s005" },
        "g006": { name: "Grimório: Congelar", type: "Grimoire", weight: 1.0, rarity: RARITIES.ULTRA_RARO, value: 300, teaches: "s006" },
        "g007": { name: "Grimório: Meteoro", type: "Grimoire", weight: 1.0, rarity: RARITIES.LENDARIO, value: 800, teaches: "s007" },

        // Equipamentos Craftáveis
        "eq001": { name: "Adaga de Ferro", type: "Equipment", weight: 1.5, rarity: RARITIES.INCOMUM, value: 80, slot: "weapon", stats: { attack: 15 } },
        "eq002": { name: "Escudo de Ferro", type: "Equipment", weight: 4.0, rarity: RARITIES.INCOMUM, value: 100, slot: "offhand", stats: { defense: 10 } },
        "eq003": { name: "Espada de Ferro", type: "Equipment", weight: 2.5, rarity: RARITIES.INCOMUM, value: 120, slot: "weapon", stats: { attack: 25 } },
        "eq004": { name: "Armadura de Couro", type: "Equipment", weight: 3.0, rarity: RARITIES.COMUM, value: 60, slot: "chest", stats: { defense: 8 } },
        "eq005": { name: "Espada de Prata", type: "Equipment", weight: 2.8, rarity: RARITIES.RARO, value: 300, slot: "weapon", stats: { attack: 45 } },
        "eq006": { name: "Armadura de Ferro", type: "Equipment", weight: 8.0, rarity: RARITIES.INCOMUM, value: 200, slot: "chest", stats: { defense: 20 } },
        "eq007": { name: "Cajado Mágico", type: "Equipment", weight: 1.8, rarity: RARITIES.RARO, value: 250, slot: "weapon", stats: { magic: 30 } },
        "eq008": { name: "Espada de Ouro", type: "Equipment", weight: 3.2, rarity: RARITIES.ULTRA_RARO, value: 800, slot: "weapon", stats: { attack: 80 } },
        "eq009": { name: "Armadura Encantada", type: "Equipment", weight: 6.0, rarity: RARITIES.RELIQUIA, value: 1500, slot: "chest", stats: { defense: 50, magic: 20 } },
        "eq010": { name: "Lâmina Lendária", type: "Equipment", weight: 2.0, rarity: RARITIES.LENDARIO, value: 5000, slot: "weapon", stats: { attack: 150, crit: 15 } },
    },

    skills: {
        "s001": { name: "Bola de Fogo", description: "Lança uma bola de fogo que causa dano mágico.", type: "Active", damage: 40, cost: 15 },
        "s002": { name: "Cura", description: "Restaura pontos de vida.", type: "Active", heal: 60, cost: 20 },
        "s003": { name: "Raio", description: "Ataque elétrico que pode paralisar.", type: "Active", damage: 35, cost: 12, effect: "paralysis" },
        "s004": { name: "Escudo Mágico", description: "Aumenta a defesa temporariamente.", type: "Active", defense: 20, cost: 25, duration: 3 },
        "s005": { name: "Veneno", description: "Envenena o inimigo.", type: "Active", damage: 15, cost: 10, effect: "poison", duration: 5 },
        "s006": { name: "Congelar", description: "Congela o inimigo, impedindo ações.", type: "Active", damage: 20, cost: 18, effect: "freeze", duration: 2 },
        "s007": { name: "Meteoro", description: "Invoca um meteoro devastador.", type: "Active", damage: 120, cost: 50 },
    },

    professions: {
        "p001": {
            name: "Ferreiro",
            description: "Cria armas e armaduras de metal",
            recipes: [
                { id: "r001", name: "Adaga de Ferro", result: "eq001", requiredLevel: 1, materials: { "i003": 3, "i001": 2 }, xp: 15 },
                { id: "r002", name: "Escudo de Ferro", result: "eq002", requiredLevel: 3, materials: { "i003": 5, "i002": 3 }, xp: 25 },
                { id: "r003", name: "Espada de Ferro", result: "eq003", requiredLevel: 5, materials: { "i003": 8, "i001": 4 }, xp: 35 },
                { id: "r004", name: "Armadura de Ferro", result: "eq006", requiredLevel: 8, materials: { "i003": 15, "i005": 5 }, xp: 50 },
                { id: "r005", name: "Espada de Prata", result: "eq005", requiredLevel: 12, materials: { "i007": 6, "i008": 2 }, xp: 80 },
                { id: "r006", name: "Espada de Ouro", result: "eq008", requiredLevel: 20, materials: { "i010": 8, "i009": 3 }, xp: 150 }
            ]
        },
        "p002": {
            name: "Alfaiate",
            description: "Cria roupas e armaduras de tecido",
            recipes: [
                { id: "r007", name: "Armadura de Couro", result: "eq004", requiredLevel: 1, materials: { "i005": 5, "i006": 3 }, xp: 12 },
                { id: "r008", name: "Capa Mágica", result: "eq011", requiredLevel: 6, materials: { "i006": 8, "i004": 4 }, xp: 40 }
            ]
        },
        "p003": {
            name: "Alquimista",
            description: "Cria poções e elixires",
            recipes: [
                { id: "r009", name: "Poção de Vida", result: "c002", requiredLevel: 1, materials: { "i004": 2, "i001": 1 }, xp: 10 },
                { id: "r010", name: "Poção de Vida Forte", result: "c003", requiredLevel: 5, materials: { "i009": 1, "i004": 3 }, xp: 30 },
                { id: "r011", name: "Poção de Mana", result: "c004", requiredLevel: 3, materials: { "i004": 3, "i008": 1 }, xp: 20 }
            ]
        },
        "p004": {
            name: "Encantador",
            description: "Cria itens mágicos e cajados",
            recipes: [
                { id: "r012", name: "Cajado Mágico", result: "eq007", requiredLevel: 1, materials: { "i001": 5, "i004": 8 }, xp: 45 },
                { id: "r013", name: "Armadura Encantada", result: "eq009", requiredLevel: 15, materials: { "i003": 20, "i009": 10, "i008": 5 }, xp: 200 }
            ]
        },
        "p005": {
            name: "Artesão Lendário",
            description: "Cria os itens mais poderosos",
            recipes: [
                { id: "r014", name: "Lâmina Lendária", result: "eq010", requiredLevel: 25, materials: { "i010": 20, "i009": 15, "i008": 10 }, xp: 500 }
            ]
        }
    },

    jobs: {
        "j001": { name: "Minerador", description: "Extrai minérios das montanhas", duration: 3600, rewards: { gold: 50, items: [{ id: "i003", quantity: 3, chance: 0.8 }, { id: "i007", quantity: 1, chance: 0.2 }] } },
        "j002": { name: "Lenhador", description: "Corta madeira na floresta", duration: 2400, rewards: { gold: 30, items: [{ id: "i001", quantity: 8, chance: 1.0 }] } },
        "j003": { name: "Caçador", description: "Caça animais por couro", duration: 4800, rewards: { gold: 80, items: [{ id: "i005", quantity: 5, chance: 0.9 }] } },
        "j004": { name: "Coletor de Ervas", description: "Coleta ingredientes mágicos", duration: 3000, rewards: { gold: 60, items: [{ id: "i004", quantity: 4, chance: 0.7 }, { id: "i009", quantity: 1, chance: 0.1 }] } },
        "j005": { name: "Mercenário", description: "Trabalho perigoso, alta recompensa", duration: 7200, rewards: { gold: 200, items: [{ id: "g001", quantity: 1, chance: 0.05 }] } },
        "j006": { name: "Explorador", description: "Explora ruínas antigas", duration: 6000, rewards: { gold: 150, items: [{ id: "i008", quantity: 2, chance: 0.4 }, { id: "g002", quantity: 1, chance: 0.08 }] } }
    },

    castles: {
        "c001": { name: "Forte Abandonado", level: 1, cost: 1000, income: 50, description: "Um pequeno forte em ruínas" },
        "c002": { name: "Torre de Vigia", level: 2, cost: 2500, income: 120, description: "Torre estratégica nas montanhas" },
        "c003": { name: "Castelo do Vale", level: 3, cost: 5000, income: 250, description: "Castelo no vale fértil" },
        "c004": { name: "Fortaleza Real", level: 4, cost: 10000, income: 500, description: "Antiga fortaleza real" },
        "c005": { name: "Cidadela Mística", level: 5, cost: 20000, income: 1000, description: "Cidadela imbuída de magia" }
    }
};

// Sistema de Loja
class Shop {
    constructor() {
        this.items = [];
        this.lastUpdate = 0;
        this.updateInterval = 24 * 60 * 60 * 1000; // 24 horas em ms
        this.generateItems();
    }

    generateItems() {
        this.items = [];
        const itemCount = Math.floor(Math.random() * 8) + 5; // 5-12 itens

        const allItems = Object.keys(DB.items);
        for (let i = 0; i < itemCount; i++) {
            const itemId = allItems[Math.floor(Math.random() * allItems.length)];
            const item = DB.items[itemId];
            
            // Chance baseada na raridade
            const rarityChances = {
                [RARITIES.COMUM]: 0.4,
                [RARITIES.INCOMUM]: 0.25,
                [RARITIES.RARO]: 0.15,
                [RARITIES.ULTRA_RARO]: 0.1,
                [RARITIES.RELIQUIA]: 0.06,
                [RARITIES.LENDARIO]: 0.03,
                [RARITIES.MITICO]: 0.01
            };

            if (Math.random() < rarityChances[item.rarity]) {
                const quantity = Math.floor(Math.random() * 3) + 1;
                this.items.push({ id: itemId, quantity, price: Math.floor(item.value * (1.2 + Math.random() * 0.6)) });
            }
        }
        this.lastUpdate = Date.now();
    }

    shouldUpdate() {
        return Date.now() - this.lastUpdate >= this.updateInterval;
    }

    getTimeToNextUpdate() {
        const remaining = this.updateInterval - (Date.now() - this.lastUpdate);
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        return `${hours}h ${minutes}m`;
    }
}