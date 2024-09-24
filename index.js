class SudokuSolver {
    // Function to check if the Sudoku can be solved
    check(rowmap, colmap, boxmap, grid, misses, m, i) {
        if (i === m) {
            return true;
        }
        let row = misses[i][0];
        let col = misses[i][1];

        for (let j = 1; j <= 9; j++) {
            if (rowmap[row][j - 1] === 0 && colmap[col][j - 1] === 0) {
                let flag = false;

                // Determining the box number based on row and col
                let boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

                if (boxmap[boxIndex][j - 1] === 0) {
                    flag = true;
                    boxmap[boxIndex][j - 1] = 1;
                }

                if (flag) {
                    rowmap[row][j - 1] = 1;
                    colmap[col][j - 1] = 1;
                    grid[row][col] = j;

                    if (this.check(rowmap, colmap, boxmap, grid, misses, m, i + 1)) {
                        return true;
                    }

                    rowmap[row][j - 1] = 0;
                    colmap[col][j - 1] = 0;
                    grid[row][col] = 0;
                    boxmap[boxIndex][j - 1] = 0;
                }
            }
        }
        return false;
    }

    solveSudoku(grid) {
        let rowmap = Array.from({ length: 9 }, () => Array(9).fill(0));
        let colmap = Array.from({ length: 9 }, () => Array(9).fill(0));
        let boxmap = Array.from({ length: 9 }, () => Array(9).fill(0));
        let misses = [];
        let m = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] !== 0) {
                    let num = grid[i][j] - 1;

                    if (rowmap[i][num] !== 0 || colmap[j][num] !== 0) {
                        return false;
                    }
                    rowmap[i][num] = 1;
                    colmap[j][num] = 1;

                    let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                    if (boxmap[boxIndex][num] !== 0) {
                        return false;
                    }
                    boxmap[boxIndex][num] = 1;
                } else {
                    misses.push([i, j]);
                    m++;
                }
            }
        }

        return this.check(rowmap, colmap, boxmap, grid, misses, m, 0);
    }
    
    printGrid(grid) {
       
        for (let i = 0; i < 9; i++) {
            console.log(grid[i].join(" "));
        }
    }
}



let i = 0;
function setCellValue() {
    if (i >= 81) return; // Stop when all 81 cells have been filled

    let row = Math.floor(i / 9);
    let col = i % 9;
    let s = `#cell-${i + 1}`; // Select the cell (Assuming IDs are like #cell-1, #cell-2, etc.)
    let value = sodukuboard[row][col]; // Get the value from the provided array

    // Set the value of the selected cell
    document.querySelector(s).value = value;

    i++; // Move to the next cell
    setTimeout(setCellValue, 500); // Set the next value after 500ms delay (adjust delay if needed)
}




const b = document.querySelector('#solve-btn');
b.addEventListener('click',buttonevent);
const sodukuboard = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];
function buttonevent()
{
    
    for(let i = 1; i < 82; i++)
    {
        let row = Math.floor((i-1)/9);
        let col = (i-1)%9;
        let s = '#cell-'
        let n = i.toString();
        s = s.concat(n);
        let cel = document.querySelector(s).value;
        console.log(typeof cel);
        console.log(cel);
        if(cel!='') sodukuboard[row][col] = cel;
        

    }
    let solver = new SudokuSolver();
    if (solver.solveSudoku(sodukuboard)) {
        setCellValue();
        solver.printGrid(sodukuboard);
    } else {
        alert("No solution exists");
    }
    
}
