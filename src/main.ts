import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Grey Goo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//const UPS = 20; //Updates per second
let TS: number = 0; //Timestamp

let matter: number = 0;
let hNodes: number = 0;
let hPrice: number = 10;
let rNodes: number = 0;
let rPrice: number = 100;
let lNodes: number = 0;
let lPrice: number = 1000;
//let bNodes: number = 0;

const gatherButton = document.createElement("button");
gatherButton.innerHTML = "⛏️Gather Materials⚙️";
gatherButton.onclick = function () {
  matter++;
  console.log(matter);
};
app.append(gatherButton);

const statusText1 = document.createElement("div");
statusText1.innerHTML =
  "You are a self-replicating nanite.\nYou have " +
  Math.floor(matter * 10) / 10 +
  " units of machine-relevant matter.";
app.append(statusText1);

const statusText2 = document.createElement("div");
statusText2.innerHTML =
  "You have " +
  (hNodes + rNodes + lNodes) +
  " other nodes in your swarm. " +
  " Your swarm is generating " +
  (hNodes * 0.1 + rNodes * 2 + lNodes * 50) +
  " matter per second.";
app.append(statusText2);
//setInterval(updateMat, 1000 / UPS);

const harvesterButton = document.createElement("button");
harvesterButton.innerHTML = "🤖Create Harvester Node⚒️: " + round(hPrice);
harvesterButton.onclick = function () {
  matter -= hPrice;
  hPrice *= 1.15;

  hNodes += 1;
  console.log(matter);
};
app.append(harvesterButton);

const refinerButton = document.createElement("button");
refinerButton.innerHTML = "🤖Create Refiner Node⚗️: " + round(rPrice);
refinerButton.onclick = function () {
  matter -= rPrice;
  rPrice *= 1.15;

  rNodes += 1;
  console.log(matter);
};
app.append(refinerButton);

const logisticsButton = document.createElement("button");
logisticsButton.innerHTML = "🤖Create Logistics Node🫀: " + round(lPrice);
logisticsButton.onclick = function () {
  matter -= lPrice;
  lPrice *= 1.15;
  
  lNodes += 1;
  console.log(matter);
};
app.append(logisticsButton);

requestAnimationFrame(updateMat);

function updateMat() {
  const nTS = performance.now(); //new timestamp
  matter += (hNodes * 0.1 + rNodes * 2 + lNodes * 50) * ((nTS - TS) / 1000);

  harvesterButton.disabled = matter < hPrice;
  refinerButton.disabled = matter < rPrice;
  logisticsButton.disabled = matter < lPrice;

  statusText1.innerHTML =
    "You are a self-replicating nanite.\nYou have " +
    round(matter)+
    " units of machine-relevant matter.";

  statusText2.innerHTML =
    "You have " +
    (hNodes + rNodes + lNodes) +
    " other nodes in your swarm. " +
    " Your swarm is generating " +
    round(hNodes * 0.1 + rNodes * 2 + lNodes * 50) +
    " matter per second.";

  harvesterButton.innerHTML = "🤖Create Harvester Node⚒️: " + round(hPrice);
    
  refinerButton.innerHTML = "🤖Create Refiner Node⚗️: " + round(rPrice);

  logisticsButton.innerHTML = "🤖Create Logistics Node🫀: " + round(lPrice);

  TS = nTS;
  requestAnimationFrame(updateMat);
}

function round(n : number){
    return(Math.floor(n * 10) / 10);
}