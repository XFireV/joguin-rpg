// =================================================================================
// BANCO DE DADOS DE MONSTROS E SISTEMA DE COMBATE - VERSÃO 0.12
// =================================================================================

DB.enemies = {
    // ===== MONSTROS BÁSICOS =====
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
    },

    // ===== NOVOS MONSTROS BÁSICOS =====
    "m009": {
        name: "Aranha Gigante", level: 2,
        stats: { maxHp: 60, strength: 12, agility: 15, defense: 4 },
        loot: [{ id: 'i025', chance: 0.6 }, { id: 'i006', chance: 0.4 }],
        xpValue: 25,
        skills: ["web_trap", "poison_bite"]
    },
    "m010": {
        name: "Bandido", level: 3,
        stats: { maxHp: 90, strength: 16, agility: 12, defense: 6 },
        loot: [{ id: 'i001', chance: 0.5 }, { id: 'c001', chance: 0.3 }],
        xpValue: 40,
        skills: ["sneak_attack", "steal"]
    },
    "m011": {
        name: "Urso Feroz", level: 6,
        stats: { maxHp: 200, strength: 40, agility: 8, defense: 18 },
        loot: [{ id: 'i005', chance: 0.9 }, { id: 'i016', chance: 0.2 }],
        xpValue: 85,
        skills: ["maul", "roar"]
    },
    "m012": {
        name: "Elemental de Fogo", level: 9,
        stats: { maxHp: 220, strength: 25, agility: 12, defense: 15, magic: 45 },
        loot: [{ id: 'i004', chance: 0.8 }, { id: 'i009', chance: 0.3 }],
        xpValue: 140,
        skills: ["flame_burst", "heat_wave", "ignite"]
    },
    "m013": {
        name: "Troll das Cavernas", level: 10,
        stats: { maxHp: 350, strength: 45, agility: 6, defense: 25 },
        loot: [{ id: 'i002', chance: 1.0 }, { id: 'i003', chance: 0.7 }],
        xpValue: 180,
        skills: ["rock_throw", "regeneration", "club_smash"]
    },

    // ===== MONSTROS AVANÇADOS =====
    "m014": {
        name: "Cavaleiro Sombrio", level: 11,
        stats: { maxHp: 380, strength: 55, agility: 18, defense: 30 },
        loot: [{ id: 'eq005', chance: 0.25 }, { id: 'i007', chance: 0.6 }],
        xpValue: 220,
        skills: ["dark_slash", "shadow_step", "unholy_strike"]
    },
    "m015": {
        name: "Hidra de Três Cabeças", level: 14,
        stats: { maxHp: 500, strength: 60, agility: 10, defense: 28 },
        loot: [{ id: 'i013', chance: 0.4 }, { id: 'g008', chance: 0.15 }],
        xpValue: 380,
        skills: ["triple_bite", "acid_spit", "regenerate_head"]
    },
    "m016": {
        name: "Anjo Caído", level: 16,
        stats: { maxHp: 550, strength: 40, agility: 25, defense: 35, magic: 70 },
        loot: [{ id: 'i021', chance: 0.5 }, { id: 'neck002', chance: 0.1 }],
        xpValue: 450,
        skills: ["divine_wrath", "fallen_grace", "light_beam"]
    },
    "m017": {
        name: "Demônio Menor", level: 13,
        stats: { maxHp: 420, strength: 50, agility: 20, defense: 22, magic: 55 },
        loot: [{ id: 'i022', chance: 0.7 }, { id: 'g011', chance: 0.2 }],
        xpValue: 320,
        skills: ["hellfire", "demonic_roar", "soul_drain"]
    },
    "m018": {
        name: "Golem de Pedra", level: 8,
        stats: { maxHp: 300, strength: 35, agility: 3, defense: 40 },
        loot: [{ id: 'i002', chance: 1.0 }, { id: 'i019', chance: 0.3 }],
        xpValue: 110,
        skills: ["boulder_throw", "earthquake", "stone_skin"]
    },
    
    // ===== MONSTROS ÉLITES =====
    "m019": {
        name: "Dragão Ancião", level: 20,
        stats: { maxHp: 800, strength: 80, agility: 25, defense: 45, magic: 90 },
        loot: [{ id: 'i013', chance: 0.9 }, { id: 'eq014', chance: 0.15 }, { id: 'i023', chance: 0.1 }],
        xpValue: 800,
        skills: ["dragon_breath", "wing_storm", "ancient_magic", "treasure_hoard"]
    },
    "m020": {
        name: "Lich Supremo", level: 18,
        stats: { maxHp: 650, strength: 30, agility: 15, defense: 25, magic: 100 },
        loot: [{ id: 'g014', chance: 0.3 }, { id: 'i014', chance: 0.2 }],
        xpValue: 650,
        skills: ["death_wave", "necromancy", "time_stop", "lich_phylactery"]
    },
    "m021": {
        name: "Fenrir", level: 17,
        stats: { maxHp: 600, strength: 75, agility: 40, defense: 30 },
        loot: [{ id: 'i016', chance: 0.8 }, { id: 'eq012', chance: 0.2 }],
        xpValue: 580,
        skills: ["howl_of_doom", "lunar_bite", "pack_leader", "winter_breath"]
    },
    "m022": {
        name: "Kraken Jovem", level: 15,
        stats: { maxHp: 520, strength: 65, agility: 18, defense: 35 },
        loot: [{ id: 'i008', chance: 0.7 }, { id: 'i020', chance: 0.6 }],
        xpValue: 420,
        skills: ["tentacle_slam", "ink_cloud", "water_vortex", "crushing_grip"]
    },

    // ===== MONSTROS LENDÁRIOS =====
    "m023": {
        name: "Bahamut", level: 25,
        stats: { maxHp: 1200, strength: 120, agility: 35, defense: 60, magic: 110 },
        loot: [{ id: 'i014', chance: 0.8 }, { id: 'eq018', chance: 0.05 }, { id: 'i023', chance: 0.4 }],
        xpValue: 1500,
        skills: ["megaflare", "divine_judgment", "king_of_dragons", "celestial_power"]
    },
    "m024": {
        name: "Leviatã", level: 22,
        stats: { maxHp: 900, strength: 90, agility: 30, defense: 50, magic: 85 },
        loot: [{ id: 'i012', chance: 0.9 }, { id: 'neck003', chance: 0.15 }],
        xpValue: 1200,
        skills: ["tidal_wave", "abyssal_current", "sea_lord", "crushing_depths"]
    },
    "m025": {
        name: "Arquidemônio", level: 24,
        stats: { maxHp: 1000, strength: 100, agility: 40, defense: 45, magic: 120 },
        loot: [{ id: 'i022', chance: 1.0 }, { id: 'g015', chance: 0.2 }],
        xpValue: 1400,
        skills: ["inferno", "demonic_legion", "chaos_magic", "hell_portal"]
    },

    // ===== MONSTROS ESPECIAIS =====
    "m026": {
        name: "Mimic", level: 6,
        stats: { maxHp: 150, strength: 20, agility: 8, defense: 25 },
        loot: [{ id: 'i010', chance: 0.6 }, { id: 'c014', chance: 0.1 }],
        xpValue: 100,
        skills: ["surprise_attack", "treasure_mimic", "chest_slam"]
    },
    "m027": {
        name: "Fantasma", level: 9,
        stats: { maxHp: 180, strength: 25, agility: 25, defense: 10 },
        loot: [{ id: 'i022', chance: 0.5 }, { id: 'c019', chance: 0.15 }],
        xpValue: 130,
        skills: ["phase_through", "life_drain", "haunting_wail", "possession"]
    },
    "m028": {
        name: "Quimera", level: 19,
        stats: { maxHp: 700, strength: 85, agility: 22, defense: 40 },
        loot: [{ id: 'i013', chance: 0.7 }, { id: 'eq015', chance: 0.1 }],
        xpValue: 720,
        skills: ["tri_element", "beast_fury", "chimera_roar", "elemental_breath"]
    },
    "m029": {
        name: "Guardião Celestial", level: 21,
        stats: { maxHp: 850, strength: 70, agility: 30, defense: 55, magic: 95 },
        loot: [{ id: 'i021', chance: 0.8 }, { id: 'eq022', chance: 0.12 }],
        xpValue: 1000,
        skills: ["divine_shield", "celestial_beam", "guardian_duty", "holy_aura"]
    },
    "m030": {
        name: "Rei dos Goblins", level: 12,
        stats: { maxHp: 400, strength: 45, agility: 20, defense: 20 },
        loot: [{ id: 'i007', chance: 0.8 }, { id: 'ring004', chance: 0.08 }],
        xpValue: 280,
        skills: ["goblin_army", "royal_command", "treasure_hoard", "crown_bash"]
    },

    // ===== MONSTROS MÍTICOS =====
    "m031": {
        name: "Destruidor de Mundos", level: 30,
        stats: { maxHp: 2000, strength: 150, agility: 50, defense: 80, magic: 150 },
        loot: [{ id: 'i014', chance: 1.0 }, { id: 'eq024', chance: 0.1 }],
        xpValue: 3000,
        skills: ["world_shatter", "void_magic", "reality_tear", "apocalypse"]
    },
    "m032": {
        name: "Fênix Eterna", level: 26,
        stats: { maxHp: 1100, strength: 70, agility: 45, defense: 40, magic: 130 },
        loot: [{ id: 'i021', chance: 1.0 }, { id: 'c013', chance: 0.3 }],
        xpValue: 1800,
        skills: ["rebirth", "phoenix_fire", "healing_light", "immortal_flame"]
    },
    "m033": {
        name: "Senhor do Tempo", level: 28,
        stats: { maxHp: 1500, strength: 80, agility: 60, defense: 50, magic: 140 },
        loot: [{ id: 'i023', chance: 0.9 }, { id: 'g015', chance: 0.25 }],
        xpValue: 2500,
        skills: ["time_manipulation", "temporal_loop", "age_acceleration", "chrono_blast"]
    }
};

