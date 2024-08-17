import {
  drawCircleOnMap,
  drawImagePartWithTransform,
  drawLineOnMap,
} from "./DGamev3.js";

export class Worker {
  constructor(cellX, cellY, game, img, spritesheetData) {
    this.game = game;
    this.img = img;
    this.spritesheetData = spritesheetData;

    this.x = cellX * game.gridCellSize;
    this.y = cellY * game.gridCellSize;
    this.moveSpeed = 10;
    this.moveSpeedtime = 0;

    this.inventory = [];
    this.destinationQueue = [];
  }

  update(deltaTime) {
    if (this.destinationQueue.length > 0) {
      // do one step
      const obj = this.destinationQueue[0];

      // chck direction
      if (this.x < obj.cellX * this.game.gridCellSize) {
        if (this.moveSpeedtime > this.moveSpeed) {
          this.x++;
          this.moveSpeedtime = 0;
        }
      } else if (this.x > obj.cellX * this.game.gridCellSize) {
        if (this.moveSpeedtime > this.moveSpeed) {
          this.x--;
          this.moveSpeedtime = 0;
        }
      } else if (this.y < obj.cellY * this.game.gridCellSize) {
        if (this.moveSpeedtime > this.moveSpeed) {
          this.y++;
          this.moveSpeedtime = 0;
        }
      } else if (this.y > obj.cellY * this.game.gridCellSize) {
        if (this.moveSpeedtime > this.moveSpeed) {
          this.y--;
          this.moveSpeedtime = 0;
        }
      } else if (
        this.x === obj.cellX * this.game.gridCellSize &&
        this.y === obj.cellY * this.game.gridCellSize
      ) {
        console.log("worker reached building");

        this.destinationQueue.shift();
        console.log("destinationQueue", this.destinationQueue);
      }

      this.moveSpeedtime += deltaTime;
    }
  }

  draw() {
    drawImagePartWithTransform(
      this.img,
      this.spritesheetData.idle.x,
      this.spritesheetData.idle.y,
      this.spritesheetData.idle.width,
      this.spritesheetData.idle.height,
      this.x,
      this.y,
      this.spritesheetData.idle.width,
      this.spritesheetData.idle.height,
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

    // if (this.destinationQueue.length > 0) {
    //   this.drawPath(this.destinationQueue[0]);
    // }
  }

  addDestination(obj) {
    // check if obj have cellX and cellY
    if (obj.cellX && obj.cellY) {
      this.destinationQueue.push(obj);
      console.log("destinationQueue", this.destinationQueue);
    } else {
      console.error("Building doesn't have cellX and cellY");
    }
  }

  drawPath(obj) {
    drawLineOnMap(
      this.x + this.game.gridCellSize / 2,
      this.y + this.game.gridCellSize / 2,
      obj.cellX * this.game.gridCellSize + this.game.gridCellSize / 2,
      obj.cellY * this.game.gridCellSize + this.game.gridCellSize / 2,
      this.game.ctx,
      this.game.camera
    );
  }
}
