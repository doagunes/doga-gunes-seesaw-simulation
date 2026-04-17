
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

beamHitbox.addEventListener("click", function(event){
    const rect = beamHitbox.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const distanceFromCenter = clickX - centerX;

    console.log("clickX:", clickX);
    console.log("centerX:", centerX);
    console.log("distanceFromCenter:", distanceFromCenter);

    if(distanceFromCenter < 0 ){
        console.log("Clicked on left side");
    }else if(distanceFromCenter > 0){
        console.log("Clicked on right side");

    }else{
        console.log("Clicked exactly at the center");

    }
    
    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();
});