DB.huntingGrounds = {
    "h001": { name: "Clareira dos Iniciantes", levelRange: "1-2", enemies: ["m001", "m009"], description: "Local seguro para novatos" },
    "h002": { name: "Floresta Sombria", levelRange: "2-4", enemies: ["m002", "m003", "m010"], description: "Floresta habitada por lobos e goblins" },
    "h003": { name: "Cemitério Assombrado", levelRange: "4-6", enemies: ["m004", "m026", "m027"], description: "Mortos-vivos vagam por aqui" },
    "h004": { name: "Acampamento Orc", levelRange: "6-8", enemies: ["m005", "m011"], description: "Território perigoso dos orcs" },
    "h005": { name: "Torre dos Magos", levelRange: "7-9", enemies: ["m006", "m012"], description: "Torre abandonada cheia de magia sombria" },
    "h006": { name: "Covil do Dragão", levelRange: "10-14", enemies: ["m007", "m013", "m015"], description: "Lar de dragões jovens" },
    "h007": { name: "Cripta Antiga", levelRange: "13-17", enemies: ["m008", "m014", "m016"], description: "Tumba de poderosos liches" },
    "h008": { name: "Campos de Batalha", levelRange: "5-12", enemies: ["m003", "m004", "m005", "m006"], description: "Área mista com vários inimigos" },
    "h009": { name: "Cavernas Profundas", levelRange: "8-12", enemies: ["m013", "m018", "m030"], description: "Cavernas cheias de trolls e golems" },
    "h010": { name: "Plano Demoníaco", levelRange: "12-18", enemies: ["m017", "m025"], description: "Território dos demônios" },
    "h011": { name: "Reino Celestial", levelRange: "15-22", enemies: ["m016", "m029"], description: "Domínio dos seres celestiais" },
    "h012": { name: "Abismo Marinho", levelRange: "14-20", enemies: ["m022", "m024"], description: "Profundezas do oceano" },
    "h013": { name: "Ninho dos Dragões", levelRange: "18-25", enemies: ["m019", "m023"], description: "Lar dos dragões anciãos" },
    "h014": { name: "Fortaleza do Caos", levelRange: "20-30", enemies: ["m020", "m028", "m031"], description: "Último reduto das trevas" },
    "h015": { name: "Santuário Temporal", levelRange: "25-30", enemies: ["m032", "m033"], description: "Local onde o tempo não tem sentido" }
};

