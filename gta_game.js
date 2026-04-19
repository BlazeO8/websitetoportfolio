// ============================================
// GTA: PIXEL CITY - ENHANCED EDITION v3.0
// BIGGER MAP + VEHICLE TYPES + ANIMATIONS + EFFECTS
// ============================================

const cv = document.getElementById('gc');
const ctx = cv.getContext('2d');
const mm = document.getElementById('minimap');
const mctx = mm.getContext('2d');

const W = 560, H = 480;
const WORLD = 3600; // BIGGER MAP!

const overlay = document.getElementById('overlay');
const obtn = document.getElementById('obtn');
const hpBar = document.getElementById('hp-bar');
const cashEl = document.getElementById('cash');
const starsEl = document.getElementById('stars-hud');
const ammoEl = document.getElementById('ammo');
const weaponEl = document.getElementById('weapon');
const levelEl = document.getElementById('level');
const notificationEl = document.getElementById('notification');
const missionTypeEl = document.getElementById('mission-type');
const missionProgressEl = document.getElementById('mission-progress');
const missionTargetEl = document.getElementById('mission-target');

let keys = {}, mouse = { x: W / 2, y: H / 2, down: false };
let cam, player, cars, peds, cops, bullets, copBullets, particles, explosions;
let wanted, cash, hp, score, state = 'idle', animId, lastT = 0;
let level = 1, missions = [], activeMission = null, missionComplete = false;
let screenShake = 0; // For explosion effects

// ============================================
// WEAPON SYSTEM
// ============================================
const WEAPONS = {
    PISTOL: { ammo: Infinity, fireRate: 180, damage: 1, bulletSpeed: 9, spread: 0 },
    RIFLE: { ammo: 60, fireRate: 80, damage: 2, bulletSpeed: 12, spread: 0.15 },
    SHOTGUN: { ammo: 30, fireRate: 400, damage: 3, bulletSpeed: 8, spread: 0.5, pellets: 5 },
    MINIGUN: { ammo: 200, fireRate: 40, damage: 1, bulletSpeed: 10, spread: 0.2 }
};

let currentWeapon = 'PISTOL';
let ammo = { PISTOL: Infinity, RIFLE: 0, SHOTGUN: 0, MINIGUN: 0 };

