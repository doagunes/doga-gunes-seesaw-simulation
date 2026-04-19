const beam = document.getElementById("beam");
const beamGroup = document.getElementById("beam-group");
const itemsLayer = document.getElementById("items-layer");
const leftTotalText = document.getElementById("left-total");
const rightTotalText = document.getElementById("right-total");
const beamAngleText = document.getElementById("beam-angle");
const upcomingWeightText = document.getElementById("upcoming-weight");
const activityLog = document.getElementById("activity-log");
const resetButton = document.getElementById("reset-btn");
const dropSound = document.getElementById("drop-sound");

function generateRandomWeight(){
    return Math.floor(Math.random() * 10) + 1;
}
function getItemSize(weight) {
    return 26 + weight * 3;
}
function getItemColor(weight) {
    const colors = {
        1: "#f94144",
        2: "#f3722c",
        3: "#90be6d",
        4: "#f9844a",
        5:  "#277da1",
        6: "#f8961e",
        7: "#43aa8b",
        8: "#577590",
        9: "#f9c74f",
        10: "#6a4c93"
       
        
    };

    return colors[weight];
}
let items = [];
let logs = [];
let currentAngle = 0;
let upcomingWeight = generateRandomWeight();

function updateUpcomingWeight(){
    upcomingWeightText.textContent = `${upcomingWeight} kg`;
}
updateUpcomingWeight();

function addLog(message){
    logs.unshift(message);
    const li = document.createElement("li");
    li.textContent = message;
    activityLog.prepend(li);
    
}


function calculateTotals(){
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
    const beamCenterX = beamWidth / 2;
    const itemY = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemElement = document.createElement("div");
        const itemSize = getItemSize(item.weight);
        const itemColor = getItemColor(item.weight);
        itemElement.classList.add("item");
        itemElement.textContent = `${item.weight} kg`;

        const itemX = beamCenterX + item.distance - itemSize / 2;

        itemElement.style.width = `${itemSize}px`;
        itemElement.style.height = `${itemSize}px`;
        itemElement.style.left = `${itemX}px`;
        itemElement.style.top = `${itemY}px`;
        itemElement.style.backgroundColor = itemColor;

        itemsLayer.appendChild(itemElement);
    }
}

function calculateAngle() {
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

    const rawAngle = (rightTorque - leftTorque) / 30;
    const angle = Math.max(-30, Math.min(30, rawAngle));
    currentAngle = angle;
    beamGroup.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    beamAngleText.textContent = `${angle.toFixed(1)}°`;
}

beam.addEventListener("click", function(event){
    const rect = beam.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const distanceFromCenter = clickX - centerX;

    const newItem = {
        weight: upcomingWeight,
        distance: distanceFromCenter
    };

    items.push(newItem);

    dropSound.currentTime = 0;
    dropSound.volume = 0.3;
    dropSound.play().catch(() => {});

    calculateTotals();
    calculateAngle();
    renderItems();

    if(newItem.distance < 0 ){
        addLog(`${newItem.weight} kg added to the left side (${Math.round(Math.abs(newItem.distance))} px)`);
    }else if(newItem.distance > 0){
        addLog(`${newItem.weight} kg added to the right side (${Math.round(newItem.distance)} px)`);
    }else{
        addLog(`${newItem.weight} kg added at the center`);
    }

    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();
    saveState();
});

function reset(){
    items = [];
    logs = [];
    currentAngle = 0;
    itemsLayer.innerHTML = "";
    activityLog.innerHTML = "";

    leftTotalText.textContent = "0 kg";
    rightTotalText.textContent = "0 kg";
    beamAngleText.textContent = "0.0°";

    beamGroup.style.transform = "translate(-50%, -50%) rotate(0deg)";

    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();

    addLog("Simulation has been reset");
    saveState();
}

function saveState(){
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("angle", currentAngle);
    localStorage.setItem("upcomingWeight", upcomingWeight);
    localStorage.setItem("logs", JSON.stringify(logs));
}

function loadState(){
    const savedItems = localStorage.getItem("items");
    const savedAngle = localStorage.getItem("angle");
    const savedWeight = localStorage.getItem("upcomingWeight");
    const savedLogs = localStorage.getItem("logs");

    if (savedItems) {
        items = JSON.parse(savedItems);
    }
    if (savedAngle) {
        currentAngle = Number(savedAngle);
    }
    if (savedWeight) {
        upcomingWeight = Number(savedWeight);
    }
    if (savedLogs) {
        logs = JSON.parse(savedLogs);
    
        activityLog.innerHTML = "";
    
        for (let i = 0; i < logs.length; i++) {
            const li = document.createElement("li");
            li.textContent = logs[i];
            activityLog.appendChild(li);
        }
    }
    calculateTotals();
    renderItems();
    beamGroup.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
    beamAngleText.textContent = `${currentAngle.toFixed(1)}°`;

    updateUpcomingWeight();
}

resetButton.addEventListener("click", reset);
loadState();
