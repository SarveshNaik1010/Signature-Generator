const canvas = document.getElementById("canvas");
const settingInputs = document.querySelectorAll(".setting-input");
const btnClear = document.querySelector(".btn-clear");
const btnGenerate = document.querySelector(".btn-generate");
const btnCreate = document.querySelector(".btn-create");
const scribbleTitle = document.querySelector(".scribble-title");
const inputName = document.querySelector(".input-name");

const ctx = canvas.getContext("2d");

let painting = false;
let lastX = 0;
let lastY = 0;
const maxWidth = 20;
ctx.lineWidth = 6;
ctx.strokeStyle = "#000";

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// canvas.addEventListener("touchstart", startPositionTouch);
// canvas.addEventListener("touchend", endPositionTouch);
// canvas.addEventListener("touchmove", drawTouch);

function startPosition(e) {
  painting = true;
  updatePosition(e);
}

// Function to unset painting flag
function endPosition() {
  painting = false;
  lastX = 0;
  lastY = 0;
}

// Function to draw lines
function draw(e) {
  e.preventDefault();
  if (!painting) return;

  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  updatePosition(e);
  ctx.lineTo(lastX, lastY);
  ctx.stroke();
}

// Function to update last position
function updatePosition(e) {
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
}

/* ----------------------------------- OTHER SETTINGS ---------------------------------- */
function applyChanges(settingInputs) {
  settingInputs.forEach((si) => {
    ctx[si.name] = si.value;
  });
}

settingInputs.forEach((si, i) => {
  si.addEventListener("change", function () {
    applyChanges(settingInputs);
  });
});

btnClear.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

btnGenerate.addEventListener("click", function () {
  const link = document.createElement("a");

  // Set the href attribute to the data URL of the canvas image
  link.href = canvas.toDataURL("image/png");

  // Set the download attribute to specify the filename
  link.download = "canvas_image.png";

  // Trigger the download
  link.click();
});

btnCreate.addEventListener("click", function () {
  scribbleTitle.textContent = `Scribble here ${inputName.value.split(" ")[0]}`;
});
