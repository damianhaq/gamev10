import { drawRect } from "./DGamev3.js";

export class GUI {
  constructor(game) {
    this.windowList = [];
    this.game = game;
  }

  update(deltaTime) {}

  draw() {
    for (let i = 0; i < this.windowList.length; i++) {
      const { name, x, y, w, h, color, lineWidth, fill } = this.windowList[i];
      drawRect(x, y, w, h, this.game, color, lineWidth, fill);
    }
  }

  addWindow(name, x, y, w, h, color = "black", lineWidth = 1, fill = false) {
    this.windowList.push({
      name,
      x,
      y,
      w,
      h,
      color,
      lineWidth,
      fill,
    });

    console.log("windowList", this.windowList);
  }
}