// Habilidades dos monstros expandidas
DB.monsterSkills = {
    // ===== HABILIDADES BÁSICAS =====
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
    "paralyze": { name: "Paralisar", effect: "paralysis", duration: 2 },

    // ===== NOVAS HABILIDADES =====
    "web_trap": { name: "Teia Pegajosa", effect: "root", duration: 3 },
    "poison_bite": { name: "Mordida Venenosa", damage: 18, effect: "poison", duration: 4 },
    "sneak_attack": { name: "Ataque Furtivo", damage: 35, crit_chance: 0.5 },
    "steal": { name: "Roubar", effect: "steal_item" },
    "maul": { name: "Dilacerar", damage: 50, effect: "bleed", duration: 3 },
    "roar": { name: "Rugido", effect: "fear", duration: 4 },
    "flame_burst": { name: "Explosão Flamejante", damage: 45, area: true },
    "heat_wave": { name: "Onda de Calor", damage: 30, area: true, effect: "burn" },
    "ignite": { name: "Incendiar", effect: "burn", duration: 5 },
    "rock_throw": { name: "Arremesso de Pedra", damage: 40 },
    "regeneration": { name: "Regeneração", heal: 30 },
    "club_smash": { name: "Pancada de Clava", damage: 55, effect: "stun" },
    
    // ===== HABILIDADES AVANÇADAS =====
    "dark_slash": { name: "Corte Sombrio", damage: 65, effect: "darkness" },
    "shadow_step": { name: "Passo Sombrio", effect: "teleport" },
    "unholy_strike": { name: "Golpe Profano", damage: 70, effect: "curse" },
    "triple_bite": { name: "Tripla Mordida", damage: 40, hits: 3 },
    "acid_spit": { name: "Cuspe Ácido", damage: 50, effect: "acid_burn" },
    "regenerate_head": { name: "Regenerar Cabeça", heal: 50, effect: "grow_head" },
    "divine_wrath": { name: "Ira Divina", damage: 90, area: true },
    "fallen_grace": { name: "Graça Caída", damage: 60, heal: 30 },
    "light_beam": { name: "Raio de Luz", damage: 75 },
    "hellfire": { name: "Fogo do Inferno", damage: 80, effect: "burn" },
    "demonic_roar": { name: "Rugido Demoníaco", effect: "terror", duration: 3 },
    "soul_drain": { name: "Drenar Alma", damage: 45, heal: 20, effect: "weakness" },
    "boulder_throw": { name: "Arremesso de Pedregulho", damage: 60 },
    "earthquake": { name: "Terremoto", damage: 50, area: true },
    "stone_skin": { name: "Pele de Pedra", effect: "defense_boost", duration: 5 },

    // ===== HABILIDADES ÉLITES =====
    "dragon_breath": { name: "Sopro Dracônico", damage: 100, area: true, effect: "burn" },
    "wing_storm": { name: "Tempestade de Asas", damage: 80, area: true, effect: "knockdown" },
    "ancient_magic": { name: "Magia Ancestral", damage: 120, effect: "dispel" },
    "treasure_hoard": { name: "Tesouro Guardado", effect: "loot_bonus" },
    "death_wave": { name: "Onda da Morte", damage: 90, area: true },
    "necromancy": { name: "Necromancia", effect: "summon_skeleton" },
    "time_stop": { name: "Parar Tempo", effect: "time_freeze", duration: 2 },
    "lich_phylactery": { name: "Filactério", effect: "revive_once" },
    "howl_of_doom": { name: "Uivo da Perdição", damage: 60, effect: "doom", duration: 10 },
    "lunar_bite": { name: "Mordida Lunar", damage: 85, effect: "lycanthropy" },
    "pack_leader": { name: "Líder da Matilha", effect: "summon_wolves" },
    "winter_breath": { name: "Sopro do Inverno", damage: 70, effect: "freeze" },
    "tentacle_slam": { name: "Golpe de Tentáculo", damage: 75 },
    "ink_cloud": { name: "Nuvem de Tinta", effect: "blind", duration: 3 },
    "water_vortex": { name: "Vórtice Aquático", damage: 60, effect: "pull" },
    "crushing_grip": { name: "Aperto Esmagador", damage: 90, effect: "crush" },

    // ===== HABILIDADES LENDÁRIAS =====
    "megaflare": { name: "Megachama", damage: 200, area: true },
    "divine_judgment": { name: "Julgamento Divino", damage: 150, effect: "judgment" },
    "king_of_dragons": { name: "Rei dos Dragões", effect: "dragon_command" },
    "celestial_power": { name: "Poder Celestial", damage: 120, heal: 60 },
    "tidal_wave": { name: "Maremoto", damage: 130, area: true },
    "abyssal_current": { name: "Corrente Abissal", damage: 110, effect: "drown" },
    "sea_lord": { name: "Senhor dos Mares", effect: "water_control" },
    "crushing_depths": { name: "Profundezas Esmagadoras", damage: 140 },
    "inferno": { name: "Inferno", damage: 160, area: true, effect: "burn" },
    "demonic_legion": { name: "Legião Demoníaca", effect: "summon_demons" },
    "chaos_magic": { name: "Magia do Caos", damage: 180, effect: "chaos" },
    "hell_portal": { name: "Portal do Inferno", effect: "portal_summon" },

    // ===== HABILIDADES ESPECIAIS =====
    "surprise_attack": { name: "Ataque Surpresa", damage: 80, crit_chance: 0.8 },
    "treasure_mimic": { name: "Mímica de Tesouro", effect: "loot_steal" },
    "chest_slam": { name: "Pancada do Baú", damage: 45, effect: "stun" },
    "phase_through": { name: "Atravessar", effect: "intangible" },
    "haunting_wail": { name: "Lamento Assombrado", effect: "terror" },
    "possession": { name: "Possessão", effect: "control", duration: 2 },
    "tri_element": { name: "Tri-Elemento", damage: 90, element: "multi" },
    "beast_fury": { name: "Fúria Bestial", effect: "rage_stack" },
    "chimera_roar": { name: "Rugido da Quimera", effect: "triple_fear" },
    "elemental_breath": { name: "Sopro Elemental", damage: 100, element: "random" },
    "divine_shield": { name: "Escudo Divino", effect: "immunity", duration: 2 },
    "celestial_beam": { name: "Raio Celestial", damage: 110 },
    "guardian_duty": { name: "Dever do Guardião", effect: "protect_allies" },
    "holy_aura": { name: "Aura Sagrada", effect: "blessing", area: true },
    "goblin_army": { name: "Exército Goblin", effect: "summon_goblins" },
    "royal_command": { name: "Comando Real", effect: "ally_boost" },
    "crown_bash": { name: "Pancada da Coroa", damage: 60, effect: "dizzy" },

    // ===== HABILIDADES MÍTICAS =====
    "world_shatter": { name: "Quebrar Mundo", damage: 300, area: true },
    "void_magic": { name: "Magia do Vazio", damage: 250, effect: "void" },
    "reality_tear": { name: "Rasgar Realidade", damage: 200, effect: "reality_break" },
    "apocalypse": { name: "Apocalipse", damage: 400, area: true, effect: "end_times" },
    "rebirth": { name: "Renascimento", heal: 500, effect: "revive" },
    "phoenix_fire": { name: "Fogo da Fênix", damage: 150, effect: "purify" },
    "healing_light": { name: "Luz Curativa", heal: 100, area: true },
    "immortal_flame": { name: "Chama Imortal", damage: 120, effect: "immortality" },
    "time_manipulation": { name: "Manipulação Temporal", effect: "time_control" },
    "temporal_loop": { name: "Loop Temporal", effect: "time_loop" },
    "age_acceleration": { name: "Aceleração do Tempo", damage: 180, effect: "aging" },
    "chrono_blast": { name: "Explosão Temporal", damage: 220, area: true }
};

