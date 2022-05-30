import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
`;

export function AboutUs() {
  return <Wrapper><h1>The Project</h1>
    <p>This project aims to automate the checkout system of a grocery store. This is a grocery store that sells a wide range of products. Currently, items move along a conveyor belt, and an employee manually counts and sorts the various kinds of merchandise by hand. The total price is calculated using a fixed unit cost. This project will be automated using deep learning and convolutional network models, trained with annotated datasets, and labelled with bounding boxes. The model will help to detect different items and be able to calculate the quantity of each item. The application will be implemented through a live video feed above the checkout conveyor and a web app at the register. In summary, this application will be extremely useful because it not only reduces the manual work of the staff but also increases the efficiency and accuracy of the checkout process.</p>
    <h1>The Problem</h1>
    <p>The time it takes at a grocery store checkouts can take a while since the employee has to scan each individual item. This can frustrate some customers, especially those with other errands to run afterwards. The employees at the checkouts can also make many errors when scanning items which can cause some confusion over the total price the customer needs to pay and can also add to a customer’s frustration.</p>
    <p>This application will be useful as it reduces manual labour, and staff can be better utilised for other tasks. Additionally, employees are known to make errors when counting. The new system will be more accurate to help reduce the number of errors and ensure the business receives the correct payment as well as improve customer satisfaction.</p>
    <h1>This Application</h1>
    <p>Within the grocery store, a live video camera will be placed above each of the conveyor belts which will be connected to the web app that will be open on each of the registers. The different items on the conveyor belt will be detected and added to the list of items to be purchased so that the total price can be calculated, and the employee can charge the customer that amount.</p>
    <h1>Our Data</h1>
    <p>The dataset that was used was one that was created from scratch. This dataset contains 1000 images of a list of everyday items at a grocery store, some containing only a couple of items while others have many items in them. The items that were used were red and green apples, oranges, bananas, instant coffee, cereal, chocolate, potatoes, carrots, beans, vegemite, and canned soft drink. The items were laid out on a black sheet, and videos were taken by panning over the items. A black sheet was used as the background to simulate the black conveyor belt found at every grocery store. To be able to simulate the movement of the conveyor belt, it was decided to take panned videos of the items. From those videos, each item was annotated using CVAT and every 10th frame was taken and used as the images in the dataset.</p>
    <h1>Architecture</h1>
    <p>This application uses the YOLOv5 archirecture. The YOLO architecture works by dividing each image into a grid system, and then each of those grids detects objects within itself. The YOLO architecture has three main parts, the backbone, the neck and the head. The backbone extracts the critical features from each input image. The neck is used to create feature pyramids which helps the model detect the same item even if the scale of the item has been changed. The neck is a key part of the YOLO architecture since feature pyramids help the model perform better on the test data. The final key part is the head which applies the anchor points, bounding boxes and probabilities around each item in an image.</p>
  </Wrapper>;
}
