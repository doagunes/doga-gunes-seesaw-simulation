const beamHitbox = document.getElementById("beam-hitbox");
const beamGroup = document.getElementById("beam-group");
const beam = document.getElementById("beam");
const scene = document.getElementById("scene");
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
let currentAngle = 0;
let upcomingWeight = generateRandomWeight();

function updateUpcomingWeight(){
    upcomingWeightText.textContent = `${upcomingWeight} kg`;
}

updateUpcomingWeight();

function addLog(message){
    const li = document.createElement("li");
    li.textContent = message;
    activityLog.appendChild(li);
}

function updateTotals(){
    let leftTotal = 0;
    let rightTotal = 0;

    for(let i = 0; i < items.length; i++){
        if(items[i].distance < 0){
            leftTotal += items[i].weight;
        }else if(items[i].distance > 0){
            rightTotal += items[i].weight;
        }
    }

    leftTotalText.textContent = `${leftTotal} kg`;
    rightTotalText.textContent = `${rightTotal} kg`;
}

function renderItems() {
    itemsLayer.innerHTML = "";

    const beamWidth = 420;
    const itemSize = 40;
    const beamCenterX = beamWidth / 2;
    const itemY = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemElement = document.createElement("div");

        itemElement.classList.add("item");
        itemElement.textContent = `${item.weight} kg`;

        const itemX = beamCenterX + item.distance - (itemSize / 2);

        itemElement.style.left = `${itemX}px`;
        itemElement.style.top = `${itemY}px`;

        itemsLayer.appendChild(itemElement);
    }
}

function updateBeamAngle() {
    let leftTorque = 0;
    let rightTorque = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.distance < 0) {
            leftTorque += item.weight * Math.abs(item.distance);
        } else if (item.distance > 0) {
            rightTorque += item.weight * item.distance;
        }
    }

    const rawAngle = (rightTorque - leftTorque) / 100;
    const angle = Math.max(-30, Math.min(30, rawAngle));

    currentAngle = angle;

    beamGroup.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    beamAngleText.textContent = `${angle.toFixed(1)}°`;
}

beamHitbox.addEventListener("click", function(event){
    const rect = beamHitbox.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const distanceFromCenter = clickX - centerX;

    const newItem = {
        weight: upcomingWeight,
        distance: distanceFromCenter
    };

    items.push(newItem);
    updateTotals();
    updateBeamAngle();
    renderItems();

    if(newItem.distance < 0 ){
        addLog(`${newItem.weight} kg added to the left side`);
    }else if(newItem.distance > 0){
        addLog(`${newItem.weight} kg added to the right side`);
    }else{
        addLog(`${newItem.weight} kg added at the center`);
    }

    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();
});

function reset(){
    items = [];
    currentAngle = 0;
    itemsLayer.innerHTML = "";
    activityLog.innerHTML = "";

    leftTotalText.textContent = 0;
    rightTotalText.textContent = 0;
    beamAngleText.textContent = 0;

    beamGroup.style.transform = "translate(-50%, -50%) rotate(0deg)";

    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();

    addLog("Simulation has been reset");
}
resetButton.addEventListener("click", reset);