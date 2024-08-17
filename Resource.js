import { drawImagePartWithTransform, drawTextOnMap } from "./DGamev3.js";

export class Resource {
  constructor(cellX, cellY, game, img, spritesheetData) {
    this.img = img;
    this.spritesheetData = spritesheetData;
    this.cellX = cellX;
    this.cellY = cellY;
    this.game = game;

    this.inventory = [];
  }

  update(deltaTime) {}

  draw() {
    drawImagePartWithTransform(
      this.img,
      this.spritesheetData.x,
      this.spritesheetData.y,
      this.spritesheetData.width,
      this.spritesheetData.height,
      this.cellX * this.game.gridCellSize,
      this.cellY * this.game.gridCellSize,
      this.spritesheetData.width,
      this.spritesheetData.height,
      false,
      false,
      0,
      0,
      0,
      this.game.ctx,
      this.game.camera.x,
      this.game.camera.y,
      true
    );

    if (this.inventory.length > 0) {
      drawTextOnMap(
        this.inventory[0].quantity,
        this.cellX * this.game.gridCellSize,
        this.cellY * this.game.gridCellSize,
        this.game
      );
    }
  }

  addToInventory(item, quantity = 1) {
    this.inventory.push({ ...item, quantity });
  }
}
