import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "Grey Goo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let timeStamp: number = 0;
let matter: number = 0;

const costRate = 1.15; //rate at which the cost of each item increases

interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  amount: number;
}

//Increases the amount of the purchased item by 1, increase cost by 15%, and return the purchase cost
function buy(i: Item) {
  const cost: number = i.cost;
  i.cost *= costRate;
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

//Create main clicker button and status text elements
const gatherButton: HTMLButtonElement = document.createElement("button");
console.log(typeof gatherButton);
gatherButton.innerHTML = "⛏️Gather Materials⚙️";
gatherButton.onclick = function () {
  matter++;
};
app.append(gatherButton);

const statusText1: HTMLDivElement = document.createElement("div");
app.append(statusText1);

const statusText2: HTMLDivElement = document.createElement("div");
app.append(statusText2);

//Create a buy button for each purchaseable item
for (let i: number = 0; i < availableItems.length; i++) {
  buttons[i] = document.createElement("button");
  buttons[i].onclick = function () {
    matter -= buy(availableItems[i]);
    buttonUpdate(i);
  };
  buttonUpdate(i);
  buttons[i].title = availableItems[i].description;
  app.append(buttons[i]);
}

requestAnimationFrame(updateMat);

//Draw loop
function updateMat() {
  const newTimeStamp: number = performance.now();
  let rate: number = 0;
  let nodes: number = 0;

  for (let i: number = 0; i < availableItems.length; i++) {
    rate += availableItems[i].rate * availableItems[i].amount;
    nodes += availableItems[i].amount;
  }

  matter += rate * ((newTimeStamp - timeStamp) / 1000);

  statusUpdate(rate, nodes);

  timeStamp = newTimeStamp;
  requestAnimationFrame(updateMat);
}

//Updates the status text with current values, checks if upgrades are affordable
function statusUpdate(rate: number, nodes: number) {
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

  for (let i: number = 0; i < availableItems.length; i++) {
    buttons[i].disabled = matter < availableItems[i].cost;
  }
}

//Updates button name with current cost
function buttonUpdate(index: number) {
  buttons[index].innerHTML =
    "(" +
    availableItems[index].amount +
    ") " +
    availableItems[index].name +
    ": " +
    round(availableItems[index].cost) +
    " Matter";
}

function round(n: number) {
  return Math.floor(n * 10) / 10;
}
