// =================================================================================
// CLASSE DO JOGADOR - VERSÃO 0.12
// =================================================================================

// Efeitos de status globais
const STATUS_EFFECTS = {
    POISON: "poison",
    PARALYSIS: "paralysis", 
    BURN: "burn",
    FREEZE: "freeze",
    STUN: "stun",
    ROOT: "root",
    FEAR: "fear",
    CHARM: "charm",
    BLEED: "bleed",
    CURSE: "curse",
    WEAKNESS: "weakness",
    BLIND: "blind",
    SILENCE: "silence",
    CONFUSION: "confusion",
    TERROR: "terror",
    DOOM: "doom"
};

class Player {
    constructor() {
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.attributePoints = 5;
        this.gold = 150;

        this.stats = {
            forca: 10,
            destreza: 8,
            inteligencia: 6,
            vigor: 12
        };

        this.hp = this.getMaxHp();
        this.mp = this.getMaxMp();

        this.inventory = [
            { id: "c001", quantity: 5 },
            { id: "g001", quantity: 1 },
            { id: "i001", quantity: 10 },
            { id: "i002", quantity: 8 }
        ];
        this.inventoryMaxWeight = 60;

        // Sistema de equipamentos expandido
        this.equipment = { 
            weapon: null, 
            offhand: null,
            head: null, 
            chest: null, 
            legs: null,
            feet: null,
            ring1: null,
            ring2: null,
            necklace: null
        };

        // Sistema de habilidades equipadas
        this.skills = []; // Todas as habilidades conhecidas
        this.equippedSkills = []; // Máximo 10 habilidades equipadas
        this.maxEquippedSkills = 10;

        this.statusEffects = [];
        this.temporaryBuffs = []; // Buffs temporários de poções/elixires

        this.proficiencies = { 
            weapons: { "espadas": { level: 1, xp: 0 } }, 
            gathering: { "mineracao": { level: 1, xp: 0 } }
        };

        this.class = null;
        this.profession = null;
        this.currentJob = null;
        this.ownedCastles = [];
        this.castleLevels = {}; // Níveis dos castelos possuídos
        this.lastCastleIncome = Date.now();

        // Sistema de estruturas
        this.ownedStructures = [];
        this.structureBonuses = {
            crafting_speed: 1.0,
            mp_regen: 0,
            hp_regen: 0,
            potion_power: 1.0,
            combat_xp: 1.0,
            shop_discount: 0,
            magic_power: 1.0,
            combat_stats: 0,
            resource_generation: false,
            fast_travel: false
        };
    }

