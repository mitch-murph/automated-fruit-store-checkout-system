import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import styled from "styled-components";
import { Tracker } from "node-moving-things-tracker";
import { readPredictions, drawPredictions } from "../util/yolo-predict";
import { useStateMachine } from "little-state-machine";
import { updateItems } from "../state/actions";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`;

const InsideWrapper = styled.div`
  position: relative;
`;

const OutsideWrapper = styled.div`
  /* width: 256px;
  height: 256px;
  margin: 20px 60px;
  border: 1px solid blue; */
`;

var uniqueCount = -1;

export function Camera() {
  const { state, actions } = useStateMachine({ updateItems });
  const [model, setModel] = useState(undefined);
  let frameCount = 0;

  async function loadModel() {
    try {
      console.log("loading model");
      const loadModel = await tf.loadGraphModel(
        "/web_model_yolo_400ep_aug/model.json"
      );
      setModel(loadModel);
      console.log("loaded model");
    } catch (e) {
      console.log("error loading model");
      throw e;
    }
    return;
  }

  async function predictionFunction() {
    try {
      var cnvs = document.getElementById("canvas");

      const input = await tf.tidy(() => {
        const img = tf.browser
          .fromPixels(document.getElementById("img"))
          .resizeNearestNeighbor([640, 640])
          .div(255.0)
          .expandDims();
        return img;
      });

      const tfPredictions = await model.executeAsync(input);
      const predictions = readPredictions(
        tfPredictions,
        cnvs.width,
        cnvs.height
      );

      Tracker.updateTrackedItemsWithNewFrame(predictions, frameCount++);
      const trackerDataForThisFrame = Tracker.getJSONOfTrackedItems();
      const newUniqueItems = detectNewUniqueItem(trackerDataForThisFrame);

      if (newUniqueItems.length) {
        newUniqueItems.forEach((id) => {
          state.items[id].units++;
        });
        console.log(newUniqueItems);
          actions.updateItems(state, state.items)
      }

      drawPredictions(cnvs, trackerDataForThisFrame);
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => predictionFunction(), 500);
  }

  function detectNewUniqueItem(predictions) {
    let newUniqueItems = [];
    let max = -1;
    predictions.forEach((prediction) => {
      if (uniqueCount < prediction.id) {
        console.log(`${prediction.id} is new`);
        newUniqueItems.push(prediction.name);
        max = prediction.id;
      }
    });
    if (uniqueCount < max) {
      uniqueCount = max;
    }

    return newUniqueItems;
  }

  useEffect(() => {
    console.log("useEffect");
    if (!model) {
      tf.ready().then(async () => {
        await loadModel();
      });
    } else {
      console.log("predictionFunction");
      predictionFunction();
    }
  }, [model]);

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
