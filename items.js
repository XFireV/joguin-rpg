// =================================================================================
// BANCO DE DADOS DE ITENS, RECEITAS E PROFISSÕES - VERSÃO 0.12
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
        // ===== RECURSOS BÁSICOS =====
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
        
        // ===== NOVOS RECURSOS AVANÇADOS =====
        "i011": { name: "Cristal de Mana", type: "Resource", weight: 0.2, rarity: RARITIES.RARO, value: 150 },
        "i012": { name: "Minério de Mithril", type: "Resource", weight: 0.8, rarity: RARITIES.RELIQUIA, value: 500 },
        "i013": { name: "Essência Dracônica", type: "Resource", weight: 0.1, rarity: RARITIES.LENDARIO, value: 1000 },
        "i014": { name: "Fragmento Celestial", type: "Resource", weight: 0.05, rarity: RARITIES.MITICO, value: 2500 },
        "i015": { name: "Madeira Élfica", type: "Resource", weight: 0.3, rarity: RARITIES.RARO, value: 75 },
        "i016": { name: "Couro Dracônico", type: "Resource", weight: 1.2, rarity: RARITIES.ULTRA_RARO, value: 300 },
        "i017": { name: "Seda Etérea", type: "Resource", weight: 0.1, rarity: RARITIES.RELIQUIA, value: 400 },
        "i018": { name: "Runa Primitiva", type: "Resource", weight: 0.2, rarity: RARITIES.INCOMUM, value: 50 },
        "i019": { name: "Pedra Rúnica", type: "Resource", weight: 0.5, rarity: RARITIES.RARO, value: 120 },
        "i020": { name: "Água Benta", type: "Resource", weight: 0.3, rarity: RARITIES.INCOMUM, value: 40 },
        "i021": { name: "Pó de Estrela", type: "Resource", weight: 0.05, rarity: RARITIES.ULTRA_RARO, value: 350 },
        "i022": { name: "Essência Sombria", type: "Resource", weight: 0.1, rarity: RARITIES.RARO, value: 100 },
        "i023": { name: "Cristal Temporal", type: "Resource", weight: 0.3, rarity: RARITIES.LENDARIO, value: 1500 },
        "i024": { name: "Ervas Curativas", type: "Resource", weight: 0.1, rarity: RARITIES.COMUM, value: 8 },
        "i025": { name: "Cogumelo Venenoso", type: "Resource", weight: 0.2, rarity: RARITIES.INCOMUM, value: 25 },

        // ===== CONSUMÍVEIS BÁSICOS =====
        "c001": { name: "Poção de Vida Fraca", type: "Consumable", weight: 0.3, rarity: RARITIES.COMUM, value: 20, effect: "heal", power: 50 },
        "c002": { name: "Poção de Vida", type: "Consumable", weight: 0.3, rarity: RARITIES.INCOMUM, value: 50, effect: "heal", power: 100 },
        "c003": { name: "Poção de Vida Forte", type: "Consumable", weight: 0.3, rarity: RARITIES.RARO, value: 120, effect: "heal", power: 200 },
        "c004": { name: "Poção de Mana", type: "Consumable", weight: 0.3, rarity: RARITIES.INCOMUM, value: 40, effect: "mana", power: 50 },
        "c005": { name: "Antídoto", type: "Consumable", weight: 0.2, rarity: RARITIES.COMUM, value: 30, effect: "cure_poison" },

        // ===== NOVOS CONSUMÍVEIS AVANÇADOS =====
        "c006": { name: "Poção de Vida Superior", type: "Consumable", weight: 0.3, rarity: RARITIES.ULTRA_RARO, value: 300, effect: "heal", power: 400 },
        "c007": { name: "Poção de Mana Superior", type: "Consumable", weight: 0.3, rarity: RARITIES.RARO, value: 150, effect: "mana", power: 150 },
        "c008": { name: "Elixir da Força", type: "Consumable", weight: 0.2, rarity: RARITIES.RARO, value: 200, effect: "buff_strength", power: 10, duration: 300 },
        "c009": { name: "Elixir da Agilidade", type: "Consumable", weight: 0.2, rarity: RARITIES.RARO, value: 200, effect: "buff_agility", power: 10, duration: 300 },
        "c010": { name: "Elixir da Inteligência", type: "Consumable", weight: 0.2, rarity: RARITIES.RARO, value: 200, effect: "buff_intelligence", power: 10, duration: 300 },
        "c011": { name: "Poção de Invisibilidade", type: "Consumable", weight: 0.2, rarity: RARITIES.ULTRA_RARO, value: 500, effect: "invisibility", duration: 60 },
        "c012": { name: "Poção de Resistência", type: "Consumable", weight: 0.3, rarity: RARITIES.RARO, value: 180, effect: "resistance", duration: 600 },
        "c013": { name: "Ambrosia", type: "Consumable", weight: 0.1, rarity: RARITIES.MITICO, value: 5000, effect: "full_restore" },
        "c014": { name: "Poção de Experiência", type: "Consumable", weight: 0.3, rarity: RARITIES.RELIQUIA, value: 800, effect: "xp_boost", power: 2, duration: 1800 },
        "c015": { name: "Poção de Sorte", type: "Consumable", weight: 0.2, rarity: RARITIES.ULTRA_RARO, value: 400, effect: "luck_boost", duration: 900 },
        "c016": { name: "Pão Élfico", type: "Consumable", weight: 0.1, rarity: RARITIES.INCOMUM, value: 35, effect: "heal", power: 75 },
        "c017": { name: "Água Celestial", type: "Consumable", weight: 0.2, rarity: RARITIES.LENDARIO, value: 1200, effect: "mana", power: 300 },
        "c018": { name: "Frasco de Regeneração", type: "Consumable", weight: 0.3, rarity: RARITIES.ULTRA_RARO, value: 350, effect: "regeneration", duration: 180 },
        "c019": { name: "Cura Universal", type: "Consumable", weight: 0.2, rarity: RARITIES.RELIQUIA, value: 600, effect: "cure_all" },
        "c020": { name: "Poção Berserk", type: "Consumable", weight: 0.3, rarity: RARITIES.RARO, value: 250, effect: "berserk", duration: 120 },

        // ===== GRIMÓRIOS BÁSICOS =====
        "g001": { name: "Grimório: Bola de Fogo", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 150, teaches: "s001" },
        "g002": { name: "Grimório: Cura", type: "Grimoire", weight: 1.0, rarity: RARITIES.INCOMUM, value: 100, teaches: "s002" },
        "g003": { name: "Grimório: Raio", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 180, teaches: "s003" },
        "g004": { name: "Grimório: Escudo Mágico", type: "Grimoire", weight: 1.0, rarity: RARITIES.INCOMUM, value: 120, teaches: "s004" },
        "g005": { name: "Grimório: Veneno", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 160, teaches: "s005" },
        "g006": { name: "Grimório: Congelar", type: "Grimoire", weight: 1.0, rarity: RARITIES.ULTRA_RARO, value: 300, teaches: "s006" },
        "g007": { name: "Grimório: Meteoro", type: "Grimoire", weight: 1.0, rarity: RARITIES.LENDARIO, value: 800, teaches: "s007" },

        // ===== NOVOS GRIMÓRIOS AVANÇADOS =====
        "g008": { name: "Grimório: Tempestade", type: "Grimoire", weight: 1.0, rarity: RARITIES.ULTRA_RARO, value: 450, teaches: "s008" },
        "g009": { name: "Grimório: Teletransporte", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 320, teaches: "s009" },
        "g010": { name: "Grimório: Barreira", type: "Grimoire", weight: 1.0, rarity: RARITIES.INCOMUM, value: 140, teaches: "s010" },
        "g011": { name: "Grimório: Drenar Vida", type: "Grimoire", weight: 1.0, rarity: RARITIES.ULTRA_RARO, value: 380, teaches: "s011" },
        "g012": { name: "Grimório: Invocação", type: "Grimoire", weight: 1.0, rarity: RARITIES.RELIQUIA, value: 600, teaches: "s012" },
        "g013": { name: "Grimório: Cura em Área", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, value: 280, teaches: "s013" },
        "g014": { name: "Grimório: Explosão Arcana", type: "Grimoire", weight: 1.0, rarity: RARITIES.LENDARIO, value: 900, teaches: "s014" },
        "g015": { name: "Grimório: Tempo", type: "Grimoire", weight: 1.0, rarity: RARITIES.MITICO, value: 2000, teaches: "s015" },

        // ===== EQUIPAMENTOS BÁSICOS =====
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

        // ===== NOVOS EQUIPAMENTOS - ARMAS =====
        "eq011": { name: "Machado de Guerra", type: "Equipment", weight: 4.0, rarity: RARITIES.RARO, value: 320, slot: "weapon", stats: { attack: 55, crit: 8 } },
        "eq012": { name: "Arco Élfico", type: "Equipment", weight: 1.2, rarity: RARITIES.ULTRA_RARO, value: 450, slot: "weapon", stats: { attack: 40, agility: 15 } },
        "eq013": { name: "Martelo de Thor", type: "Equipment", weight: 6.0, rarity: RARITIES.LENDARIO, value: 3200, slot: "weapon", stats: { attack: 120, strength: 25 } },
        "eq014": { name: "Cajado Celestial", type: "Equipment", weight: 2.0, rarity: RARITIES.RELIQUIA, value: 1800, slot: "weapon", stats: { magic: 80, mana: 50 } },
        "eq015": { name: "Lança do Dragão", type: "Equipment", weight: 3.5, rarity: RARITIES.LENDARIO, value: 4500, slot: "weapon", stats: { attack: 140, fire_damage: 30 } },
        "eq016": { name: "Adagas Gêmeas", type: "Equipment", weight: 2.0, rarity: RARITIES.ULTRA_RARO, value: 650, slot: "weapon", stats: { attack: 35, agility: 20, crit: 12 } },
        "eq017": { name: "Bastão Sombrio", type: "Equipment", weight: 2.2, rarity: RARITIES.RARO, value: 380, slot: "weapon", stats: { magic: 45, dark_damage: 15 } },
        "eq018": { name: "Excalibur", type: "Equipment", weight: 3.0, rarity: RARITIES.MITICO, value: 15000, slot: "weapon", stats: { attack: 200, all_stats: 30 } },

        // ===== NOVOS EQUIPAMENTOS - ARMADURAS =====
        "eq019": { name: "Elmo de Ferro", type: "Equipment", weight: 2.0, rarity: RARITIES.INCOMUM, value: 80, slot: "head", stats: { defense: 8 } },
        "eq020": { name: "Botas de Couro", type: "Equipment", weight: 1.0, rarity: RARITIES.COMUM, value: 40, slot: "feet", stats: { defense: 4, agility: 3 } },
        "eq021": { name: "Calças de Ferro", type: "Equipment", weight: 3.0, rarity: RARITIES.INCOMUM, value: 120, slot: "legs", stats: { defense: 12 } },
        "eq022": { name: "Coroa Real", type: "Equipment", weight: 1.5, rarity: RARITIES.LENDARIO, value: 8000, slot: "head", stats: { defense: 40, all_stats: 15 } },
        "eq023": { name: "Botas Aladas", type: "Equipment", weight: 0.8, rarity: RARITIES.RELIQUIA, value: 1200, slot: "feet", stats: { defense: 15, agility: 25 } },
        "eq024": { name: "Armadura Dracônica", type: "Equipment", weight: 12.0, rarity: RARITIES.MITICO, value: 20000, slot: "chest", stats: { defense: 100, fire_res: 50 } },
        "eq025": { name: "Manto do Arquimago", type: "Equipment", weight: 2.0, rarity: RARITIES.LENDARIO, value: 6000, slot: "chest", stats: { defense: 30, magic: 60 } },
        "eq026": { name: "Capacete Celestial", type: "Equipment", weight: 2.5, rarity: RARITIES.RELIQUIA, value: 2200, slot: "head", stats: { defense: 25, mana: 40 } },

        // ===== JOIAS E ACESSÓRIOS =====
        "ring001": { name: "Anel de Força", type: "Equipment", weight: 0.1, rarity: RARITIES.RARO, value: 300, slot: "ring1", stats: { strength: 8 } },
        "ring002": { name: "Anel de Agilidade", type: "Equipment", weight: 0.1, rarity: RARITIES.RARO, value: 300, slot: "ring1", stats: { agility: 8 } },
        "ring003": { name: "Anel de Inteligência", type: "Equipment", weight: 0.1, rarity: RARITIES.RARO, value: 300, slot: "ring1", stats: { intelligence: 8 } },
        "ring004": { name: "Anel do Poder", type: "Equipment", weight: 0.1, rarity: RARITIES.LENDARIO, value: 5000, slot: "ring1", stats: { all_stats: 15 } },
        "ring005": { name: "Anel da Regeneração", type: "Equipment", weight: 0.1, rarity: RARITIES.ULTRA_RARO, value: 800, slot: "ring1", stats: { hp_regen: 5 } },
        "neck001": { name: "Colar de Mana", type: "Equipment", weight: 0.2, rarity: RARITIES.RARO, value: 400, slot: "necklace", stats: { mana: 30 } },
        "neck002": { name: "Amuleto de Proteção", type: "Equipment", weight: 0.2, rarity: RARITIES.ULTRA_RARO, value: 600, slot: "necklace", stats: { defense: 15, resistance: 10 } },
        "neck003": { name: "Colar Dracônico", type: "Equipment", weight: 0.3, rarity: RARITIES.LENDARIO, value: 4000, slot: "necklace", stats: { all_stats: 12, fire_damage: 20 } },
    },

    skills: {
        // ===== HABILIDADES BÁSICAS =====
        "s001": { name: "Bola de Fogo", description: "Lança uma bola de fogo que causa dano mágico.", type: "Active", damage: 40, cost: 15, element: "fire" },
        "s002": { name: "Cura", description: "Restaura pontos de vida.", type: "Active", heal: 60, cost: 20, element: "light" },
        "s003": { name: "Raio", description: "Ataque elétrico que pode paralisar.", type: "Active", damage: 35, cost: 12, effect: "paralysis", element: "lightning" },
        "s004": { name: "Escudo Mágico", description: "Aumenta a defesa temporariamente.", type: "Active", defense: 20, cost: 25, duration: 3, element: "arcane" },
        "s005": { name: "Veneno", description: "Envenena o inimigo.", type: "Active", damage: 15, cost: 10, effect: "poison", duration: 5, element: "nature" },
        "s006": { name: "Congelar", description: "Congela o inimigo, impedindo ações.", type: "Active", damage: 20, cost: 18, effect: "freeze", duration: 2, element: "ice" },
        "s007": { name: "Meteoro", description: "Invoca um meteoro devastador.", type: "Active", damage: 120, cost: 50, element: "fire" },

        // ===== NOVAS HABILIDADES MÁGICAS =====
        "s008": { name: "Tempestade", description: "Cria uma tempestade elétrica em área.", type: "Active", damage: 80, cost: 40, effect: "stun", element: "lightning" },
        "s009": { name: "Teletransporte", description: "Permite escapar de combates ou evitar ataques.", type: "Active", cost: 30, effect: "teleport", element: "arcane" },
        "s010": { name: "Barreira", description: "Cria uma barreira mágica protetora.", type: "Active", shield: 100, cost: 35, duration: 5, element: "arcane" },
        "s011": { name: "Drenar Vida", description: "Drena vida do inimigo para si.", type: "Active", damage: 50, heal: 25, cost: 25, element: "dark" },
        "s012": { name: "Invocação", description: "Invoca um aliado temporário.", type: "Active", summon: "elemental", cost: 60, duration: 10, element: "arcane" },
        "s013": { name: "Cura em Área", description: "Cura todos os aliados.", type: "Active", heal: 80, cost: 45, area: true, element: "light" },
        "s014": { name: "Explosão Arcana", description: "Explosão mágica devastadora.", type: "Active", damage: 150, cost: 70, area: true, element: "arcane" },
        "s015": { name: "Parar Tempo", description: "Para o tempo por alguns segundos.", type: "Active", cost: 100, effect: "time_stop", duration: 3, element: "time" },

        // ===== HABILIDADES DE COMBATE =====
        "s016": { name: "Golpe Poderoso", description: "Ataque físico devastador.", type: "Active", damage: 60, cost: 20, element: "physical" },
        "s017": { name: "Fúria Berserker", description: "Aumenta ataque mas reduz defesa.", type: "Active", cost: 25, attack_boost: 50, defense_penalty: 20, duration: 8, element: "physical" },
        "s018": { name: "Defesa Perfeita", description: "Bloqueia completamente o próximo ataque.", type: "Active", cost: 30, effect: "perfect_block", element: "physical" },
        "s019": { name: "Combo Mortal", description: "Sequência de ataques rápidos.", type: "Active", damage: 30, hits: 3, cost: 35, element: "physical" },
        "s020": { name: "Contra-Ataque", description: "Prepara um contra-ataque devastador.", type: "Passive", cost: 0, effect: "counter", element: "physical" },

        // ===== HABILIDADES DE SUPORTE =====
        "s021": { name: "Regeneração", description: "Regenera HP constantemente.", type: "Passive", hp_regen: 10, cost: 0, element: "nature" },
        "s022": { name: "Meditação", description: "Regenera MP constantemente.", type: "Passive", mp_regen: 8, cost: 0, element: "spirit" },
        "s023": { name: "Sorte", description: "Aumenta chance de crítico e loot.", type: "Passive", luck: 15, cost: 0, element: "divine" },
        "s024": { name: "Resistência", description: "Reduz dano de efeitos negativos.", type: "Passive", resistance: 25, cost: 0, element: "spirit" },
        "s025": { name: "Velocidade", description: "Aumenta agilidade permanentemente.", type: "Passive", agility: 20, cost: 0, element: "wind" },

        // ===== HABILIDADES ELEMENTAIS AVANÇADAS =====
        "s026": { name: "Tsunami", description: "Onda gigante de água.", type: "Active", damage: 100, cost: 55, effect: "knockdown", element: "water" },
        "s027": { name: "Terremoto", description: "Abala a terra causando dano em área.", type: "Active", damage: 90, cost: 50, area: true, element: "earth" },
        "s028": { name: "Tornado", description: "Cria um tornado devastador.", type: "Active", damage: 85, cost: 45, effect: "confusion", element: "wind" },
        "s029": { name: "Erupção", description: "Causa uma erupção vulcânica.", type: "Active", damage: 110, cost: 60, effect: "burn", element: "fire" },
        "s030": { name: "Blizzard", description: "Tempestade de gelo congelante.", type: "Active", damage: 95, cost: 52, effect: "freeze", area: true, element: "ice" },

        // ===== HABILIDADES ÚNICAS =====
        "s031": { name: "Ressurreição", description: "Revive com 1 HP quando derrotado.", type: "Passive", cost: 0, effect: "revive", element: "divine" },
        "s032": { name: "Absorção", description: "Absorve 50% do dano como MP.", type: "Passive", cost: 0, effect: "absorb", element: "void" },
        "s033": { name: "Reflexão", description: "Reflete 30% do dano recebido.", type: "Passive", cost: 0, effect: "reflect", element: "mirror" },
        "s034": { name: "Invisibilidade", description: "Torna-se invisível por alguns turnos.", type: "Active", cost: 40, duration: 5, effect: "invisible", element: "shadow" },
        "s035": { name: "Duplicação", description: "Cria uma cópia de si mesmo.", type: "Active", cost: 80, duration: 8, effect: "clone", element: "illusion" },

        // ===== MAIS HABILIDADES DIVERSAS =====
        "s036": { name: "Chuva de Flechas", description: "Dispara múltiplas flechas.", type: "Active", damage: 25, hits: 4, cost: 30, element: "physical" },
        "s037": { name: "Salto Mortal", description: "Ataque aéreo poderoso.", type: "Active", damage: 70, cost: 25, effect: "aerial", element: "physical" },
        "s038": { name: "Grito de Guerra", description: "Reduz ataque dos inimigos.", type: "Active", cost: 20, debuff: "fear", duration: 6, element: "sound" },
        "s039": { name: "Armadilha", description: "Coloca uma armadilha no campo.", type: "Active", cost: 35, effect: "trap", damage: 80, element: "mechanical" },
        "s040": { name: "Camuflagem", description: "Aumenta chance de esquiva.", type: "Active", cost: 25, dodge: 40, duration: 7, element: "nature" },
        "s041": { name: "Berserker", description: "Sacrifica HP por dano massivo.", type: "Active", damage: 200, hp_cost: 50, cost: 0, element: "blood" },
        "s042": { name: "Purificação", description: "Remove todos os efeitos negativos.", type: "Active", cost: 30, effect: "purify", element: "light" },
        "s043": { name: "Maldição", description: "Amaldiçoa o inimigo permanentemente.", type: "Active", cost: 40, effect: "curse", duration: 999, element: "dark" },
        "s044": { name: "Transformação", description: "Transforma-se em besta por alguns turnos.", type: "Active", cost: 60, stats_boost: 50, duration: 10, element: "nature" },
        "s045": { name: "Apocalipse", description: "Habilidade suprema que causa dano massivo.", type: "Active", damage: 500, cost: 150, area: true, element: "chaos" },
        "s046": { name: "Domínio Mental", description: "Controla o inimigo por alguns turnos.", type: "Active", cost: 70, effect: "charm", duration: 4, element: "psychic" },
        "s047": { name: "Portal", description: "Cria portais para movimento instantâneo.", type: "Active", cost: 45, effect: "portal", element: "space" },
        "s048": { name: "Necromancia", description: "Invoca mortos-vivos como aliados.", type: "Active", cost: 65, summon: "undead", duration: 15, element: "death" },
        "s049": { name: "Bênção", description: "Aumenta todos os atributos.", type: "Active", cost: 50, all_stats_boost: 25, duration: 12, element: "divine" },
        "s050": { name: "Aniquilação", description: "Destrói instantaneamente inimigos fracos.", type: "Active", cost: 120, effect: "instant_kill", threshold: 0.2, element: "void" },
    },

    professions: {
        // ===== PROFISSÕES BÁSICAS =====
        "p001": {
            name: "Ferreiro",
            description: "Cria armas e armaduras de metal",
            bonus: { crafting_speed: 1.2 },
            recipes: [
                { id: "r001", name: "Adaga de Ferro", result: "eq001", requiredLevel: 1, materials: { "i003": 3, "i001": 2 }, xp: 15 },
                { id: "r002", name: "Escudo de Ferro", result: "eq002", requiredLevel: 3, materials: { "i003": 5, "i002": 3 }, xp: 25 },
                { id: "r003", name: "Espada de Ferro", result: "eq003", requiredLevel: 5, materials: { "i003": 8, "i001": 4 }, xp: 35 },
                { id: "r004", name: "Armadura de Ferro", result: "eq006", requiredLevel: 8, materials: { "i003": 15, "i005": 5 }, xp: 50 },
                { id: "r005", name: "Espada de Prata", result: "eq005", requiredLevel: 12, materials: { "i007": 6, "i008": 2 }, xp: 80 },
                { id: "r006", name: "Espada de Ouro", result: "eq008", requiredLevel: 20, materials: { "i010": 8, "i009": 3 }, xp: 150 },
                { id: "r007", name: "Machado de Guerra", result: "eq011", requiredLevel: 15, materials: { "i007": 10, "i015": 5 }, xp: 100 },
                { id: "r008", name: "Martelo de Thor", result: "eq013", requiredLevel: 25, materials: { "i012": 15, "i013": 5 }, xp: 300 }
            ]
        },
        "p002": {
            name: "Alfaiate",
            description: "Cria roupas e armaduras de tecido",
            bonus: { defense_bonus: 1.1 },
            recipes: [
                { id: "r009", name: "Armadura de Couro", result: "eq004", requiredLevel: 1, materials: { "i005": 5, "i006": 3 }, xp: 12 },
                { id: "r010", name: "Botas de Couro", result: "eq020", requiredLevel: 3, materials: { "i005": 3, "i006": 2 }, xp: 18 },
                { id: "r011", name: "Manto do Arquimago", result: "eq025", requiredLevel: 20, materials: { "i017": 8, "i009": 5 }, xp: 200 }
            ]
        },
        "p003": {
            name: "Alquimista",
            description: "Cria poções e elixires",
            bonus: { potion_effectiveness: 1.3 },
            recipes: [
                { id: "r012", name: "Poção de Vida", result: "c002", requiredLevel: 1, materials: { "i004": 2, "i024": 3 }, xp: 10 },
                { id: "r013", name: "Poção de Vida Forte", result: "c003", requiredLevel: 5, materials: { "i009": 1, "i004": 3, "i024": 5 }, xp: 30 },
                { id: "r014", name: "Poção de Mana", result: "c004", requiredLevel: 3, materials: { "i011": 2, "i020": 1 }, xp: 20 },
                { id: "r015", name: "Elixir da Força", result: "c008", requiredLevel: 8, materials: { "i011": 4, "i013": 1 }, xp: 45 },
                { id: "r016", name: "Ambrosia", result: "c013", requiredLevel: 30, materials: { "i014": 5, "i013": 10, "i021": 8 }, xp: 500 }
            ]
        },
        "p004": {
            name: "Encantador",
            description: "Cria itens mágicos e cajados",
            bonus: { magic_damage: 1.2 },
            recipes: [
                { id: "r017", name: "Cajado Mágico", result: "eq007", requiredLevel: 1, materials: { "i015": 5, "i004": 8 }, xp: 45 },
                { id: "r018", name: "Armadura Encantada", result: "eq009", requiredLevel: 15, materials: { "i003": 20, "i009": 10, "i008": 5 }, xp: 200 },
                { id: "r019", name: "Cajado Celestial", result: "eq014", requiredLevel: 18, materials: { "i012": 8, "i021": 3 }, xp: 180 }
            ]
        },
        "p005": {
            name: "Artesão Lendário",
            description: "Cria os itens mais poderosos",
            bonus: { legendary_chance: 1.5 },
            recipes: [
                { id: "r020", name: "Lâmina Lendária", result: "eq010", requiredLevel: 25, materials: { "i010": 20, "i009": 15, "i008": 10 }, xp: 500 },
                { id: "r021", name: "Excalibur", result: "eq018", requiredLevel: 35, materials: { "i014": 10, "i013": 20, "i023": 5 }, xp: 1000 }
            ]
        },

        // ===== NOVAS PROFISSÕES =====
        "p006": {
            name: "Runista",
            description: "Cria runas mágicas poderosas",
            bonus: { rune_power: 1.4 },
            recipes: [
                { id: "r022", name: "Runa de Força", result: "rune001", requiredLevel: 1, materials: { "i018": 3, "i002": 5 }, xp: 25 },
                { id: "r023", name: "Runa de Proteção", result: "rune002", requiredLevel: 5, materials: { "i019": 2, "i020": 3 }, xp: 40 },
                { id: "r024", name: "Runa Suprema", result: "rune003", requiredLevel: 20, materials: { "i019": 10, "i021": 5 }, xp: 200 }
            ]
        },
        "p007": {
            name: "Joalheiro",
            description: "Cria joias e acessórios preciosos",
            bonus: { gem_efficiency: 1.3 },
            recipes: [
                { id: "r025", name: "Anel de Força", result: "ring001", requiredLevel: 1, materials: { "i007": 3, "i008": 1 }, xp: 30 },
                { id: "r026", name: "Colar de Mana", result: "neck001", requiredLevel: 8, materials: { "i008": 5, "i011": 3 }, xp: 60 },
                { id: "r027", name: "Anel do Poder", result: "ring004", requiredLevel: 25, materials: { "i010": 15, "i021": 8 }, xp: 400 }
            ]
        },
        "p008": {
            name: "Cozinheiro",
            description: "Prepara alimentos que concedem bônus",
            bonus: { food_duration: 1.5 },
            recipes: [
                { id: "r028", name: "Pão Élfico", result: "c016", requiredLevel: 1, materials: { "i024": 5, "i020": 1 }, xp: 15 },
                { id: "r029", name: "Banquete Real", result: "food001", requiredLevel: 15, materials: { "i024": 20, "i020": 5 }, xp: 120 }
            ]
        },
        "p009": {
            name: "Arquiteto",
            description: "Constrói estruturas no mundo",
            bonus: { building_cost: 0.8 },
            recipes: [
                { id: "r030", name: "Forja Básica", result: "struct001", requiredLevel: 1, materials: { "i002": 50, "i003": 20 }, xp: 100 },
                { id: "r031", name: "Torre Mágica", result: "struct002", requiredLevel: 20, materials: { "i012": 30, "i021": 10 }, xp: 500 }
            ]
        }
    },

    jobs: {
        "j001": { name: "Minerador", description: "Extrai minérios das montanhas", duration: 3600, rewards: { gold: 50, items: [{ id: "i003", quantity: 3, chance: 0.8 }, { id: "i007", quantity: 1, chance: 0.2 }] } },
        "j002": { name: "Lenhador", description: "Corta madeira na floresta", duration: 2400, rewards: { gold: 30, items: [{ id: "i001", quantity: 8, chance: 1.0 }, { id: "i015", quantity: 2, chance: 0.3 }] } },
        "j003": { name: "Caçador", description: "Caça animais por couro", duration: 4800, rewards: { gold: 80, items: [{ id: "i005", quantity: 5, chance: 0.9 }, { id: "i016", quantity: 1, chance: 0.1 }] } },
        "j004": { name: "Coletor de Ervas", description: "Coleta ingredientes mágicos", duration: 3000, rewards: { gold: 60, items: [{ id: "i004", quantity: 4, chance: 0.7 }, { id: "i024", quantity: 8, chance: 0.9 }] } },
        "j005": { name: "Mercenário", description: "Trabalho perigoso, alta recompensa", duration: 7200, rewards: { gold: 200, items: [{ id: "g001", quantity: 1, chance: 0.05 }, { id: "i010", quantity: 2, chance: 0.3 }] } },
        "j006": { name: "Explorador", description: "Explora ruínas antigas", duration: 6000, rewards: { gold: 150, items: [{ id: "i008", quantity: 2, chance: 0.4 }, { id: "g002", quantity: 1, chance: 0.08 }] } },
        "j007": { name: "Garimpeiro", description: "Procura por gemas raras", duration: 5400, rewards: { gold: 120, items: [{ id: "i008", quantity: 3, chance: 0.6 }, { id: "i021", quantity: 1, chance: 0.05 }] } },
        "j008": { name: "Escavador de Runas", description: "Busca runas antigas", duration: 4200, rewards: { gold: 90, items: [{ id: "i018", quantity: 5, chance: 0.8 }, { id: "i019", quantity: 2, chance: 0.4 }] } }
    },

    castles: {
        "c001": { name: "Forte Abandonado", level: 1, maxLevel: 5, cost: 1000, income: 50, description: "Um pequeno forte em ruínas", upgradeCost: 500 },
        "c002": { name: "Torre de Vigia", level: 1, maxLevel: 5, cost: 2500, income: 120, description: "Torre estratégica nas montanhas", upgradeCost: 1000 },
        "c003": { name: "Castelo do Vale", level: 1, maxLevel: 5, cost: 5000, income: 250, description: "Castelo no vale fértil", upgradeCost: 2000 },
        "c004": { name: "Fortaleza Real", level: 1, maxLevel: 5, cost: 10000, income: 500, description: "Antiga fortaleza real", upgradeCost: 4000 },
        "c005": { name: "Cidadela Mística", level: 1, maxLevel: 5, cost: 20000, income: 1000, description: "Cidadela imbuída de magia", upgradeCost: 8000 },
        "c006": { name: "Palácio Imperial", level: 1, maxLevel: 10, cost: 50000, income: 2000, description: "Sede do antigo império", upgradeCost: 15000 },
        "c007": { name: "Fortaleza Celestial", level: 1, maxLevel: 10, cost: 100000, income: 5000, description: "Castelo que toca os céus", upgradeCost: 30000 }
    },

    // ===== SISTEMA DE ESTRUTURAS =====
    structures: {
        "struct001": {
            name: "Forja Básica",
            description: "Aumenta velocidade de criação de equipamentos",
            cost: { "i002": 50, "i003": 20, gold: 1000 },
            bonus: { crafting_speed: 1.2 },
            category: "production"
        },
        "struct002": {
            name: "Torre Mágica",
            description: "Aumenta regeneração de MP",
            cost: { "i012": 30, "i021": 10, gold: 5000 },
            bonus: { mp_regen: 10 },
            category: "magic"
        },
        "struct003": {
            name: "Laboratório de Alquimia",
            description: "Melhora efetividade das poções",
            cost: { "i004": 100, "i011": 50, gold: 3000 },
            bonus: { potion_power: 1.3 },
            category: "alchemy"
        },
        "struct004": {
            name: "Dojo de Treinamento",
            description: "Aumenta ganho de XP de combate",
            cost: { "i001": 200, "i005": 100, gold: 2500 },
            bonus: { combat_xp: 1.25 },
            category: "training"
        },
        "struct005": {
            name: "Mercado",
            description: "Reduz preços na loja",
            cost: { "i006": 150, "i001": 100, gold: 4000 },
            bonus: { shop_discount: 0.15 },
            category: "commerce"
        },
        "struct006": {
            name: "Santuário",
            description: "Aumenta regeneração de HP",
            cost: { "i020": 50, "i021": 20, gold: 6000 },
            bonus: { hp_regen: 15 },
            category: "divine"
        },
        "struct007": {
            name: "Biblioteca Arcana",
            description: "Aumenta poder das habilidades mágicas",
            cost: { "i009": 80, "i023": 15, gold: 8000 },
            bonus: { magic_power: 1.4 },
            category: "knowledge"
        },
        "struct008": {
            name: "Quartel",
            description: "Aumenta atributos de combate",
            cost: { "i003": 300, "i010": 50, gold: 7000 },
            bonus: { combat_stats: 15 },
            category: "military"
        },
        "struct009": {
            name: "Mina Encantada",
            description: "Gera recursos automaticamente",
            cost: { "i002": 500, "i012": 100, gold: 15000 },
            bonus: { resource_generation: true },
            category: "mining"
        },
        "struct010": {
            name: "Portal Dimensional",
            description: "Permite viagem rápida entre áreas",
            cost: { "i014": 25, "i023": 30, gold: 25000 },
            bonus: { fast_travel: true },
            category: "transport"
        }
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
        const itemCount = Math.floor(Math.random() * 12) + 8; // 8-19 itens

        const allItems = Object.keys(DB.items);
        for (let i = 0; i < itemCount; i++) {
            const itemId = allItems[Math.floor(Math.random() * allItems.length)];
            const item = DB.items[itemId];
            
            // Chance baseada na raridade
            const rarityChances = {
                [RARITIES.COMUM]: 0.45,
                [RARITIES.INCOMUM]: 0.3,
                [RARITIES.RARO]: 0.15,
                [RARITIES.ULTRA_RARO]: 0.07,
                [RARITIES.RELIQUIA]: 0.02,
                [RARITIES.LENDARIO]: 0.008,
                [RARITIES.MITICO]: 0.002
            };

            if (Math.random() < rarityChances[item.rarity]) {
                const quantity = Math.floor(Math.random() * 3) + 1;
                const priceMultiplier = 1.1 + Math.random() * 0.8; // 110% a 190% do valor base
                this.items.push({ 
                    id: itemId, 
                    quantity, 
                    price: Math.floor(item.value * priceMultiplier) 
                });
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