    getMaxHp() {
        let base = 50 + (this.stats.vigor * 8) + (this.level * 5);
        
        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item && DB.items[item.id]?.stats?.hp) {
                base += DB.items[item.id].stats.hp;
            }
        });
        
        // Bônus de estruturas
        base += this.structureBonuses.hp_regen * 10;
        
        return base;
    }

    getMaxMp() {
        let base = 30 + (this.stats.inteligencia * 5) + (this.level * 3);
        
        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item && DB.items[item.id]?.stats?.mana) {
                base += DB.items[item.id].stats.mana;
            }
        });
        
        return base;
    }

    getAttack() {
        let attack = this.stats.forca * 2;
        
        // Bônus de arma
        if (this.equipment.weapon) {
            const weapon = DB.items[this.equipment.weapon.id];
            attack += weapon.stats?.attack || 0;
        }
        
        // Bônus de outros equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item && item !== this.equipment.weapon) {
                const itemData = DB.items[item.id];
                if (itemData.stats?.attack) {
                    attack += itemData.stats.attack;
                }
            }
        });
        
        // Bônus de estruturas
        attack += this.structureBonuses.combat_stats;
        
        // Buffs temporários
        this.temporaryBuffs.forEach(buff => {
            if (buff.type === "buff_strength") {
                attack += buff.power;
            }
        });
        
        return attack;
    }

    getDefense() {
        let defense = Math.floor(this.stats.vigor / 2);
        
        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item) {
                const itemData = DB.items[item.id];
                defense += itemData.stats?.defense || 0;
            }
        });
        
        // Bônus de estruturas
        defense += this.structureBonuses.combat_stats;
        
        return defense;
    }

    getAgility() {
        let agility = this.stats.destreza + (this.level * 2);
        
        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item) {
                const itemData = DB.items[item.id];
                agility += itemData.stats?.agility || 0;
            }
        });
        
        // Buffs temporários
        this.temporaryBuffs.forEach(buff => {
            if (buff.type === "buff_agility") {
                agility += buff.power;
            }
        });
        
        return agility;
    }

    getMagicPower() {
        let magic = this.stats.inteligencia * 2;
        
        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item) {
                const itemData = DB.items[item.id];
                magic += itemData.stats?.magic || 0;
            }
        });
        
        // Bônus de estruturas
        magic *= this.structureBonuses.magic_power;
        
        return Math.floor(magic);
    }

    getCurrentWeight() {
        return this.inventory.reduce((total, item) => {
            const itemData = DB.items[item.id];
            return total + (itemData.weight * item.quantity);
        }, 0);
    }

    addAttribute(stat) {
        if (this.attributePoints > 0) {
            this.stats[stat]++;
            this.attributePoints--;
            
            // Atualizar HP/MP se necessário
            if (stat === 'vigor') {
                const newMaxHp = this.getMaxHp();
                this.hp = Math.min(this.hp + 8, newMaxHp);
            }
            if (stat === 'inteligencia') {
                const newMaxMp = this.getMaxMp();
                this.mp = Math.min(this.mp + 5, newMaxMp);
            }
            
            return true;
        }
        return false;
    }

    gainXp(amount) {
        // Aplicar bônus de XP das estruturas
        const bonusAmount = Math.floor(amount * this.structureBonuses.combat_xp);
        this.xp += bonusAmount;
        
        while (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
        
        return bonusAmount;
    }

    levelUp() {
        this.xp -= this.xpToNextLevel;
        this.level++;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.2);
        this.attributePoints += 3;
        
        // Restaurar HP/MP no level up
        this.hp = this.getMaxHp();
        this.mp = this.getMaxMp();
        
        // Aumentar slots de habilidades a cada 5 níveis
        if (this.level % 5 === 0 && this.maxEquippedSkills < 15) {
            this.maxEquippedSkills++;
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }

    heal(amount) {
        // Aplicar bônus de efetividade de poções
        const bonusAmount = Math.floor(amount * this.structureBonuses.potion_power);
        this.hp = Math.min(this.hp + bonusAmount, this.getMaxHp());
        return bonusAmount;
    }

    restoreMp(amount) {
        // Aplicar bônus de efetividade de poções
        const bonusAmount = Math.floor(amount * this.structureBonuses.potion_power);
        this.mp = Math.min(this.mp + bonusAmount, this.getMaxMp());
        return bonusAmount;
    }

    addStatusEffect(effect, duration) {
        const existing = this.statusEffects.find(e => e.type === effect);
        if (existing) {
            existing.duration = Math.max(existing.duration, duration);
        } else {
            this.statusEffects.push({ type: effect, duration });
        }
    }

    addTemporaryBuff(type, power, duration) {
        // Remove buffs do mesmo tipo
        this.temporaryBuffs = this.temporaryBuffs.filter(buff => buff.type !== type);
        
        this.temporaryBuffs.push({
            type: type,
            power: power,
            duration: duration,
            startTime: Date.now()
        });
    }

    updateStatusEffects() {
        // Atualizar efeitos de status
        this.statusEffects = this.statusEffects.filter(effect => {
            effect.duration--;
            
            switch(effect.type) {
                case STATUS_EFFECTS.POISON:
                    this.takeDamage(5);
                    break;
                case STATUS_EFFECTS.BURN:
                    this.takeDamage(8);
                    break;
                case STATUS_EFFECTS.BLEED:
                    this.takeDamage(4);
                    break;
            }
            
            return effect.duration > 0;
        });

        // Atualizar buffs temporários
        const now = Date.now();
        this.temporaryBuffs = this.temporaryBuffs.filter(buff => {
            const elapsed = now - buff.startTime;
            return elapsed < (buff.duration * 1000);
        });

        // Regeneração passiva de estruturas
        if (this.structureBonuses.hp_regen > 0) {
            this.heal(this.structureBonuses.hp_regen);
        }
        if (this.structureBonuses.mp_regen > 0) {
            this.mp = Math.min(this.mp + this.structureBonuses.mp_regen, this.getMaxMp());
        }
    }

    canAct() {
        return !this.statusEffects.some(e => 
            e.type === STATUS_EFFECTS.PARALYSIS || 
            e.type === STATUS_EFFECTS.FREEZE || 
            e.type === STATUS_EFFECTS.STUN ||
            e.type === STATUS_EFFECTS.TERROR
        );
    }

    // ===== SISTEMA DE HABILIDADES EQUIPADAS =====
    
    equipSkill(skillId) {
        if (!this.skills.includes(skillId)) return false;
        if (this.equippedSkills.includes(skillId)) return false;
        if (this.equippedSkills.length >= this.maxEquippedSkills) return false;
        
        this.equippedSkills.push(skillId);
        return true;
    }

    unequipSkill(skillId) {
        const index = this.equippedSkills.indexOf(skillId);
        if (index > -1) {
            this.equippedSkills.splice(index, 1);
            return true;
        }
        return false;
    }

    canUseSkill(skillId) {
        if (!this.equippedSkills.includes(skillId)) return false;
        const skill = DB.skills[skillId];
        return skill && this.mp >= skill.cost;
    }

    learnSkillFromGrimoire(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Grimoire' || !item.teaches) return "Item inválido.";

        if (this.skills.includes(item.teaches)) {
            return "Você já conhece esta habilidade.";
        }

        this.skills.push(item.teaches);
        this.removeItem(itemId, 1);
        return `Você aprendeu: ${DB.skills[item.teaches].name}!`;
    }

    // ===== SISTEMA DE ITENS =====

    addItem(itemId, quantity = 1) {
        const existingItem = this.inventory.find(i => i.id === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.inventory.push({ id: itemId, quantity });
        }
    }

    removeItem(itemId, quantity = 1) {
        const itemIndex = this.inventory.findIndex(i => i.id === itemId);
        if (itemIndex > -1) {
            this.inventory[itemIndex].quantity -= quantity;
            if (this.inventory[itemIndex].quantity <= 0) {
                this.inventory.splice(itemIndex, 1);
            }
            return true;
        }
        return false;
    }

    hasMaterials(materials) {
        for(const itemId in materials) {
            const requiredQty = materials[itemId];
            const playerItem = this.inventory.find(i => i.id === itemId);
            if (!playerItem || playerItem.quantity < requiredQty) {
                return false;
            }
        }
        return true;
    }

    hasItem(itemId, quantity = 1) {
        const item = this.inventory.find(i => i.id === itemId);
        return item && item.quantity >= quantity;
    }

    // ===== SISTEMA DE EQUIPAMENTOS =====

    equipItem(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Equipment') return false;

        const slot = item.slot;
        
        // Verificar se é um anel e encontrar slot disponível
        if (slot === "ring1") {
            if (!this.equipment.ring1) {
                slot = "ring1";
            } else if (!this.equipment.ring2) {
                slot = "ring2";
            } else {
                // Ambos os slots de anel estão ocupados, substituir ring1
                this.addItem(this.equipment.ring1.id, 1);
                slot = "ring1";
            }
        }

        // Desequipar item atual se houver
        if (this.equipment[slot]) {
            this.addItem(this.equipment[slot].id, 1);
        }

        this.equipment[slot] = { id: itemId };
        this.removeItem(itemId, 1);
        return true;
    }

    unequipItem(slot) {
        if (this.equipment[slot]) {
            this.addItem(this.equipment[slot].id, 1);
            this.equipment[slot] = null;
            return true;
        }
        return false;
    }

    getEquippedItemsOfType(type) {
        return Object.values(this.equipment)
            .filter(item => item && DB.items[item.id].type === type)
            .map(item => item.id);
    }

    // ===== SISTEMA DE TRABALHOS =====

    startJob(jobId) {
        if (this.currentJob) return false;
        
        const job = DB.jobs[jobId];
        this.currentJob = {
            id: jobId,
            startTime: Date.now(),
            duration: job.duration * 1000
        };
        return true;
    }

    completeJob() {
        if (!this.currentJob) return null;
        
        const job = DB.jobs[this.currentJob.id];
        const elapsed = Date.now() - this.currentJob.startTime;
        
        if (elapsed >= this.currentJob.duration) {
            this.gold += job.rewards.gold;
            
            job.rewards.items.forEach(reward => {
                if (Math.random() < reward.chance) {
                    this.addItem(reward.id, reward.quantity);
                }
            });
            
            const completedJob = this.currentJob;
            this.currentJob = null;
            return completedJob;
        }
        return null;
    }

    // ===== SISTEMA DE CASTELOS =====

    buyCastle(castleId) {
        const castle = DB.castles[castleId];
        if (!castle || this.gold < castle.cost) return false;
        
        if (this.ownedCastles.includes(castleId)) return false;
        
        this.gold -= castle.cost;
        this.ownedCastles.push(castleId);
        this.castleLevels[castleId] = 1; // Nível inicial
        return true;
    }

    upgradeCastle(castleId) {
        if (!this.ownedCastles.includes(castleId)) return false;
        
        const castle = DB.castles[castleId];
        const currentLevel = this.castleLevels[castleId] || 1;
        
        if (currentLevel >= castle.maxLevel) return false;
        
        const upgradeCost = castle.upgradeCost * currentLevel;
        if (this.gold < upgradeCost) return false;
        
        this.gold -= upgradeCost;
        this.castleLevels[castleId] = currentLevel + 1;
        return true;
    }

    getCastleIncome(castleId) {
        const castle = DB.castles[castleId];
        const level = this.castleLevels[castleId] || 1;
        return castle.income * level;
    }

    collectCastleIncome() {
        const now = Date.now();
        const timeSinceLastCollection = now - this.lastCastleIncome;
        const hoursElapsed = Math.floor(timeSinceLastCollection / (6 * 60 * 60 * 1000)); // 6 horas
        
        if (hoursElapsed > 0) {
            let totalIncome = 0;
            this.ownedCastles.forEach(castleId => {
                totalIncome += this.getCastleIncome(castleId) * hoursElapsed;
            });
            
            if (totalIncome > 0) {
                this.gold += totalIncome;
                this.lastCastleIncome = now;
                return totalIncome;
            }
        }
        return 0;
    }

    // ===== SISTEMA DE ESTRUTURAS =====

    canBuildStructure(structureId) {
        if (this.ownedStructures.includes(structureId)) return false;
        
        const structure = DB.structures[structureId];
        if (!structure) return false;
        
        // Verificar recursos
        for (const [itemId, quantity] of Object.entries(structure.cost)) {
            if (itemId === 'gold') {
                if (this.gold < quantity) return false;
            } else {
                if (!this.hasItem(itemId, quantity)) return false;
            }
        }
        
        return true;
    }

    buildStructure(structureId) {
        if (!this.canBuildStructure(structureId)) return false;
        
        const structure = DB.structures[structureId];
        
        // Consumir recursos
        for (const [itemId, quantity] of Object.entries(structure.cost)) {
            if (itemId === 'gold') {
                this.gold -= quantity;
            } else {
                this.removeItem(itemId, quantity);
            }
        }
        
        this.ownedStructures.push(structureId);
        this.updateStructureBonuses();
        return true;
    }

    updateStructureBonuses() {
        // Resetar bônus
        this.structureBonuses = {
            crafting_speed: 1.0,
            mp_regen: 0,
            hp_regen: 0,
            potion_power: 1.0,
            combat_xp: 1.0,
            shop_discount: 0,
            magic_power: 1.0,
            combat_stats: 0,
            resource_generation: false,
            fast_travel: false
        };

        // Aplicar bônus das estruturas
        this.ownedStructures.forEach(structureId => {
            const structure = DB.structures[structureId];
            if (structure && structure.bonus) {
                for (const [bonusType, value] of Object.entries(structure.bonus)) {
                    if (typeof value === 'number') {
                        if (bonusType.endsWith('_speed') || bonusType.endsWith('_power')) {
                            this.structureBonuses[bonusType] *= value;
                        } else {
                            this.structureBonuses[bonusType] += value;
                        }
                    } else if (typeof value === 'boolean') {
                        this.structureBonuses[bonusType] = value;
                    }
                }
            }
        });
    }

    // ===== SISTEMA DE PROFISSÕES =====

    getProfessionBonus(bonusType) {
        if (!this.profession) return 1.0;
        
        const profData = DB.professions[this.profession.id];
        return profData.bonus?.[bonusType] || 1.0;
    }

    // ===== SISTEMA DE CONSUMÍVEIS AVANÇADOS =====

    useConsumable(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Consumable') return false;
        if (!this.hasItem(itemId)) return false;
        
        let result = { success: false, message: "" };
        
        switch(item.effect) {
            case 'heal':
                const healAmount = this.heal(item.power);
                result = { success: true, message: `Você recuperou ${healAmount} HP!` };
                break;
                
            case 'mana':
                const manaAmount = this.restoreMp(item.power);
                result = { success: true, message: `Você recuperou ${manaAmount} MP!` };
                break;
                
            case 'buff_strength':
                this.addTemporaryBuff('buff_strength', item.power, item.duration);
                result = { success: true, message: `Força aumentada em ${item.power} por ${item.duration} segundos!` };
                break;
                
            case 'buff_agility':
                this.addTemporaryBuff('buff_agility', item.power, item.duration);
                result = { success: true, message: `Agilidade aumentada em ${item.power} por ${item.duration} segundos!` };
                break;
                
            case 'buff_intelligence':
                this.addTemporaryBuff('buff_intelligence', item.power, item.duration);
                result = { success: true, message: `Inteligência aumentada em ${item.power} por ${item.duration} segundos!` };
                break;
                
            case 'full_restore':
                this.hp = this.getMaxHp();
                this.mp = this.getMaxMp();
                this.statusEffects = [];
                result = { success: true, message: "HP e MP completamente restaurados! Todos os efeitos negativos removidos!" };
                break;
                
            case 'cure_poison':
                this.statusEffects = this.statusEffects.filter(e => e.type !== STATUS_EFFECTS.POISON);
                result = { success: true, message: "Veneno curado!" };
                break;
                
            case 'cure_all':
                this.statusEffects = [];
                result = { success: true, message: "Todos os efeitos negativos removidos!" };
                break;
                
            case 'xp_boost':
                this.addTemporaryBuff('xp_boost', item.power, item.duration);
                result = { success: true, message: `XP multiplicado por ${item.power} por ${item.duration} segundos!` };
                break;
                
            case 'luck_boost':
                this.addTemporaryBuff('luck_boost', 1, item.duration);
                result = { success: true, message: `Sorte aumentada por ${item.duration} segundos!` };
                break;
                
            default:
                return { success: false, message: "Efeito desconhecido!" };
        }
        
        if (result.success) {
            this.removeItem(itemId, 1);
        }
        
        return result;
    }

    // ===== MÉTODOS AUXILIARES =====

    getTotalBonusStats() {
        let bonusStats = {
            attack: 0,
            defense: 0,
            magic: 0,
            hp: 0,
            mp: 0,
            agility: 0
        };

        // Bônus de equipamentos
        Object.values(this.equipment).forEach(item => {
            if (item) {
                const itemData = DB.items[item.id];
                if (itemData.stats) {
                    for (const [stat, value] of Object.entries(itemData.stats)) {
                        if (bonusStats.hasOwnProperty(stat)) {
                            bonusStats[stat] += value;
                        }
                    }
                }
            }
        });

        return bonusStats;
    }

    getActiveBuffs() {
        return this.temporaryBuffs.filter(buff => {
            const elapsed = Date.now() - buff.startTime;
            return elapsed < (buff.duration * 1000);
        });
    }

    serialize() {
        // Método para salvar o estado do jogador
        return {
            level: this.level,
            xp: this.xp,
            xpToNextLevel: this.xpToNextLevel,
            attributePoints: this.attributePoints,
            gold: this.gold,
            stats: this.stats,
            hp: this.hp,
            mp: this.mp,
            inventory: this.inventory,
            equipment: this.equipment,
            skills: this.skills,
            equippedSkills: this.equippedSkills,
            maxEquippedSkills: this.maxEquippedSkills,
            profession: this.profession,
            currentJob: this.currentJob,
            ownedCastles: this.ownedCastles,
            castleLevels: this.castleLevels,
            ownedStructures: this.ownedStructures,
            lastCastleIncome: this.lastCastleIncome
        };
    }

    deserialize(data) {
        // Método para carregar o estado do jogador
        Object.assign(this, data);
        this.updateStructureBonuses();
        
        // Garantir que arrays existam
        this.skills = this.skills || [];
        this.equippedSkills = this.equippedSkills || [];
        this.ownedStructures = this.ownedStructures || [];
        this.castleLevels = this.castleLevels || {};
        this.statusEffects = [];
        this.temporaryBuffs = [];
    }
}