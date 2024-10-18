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
let rNodes: number = 0;
let lNodes: number = 0;
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
  " other nodes in your swarm. " 
  + " Your swarm is generating " + ((hNodes * .1)  + (rNodes * 2) + (lNodes * 50)) + " matter per second.";
app.append(statusText2);
//setInterval(updateMat, 1000 / UPS);

const harvesterButton = document.createElement("button");
harvesterButton.innerHTML = "🤖Create Harvester Node⚒️: 10";
harvesterButton.onclick = function () {
  matter -= 10;
  hNodes += 1;
  console.log(matter);
};
app.append(harvesterButton);

const refinerButton = document.createElement("button");
refinerButton.innerHTML = "🤖Create Refiner Node⚗️: 100";
refinerButton.onclick = function () {
  matter -= 100;
  rNodes += 1;
  console.log(matter);
};
app.append(refinerButton);

const logisticsButton = document.createElement("button");
logisticsButton.innerHTML = "🤖Create Logistics Node🫀: 1000";
logisticsButton.onclick = function () {
  matter -= 1000;
  lNodes += 1;
  console.log(matter);
};
app.append(logisticsButton);


requestAnimationFrame(updateMat);

function updateMat() {
  const nTS = performance.now(); //new timestamp
  matter += ((hNodes * .1)  + (rNodes * 2) + (lNodes * 50)) * ((nTS - TS) / 1000);

  harvesterButton.disabled = matter < 10;
  refinerButton.disabled = matter < 100;
  logisticsButton.disabled = matter < 1000;

  statusText1.innerHTML =
    "You are a self-replicating nanite.\nYou have " +
    Math.floor(matter * 10) / 10 +
    " units of machine-relevant matter.";
    
  statusText2.innerHTML =
  "You have " +
  (hNodes + rNodes + lNodes) +
  " other nodes in your swarm. " 
  + " Your swarm is generating " + ((hNodes * .1)  + (rNodes * 2) + (lNodes * 50)) + " matter per second.";
  TS = nTS;
  requestAnimationFrame(updateMat);
}
