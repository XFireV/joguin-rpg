// =================================================================================
// BANCO DE DADOS DE MONSTROS E SISTEMA DE COMBATE
// =================================================================================

DB.enemies = {
    "m001": { 
        name: "Slime Verde", level: 1, 
        stats: { maxHp: 40, strength: 8, agility: 3, defense: 2 }, 
        loot: [{ id: 'i004', chance: 0.3 }, { id: 'c001', chance: 0.2 }], 
        xpValue: 15,
        skills: ["poison_spit"]
    },
    "m002": { 
        name: "Lobo da Floresta", level: 3, 
        stats: { maxHp: 80, strength: 15, agility: 12, defense: 5 }, 
        loot: [{ id: 'i001', chance: 0.8 }, { id: 'i005', chance: 0.6 }], 
        xpValue: 35,
        skills: ["howl", "bite"]
    },
    "m003": { 
        name: "Goblin Guerreiro", level: 4, 
        stats: { maxHp: 100, strength: 18, agility: 8, defense: 8 }, 
        loot: [{ id: 'i002', chance: 0.7 }, { id: 'i003', chance: 0.4 }], 
        xpValue: 45,
        skills: ["shield_bash"]
    },
    "m004": { 
        name: "Esqueleto", level: 5, 
        stats: { maxHp: 120, strength: 20, agility: 6, defense: 12 }, 
        loot: [{ id: 'i002', chance: 0.9 }, { id: 'eq001', chance: 0.1 }], 
        xpValue: 60,
        skills: ["bone_throw", "fear_aura"]
    },
    "m005": { 
        name: "Orc Berserker", level: 7, 
        stats: { maxHp: 180, strength: 35, agility: 5, defense: 15 }, 
        loot: [{ id: 'i003', chance: 0.8 }, { id: 'eq003', chance: 0.15 }], 
        xpValue: 90,
        skills: ["rage", "cleave"]
    },
    "m006": { 
        name: "Mago Sombrio", level: 8, 
        stats: { maxHp: 150, strength: 12, agility: 10, defense: 8, magic: 40 }, 
        loot: [{ id: 'i004', chance: 0.9 }, { id: 'g001', chance: 0.2 }], 
        xpValue: 120,
        skills: ["shadow_bolt", "curse", "teleport"]
    },
    "m007": { 
        name: "Dragão Jovem", level: 12, 
        stats: { maxHp: 400, strength: 50, agility: 15, defense: 25, magic: 30 }, 
        loot: [{ id: 'i008', chance: 0.8 }, { id: 'i010', chance: 0.4 }, { id: 'g006', chance: 0.1 }], 
        xpValue: 300,
        skills: ["fire_breath", "wing_attack", "intimidate"]
    },
    "m008": { 
        name: "Lich Ancião", level: 15, 
        stats: { maxHp: 600, strength: 25, agility: 8, defense: 20, magic: 80 }, 
        loot: [{ id: 'i009', chance: 0.9 }, { id: 'g007', chance: 0.3 }, { id: 'eq009', chance: 0.05 }], 
        xpValue: 500,
        skills: ["death_ray", "summon_undead", "life_drain", "paralyze"]
    }
};

DB.huntingGrounds = {
    "h001": { name: "Clareira dos Iniciantes", levelRange: "1-2", enemies: ["m001"], description: "Local seguro para novatos" },
    "h002": { name: "Floresta Sombria", levelRange: "2-4", enemies: ["m002", "m003"], description: "Floresta habitada por lobos e goblins" },
    "h003": { name: "Cemitério Assombrado", levelRange: "4-6", enemies: ["m004"], description: "Mortos-vivos vagam por aqui" },
    "h004": { name: "Acampamento Orc", levelRange: "6-8", enemies: ["m005"], description: "Território perigoso dos orcs" },
    "h005": { name: "Torre dos Magos", levelRange: "7-9", enemies: ["m006"], description: "Torre abandonada cheia de magia sombria" },
    "h006": { name: "Covil do Dragão", levelRange: "10-14", enemies: ["m007"], description: "Lar de um dragão jovem" },
    "h007": { name: "Cripta Antiga", levelRange: "13-17", enemies: ["m008"], description: "Tumba de um poderoso lich" },
    "h008": { name: "Campos de Batalha", levelRange: "5-12", enemies: ["m003", "m004", "m005", "m006"], description: "Área mista com vários inimigos" }
};

// Habilidades dos monstros
DB.monsterSkills = {
    "poison_spit": { name: "Cuspe Venenoso", damage: 12, effect: "poison", duration: 3 },
    "howl": { name: "Uivo", effect: "fear", duration: 2 },
    "bite": { name: "Mordida", damage: 20 },
    "shield_bash": { name: "Golpe de Escudo", damage: 15, effect: "stun", duration: 1 },
    "bone_throw": { name: "Arremesso de Osso", damage: 25 },
    "fear_aura": { name: "Aura de Medo", effect: "fear", duration: 3 },
    "rage": { name: "Fúria", effect: "strength_boost", duration: 4 },
    "cleave": { name: "Golpe Devastador", damage: 45 },
    "shadow_bolt": { name: "Raio Sombrio", damage: 35, effect: "curse", duration: 2 },
    "curse": { name: "Maldição", effect: "weakness", duration: 5 },
    "teleport": { name: "Teletransporte", effect: "dodge_next" },
    "fire_breath": { name: "Sopro de Fogo", damage: 60, effect: "burn", duration: 3 },
    "wing_attack": { name: "Ataque das Asas", damage: 40, effect: "knockdown" },
    "intimidate": { name: "Intimidar", effect: "fear", duration: 2 },
    "death_ray": { name: "Raio da Morte", damage: 80 },
    "summon_undead": { name: "Invocar Morto-Vivo", effect: "summon" },
    "life_drain": { name: "Drenar Vida", damage: 50, heal: 25 },
    "paralyze": { name: "Paralisar", effect: "paralysis", duration: 2 }
};