// Efeitos de status expandidos
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
        this.turnsSinceLastSkill = 0;
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
                case STATUS_EFFECTS.BLEED:
                    this.takeDamage(6);
                    break;
                case STATUS_EFFECTS.DOOM:
                    this.takeDamage(20);
                    break;
            }
            
            return effect.duration > 0;
        });
    }

    canAct() {
        return !this.statusEffects.some(e => 
            e.type === STATUS_EFFECTS.PARALYSIS || 
            e.type === STATUS_EFFECTS.FREEZE || 
            e.type === STATUS_EFFECTS.STUN ||
            e.type === STATUS_EFFECTS.TERROR
        );
    }

    getRandomSkill() {
        if (this.skills.length === 0) return null;
        
        // Aumenta chance de usar habilidade com base nos turnos
        const skillChance = Math.min(0.7, 0.3 + (this.turnsSinceLastSkill * 0.1));
        
        if (Math.random() < skillChance) {
            this.turnsSinceLastSkill = 0;
            const skillId = this.skills[Math.floor(Math.random() * this.skills.length)];
            return DB.monsterSkills[skillId];
        } else {
            this.turnsSinceLastSkill++;
            return null;
        }
    }

    // Método para inimigos especiais usarem habilidades baseadas no HP
    getContextualSkill() {
        if (this.skills.length === 0) return null;
        
        const hpPercentage = this.hp / this.stats.maxHp;
        
        // Usar habilidades mais poderosas quando com pouco HP
        if (hpPercentage < 0.25 && this.skills.includes("rage")) {
            return DB.monsterSkills["rage"];
        }
        
        // Usar cura quando necessário
        if (hpPercentage < 0.5 && this.skills.includes("regeneration")) {
            return DB.monsterSkills["regeneration"];
        }
        
        // Fallback para habilidade aleatória
        return this.getRandomSkill();
    }
}