// ============================================
// VEHICLE TYPES - MULTIPLE VEHICLES!
// ============================================
const VEHICLE_TYPES = {
    CAR: { w: 26, h: 14, color: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'], speed: 5, handling: 0.045 },
    TRUCK: { w: 35, h: 18, color: ['#c0392b', '#34495e'], speed: 4, handling: 0.03 },
    BIKE: { w: 20, h: 10, color: ['#e67e22', '#16a085', '#8e44ad'], speed: 6, handling: 0.08 },
    POLICE: { w: 26, h: 14, color: ['#1d4ed8'], speed: 5.5, handling: 0.05 },
    AMBULANCE: { w: 28, h: 15, color: ['#ecf0f1'], speed: 4.5, handling: 0.04 }
};

// ============================================
// PLAYER SKINS
// ============================================
const PLAYER_SKINS = [
    { name: 'Default', color: '#f5c542', head: '#fde68a' },
    { name: 'Red', color: '#f43f5e', head: '#fca5a5' },
    { name: 'Blue', color: '#3b82f6', head: '#93c5fd' },
    { name: 'Green', color: '#10b981', head: '#a7f3d0' },
    { name: 'Purple', color: '#a855f7', head: '#e9d5ff' }
];

let currentSkin = 0;

// ============================================
// COLOR SCHEME
// ============================================
const COLORS = {
    road: '#1c1c1c',
    lane: '#f5c542',
    sidewalk: '#2a2a2a',
    grass: '#1a3a1a',
    building: ['#2d2d3a', '#3a2d2d', '#2d3a2d', '#3a3a2d', '#4a3a2d', '#2d3a3a'],
    car: '#e74c3c',
    cop: '#3498db',
    ped: ['#f39c12', '#e67e22', '#16a085', '#8e44ad', '#c0392b', '#2980b9'],
    bullet: '#ffe066',
    copBullet: '#60a5fa',
    explosion: '#ff6b35'
};

// ============================================
// EXPANDED ROAD SYSTEM
// ============================================
const roads = [
    // Horizontal roads
    { x: 0, y: 200, w: WORLD, h: 80 },
    { x: 0, y: 600, w: WORLD, h: 80 },
    { x: 0, y: 1000, w: WORLD, h: 80 },
    { x: 0, y: 1400, w: WORLD, h: 80 },
    { x: 0, y: 1800, w: WORLD, h: 80 },
    { x: 0, y: 2200, w: WORLD, h: 80 },
    { x: 0, y: 2600, w: WORLD, h: 80 },
    { x: 0, y: 3000, w: WORLD, h: 80 },
    // Vertical roads
    { x: 300, y: 0, w: 80, h: WORLD },
    { x: 700, y: 0, w: 80, h: WORLD },
    { x: 1100, y: 0, w: 80, h: WORLD },
    { x: 1500, y: 0, w: 80, h: WORLD },
    { x: 1900, y: 0, w: 80, h: WORLD },
    { x: 2300, y: 0, w: 80, h: WORLD },
    { x: 2700, y: 0, w: 80, h: WORLD },
    { x: 3100, y: 0, w: 80, h: WORLD }
];

let buildings = [];

// ============================================
// BUILDING GENERATION (BIGGER MAP)
// ============================================
function genBuildings() {
    buildings = [];
    const zones = [];
    
    // Generate building zones across the bigger map
    for (let x = 0; x < WORLD; x += 400) {
        for (let y = 0; y < WORLD; y += 400) {
            if ((x + 200 < WORLD && y + 200 < WORLD) && 
                !roads.some(r => x > r.x - 100 && x < r.x + r.w + 100 && y > r.y - 100 && y < r.y + r.h + 100)) {
                zones.push({ x: x, y: y, w: 350, h: 350 });
            }
        }
    }

    zones.forEach(z => {
        for (let bx = z.x + 8; bx + 30 < z.x + z.w; bx += 50 + Math.random() * 20) {
            for (let by = z.y + 8; by + 30 < z.y + z.h; by += 50 + Math.random() * 20) {
                const bw = 30 + Math.random() * 30;
                const bh = 30 + Math.random() * 30;
                if (bx + bw < z.x + z.w - 8 && by + bh < z.y + z.h - 8)
                    buildings.push({
                        x: bx, y: by, w: bw, h: bh,
                        col: COLORS.building[Math.floor(Math.random() * COLORS.building.length)]
                    });
            }
        }
    });
}

// ============================================
// COLLISION DETECTION
// ============================================
function isRoad(x, y, pad = 0) {
    return roads.some(r => x + pad > r.x && x - pad < r.x + r.w && y + pad > r.y && y - pad < r.y + r.h);
}

function isBuilding(x, y, w = 10, h = 10) {
    return buildings.some(b => x + w > b.x && x < b.x + b.w && y + h > b.y && y < b.y + b.h);
}

function roadPos() {
    const r = roads[Math.floor(Math.random() * roads.length)];
    return { x: r.x + 10 + Math.random() * (r.w - 20), y: r.y + 10 + Math.random() * (r.h - 20) };
}

// ============================================
// MISSION SYSTEM
// ============================================
function createMission(type, reward) {
    const types = ['elimination', 'delivery', 'escape', 'rampage'];
    return {
        id: Math.random(),
        type: type || types[Math.floor(Math.random() * types.length)],
        reward: reward || 500 + Math.random() * 500,
        progress: 0,
        target: Math.floor(Math.random() * 5 + 3),
        active: false,
        completed: false
    };
}

function showNotification(text, duration = 2000) {
    notificationEl.textContent = text;
    notificationEl.classList.add('show');
    setTimeout(() => notificationEl.classList.remove('show'), duration);
}

// ============================================
// PARTICLES & EFFECTS - ENHANCED!
// ============================================
function spawnParticle(x, y, col, n = 6, size = 2.5) {
    for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4 + 0.5;
        particles.push({ 
            x, y, 
            vx: Math.cos(a) * spd, 
            vy: Math.sin(a) * spd, 
            life: 1, 
            col, 
            size: size,
            gravity: 0.1
        });
    }
}

function spawnExplosion(x, y) {
    screenShake = 15; // Screen shake effect!
    explosions.push({ x, y, radius: 1, maxRadius: 100, life: 1, particles: [] });
    
    // Explosion particles with better animation
    for (let i = 0; i < 20; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 5 + 3;
        explosions[explosions.length - 1].particles.push({
            x, y, 
            vx: Math.cos(a) * spd, 
            vy: Math.sin(a) * spd, 
            life: 1, 
            col: [COLORS.explosion, '#ffab40', '#ff6b35'][Math.floor(Math.random() * 3)],
            size: Math.random() * 3 + 1
        });
    }
    
    // Camera shake
    for (let i = 0; i < 3; i++) {
        setTimeout(() => screenShake = 10, i * 50);
    }
}

