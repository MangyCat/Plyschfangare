const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bucketImg = new Image();
bucketImg.src = 'assets/bucket.png'; 

const objects = [
    { imgSrc: 'assets/blahaj.png', points: 10, name: 'Blahaj' }, //blahaj!!
    { imgSrc: 'assets/jaettestor.png', points: 30, name: 'Jaettestor' },
    { imgSrc: 'assets/djungelskog.png', points: 25, name: 'Djungelskog' },
    { imgSrc: 'assets/cat.png', points: 50, name: 'Cat' }, //ooiioiaoia cat
    { imgSrc: 'assets/blahaj1.png', points: evilBlahajPenalty, name: 'Evil Blahaj' }, //grrrr
    { imgSrc: 'assets/blavingad.png', points: 30, name: 'Blavingad' },
    { imgSrc: 'assets/lilleplutt.png', points: 20, name: 'Lilleplutt' },
    { imgSrc: 'assets/aftonsparv.png', points: 40, name: 'Aftonsparv' },
    { imgSrc: 'assets/carttoken.png', points: 0, name: 'Cart Token' } // special!
];

const bucket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 60,
    width: 120,
    height: 60,
    dx: 0
};

const fallingObjects = [];

// implemented game saving, i set it to 2030 for extra assurance even though the max is like february 2026 or sum
function saveGameData() {
    document.cookie = `score=${score}; expires=Fri, 01 Jan 2030 00:00:00 UTC; path=/;`;
    document.cookie = `scoreMultiplier=${scoreMultiplier}; expires=Fri, 01 Jan 2030 00:00:00 UTC; path=/;`;
    document.cookie = `evilBlahajPenalty=${evilBlahajPenalty}; expires=Fri, 01 Jan 2030 00:00:00 UTC; path=/;`;
    document.cookie = `evilBlahajSpawnRate=${evilBlahajSpawnRate}; expires=Fri, 01 Jan 2030 00:00:00 UTC; path=/;`;
    document.cookie = `bucketWidth=${bucket.width}; expires=Fri, 01 Jan 2030 00:00:00 UTC; path=/;`;
}

// load game data again
function loadGameData() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        switch (key) {
            case 'score':
                score = Number(value);
                break;
            case 'scoreMultiplier':
                scoreMultiplier = Number(value);
                break;
            case 'evilBlahajPenalty':
                evilBlahajPenalty = Number(value);
                break;
            case 'evilBlahajSpawnRate':
                evilBlahajSpawnRate = Number(value);
                break;
            case 'bucketWidth':
                bucket.width = Number(value);
                break;
        }
    });
}

// Load game data on initialization
loadGameData();

function drawBucket() {
    ctx.drawImage(bucketImg, bucket.x, bucket.y, bucket.width, bucket.height);
}

function drawObject(object) {
    ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
}

function updateBucket() {
    bucket.x += bucket.dx;

    if (bucket.x < 0) {
        bucket.x = 0;
    } else if (bucket.x + bucket.width > canvas.width) {
        bucket.x = canvas.width - bucket.width;
    }
}

function updateObject(object) {
    object.y += object.dy;

    if (object.y + object.height > canvas.height) {
        resetObject(object);
    }

    if (
        object.y + object.height > bucket.y &&
        object.x + object.width > bucket.x &&
        object.x < bucket.x + bucket.width
    ) {
        if (object.name === 'Evil Blahaj') {
            score += evilBlahajPenalty;
            Toastify({
                text: "Bwehehehehe",
                duration: 350,
                gravity: "top",
                position: "center",
                style: { background: "darkblue", color: "yellow" }
            }).showToast();
        } else if (object.name === 'Cart Token') {
            scoreMultiplier += 0.5;
            Toastify({
                text: "Score Multiplier Increased!",
                duration: 500,
                gravity: "top",
                position: "center",
                style: { background: "darkblue", color: "yellow" }
            }).showToast();
        } else {
            score += object.points * scoreMultiplier;
        }
        document.getElementById('score').textContent = score;
        document.getElementById('storeScore').textContent = score;
        resetObject(object);
        saveGameData(); // save game data as cookies each time an action occurs
    }
}

function resetObject(object) {
    object.y = 0;
    object.x = Math.random() * (canvas.width - object.width);
}

function createFallingObject() {
    let obj = objects[Math.floor(Math.random() * objects.length)];

    // Adjust the spawn rate for Evil Blahaj
    if (obj.name === 'Evil Blahaj' && Math.random() > evilBlahajSpawnRate) {
        obj = objects.find(o => o.name !== 'Evil Blahaj');
    }

    // Adjust rarity for cart token (not very rare so good for speedrunning)
    if (obj.name === 'Cart Token' && Math.random() > 4.22) {
        obj = objects.find(o => o.name !== 'Cart Token');
    }

    const newObj = {
        img: new Image(),
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 70,
        height: 70,
        dy: 2,
        points: obj.points,
        name: obj.name
    };
    newObj.img.src = obj.imgSrc;
    fallingObjects.push(newObj);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBucket();
    fallingObjects.forEach((object) => {
        drawObject(object);
        updateObject(object);
    });
    updateBucket();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        bucket.dx = -5;
    } else if (e.key === 'ArrowRight') {
        bucket.dx = 5;
    }
});

document.addEventListener('keyup', () => {
    bucket.dx = 0;
});

// create falling animals (objects arund 10)
for (let i = 0; i < 10; i++) {
    createFallingObject();
}

gameLoop();