// Sistema de Combate aprimorado
class CombatSystem {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = 0;
        this.log = [];
        this.playerTurn = player.getAgility() >= enemy.stats.agility;
        this.combatEffects = {
            playerBuffs: [],
            enemyBuffs: []
        };
    }

    addLog(message) {
        this.log.push(message);
        if (this.log.length > 25) this.log.shift();
    }

    playerAttack() {
        if (!this.player.canAct()) {
            this.addLog("Você não pode agir devido a efeitos de status!");
            return false;
        }

        const baseDamage = this.player.getAttack();
        const defense = this.enemy.stats.defense;
        const damage = Math.max(1, baseDamage - defense);
        
        // Chance de crítico
        const critChance = 0.05 + (this.player.stats.destreza * 0.001);
        const isCrit = Math.random() < critChance;
        const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage;
        
        this.enemy.takeDamage(finalDamage);
        
        if (isCrit) {
            this.addLog(`CRÍTICO! Você causa ${finalDamage} de dano ao ${this.enemy.name}!`);
        } else {
            this.addLog(`Você causa ${finalDamage} de dano ao ${this.enemy.name}!`);
        }
        
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
            let damage = skill.damage + Math.floor(this.player.stats.inteligencia * 2);
            
            // Modificadores baseados no elemento
            if (skill.element === "fire" && this.enemy.name.includes("Elemental de Gelo")) {
                damage *= 2;
                this.addLog("Super efetivo contra gelo!");
            }
            
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

        // Inimigos inteligentes usam habilidades contextuais
        const skill = this.enemy.getContextualSkill();
        
        if (skill) {
            this.addLog(`${this.enemy.name} usa ${skill.name}!`);
            
            if (skill.damage) {
                const damage = Math.max(1, skill.damage - this.player.getDefense());
                this.player.takeDamage(damage);
                this.addLog(`Você recebe ${damage} de dano!`);
            }
            
            if (skill.heal) {
                this.enemy.hp = Math.min(this.enemy.hp + skill.heal, this.enemy.stats.maxHp);
                this.addLog(`${this.enemy.name} se cura em ${skill.heal} HP!`);
            }
            
            if (skill.effect && skill.duration) {
                this.player.addStatusEffect(skill.effect, skill.duration);
                this.addLog(`Você foi afetado por ${skill.name}!`);
            }
        } else {
            // Ataque normal com variação
            const baseAttack = this.enemy.stats.strength;
            const variation = Math.floor(baseAttack * 0.2); // ±20% variação
            const attack = baseAttack + Math.floor(Math.random() * variation * 2) - variation;
            const damage = Math.max(1, attack - this.player.getDefense());
            
            this.player.takeDamage(damage);
            this.addLog(`${this.enemy.name} ataca e causa ${damage} de dano!`);
        }
        
        return this.player.hp <= 0;
    }

    updateStatusEffects() {
        this.player.updateStatusEffects();
        this.enemy.updateStatusEffects();
        
        // Log de efeitos ativos
        const playerEffects = this.player.statusEffects.map(e => e.type).join(", ");
        const enemyEffects = this.enemy.statusEffects.map(e => e.type).join(", ");
        
        if (playerEffects) {
            this.addLog(`Seus efeitos ativos: ${playerEffects}`);
        }
        if (enemyEffects) {
            this.addLog(`Efeitos em ${this.enemy.name}: ${enemyEffects}`);
        }
    }

    nextTurn() {
        this.updateStatusEffects();
        this.turn++;
        this.playerTurn = !this.playerTurn;
        
        // Sistema de ataques múltiplos baseado em agilidade
        if (this.playerTurn && this.player.getAgility() > this.enemy.stats.agility * 2) {
            if (Math.random() < 0.25) {
                this.addLog("Sua agilidade superior permite um turno extra!");
                return false;
            }
        } else if (!this.playerTurn && this.enemy.stats.agility > this.player.getAgility() * 2) {
            if (Math.random() < 0.25) {
                this.addLog(`${this.enemy.name} é muito ágil e ataca novamente!`);
                return false;
            }
        }
        
        return true;
    }
}