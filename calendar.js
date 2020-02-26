/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function calendar(month, day) {
  const { registerFont, createCanvas } = require("canvas");
  registerFont("ProximaNova.otf", { family: "ProximaNova" });

  const canvas = createCanvas(48, 48);
  const ctx = canvas.getContext("2d");

  const graphicX = 4;
  const graphicY = 4;

  ctx.shadowColor = "rgba(0, 19, 25, 0.2)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 1;

  ctx.fillStyle = "#FFFFFF";
  // ctx.fillRect(0, 0, 40, 40);
  roundRect(ctx, graphicX, graphicY, 40, 40, 4, true, false);

  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "#FE4A49";
  roundRect(
    ctx,
    graphicX,
    graphicY,
    40,
    16,
    {
      tl: 4,
      tr: 4
    },
    true,
    false
  );

  ctx.fillStyle = "#FFF";
  ctx.font = "bold 10px ProximaNova";
  ctx.textAlign = "center";

  ctx.fillText(month.toUpperCase(), 23.5, 16);

  ctx.font = "bold 14px ProximaNova";
  ctx.fillStyle = "#001319";
  ctx.fillText(day, 24, 36);

  return canvas.createPNGStream();
}

module.exports = calendar;
