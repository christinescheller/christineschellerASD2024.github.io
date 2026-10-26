// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter(reddify);
  //applyFilterNoBackground(decreaseBlue);
  //applyFilterNoBackground(increaseGreenByBlue);
  applySmudge(smudgeFilter);
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
      for (var j = 0; j < image[i].length; j++) {
          var rgbString = image[i][j];
          var rgbNumbers = rgbStringToArray(rgbString);
          filterFunction(rgbNumbers);
          rgbString = rgbArrayToString(rgbNumbers);
          image[i][j] = rgbString;
      }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = image[0][0];
  for (var i = 0; i < image.length; i++) {
      for (var j = 0; j < image[i].length; j++) {
          var rgbString = image[i][j];
          if (rgbString !== backgroundColor) {
              var rgbNumbers = rgbStringToArray(rgbString);
              filterFunction(rgbNumbers);
              rgbString = rgbArrayToString(rgbNumbers);
              image[i][j] = rgbString;
          }
      }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(value) {
  return Math.max(0, Math.min(255, value));
  //
}

// TODO 3: Create reddify function
function reddify(rgbArray) {
  rgbArray[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbArray) {
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] - 50);
}

function increaseGreenByBlue(rgbArray) {
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + rgbArray[BLUE]);
}

function applySmudge(filterFunction) {
  for (var i = 0; i < image.length - 1; i++) {
      for (var j = 0; j < image[i].length; j++) {
          var rgbStringCurrent = image[i][j];
          var rgbStringNeighbor = image[i + 1][j];
          var rgbNumbersCurrent = rgbStringToArray(rgbStringCurrent);
          var rgbNumbersNeighbor = rgbStringToArray(rgbStringNeighbor);
          filterFunction(rgbNumbersCurrent, rgbNumbersNeighbor);
          image[i][j] = rgbArrayToString(rgbNumbersCurrent);
      }
  }
}

function smudgeFilter(rgbArrayCurrent, rgbArrayNeighbor) {
  for (var i = 0; i < 3; i++) {
      rgbArrayCurrent[i] = keepInBounds((rgbArrayCurrent[i] + rgbArrayNeighbor[i]) / 2);
  }
}