
const beamHitbox = document.getElementById("beam-hitbox");
const beam = document.getElementById("beam");
const itemsLayer = document.getElementById("items-layer");
const leftTotalText = document.getElementById("left-total");
const rightTotalText = document.getElementById("right-total");
const beamAngleText = document.getElementById("beam-angle");
const upcomingWeightText = document.getElementById("upcoming-weight");
const activityLog = document.getElementById("activity-log");
const resetButton = document.getElementById("reset-btn");

function generateRandomWeight(){
    return Math.floor(Math.random() * 10) + 1;
}

let items = [];
let upcomingWeight = generateRandomWeight();

function updateUpcomingWeight(){
    upcomingWeightText.textContent = `${upcomingWeight} kg`;
}

updateUpcomingWeight();

beamHitbox.addEventListener("click", function(){
    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();
});