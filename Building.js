import { drawImagePartWithTransform, drawRectOnMap } from "./DGamev3.js";

export class Building {
  constructor(cellX, cellY, game, img, spritesheetData) {
    this.img = img;
    this.spritesheetData = spritesheetData;
    this.cellX = cellX;
    this.cellY = cellY;

    // this.cellWidth = cellWidth;
    // this.cellHeight = cellHeight;

    this.game = game;
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
  }
}
