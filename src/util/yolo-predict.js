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

export function predict(res, c) {
  var ctx = c.getContext("2d");
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.clearRect(0, 0, 1920, 1080);


  const [boxes, scores, classes, valid_detections] = res;
  const boxes_data = boxes.dataSync();
  const scores_data = scores.dataSync();
  const classes_data = classes.dataSync();
  const valid_detections_data = valid_detections.dataSync()[0];


  tf.dispose(res)

  var i;
  for (i = 0; i < valid_detections_data; ++i) {
    let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
    x1 *= c.width;
    x2 *= c.width;
    y1 *= c.height;
    y2 *= c.height;
    const width = x2 - x1;
    const height = y2 - y1;
    console.log(classes_data[i])
    const klass = names[classes_data[i]].name;
    const klass_colour = names[classes_data[i]].color;
    const score = scores_data[i].toFixed(2);

    if (score < 0.50){
      continue;
    }

    // Draw the bounding box.
    ctx.strokeStyle = klass_colour;
    ctx.lineWidth = 4;
    ctx.strokeRect(x1, y1, width, height);

    // Draw the label background.
    ctx.fillStyle = klass_colour;
    const textWidth = ctx.measureText(klass + ":" + score).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);

  }
  for (i = 0; i < valid_detections_data; ++i) {
    let [x1, y1, ,] = boxes_data.slice(i * 4, (i + 1) * 4);
    x1 *= c.width;
    y1 *= c.height;
    const klass = names[classes_data[i]].name;
    const score = scores_data[i].toFixed(2);

    if (score < 0.50){
      continue;
    }

    // Draw the text last to ensure it's on top.
    ctx.fillStyle = "#000000";
    ctx.fillText(klass + ":" + score, x1, y1);

  }

}