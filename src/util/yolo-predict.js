import * as tf from "@tensorflow/tfjs";

// const names = ['Green Apple', 'Red Apple', 'Orange', 'Banana', 'Carrot', 'Canned Soft Drink', 'Beans', 'Potato', 'Chocolate', 'Cereal', 'Vegemite', 'Instant Coffee']

export const names = [
  {
    name: "Green Apple",
    id: 1,
    color: "#0bff00",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Red Apple",
    id: 2,
    color: "#ff0000",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Orange",
    id: 3,
    color: "#ff9800",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Banana",
    id: 4,
    color: "#fff000",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Carrot",
    id: 5,
    color: "#ffce67",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Canned Soft Drink",
    id: 6,
    color: "#9e0f05",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Beans",
    id: 7,
    color: "#099065",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Potato",
    id: 8,
    color: "#e4dfa4",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Chocolate",
    id: 9,
    color: "#4e33c0",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Cereal",
    id: 10,
    color: "#d8c909",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Vegemite",
    id: 11,
    color: "#000000",
    attributes: [],
    units: 0,
    price: 1,
  },
  {
    name: "Instant Coffee",
    id: 12,
    color: "#442b00",
    attributes: [],
    units: 0,
    price: 1,
  },
]

export function readPredictions(res, width, height) {
  const [boxes, scores, classes, valid_detections] = res;
  const boxes_data = boxes.arraySync()[0];
  const scores_data = scores.dataSync();
  const classes_data = classes.dataSync();
  const valid_detections_data = valid_detections.dataSync()[0];

  let predictions = Array.from(Array(valid_detections_data).keys()).map(index => {
    let [x, y, x2, y2] = boxes_data[index];
    x *= width;
    x2 *= width;
    y *= height;
    y2 *= height;

    const w = x2 - x;
    const h = y2 - y;
    return {
      x,
      y,
      w,
      h,
      confidence: scores_data[index],
      name: classes_data[index]
    }
  })

  tf.dispose(res);

  return predictions;
}

export function drawPredictions(c, predictions) {
  var ctx = c.getContext("2d");
  const font = "24px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.clearRect(0, 0, 1920, 1080);

  predictions.forEach((prediction) => {
    const { id, x, y, w, h, name, confidence } = prediction;

    const label = names[name].name;
    const label_colour = names[name].color;
    const score = confidence.toFixed(2);
    const label_text = `#${id} ${label} : ${score}`

    if (score > 0.50) {
      ctx.strokeStyle = label_colour;
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = label_colour;
      const textWidth = ctx.measureText(label_text).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

      ctx.fillStyle = "#000000";
      ctx.fillText(label_text, x, y);
    }
  })
}