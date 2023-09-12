let arraySize = 50; // Default array size
let sortingSpeed = 50; // Default sorting speed (milliseconds)
// Utility function to generate random numbers between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listener for array size input
const arraySizeInput = document.getElementById('arraySize');
arraySizeInput.addEventListener('input', () => {
    arraySize = parseInt(arraySizeInput.value);
    generateBars();
});
// Event listener for speed input
const speedInput = document.getElementById('speed');
speedInput.addEventListener('input', () => {
    sortingSpeed = 100-parseInt(speedInput.value);
});
// Event listener for the "Generate Bars" button
const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', () => {
    generateBars();
});
// Event listener for the "Bubble Sort" button
const bubbleSortButton = document.getElementById('bubbleSortButton');
bubbleSortButton.addEventListener('click', () => {
    bubbleSort();
});

// Event listener for the "Selection Sort" button
const selectionSortButton = document.getElementById('selectionSortButton');
selectionSortButton.addEventListener('click', () => {
    selectionSort(); 
});

// Event listener for the "Insertion Sort" button
const insertionSortButton = document.getElementById('insertionSortButton');
insertionSortButton.addEventListener('click', () => {
    insertionSort(); 
});
// Event listener for the "Merge Sort" button
const mergeSortButton = document.getElementById('mergeSortButton');
mergeSortButton.addEventListener('click', () => {
    mergeSort();
});
// Function to generate random bars and display them in the container
function generateBars() {
    const barContainer = document.getElementById('barContainer');
    barContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        const height = getRandomNumber(20, 300); // min and max values to control bar height
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = height + 'px';
        barContainer.appendChild(bar);
    }
}
// Bubble sort implementation
async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - 1 - i; j++) {
            const bar1 = bars[j];
            const bar2 = bars[j + 1];
            bar1.style.backgroundColor = 'red';
            bar2.style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve,sortingSpeed)); //Delay for visualization

            const height1 = parseInt(bar1.style.height);
            const height2 = parseInt(bar2.style.height);
            if (height1 > height2) {
                bar1.style.height = height2 + 'px';
                bar2.style.height = height1 + 'px';
            }

            bar1.style.backgroundColor = 'blue';
            bar2.style.backgroundColor = 'blue';
        }
        bars[bars.length - 1 - i].style.backgroundColor = 'green';
    }
}

// Selection sort implementation
async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, sortingSpeed)); //Delay for visualization
            bars[j].style.backgroundColor = 'blue';

            const minHeight = parseInt(bars[minIndex].style.height);
            const currentHeight = parseInt(bars[j].style.height);
            if (currentHeight < minHeight) {
                minIndex = j;
            }
        }

        const tempHeight = bars[i].style.height;
        bars[i].style.height = bars[minIndex].style.height;
        bars[minIndex].style.height = tempHeight;

        bars[i].style.backgroundColor = 'green';
    }
}
// Insertion sort implementation
async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < bars.length; i++) {
        const currentBar = bars[i];
        const currentHeight = parseInt(currentBar.style.height);
        let j = i - 1;

        currentBar.style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay for visualization
        currentBar.style.backgroundColor = 'blue';

        while (j >= 0 && parseInt(bars[j].style.height) > currentHeight) {
            bars[j + 1].style.height = bars[j].style.height;
            j--;

            for (let k = i; k > j + 1; k--) {
                bars[k].style.backgroundColor = 'green';
            }

            await new Promise(resolve => setTimeout(resolve,sortingSpeed)); // Delay for visualization

            for (let k = i; k > j + 1; k--) {
                bars[k].style.backgroundColor = 'blue';
            }
        }

        bars[j + 1].style.height = currentHeight + 'px';

        for (let k = i; k >= 0; k--) {
            bars[k].style.backgroundColor = 'green';
        }

        await new Promise(resolve => setTimeout(resolve, sortingSpeed)); // Delay for visualization

        for (let k = i; k >= 0; k--) {
            bars[k].style.backgroundColor = 'blue';
        }
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}
// Merge Sort implementation
async function mergeSort() {
    const bars = document.querySelectorAll('.bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));

    await mergeSortRecursive(array, 0, array.length - 1);
}

async function mergeSortRecursive(array, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortRecursive(array, left, mid);
        await mergeSortRecursive(array, mid + 1, right);
        await merge(array, left, mid, right);
    }
}

async function merge(array, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (let i = 0; i < n2; i++) {
        rightArray[i] = array[mid + 1 + i];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        array[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;
    }

    // Update the visual representation of bars
    const bars = document.querySelectorAll('.bar');
    for (let i = left; i <= right; i++) {
        bars[i].style.height = array[i] + 'px';
    }

    // Delay for visualization
    await new Promise(resolve => setTimeout(resolve, sortingSpeed));
}

