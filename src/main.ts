import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Grey Goo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const UPS = 1; //Updates per second

let matter: number = 0;
//let hNodes: number = 0;
//let rNodes: number = 0;
//let lNodes: number = 0;
//let bNodes: number = 0;



const gatherButton = document.createElement("button");
gatherButton.innerHTML = "Gather Materials";
gatherButton.onclick = function () {
  matter++;
  console.log(matter);
};
app.append(gatherButton);

let statusText = document.createElement("div");
statusText.innerHTML = "You have " + matter + " units of machine-relevant matter.";
app.append(statusText);
setInterval(updateMat, 1000/UPS);



function updateMat(){
    matter += 1/UPS;
    statusText.innerHTML = "You have " + matter + " units of machine-relevant matter.";
}