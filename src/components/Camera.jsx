import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import styled from "styled-components";
import { Tracker } from "node-moving-things-tracker";
// const Tracker = require("node-moving-things-tracker").Tracker;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  /* background-color: rgba(255, 0, 0, 0.1); */
`;

// const StyledCamera = styled.Webcam`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0px;
//   left: 0px;
// `;

const InsideWrapper = styled.div`
  /* width: 100%;
  height: 100%; */
  position: relative;
`;

const OutsideWrapper = styled.div`
  /* width: 256px;
  height: 256px;
  margin: 20px 60px;
  border: 1px solid blue; */
`;

// Tracker.updateTrackedItemsWithNewFrame(detectionScaledOfThisFrame, currentFrame);

// const trackerDataForThisFrame = Tracker.getJSONOfTrackedItems();

// [
//   {
//       "bbox": [
//           487.41811752319336,
//           456.9097566604614,
//           992.1260261535645,
//           616.6176652908325
//       ],
//       "class": "person",
//       "score": 0.9017928838729858
//   }
// ]

// {"x":1799,"y":250,"w":54,"h":33,"confidence":33,"name":"car"}

export function Camera() {
  const [model, setModel] = useState(undefined);
  let frameCount = 0;

  async function loadModel() {
    try {
      console.log("loading model");
      const model2 = await tf.loadGraphModel("/best_web_model/model.json");
      // const model2 = await cocoSsd.load();
      setModel(model2);
      console.log("loaded model");
    } catch (e) {
      console.log("error loading model");
      console.log(e);
    }
    return;
  }

  async function predictionFunction() {
    try {
      const input = await tf.tidy(() => {
        const img = tf.browser.fromPixels(document.getElementById("img"))
          .resizeNearestNeighbor([640, 640])
          .toFloat()
          .expandDims();
        return img;
        // return img.expandDims(0)
      });

      const predictions = await model.executeAsync(input);
      const data = predictions.map((p) => p.arraySync()); // you can also use arraySync or their equivalents async methods
      console.log("Predictions: ", data);
      // console.log(predictions);
      // var cnvs = document.getElementById("canvas");
      // var ctx = cnvs.getContext("2d");
      // ctx.clearRect(0, 0, 1920, 1080);

      // const trackerArgs = [
      //   predictions.map((prediction) => {
      //     return {
      //       x: prediction.bbox[0],
      //       y: prediction.bbox[1],
      //       w: prediction.bbox[2],
      //       h: prediction.bbox[3],
      //       confidence: prediction.score * 100,
      //       name: prediction.class,
      //     };
      //   }),
      //   frameCount++,
      // ];
      // console.log(trackerArgs);
      // Tracker.updateTrackedItemsWithNewFrame(...trackerArgs);
      // const trackerDataForThisFrame = Tracker.getJSONOfTrackedItems();
      // console.log("trackerDataForThisFrame:", trackerDataForThisFrame);

      // predictions.forEach((detection) => {
      //   const prediction = detection.bbox;

      //   ctx.beginPath();
      //   ctx.rect(prediction[0], prediction[1], prediction[2], prediction[3]);
      //   ctx.strokeStyle = "#FF0000";

      //   ctx.lineWidth = 3;
      //   ctx.stroke();
      // });
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => predictionFunction(), 500);
  }

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (!model) {
  //     tf.ready().then(async () => {
  //       await loadModel();
  //     });
  //   } else {
  //     console.log("predictionFunction");
  //     predictionFunction();
  //   }
  // }, [model]);

  return (
    <OutsideWrapper>
      <InsideWrapper>
        <Webcam
          id="img"
          width="100%"
          videoConstraints={{ width: 1920, height: 1080 }}
        />
        <Canvas id="canvas" width="1920" height="1080" />
      </InsideWrapper>
    </OutsideWrapper>
  );
}
