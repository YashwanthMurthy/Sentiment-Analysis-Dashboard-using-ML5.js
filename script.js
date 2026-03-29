let sentiment;
const userInput = document.getElementById('userInput');
const scoreValue = document.getElementById('scoreValue');
const gaugeFill = document.getElementById('gaugeFill');
const sentimentLabel = document.getElementById('sentimentLabel');
const status = document.getElementById('status');

// 1. Initialize the Sentiment method
sentiment = ml5.sentiment('movieReviews', modelReady);

function modelReady() {
    status.innerText = "Model Loaded! Start typing...";
}

// 2. Listen for input
userInput.addEventListener('input', () => {
    const text = userInput.value;
    
    if (text.trim() === "") {
        resetUI();
        return;
    }

    // 3. Make a prediction
    const prediction = sentiment.predict(text);
    updateUI(prediction.score);
});

function updateUI(score) {
    scoreValue.innerText = score.toFixed(2);
    gaugeFill.style.width = (score * 100) + "%";

    // Change colors and labels based on score
    if (score > 0.7) {
        sentimentLabel.innerText = "Positive 😄";
        gaugeFill.style.background = "#4caf50";
    } else if (score < 0.4) {
        sentimentLabel.innerText = "Negative ☹️";
        gaugeFill.style.background = "#f44336";
    } else {
        sentimentLabel.innerText = "Neutral 😐";
        gaugeFill.style.background = "#ffd700";
    }
}

function resetUI() {
    scoreValue.innerText = "0.50";
    gaugeFill.style.width = "50%";
    gaugeFill.style.background = "#ffd700";
    sentimentLabel.innerText = "Neutral";
}