//can be ngrok url, anything, jsut that it connects to backend port in some shape or form at the end of the day
const backendUrl = '';

// submit score
async function submitScore() {//spam if you hate tacos
    const name = document.getElementById('player-name').value;
    if (!name || score === null) { 
        alert('Enter a name and get a score to be submitted');
        return;
    }

    const response = await fetch(`${backendUrl}/submit-score`, {//send data
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, score })
    });

    if (response.ok) {//error checking
        alert('Score submitted!');
        loadLeaderboard();
    } else {
        alert('Error submitting score.');
    }
}

// load leaderboard
async function loadLeaderboard() {
    const response = await fetch(`${backendUrl}/leaderboard`);
    const leaderboard = await response.json();

    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    leaderboard.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: ${player.score}`;
        leaderboardList.appendChild(listItem);
    });
}

// ui open leaderboard
function openLeaderboard() {
    document.getElementById('leaderboard').style.display = 'block';
    loadLeaderboard();
}

//closes
function closeLeaderboard() {
    document.getElementById('leaderboard').style.display = 'none';
}

// Load leaderboard on page load
window.onload = loadLeaderboard;