// ============================================
// GAME INITIALIZATION
// ============================================
function initGame() {
    genBuildings();
    wanted = 0;
    cash = 0;
    hp = 5;
    score = 0;
    level = 1;
    currentWeapon = 'PISTOL';
    currentSkin = Math.floor(Math.random() * PLAYER_SKINS.length);
    ammo = { PISTOL: Infinity, RIFLE: 0, SHOTGUN: 0, MINIGUN: 0 };
    missions = [createMission()];
    activeMission = missions[0];

    cam = { x: 0, y: 0 };
    player = {
        x: WORLD / 2, y: WORLD / 2, w: 16, h: 10, angle: 0, spd: 0,
        inCar: null, shootCD: 0, 
        ...PLAYER_SKINS[currentSkin],
        animFrame: 0
    };
    cars = [];
    peds = [];
    cops = [];
    bullets = [];
    copBullets = [];
    particles = [];
    explosions = [];

    // Spawn multiple vehicle types
    const vehicleTypes = Object.keys(VEHICLE_TYPES);
    for (let i = 0; i < 35; i++) {
        const p = roadPos();
        const vType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const vData = VEHICLE_TYPES[vType];
        
        cars.push({
            x: p.x, y: p.y, w: vData.w, h: vData.h, 
            angle: Math.random() * Math.PI * 2,
            spd: 0, driver: null, 
            col: vData.color[Math.floor(Math.random() * vData.color.length)], 
            hp: 3,
            type: vType,
            maxSpeed: vData.speed,
            handling: vData.handling,
            wheelRotation: 0,
            animFrame: 0
        });
    }

    // Spawn pedestrians
    for (let i = 0; i < 50; i++) {
        const p = roadPos();
        peds.push({
            x: p.x, y: p.y, w: 8, h: 8, 
            angle: Math.random() * Math.PI * 2,
            spd: 0.8, t: Math.random() * 100, 
            col: COLORS.ped[Math.floor(Math.random() * COLORS.ped.length)],
            alive: true, flee: 0,
            walkFrame: 0
        });
    }

    updateHUD();
    updateMissionDisplay();
    state = 'playing';
    showNotification('🎮 WELCOME TO PIXEL CITY | BIGGER & BETTER! 🎮');
}

// ============================================
// HUD UPDATE
// ============================================
function updateHUD() {
    hpBar.textContent = '■'.repeat(Math.max(0, hp)) + '□'.repeat(Math.max(0, 5 - hp));
    hpBar.style.color = hp > 3 ? '#4ade80' : hp > 1 ? '#f5c542' : '#f43f5e';
    cashEl.textContent = cash;
    levelEl.textContent = level;
    weaponEl.textContent = currentWeapon;
    ammoEl.textContent = ammo[currentWeapon] === Infinity ? '∞' : ammo[currentWeapon];
    const s = Math.min(5, wanted);
    starsEl.textContent = '★'.repeat(s) + '☆'.repeat(5 - s);
    starsEl.style.color = s >= 4 ? '#f43f5e' : s >= 2 ? '#f5c542' : '#aaa';

    // Slowly regenerate ammo
    if (Math.random() < 0.01) {
        const weaponList = Object.keys(WEAPONS);
        weaponList.forEach(w => {
            if (w !== 'PISTOL' && ammo[w] < WEAPONS[w].ammo) {
                ammo[w] = Math.min(ammo[w] + 1, WEAPONS[w].ammo);
            }
        });
    }
}

// ============================================
// MISSION DISPLAY UPDATE
// ============================================
function updateMissionDisplay() {
    if (activeMission) {
        missionTypeEl.textContent = activeMission.type.toUpperCase();
        missionProgressEl.textContent = activeMission.progress;
        missionTargetEl.textContent = activeMission.target;

        const progressPercent = activeMission.progress / activeMission.target;
        if (progressPercent >= 1) {
            missionProgressEl.style.color = '#4ade80';
        } else if (progressPercent >= 0.5) {
            missionProgressEl.style.color = '#f5c542';
        } else {
            missionProgressEl.style.color = '#f43f5e';
        }
    }
}

