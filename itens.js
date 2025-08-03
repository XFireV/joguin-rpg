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
        // Recursos
        "i001": { name: "Galho", type: "Resource", weight: 0.2, rarity: RARITIES.COMUM },
        "i002": { name: "Pedra", type: "Resource", weight: 0.5, rarity: RARITIES.COMUM },
        "i003": { name: "Minério de Ferro", type: "Resource", weight: 1.0, rarity: RARITIES.INCOMUM },
        "i004": { name: "Essência Mágica Fraca", type: "Resource", weight: 0.1, rarity: RARITIES.INCOMUM },

        // Consumíveis
        "c001": { name: "Poção de Vida Fraca", type: "Consumable", weight: 0.3, rarity: RARITIES.COMUM },

        // Grimórios
        "g001": { name: "Grimório: Bola de Fogo", type: "Grimoire", weight: 1.0, rarity: RARITIES.RARO, teaches: "s001" },

        // Equipamentos (Criáveis)
        "eq001": { name: "Adaga de Ferro", type: "Equipment", weight: 1.5, rarity: RARITIES.INCOMUM, slot: "weapon" },
        "eq002": { name: "Escudo de Ferro", type: "Equipment", weight: 4.0, rarity: RARITIES.INCOMUM, slot: "offhand" },
    },

    skills: {
        "s001": { name: "Bola de Fogo", description: "Lança uma bola de fogo que causa dano mágico.", type: "Active" },
    },

    professions: {
        "p001": {
            name: "Ferreiro",
            recipes: [
                { id: "r001", name: "Criar Adaga de Ferro", result: "eq001", requiredLevel: 1, materials: { "i003": 5, "i001": 2 } },
                { id: "r002", name: "Criar Escudo de Ferro", result: "eq002", requiredLevel: 5, materials: { "i003": 10, "i002": 5 } }
            ]
        }
    }
};
