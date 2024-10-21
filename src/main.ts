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

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  amount: number;
}

function buy(i: Item) {
  const cost = i.cost;
  i.cost *= 1.15;
  i.amount += 1;
  return cost;
}

const availableItems: Item[] = [
  {
    name: "🤖Create Harvester Node⚒️",
    description: "Create a harvester node to gather more matter.",
    cost: 10,
    rate: 0.1,
    amount: 0,
  },
  {
    name: "🤖Create Refiner Node⚗️",
    description: "Create a refiner node make more efficient use of matter.",
    cost: 100,
    rate: 2,
    amount: 0,
  },
  {
    name: "🤖Create Generator Node⚡",
    description: "Create a generator node to power the swarm.",
    cost: 1000,
    rate: 50,
    amount: 0,
  },
  {
    name: "🤖Create Logistics Node🫀",
    description: "Create a logistics node to organize the swarm.",
    cost: 10000,
    rate: 1500,
    amount: 0,
  },
  {
    name: "🤖Create Brain Node🧠",
    description: "Create a brain node to drive the swarm.",
    cost: 100000,
    rate: 50000,
    amount: 0,
  },
];

const buttons: HTMLButtonElement[] = [];

/*let hNodes: number = 0;
let hPrice: number = 10;
let rNodes: number = 0;
let rPrice: number = 100;
let lNodes: number = 0;
let lPrice: number = 1000;*/
//let bNodes: number = 0;

const gatherButton = document.createElement("button");
console.log(typeof gatherButton);
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
  0 +
  " other nodes in your swarm. " +
  " Your swarm is generating " +
  0 +
  " matter per second.";
app.append(statusText2);
//setInterval(updateMat, 1000 / UPS);

for (let i = 0; i < availableItems.length; i++) {
  buttons[i] = document.createElement("button");
  buttons[i].innerHTML =
    availableItems[i].name + ": " + round(availableItems[i].cost);
  buttons[i].onclick = function () {
    matter -= buy(availableItems[i]);
  };
  buttons[i].title = availableItems[i].description;
  app.append(buttons[i]);
}

requestAnimationFrame(updateMat);

function updateMat() {
  const nTS = performance.now(); //new timestamp
  let rate = 0;
  let nodes = 0;
  for (let i = 0; i < availableItems.length; i++) {
    rate += availableItems[i].rate * availableItems[i].amount;
    nodes += availableItems[i].amount;
  }
  matter += rate * ((nTS - TS) / 1000);

  statusText1.innerHTML =
    "You are a self-replicating nanite.\nYou have " +
    round(matter) +
    " units of machine-relevant matter.";

  statusText2.innerHTML =
    "You have " +
    nodes +
    " other nodes in your swarm. " +
    " Your swarm is generating " +
    round(rate) +
    " matter per second.";

  for (let i = 0; i < availableItems.length; i++) {
    buttons[i].innerHTML =
      "(" + availableItems[i].amount + ") " + availableItems[i].name + ": " + round(availableItems[i].cost) + " matter.";
    buttons[i].disabled = matter < availableItems[i].cost;
  }

  TS = nTS;
  requestAnimationFrame(updateMat);
}

function round(n: number) {
  return Math.floor(n * 10) / 10;
}