// ============================================
// COP SPAWNING
// ============================================
function spawnCop() {
    const p = roadPos();
    cops.push({
        x: p.x, y: p.y, w: 26, h: 14, 
        angle: 0, spd: 0,
        shootCD: 80, hp: 3, alertT: 0,
        wheelRotation: 0
    });
}

// ============================================
// WEAPON CYCLING
// ============================================
function cycleWeapon() {
    const weaponList = Object.keys(WEAPONS);
    const currentIndex = weaponList.indexOf(currentWeapon);
    const nextIndex = (currentIndex + 1) % weaponList.length;
    currentWeapon = weaponList[nextIndex];

    if (ammo[currentWeapon] === 0) {
        ammo[currentWeapon] = WEAPONS[currentWeapon].ammo;
    }

    showNotification('WEAPON: ' + currentWeapon + ' | AMMO: ' + (ammo[currentWeapon] === Infinity ? '∞' : ammo[currentWeapon]));
    updateHUD();
}

// ============================================
// GAME UPDATE LOGIC
// ============================================
let wantedTimer = 0, copSpawnTimer = 0;

function update(dt) {
    if (state !== 'playing') return;
    const s = dt / 16;

    // Screen shake decay
    screenShake = Math.max(0, screenShake - 1);

    // Camera tracking
    const tx = player.x - W / 2;
    const ty = player.y - H / 2;
    cam.x += (tx - cam.x) * 0.12;
    cam.y += (ty - cam.y) * 0.12;
    cam.x = Math.max(0, Math.min(WORLD - W, cam.x));
    cam.y = Math.max(0, Math.min(WORLD - H, cam.y));

    const wx = mouse.x + cam.x;
    const wy = mouse.y + cam.y;

    // ===== PLAYER ON FOOT =====
    if (!player.inCar) {
        const dx = keys['d'] || keys['arrowright'] ? 1 : keys['a'] || keys['arrowleft'] ? -1 : 0;
        const dy = keys['s'] || keys['arrowdown'] ? 1 : keys['w'] || keys['arrowup'] ? -1 : 0;
        const spd = 2.8 * s;
        let nx = player.x + dx * spd;
        let ny = player.y + dy * spd;

        if (!isBuilding(nx - 6, ny - 5, 12, 10)) player.x = nx;
        if (!isBuilding(player.x - 6, ny - 5, 12, 10)) player.y = ny;

        player.x = Math.max(5, Math.min(WORLD - 5, player.x));
        player.y = Math.max(5, Math.min(WORLD - 5, player.y));
        player.angle = Math.atan2(wy - player.y, wx - player.x);
        
        // Walking animation
        if (dx || dy) {
            player.animFrame = (player.animFrame + 0.2) % 4;
        }

        // Enter car
        if (keys['e'] || keys['f']) {
            const near = cars.find(c => !c.driver && Math.hypot(c.x - player.x, c.y - player.y) < 30);
            if (near) {
                near.driver = player;
                player.inCar = near;
                keys['e'] = false;
                keys['f'] = false;
                showNotification('ENTERED ' + near.type);
            }
        }
    } else {
        // ===== PLAYER IN CAR =====
        const car = player.inCar;
        const acc = keys['w'] || keys['arrowup'] ? 0.18 : keys['s'] || keys['arrowdown'] ? -0.1 : 0;
        const turn = keys['a'] || keys['arrowleft'] ? -car.handling : keys['d'] || keys['arrowright'] ? car.handling : 0;

        car.spd += acc * s;
        car.spd *= 0.92;
        car.spd = Math.max(-2, Math.min(car.maxSpeed, car.spd));

        if (Math.abs(car.spd) > 0.1) car.angle += turn * s * (car.spd > 0 ? 1 : -1);

        // Wheel rotation animation
        car.wheelRotation += car.spd * 0.05;

        let nx = car.x + Math.cos(car.angle) * car.spd * s * 2;
        let ny = car.y + Math.sin(car.angle) * car.spd * s * 2;

        if (!isBuilding(nx - car.w / 2, ny - car.h / 2, car.w, car.h)) {
            car.x = nx;
            car.y = ny;
        } else {
            car.spd *= -0.4;
            spawnParticle(car.x, car.y, '#888', 8, 2);
        }

        car.x = Math.max(10, Math.min(WORLD - 10, car.x));
        car.y = Math.max(10, Math.min(WORLD - 10, car.y));
        player.x = car.x;
        player.y = car.y;

        // Run over pedestrians
        peds.forEach(p => {
            if (!p.alive) return;
            if (Math.abs(car.spd) > 1.5 && Math.hypot(p.x - car.x, p.y - car.y) < 20) {
                p.alive = false;
                cash += 50;
                wanted = Math.min(5, wanted + 1);
                if (activeMission && activeMission.type === 'elimination') {
                    activeMission.progress++;
                    updateMissionDisplay();
                }
                spawnParticle(p.x, p.y, '#f43f5e', 12, 3);
                updateHUD();
            }
        });

        // Exit car
        if (keys['f']) {
            car.driver = null;
            player.inCar = null;
            player.x = car.x + 30;
            player.y = car.y;
            car.spd = 0;
            keys['f'] = false;
            showNotification('EXITED CAR');
        }
    }

    // ===== SHOOTING SYSTEM =====
    player.shootCD = Math.max(0, player.shootCD - dt);

    if ((mouse.down || keys[' ']) && player.shootCD <= 0) {
        const weapon = WEAPONS[currentWeapon];
        if (ammo[currentWeapon] > 0 || ammo[currentWeapon] === Infinity) {
            player.shootCD = weapon.fireRate;
            const ang = player.angle;
            const ox = player.inCar ? player.inCar.x : player.x;
            const oy = player.inCar ? player.inCar.y : player.y;

            const bulletCount = currentWeapon === 'SHOTGUN' ? weapon.pellets : 1;
            for (let i = 0; i < bulletCount; i++) {
                const spreadAngle = (Math.random() - 0.5) * weapon.spread;
                const finalAngle = ang + spreadAngle;
                bullets.push({
                    x: ox + Math.cos(finalAngle) * 18,
                    y: oy + Math.sin(finalAngle) * 18,
                    vx: Math.cos(finalAngle) * weapon.bulletSpeed,
                    vy: Math.sin(finalAngle) * weapon.bulletSpeed,
                    life: 60,
                    damage: weapon.damage
                });
            }

            spawnParticle(ox, oy, '#ffe066', 6, 2);
            wanted = Math.min(5, wanted + 0.5);
            if (ammo[currentWeapon] !== Infinity) ammo[currentWeapon]--;
            updateHUD();
        }
    }

    // ===== BULLET PHYSICS =====
    bullets = bullets.filter(b => {
        b.x += b.vx * s;
        b.y += b.vy * s;
        b.life -= s;

        if (isBuilding(b.x, b.y)) {
            spawnParticle(b.x, b.y, '#aaa', 5, 2);
            return false;
        }

        cops.forEach(c => {
            if (Math.hypot(b.x - c.x, b.y - c.y) < 16) {
                c.hp -= b.damage;
                spawnParticle(c.x, c.y, '#3498db', 8, 2);
                b.life = 0;
                if (c.hp <= 0) {
                    cash += 100;
                    if (activeMission && activeMission.type === 'elimination') {
                        activeMission.progress++;
                        updateMissionDisplay();
                    }
                }
            }
        });

        peds.forEach(p => {
            if (p.alive && Math.hypot(b.x - p.x, b.y - p.y) < 10) {
                p.alive = false;
                cash += 20;
                wanted = Math.min(5, wanted + 1);
                if (activeMission && activeMission.type === 'elimination') {
                    activeMission.progress++;
                    updateMissionDisplay();
                }
                spawnParticle(p.x, p.y, '#f43f5e', 10, 2);
                updateHUD();
                b.life = 0;
            }
        });

        cars.forEach(c => {
            if (!c.driver && Math.hypot(b.x - c.x, b.y - c.y) < 18) {
                c.hp -= b.damage;
                spawnParticle(c.x, c.y, '#f97316', 6, 2);
                if (c.hp <= 0) {
                    spawnExplosion(c.x, c.y);
                    cash += 200;
                }
                b.life = 0;
            }
        });

        return b.life > 0;
    });

    // ===== COP AI =====
    cops = cops.filter(c => c.hp > 0);
    wantedTimer += dt;

    if (wanted >= 1 && wantedTimer > 3000 / (wanted + 1)) {
        wantedTimer = 0;
        if (cops.length < wanted * 2 + level) spawnCop();
    }

    cops.forEach(c => {
        const dx = player.x - c.x;
        const dy = player.y - c.y;
        const dist = Math.hypot(dx, dy);
        c.angle = Math.atan2(dy, dx);

        const spd = (1.8 + wanted * 0.3 + level * 0.2) * s;
        let nx = c.x + Math.cos(c.angle) * spd;
        let ny = c.y + Math.sin(c.angle) * spd;

        if (!isBuilding(nx - c.w / 2, ny - c.h / 2, c.w, c.h)) {
            c.x = nx;
            c.y = ny;
        }

        c.shootCD = Math.max(0, c.shootCD - dt);
        if (dist < 200 && c.shootCD <= 0) {
            c.shootCD = 120 + Math.random() * 80;
            copBullets.push({
                x: c.x + Math.cos(c.angle) * 18,
                y: c.y + Math.sin(c.angle) * 18,
                vx: Math.cos(c.angle) * 7,
                vy: Math.sin(c.angle) * 7,
                life: 50
            });
        }

        if (dist < 18) {
            hp = Math.max(0, hp - 1);
            spawnParticle(player.x, player.y, '#f43f5e', 8, 3);
            updateHUD();
            if (hp <= 0) {
                state = 'dead';
                showOver();
            }
        }
    });

    // ===== COP BULLETS =====
    copBullets = copBullets.filter(b => {
        b.x += b.vx * s;
        b.y += b.vy * s;
        b.life -= s;

        if (isBuilding(b.x, b.y)) return false;

        if (Math.hypot(b.x - player.x, b.y - player.y) < 12) {
            hp = Math.max(0, hp - 1);
            spawnParticle(player.x, player.y, '#f43f5e', 8, 3);
            updateHUD();
            if (hp <= 0) {
                state = 'dead';
                showOver();
            }
            return false;
        }

        return b.life > 0;
    });

    // ===== PEDESTRIANS =====
    peds.forEach(p => {
        if (!p.alive) return;
        p.walkFrame = (p.walkFrame + 0.1) % 4;

        if (wanted > 0) {
            p.flee += dt;
            if (p.flee > 500) p.angle = Math.atan2(p.y - player.y, p.x - player.x);
        } else if (Math.random() < 0.005) {
            p.angle += 0.5 * (Math.random() - 0.5) * Math.PI;
        }

        let nx = p.x + Math.cos(p.angle) * p.spd * s;
        let ny = p.y + Math.sin(p.angle) * p.spd * s;

        if (!isBuilding(nx - 3, ny - 3, 6, 6) && nx > 0 && nx < WORLD && ny > 0 && ny < WORLD) {
            p.x = nx;
            p.y = ny;
        } else {
            p.angle += Math.PI * (0.5 + Math.random());
        }
    });

    // ===== WANTED LEVEL DECAY =====
    if (wanted > 0 && cops.length === 0) {
        wantedTimer += dt;
    }
    if (wanted > 0 && cops.length === 0 && wantedTimer > 8000) {
        wanted = Math.max(0, wanted - 1);
        updateHUD();
        wantedTimer = 0;
    }

    // ===== PARTICLES =====
    particles = particles.filter(p => {
        p.x += p.vx * s;
        p.y += (p.vy + p.gravity) * s;
        p.life -= 0.03 * s;
        p.vx *= 0.9;
        p.vy *= 0.9;
        return p.life > 0;
    });

    // ===== EXPLOSIONS =====
    explosions = explosions.filter(e => {
        e.life -= 0.02;
        e.radius = (1 - e.life) * e.maxRadius;
        return e.life > 0;
    });

    // ===== CASH GENERATION =====
    score += dt;
    if (Math.floor(score / 5000) > Math.floor((score - dt) / 5000)) {
        cash += 10;
        updateHUD();
    }

    // ===== MISSION PROGRESS =====
    if (activeMission && !activeMission.completed) {
        if (activeMission.progress >= activeMission.target) {
            activeMission.completed = true;
            cash += Math.floor(activeMission.reward);
            level++;
            showNotification('✓ MISSION COMPLETE! +$' + Math.floor(activeMission.reward) + ' +LEVEL');

            missions.push(createMission());
            activeMission = missions[missions.length - 1];
            showNotification('NEW MISSION: ' + activeMission.type.toUpperCase() + ' (' + activeMission.target + ' targets)');
            updateHUD();
            updateMissionDisplay();
        }
    }
}

