import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Grey Goo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const UPS = 20; //Updates per second
let TS : number = 0; //Timestamp

let matter: number = 0;
let hNodes: number = 0;
//let rNodes: number = 0;
//let lNodes: number = 0;
//let bNodes: number = 0;

const gatherButton = document.createElement("button");
gatherButton.innerHTML = "⛏️Gather Materials⚙️";
gatherButton.onclick = function () {
  matter++;
  console.log(matter);
};
app.append(gatherButton);


const statusText = document.createElement("div");
statusText.innerHTML =
  "You are a self-replicating nanite.\nYou have " + (Math.floor(matter * 10))/10 + " units of machine-relevant matter.\nYou have " + (hNodes) + " other nodes in your swarm.";
app.append(statusText);
//setInterval(updateMat, 1000 / UPS);


const harvesterButton = document.createElement("button");
harvesterButton.innerHTML = "🤖Create Harvester Node⚒️: 10";
harvesterButton.onclick = function () {
  matter -= 10;
  hNodes += 1;
  console.log(matter);
};
app.append(harvesterButton);

requestAnimationFrame(updateMat);

function updateMat() {
  const nTS = performance.now(); //new timestamp  
  matter += (hNodes * 1) * ((nTS-TS)/1000);
  harvesterButton.disabled = matter < 10;
  statusText.innerHTML = "You are a self-replicating nanite.\nYou have " + (Math.floor(matter * 10))/10 + " units of machine-relevant matter.\nYou have " + (hNodes) + " other nodes in your swarm.";
  TS = nTS;  
  requestAnimationFrame(updateMat);
}
