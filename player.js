// =================================================================================
// CLASSE DO JOGADOR
// =================================================================================

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

        this.equipment = { 
            weapon: null, 
            offhand: null,
            head: null, 
            chest: null, 
            legs: null,
            feet: null,
        };

        this.skills = [];
        this.statusEffects = [];

        this.proficiencies = { 
            weapons: { "espadas": { level: 1, xp: 0 } }, 
            gathering: { "mineracao": { level: 1, xp: 0 } }
        };

        this.class = null;
        this.profession = null;
        this.currentJob = null;
        this.ownedCastles = [];
        this.lastCastleIncome = Date.now();
    }

    getMaxHp() {
        return 50 + (this.stats.vigor * 8) + (this.level * 5);
    }

    getMaxMp() {
        return 30 + (this.stats.inteligencia * 5) + (this.level * 3);
    }

    getAttack() {
        let attack = this.stats.forca * 2;
        if (this.equipment.weapon) {
            const weapon = DB.items[this.equipment.weapon.id];
            attack += weapon.stats?.attack || 0;
        }
        return attack;
    }

    getDefense() {
        let defense = Math.floor(this.stats.vigor / 2);
        Object.values(this.equipment).forEach(item => {
            if (item) {
                const itemData = DB.items[item.id];
                defense += itemData.stats?.defense || 0;
            }
        });
        return defense;
    }

    getAgility() {
        return this.stats.destreza + (this.level * 2);
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
        this.xp += amount;
        while (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.xp -= this.xpToNextLevel;
        this.level++;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.2);
        this.attributePoints += 3;
        
        // Restaurar HP/MP no level up
        this.hp = this.getMaxHp();
        this.mp = this.getMaxMp();
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }

    heal(amount) {
        this.hp = Math.min(this.hp + amount, this.getMaxHp());
    }

    addStatusEffect(effect, duration) {
        const existing = this.statusEffects.find(e => e.type === effect);
        if (existing) {
            existing.duration = Math.max(existing.duration, duration);
        } else {
            this.statusEffects.push({ type: effect, duration });
        }
    }

    updateStatusEffects() {
        this.statusEffects = this.statusEffects.filter(effect => {
            effect.duration--;
            
            switch(effect.type) {
                case STATUS_EFFECTS.POISON:
                    this.takeDamage(5);
                    break;
                case STATUS_EFFECTS.BURN:
                    this.takeDamage(8);
                    break;
            }
            
            return effect.duration > 0;
        });
    }

    canAct() {
        return !this.statusEffects.some(e => 
            e.type === STATUS_EFFECTS.PARALYSIS || 
            e.type === STATUS_EFFECTS.FREEZE || 
            e.type === STATUS_EFFECTS.STUN
        );
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

    equipItem(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Equipment') return false;

        const slot = item.slot;
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

    buyCastle(castleId) {
        const castle = DB.castles[castleId];
        if (!castle || this.gold < castle.cost) return false;
        
        if (this.ownedCastles.includes(castleId)) return false;
        
        this.gold -= castle.cost;
        this.ownedCastles.push(castleId);
        return true;
    }

    collectCastleIncome() {
        const now = Date.now();
        const timeSinceLastCollection = now - this.lastCastleIncome;
        const hoursElapsed = Math.floor(timeSinceLastCollection / (6 * 60 * 60 * 1000)); // 6 horas
        
        if (hoursElapsed > 0) {
            let totalIncome = 0;
            this.ownedCastles.forEach(castleId => {
                const castle = DB.castles[castleId];
                totalIncome += castle.income * hoursElapsed;
            });
            
            if (totalIncome > 0) {
                this.gold += totalIncome;
                this.lastCastleIncome = now;
                return totalIncome;
            }
        }
        return 0;
    }
}