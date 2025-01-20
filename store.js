let score = 0;
let scoreMultiplier = 1; // score multiplier due to cart token
let evilBlahajSpawnRate = 1; // spawn rate multiplier for evil blahaj bwehehehehe
let evilBlahajPenalty = -10; // evil blahaj peanutly (it can even be positive, and he can be chill guy)
//CAUTION! DO NOT IMPLEMENT THESE VARIABLES IN ANY OTHER JS SINCE THEY ARE ALREADY DEFINED (GLOBALLY!)
function openStore() {
    document.getElementById('store').style.display = 'block';
}

function closeStore() {
    document.getElementById('store').style.display = 'none';
}

function saveGameData() {
    document.cookie = `score=${score}; path=/;`;
    document.cookie = `scoreMultiplier=${scoreMultiplier}; path=/;`;
    document.cookie = `evilBlahajPenalty=${evilBlahajPenalty}; path=/;`;
    document.cookie = `evilBlahajSpawnRate=${evilBlahajSpawnRate}; path=/;`;
    document.cookie = `bucketWidth=${bucket.width}; path=/;`;
}

function buyBiggerBucket() {
    if (score >= 100) {
        score -= 100;
        bucket.width += 20;
        document.getElementById('score').textContent = score;
        document.getElementById('storeScore').textContent = score;
        Toastify({
            text: "Bigger Bucket Purchased!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
        saveGameData(); // save
    } else {
        Toastify({
            text: "Not enough points!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
    }
}

function buyExterminator() {
    if (score >= 200) {
        score -= 200;
        evilBlahajSpawnRate *= 0.5; // reduce spawn rate of evil blahaj :(
        document.getElementById('score').textContent = score;
        document.getElementById('storeScore').textContent = score;
        Toastify({
            text: "Evil Blahaj Exterminator Purchased!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
        saveGameData(); // save
    } else {
        Toastify({
            text: "Not enough points!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
    }
}

function buyFriendlyEvilBlahaj() {
    if (score >= 150) {
        score -= 150;
        evilBlahajPenalty += 5; // reduce penalty of evil blahaj >:3 and even make him friendly and dominate the world
        document.getElementById('score').textContent = score;
        document.getElementById('storeScore').textContent = score;
        Toastify({
            text: "Friendlier Blahaj Purchased!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
        saveGameData(); // save after purchasing
    } else {
        Toastify({
            text: "Not enough points!",
            duration: 1200,
            gravity: "top",
            position: "center",
            style: { background: "darkblue", color: "yellow" }
        }).showToast();
    }
}