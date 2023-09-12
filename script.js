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
// Function to generate random bars and display them in the container
function generateBars() {
    const barContainer = document.getElementById('barContainer');
    barContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        const height = getRandomNumber(20, 300); // Adjust min and max values to control bar height
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

            await new Promise(resolve => setTimeout(resolve,sortingSpeed)); // Adjust the delay for visualization

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
            await new Promise(resolve => setTimeout(resolve, sortingSpeed)); // Adjust the delay for visualization
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
