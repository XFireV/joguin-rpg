// =================================================================================
// CLASSE DO JOGADOR
// =================================================================================

class Player {
    constructor() {
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.attributePoints = 0;
        this.gold = 50;

        this.stats = {
            forca: 5,
            destreza: 5,
            inteligencia: 5,
            vigor: 5
        };

        this.inventory = [
            { id: "c001", quantity: 3 },
            { id: "g001", quantity: 1 },
        ];
        this.inventoryMaxWeight = 50;

        this.equipment = { 
            weapon: null, 
            offhand: null,
            head: null, 
            chest: null, 
            legs: null,
            feet: null,
        };

        this.skills = []; // IDs das habilidades aprendidas

        this.proficiencies = { 
            weapons: { "espadas": { level: 1, xp: 0 } }, 
            gathering: { "mineracao": { level: 1, xp: 0 } }
        };

        this.class = null; // Ex: "Guerreiro"
        this.profession = null; // Ex: { id: "p001", level: 1, xp: 0 }
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
            return true;
        }
        return false;
    }

    learnSkillFromGrimoire(itemId) {
        const item = DB.items[itemId];
        if (!item || item.type !== 'Grimoire' || !item.teaches) return "Item inválido.";

        if (this.skills.includes(item.teaches)) {
            return "Você já conhece esta habilidade.";
        }

        this.skills.push(item.teaches);
        this.removeItem(itemId, 1); // Remove o grimório do inventário
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
        }
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
}
