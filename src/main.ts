import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Grey Goo";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let matter: number = 0;

const gatherButton = document.createElement("button");
gatherButton.innerHTML = "Gather Materials";
gatherButton.onclick = function () {
  matter++;
  console.log(matter);
};
app.append(gatherButton);
