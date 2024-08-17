import { Building } from "./Building.js";
import { Worker } from "./Worker.js";
import {
  Game,
  drawCircleOnMap,
  drawImagePartWithTransform,
  drawLineOnMap,
  drawRectOnMap,
} from "./DGamev3.js";
import { buildings, data, items, spritesheetData } from "./const.js";
import { Resource } from "./Resource.js";
import { GUI } from "./GUI.js";

const sprite = new Image();
sprite.src = "assets/Sprite-0001.png";

const game = new Game();
game.init("game", 1600, 800, 2);

game.isBuildMode = false;
game.gridCellSize = 16;

game.setCamera(390, 190);

const gui = new GUI(game);
gui.addWindow(
  "currentBuilding",
  0,
  game.canvas.height - 70,
  100,
  100,
  "#4d4d4d",
  1,
  true
);

const worker1 = new Worker(10, 10, game, sprite, spritesheetData.worker);
addToMap(worker1);

const backpackWorker = new Worker(
  2,
  2,
  game,
  sprite,
  spritesheetData.backpackWorker
);
addToMap(backpackWorker);

const house1 = new Building(
  15,
  15,
  game,
  sprite,
  spritesheetData.buildings.house
);
addToMap(house1);

const house2 = new Building(
  12,
  20,
  game,
  sprite,
  spritesheetData.buildings.house
);
addToMap(house2);

const herbalistHut = new Building(
  40,
  10,
  game,
  sprite,
  spritesheetData.buildings.herbalistHut
);
addToMap(herbalistHut);

const raspberryBush = new Resource(
  10,
  10,
  game,
  sprite,
  spritesheetData.resource.raspberryBush
);
raspberryBush.addToInventory(items.raspberry, 13);
addToMap(raspberryBush);

const emptyBush = new Resource(
  12,
  11,
  game,
  sprite,
  spritesheetData.resource.emptyBush
);
addToMap(emptyBush);

console.log("mapa: ", data.map);

worker1.addDestination(herbalistHut);
worker1.addDestination(house2);
worker1.addDestination(house1);
worker1.addDestination(raspberryBush);

function update(deltaTime) {
  game.moveCameraRMB();

  data.map.forEach((obj) => {
    obj.update(deltaTime);
  });

  gui.update(deltaTime);

  buildingPicker();

  placeBuilding();

  const element = getElementOnMapClick();
}

function placeBuilding() {
  if (data.pickedBuildingId !== null) {
    if (game.mouse.isMouseDown) {
      if (game.mouse.clickFlag) {
        const { cellX, cellY } = getCellPositionUnderMouse();
        const building = new Building(
          cellX,
          cellY,
          game,
          sprite,
          Object.values(spritesheetData.buildings).find(
            (el) => el.id === data.pickedBuildingId
          )
        );
        addToMap(building);
        data.pickedBuildingId = null;
        game.isBuildMode = false;
        game.mouse.clickFlag = false;
      }
    } else game.mouse.clickFlag = true;
  }
}

function draw(deltaTime) {
  game.clearRect();

  drawGrid();

  data.map.forEach((obj) => {
    obj.draw();
  });

  gui.draw();

  // draw picked building
  if (data.pickedBuildingId !== null) {
    const { x, y, width, height } = Object.values(
      spritesheetData.buildings
    ).find((el) => el.id === data.pickedBuildingId);

    drawImagePartWithTransform(
      sprite,
      x,
      y,
      width,
      height,
      0,
      (game.canvas.height - 70) / 2,
      width,
      height,
      false,
      false,
      0,
      0,
      0,
      game.ctx,
      0,
      0,
      false
    );
  }

  // draw temporary building on mouse position
  const { cellX, cellY } = getCellPositionUnderMouse();
  drawTemporaryBuilding(cellX, cellY);
}

requestAnimationFrame(gameLoop);
let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = +(timestamp - lastTime).toFixed(2);
  lastTime = timestamp;

  update(deltaTime);

  draw(deltaTime);

  requestAnimationFrame(gameLoop);
}

function drawGrid() {
  if (game.isBuildMode) {
    // draw grid
    for (let x = 0; x < game.canvas.width; x += game.gridCellSize) {
      drawLineOnMap(
        x,
        0,
        x,
        game.canvas.height,
        game.ctx,
        game.camera,
        "rgb(213, 213, 213)"
      );
    }
    for (let y = 0; y < game.canvas.height; y += game.gridCellSize) {
      drawLineOnMap(
        0,
        y,
        game.canvas.width,
        y,
        game.ctx,
        game.camera,
        "rgb(213, 213, 213)"
      );
    }
  }
}

function getCellPositionUnderMouse() {
  const cellX = Math.floor((game.mouse.x + game.camera.x) / game.gridCellSize);
  const cellY = Math.floor((game.mouse.y + game.camera.y) / game.gridCellSize);
  return { cellX, cellY };
}

function addToMap(obj) {
  data.map.push(obj);
}

const pickKeys = buildings.map((el) => el.pickKey); // [49, 50...]
function buildingPicker() {
  pickKeys.forEach((key) => {
    const id = buildings.find((el) => el.pickKey === key).id;
    if (game.keys.key[key] && data.pickedBuildingId !== id) {
      data.pickedBuildingId = id;
      game.isBuildMode = true;
      console.log("building id: ", data.pickedBuildingId);
    }
  });

  // reset, 27 = esc
  if (game.keys.key[27] && data.pickedBuildingId !== null) {
    data.pickedBuildingId = null;
    game.isBuildMode = false;
    console.log("building id: ", data.pickedBuildingId);
  }
}

function drawTemporaryBuilding(cellX, cellY) {
  if (data.pickedBuildingId) {
    const { x, y, width, height } = Object.values(
      spritesheetData.buildings
    ).find((el) => el.id === data.pickedBuildingId);

    const { cellX, cellY } = getCellPositionUnderMouse();

    drawRectOnMap(
      cellX * game.gridCellSize,
      cellY * game.gridCellSize,
      width,
      height,
      game.ctx,
      game.camera
    );
    1;

    drawImagePartWithTransform(
      sprite,
      x,
      y,
      width,
      height,
      cellX * game.gridCellSize - game.camera.x,
      cellY * game.gridCellSize - game.camera.y,
      width,
      height,
      false,
      false,
      0,
      0,
      0,
      game.ctx,
      0,
      0,
      false
    );
  }
}

function getElementOnMapClick() {
  if (game.mouse.isMouseDown) {
    if (game.mouse.clickFlag) {
      const { cellX, cellY } = getCellPositionUnderMouse();
      const element = data.map.find(
        (el) => el.cellX === cellX && el.cellY === cellY
      );
      console.log("element: ", element);

      game.mouse.clickFlag = false;
      return element;
    }
  } else game.mouse.clickFlag = true;
}
