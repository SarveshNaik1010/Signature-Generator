const canvas = document.getElementById("canvas");
const settingInputs = document.querySelectorAll(".setting-input");
const btnClear = document.querySelector(".btn-clear");
const btnGenerate = document.querySelector(".btn-generate");
const btnCreate = document.querySelector(".btn-create");
const scribbleTitle = document.querySelector(".scribble-title");
const inputName = document.querySelector(".input-name");

const ctx = canvas.getContext("2d");

let flag = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

ctx.lineWidth = 10;

// Editing the dimensions for mobile devices.
const mediaQuery = window.matchMedia("(max-width: 600px)");
if (mediaQuery.matches) {
  canvas.width = "300";
  canvas.height = "200";
}

/* -------------------------------------------------------------------------- */
/*                              Scribbling logic                              */
/* -------------------------------------------------------------------------- */

// Event listeners for mouse
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listeners for touch devices
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [
    e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left,
    e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top,
  ];
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const x =
    e.offsetX || e.touches[0].clientX - canvas.getBoundingClientRect().left;
  const y =
    e.offsetY || e.touches[0].clientY - canvas.getBoundingClientRect().top;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  [lastX, lastY] = [x, y];
}

function stopDrawing() {
  isDrawing = false;
}

/* -------------------------------------------------------------------------- */
/*                                 Editing Pen                                */
/* -------------------------------------------------------------------------- */

function applyChanges(settingInputs) {
  settingInputs.forEach((si) => {
    ctx[si.name] = si.value;
  });
}

settingInputs.forEach((si, i) => {
  si.addEventListener("change", function () {
    applyChanges(settingInputs);
  });
  si.addEventListener("click", function () {
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
  link.download = `${inputName.value}_signature.png`;

  // Trigger the download
  link.click();
});

btnCreate.addEventListener("click", function () {
  scribbleTitle.textContent = `Scribble here ${inputName.value.split(" ")[0]}`;
});