// ============================================
// DRAWING FUNCTIONS - ENHANCED!
// ============================================
function drawRotatedRect(c, x, y, w, h, angle, fillCol, strokeCol) {
    c.save();
    c.translate(x - cam.x + (Math.random() - 0.5) * screenShake, y - cam.y + (Math.random() - 0.5) * screenShake);
    c.rotate(angle);
    c.fillStyle = fillCol;
    c.fillRect(-w / 2, -h / 2, w, h);
    if (strokeCol) {
        c.strokeStyle = strokeCol;
        c.lineWidth = 1.5;
        c.strokeRect(-w / 2, -h / 2, w, h);
    }
    c.restore();
}

function drawVehicle(c, car) {
    drawRotatedRect(c, car.x, car.y, car.w, car.h, car.angle, car.col, '#111');
    
    // Draw wheels with rotation
    c.save();
    c.translate(car.x - cam.x, car.y - cam.y);
    c.rotate(car.angle);
    
    // Wheels
    c.fillStyle = '#333';
    const wheelOffsets = [
        [-car.w / 3, -car.h / 2 + 2],
        [car.w / 3, -car.h / 2 + 2],
        [-car.w / 3, car.h / 2 - 2],
        [car.w / 3, car.h / 2 - 2]
    ];
    
    wheelOffsets.forEach(offset => {
        c.save();
        c.translate(offset[0], offset[1]);
        c.rotate(car.wheelRotation);
        c.fillRect(-2, -3, 4, 6);
        c.restore();
    });
    
    // Windows
    c.fillStyle = '#bae6fd55';
    c.fillRect(-car.w / 2 + 3, -car.h / 2 + 2, car.w - 6, car.h - 4);
    
    c.restore();
}

