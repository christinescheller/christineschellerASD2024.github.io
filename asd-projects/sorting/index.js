/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

async function bubbleSort(array){
    //Outer Loop runs through the array multiple times
    for(let i = 0; i < array.length - 1; i++){
        //Inner loop compares elements from right to left
        for(let j = array.length - 1; j > i; j--){
            //if the current element is smaller than the one before it
            if(array[j].value < array[j - 1].value){                
                swap(array, j, j - 1);//swap the two elements
                updateCounter(bubbleCounter);//update the move counter on screen
                await sleep(); // Pause to show the animation
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    // Base case: if there are 0 or 1 elements, stop
    if(right - left < 0){
        return;
    }

    var index = await partition(array, left, right); // Partition the array and get the split index
     // If left side has more than one element, sort it
    if(left < index - 1){
        await quickSort(array, left, index - 1);
    }
    // If right side has more than one element, sort it
    if (right > index){
        await quickSort(array, index, right);
    }

}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    let pivot = array[Math.floor((right + left) / 2)].value; // Choose the pivot as the middle value of the current section
    while(left < right){ // Continue until the left and right pointers meet
        // Move left pointer right until a value >= pivot is found
        while(array[left].value < pivot){
            left++;
        }
        // Move right pointer left until a value <= pivot is found
        while(array[right].value > pivot){
            right--;
        }
        // If pointers have not crossed, swap the values
        if(left < right){
            swap(array, left, right);  // Swap elements at left and right positions
            updateCounter(quickCounter);  // Update the move counter
            await sleep(); // Pause to show the animation
        }
    }
    return left + 1; // Return the index where the array is split
}




// TODO 1: Implement swap
function swap(array, i, j){
    var temp = array[i]; // Store one value temporarily
    array[i] = array[j]; // Move value at j into position i
    array[j] = temp; // Move stored value into position j
    // or [array[i], array[j]] = [array[j], array[i]];
    drawSwap(array, i, j); // Visually animate the swap on screen
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}