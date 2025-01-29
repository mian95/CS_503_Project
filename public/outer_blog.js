const tips = [
    "Start your day with a glass of warm water.",
    "Meditate for 10 minutes daily to improve mental health.",
    "Avoid processed foods as much as possible.",
    "Get 7-8 hours of sleep for optimal health.",
    "Practice deep breathing exercises to relieve stress."
];

document.getElementById("tipButton").addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    document.getElementById("randomTip").textContent = tips[randomIndex];
    document.getElementById("randomTip").style.color = " background: linear-gradient(45deg, green,yellow);";
    document.getElementById("randomTip").style.fontWeight = "bold";
});