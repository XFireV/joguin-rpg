// =================================================================================
// BANCO DE DADOS DE MONSTROS E CLASSE ENEMY
// =================================================================================

// Adicionar mais monstros aqui no futuro
DB.enemies = {
    "m001": { name: "Slime Verde", level: 1, stats: { maxHp: 30, strength: 5 }, loot: [{ id: 'i004', chance: 0.3 }], xpValue: 10 },
    "m002": { name: "Lobo da Floresta", level: 3, stats: { maxHp: 50, strength: 8 }, loot: [{ id: 'i001', chance: 0.8 }], xpValue: 25 },
};

DB.huntingGrounds = {
    "h001": { name: "Clareira dos Iniciantes", levelRange: "1-3", enemies: ["m001", "m002"] },
};


class Enemy {
    constructor(enemyData) {
        this.name = enemyData.name;
        this.level = enemyData.level;
        this.stats = { ...enemyData.stats }; // Copia as stats
        this.hp = this.stats.maxHp;
        this.loot = enemyData.loot;
        this.xpValue = enemyData.xpValue;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }
}