function drawPlayer(c, p) {
    c.save();
    c.translate(p.x - cam.x + (Math.random() - 0.5) * screenShake, p.y - cam.y + (Math.random() - 0.5) * screenShake);
    c.rotate(p.angle);
    
    // Body
    c.fillStyle = p.color;
    c.fillRect(-8, -5, 16, 10);
    
    // Head with animation
    const headBob = Math.sin(p.animFrame * Math.PI / 2) * 1;
    c.fillStyle = p.head;
    c.beginPath();
    c.arc(0, -6 + headBob, 4, 0, Math.PI * 2);
    c.fill();
    
    // Gun
    c.fillStyle = '#ffe066';
    c.fillRect(6, -1, 8, 2);
    
    c.restore();
}

function draw() {
    // Background with screen shake
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, W, H);

    // Roads
    ctx.fillStyle = COLORS.road;
    roads.forEach(r => ctx.fillRect(r.x - cam.x, r.y - cam.y, r.w, r.h));

    // Lane markings
    ctx.strokeStyle = COLORS.lane;
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 15]);
    roads.forEach(r => {
        ctx.beginPath();
        if (r.w > r.h) {
            ctx.moveTo(r.x - cam.x, r.y + r.h / 2 - cam.y);
            ctx.lineTo(r.x + r.w - cam.x, r.y + r.h / 2 - cam.y);
        } else {
            ctx.moveTo(r.x + r.w / 2 - cam.x, r.y - cam.y);
            ctx.lineTo(r.x + r.w / 2 - cam.x, r.y + r.h - cam.y);
        }
        ctx.stroke();
    });
    ctx.setLineDash([]);

    // Buildings
    buildings.forEach(b => {
        const bx = b.x - cam.x;
        const by = b.y - cam.y;
        if (bx > -80 && bx < W + 80 && by > -80 && by < H + 80) {
            ctx.fillStyle = b.col;
            ctx.fillRect(bx, by, b.w, b.h);
            ctx.strokeStyle = '#111';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, b.w, b.h);
            ctx.fillStyle = '#ffe06633';
            for (let wx = bx + 4; wx < bx + b.w - 4; wx += 10)
                for (let wy = by + 4; wy < by + b.h - 4; wy += 10)
                    ctx.fillRect(wx, wy, 6, 6);
        }
    });

    // Dead pedestrians
    peds.filter(p => !p.alive).forEach(p => {
        ctx.fillStyle = '#8b0000';
        ctx.beginPath();
        ctx.arc(p.x - cam.x, p.y - cam.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    // Live pedestrians with animation
    peds.filter(p => p.alive).forEach(p => {
        ctx.save();
        ctx.translate(p.x - cam.x, p.y - cam.y);
        
        const legSwing = Math.sin(p.walkFrame * Math.PI / 2) * 2;
        ctx.fillStyle = p.col;
        ctx.fillRect(-4 + legSwing, -4, 8, 8);
        ctx.fillStyle = '#fde68a';
        ctx.beginPath();
        ctx.arc(0, -6, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    // Vehicles with wheels
    cars.filter(c => c.hp > 0).forEach(c => {
        drawVehicle(ctx, c);
    });

    // Cop cars with lights
    cops.forEach(c => {
        drawVehicle(ctx, c);
        
        // Police lights
        ctx.save();
        ctx.translate(c.x - cam.x, c.y - cam.y);
        ctx.rotate(c.angle);
        const isRedLight = Math.floor(Date.now() / 200) % 2 === 0;
        ctx.fillStyle = isRedLight ? '#f43f5e' : '#60a5fa';
        ctx.fillRect(-4, -2, 4, 4);
        ctx.fillStyle = isRedLight ? '#60a5fa' : '#f43f5e';
        ctx.fillRect(4, -2, 4, 4);
        ctx.restore();
    });

    // Player
    if (!player.inCar) {
        drawPlayer(ctx, player);
    }

    // Bullets
    bullets.forEach(b => {
        ctx.fillStyle = '#ffe066';
        ctx.beginPath();
        ctx.arc(b.x - cam.x, b.y - cam.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffab40';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    copBullets.forEach(b => {
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(b.x - cam.x, b.y - cam.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Particles with gravity
    particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.x - cam.x, p.y - cam.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Explosions with better effects
    explosions.forEach(e => {
        ctx.globalAlpha = e.life;
        ctx.fillStyle = COLORS.explosion;
        ctx.beginPath();
        ctx.arc(e.x - cam.x, e.y - cam.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#ffab40';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // Minimap
    mctx.fillStyle = '#111';
    mctx.fillRect(0, 0, 100, 100);
    const scl = 100 / WORLD;

    mctx.fillStyle = '#333';
    roads.forEach(r => mctx.fillRect(r.x * scl, r.y * scl, r.w * scl, r.h * scl));

    mctx.fillStyle = '#4ade80';
    mctx.fillRect(player.x * scl - 2, player.y * scl - 2, 4, 4);

    cops.forEach(c => {
        mctx.fillStyle = '#f43f5e';
        mctx.fillRect(c.x * scl - 1, c.y * scl - 1, 3, 3);
    });

    mctx.strokeStyle = '#f5c54244';
    mctx.lineWidth = 1;
    mctx.strokeRect(cam.x * scl, cam.y * scl, W * scl, H * scl);
}

// ============================================
// GAME LOOP
// ============================================
function loop(ts) {
    const dt = ts - lastT;
    lastT = ts;
    update(dt);
    draw();
    animId = requestAnimationFrame(loop);
}

// ============================================
// GAME OVER SCREEN
// ============================================
function showOver() {
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <h2 style="color:#f43f5e">BUSTED!</h2>
        <p>
            LEVEL: ${level}<br>
            CASH EARNED: $${cash}<br>
            WANTED LEVEL: ${'★'.repeat(Math.min(5, wanted))}${'☆'.repeat(5 - Math.min(5, wanted))}<br>
            MISSIONS COMPLETED: ${missions.filter(m => m.completed).length}<br>
            SKIN: ${PLAYER_SKINS[currentSkin].name}
        </p>
        <button id="obtn">[ RESPAWN ]</button>
    `;
    overlay.querySelector('#obtn').onclick = startGame;
}

// ============================================
// START GAME
// ============================================
function startGame() {
    overlay.style.display = 'none';
    initGame();
    if (!animId) {
        lastT = performance.now();
        animId = requestAnimationFrame(loop);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
obtn.onclick = startGame;

cv.addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
});

cv.addEventListener('mousedown', e => {
    mouse.down = true;
    e.preventDefault();
});

cv.addEventListener('mouseup', () => mouse.down = false);

cv.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    keys[key] = true;

    if (key === 'q') cycleWeapon();
    if (key === 'm' && activeMission) {
        activeMission.active = !activeMission.active;
        showNotification(activeMission.active ? 'MISSION ACTIVE' : 'MISSION PAUSED');
    }

    if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key))
        e.preventDefault();
});

document.addEventListener('keyup', e => {
    keys[e.key.toLowerCase()] = false;
});

// Initial canvas clear
ctx.fillStyle = '#111';
ctx.fillRect(0, 0, W, H);
