
const beamHitbox = document.getElementById("beam-hitbox");
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

    for(let i=0;i<items.length;i++){
        if(items[i].distance < 0){
            leftTotal += items[i].weight;
        }else if(items[i].distance > 0){
            rightTotal += items[i].weight;
        }
    }
    leftTotalText.textContent = `${leftTotal} kg`;
    rightTotalText.textContent = `${rightTotal} kg`;
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
    renderItems();

    if(newItem.distance < 0 ){
        addLog(`${newItem.weight} kg added to the left side`);
    }else if(distanceFromCenter > 0){
        addLog(`${newItem.weight} kg added to the right side`);
    }else{
        addLog(`${newItem.weight} kg added at the center`);
    }
    updateTotals();

    upcomingWeight = generateRandomWeight();
    updateUpcomingWeight();
});

function renderItems() {
    itemsLayer.innerHTML = "";

    const sceneRect = scene.getBoundingClientRect();
    const beamRect = beam.getBoundingClientRect();
    const itemSize = 40;

    const beamCenterX = (beamRect.left - sceneRect.left) + (beamRect.width / 2);
    const beamCenterY = (beamRect.top - sceneRect.top) + (beamRect.height / 2);

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemElement = document.createElement("div");

        itemElement.classList.add("item");
        itemElement.textContent = `${item.weight} kg`;

        const itemX = beamCenterX + item.distance - (itemSize / 2);
        const itemY = beamCenterY - (itemSize / 2) ;

        itemElement.style.left = `${itemX}px`;
        itemElement.style.top = `${itemY}px`;

        itemsLayer.appendChild(itemElement);
    }
}