// Efeitos de status
const STATUS_EFFECTS = {
    POISON: "poison",
    PARALYSIS: "paralysis", 
    BURN: "burn",
    FREEZE: "freeze",
    STUN: "stun",
    ROOT: "root",
    FEAR: "fear",
    CHARM: "charm"
};

class Enemy {
    constructor(enemyData) {
        this.name = enemyData.name;
        this.level = enemyData.level;
        this.stats = { ...enemyData.stats };
        this.hp = this.stats.maxHp;
        this.loot = enemyData.loot;
        this.xpValue = enemyData.xpValue;
        this.skills = enemyData.skills || [];
        this.statusEffects = [];
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
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
            
            // Aplicar efeito
            switch(effect.type) {
                case STATUS_EFFECTS.POISON:
                    this.takeDamage(8);
                    break;
                case STATUS_EFFECTS.BURN:
                    this.takeDamage(12);
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

    getRandomSkill() {
        if (this.skills.length === 0) return null;
        const skillId = this.skills[Math.floor(Math.random() * this.skills.length)];
        return DB.monsterSkills[skillId];
    }
}

// Sistema de Combate
class CombatSystem {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = 0;
        this.log = [];
        this.playerTurn = player.getAgility() >= enemy.stats.agility;
    }

    addLog(message) {
        this.log.push(message);
        if (this.log.length > 20) this.log.shift();
    }

    playerAttack() {
        if (!this.player.canAct()) {
            this.addLog("Você não pode agir devido a efeitos de status!");
            return false;
        }

        const damage = Math.max(1, this.player.getAttack() - this.enemy.stats.defense);
        this.enemy.takeDamage(damage);
        this.addLog(`Você causa ${damage} de dano ao ${this.enemy.name}!`);
        
        if (this.enemy.hp <= 0) {
            this.addLog(`${this.enemy.name} foi derrotado!`);
            return true;
        }
        return false;
    }

    playerUseSkill(skillId) {
        const skill = DB.skills[skillId];
        if (!skill || this.player.mp < skill.cost) return false;

        this.player.mp -= skill.cost;
        
        if (skill.damage) {
            const damage = skill.damage + Math.floor(this.player.stats.inteligencia * 2);
            this.enemy.takeDamage(damage);
            this.addLog(`${skill.name} causa ${damage} de dano!`);
        }
        
        if (skill.heal) {
            const heal = skill.heal;
            this.player.heal(heal);
            this.addLog(`Você recupera ${heal} HP!`);
        }
        
        if (skill.effect && skill.duration) {
            this.enemy.addStatusEffect(skill.effect, skill.duration);
            this.addLog(`${this.enemy.name} foi afetado por ${skill.name}!`);
        }
        
        return this.enemy.hp <= 0;
    }

    enemyTurn() {
        if (!this.enemy.canAct()) {
            this.addLog(`${this.enemy.name} não pode agir devido a efeitos de status!`);
            return false;
        }

        const skill = this.enemy.getRandomSkill();
        if (skill && Math.random() < 0.4) {
            // Usar habilidade
            this.addLog(`${this.enemy.name} usa ${skill.name}!`);
            
            if (skill.damage) {
                const damage = Math.max(1, skill.damage - this.player.getDefense());
                this.player.takeDamage(damage);
                this.addLog(`Você recebe ${damage} de dano!`);
            }
            
            if (skill.effect && skill.duration) {
                this.player.addStatusEffect(skill.effect, skill.duration);
                this.addLog(`Você foi afetado por ${skill.name}!`);
            }
        } else {
            // Ataque normal
            const damage = Math.max(1, this.enemy.stats.strength - this.player.getDefense());
            this.player.takeDamage(damage);
            this.addLog(`${this.enemy.name} ataca e causa ${damage} de dano!`);
        }
        
        return this.player.hp <= 0;
    }

    updateStatusEffects() {
        this.player.updateStatusEffects();
        this.enemy.updateStatusEffects();
    }

    nextTurn() {
        this.updateStatusEffects();
        this.turn++;
        this.playerTurn = !this.playerTurn;
        
        // Chance de ataque extra baseado na agilidade
        if (this.playerTurn && this.player.getAgility() > this.enemy.stats.agility * 2) {
            if (Math.random() < 0.3) {
                this.addLog("Sua agilidade permite um ataque extra!");
                return false; // Não muda o turno
            }
        } else if (!this.playerTurn && this.enemy.stats.agility > this.player.getAgility() * 2) {
            if (Math.random() < 0.3) {
                this.addLog(`${this.enemy.name} é rápido demais e ataca novamente!`);
                return false; // Não muda o turno
            }
        }
        
        return true;
    }
}