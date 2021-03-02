/*  partner Jo Anna Mollman
1. Display the towers
    a. Each tower is a flex container, column-reverse
    b. Each disk is a div
2. Provide a way to move the disks between towers
        - getElements
    a. First click pick the source tower
        -event.currentTarget
    b. Second click pick the destination tower and tries to move
    the topmost disk of the source tower to the destination tower
        -event.currentTarget (tower)
        -lastElementChild (disk on top)
        -appendChild to move disk
    c. For the move to be allowed, the top disk on the destination 
    tower must be smaller than the top disk on the source tower
        - if {} else {}
        - alert to "move not allowed"
3. Tell you when the game has been won
    a. Towers Start and Mid are empty
        -childElementCount = 4
        - alert box also reset game */

        let container = document.getElementById("container")
        let towerStart = document.getElementById("towerStart");
        let towerMid = document.getElementById("towerMid");
        let towerEnd = document.getElementById("towerEnd");
        let disk1 = document.getElementById("d1");
        let disk2 = document.getElementById("d2");
        let disk3 = document.getElementById("d3");
        let disk4 = document.getElementById("d4");
        
        // to track player mode
        let currentMode = "pickUp"
        
        towerStart.addEventListener('click', moveDisk);
        towerMid.addEventListener('click', moveDisk);
        towerEnd.addEventListener('click', moveDisk);
        
        // place holder to tell what disk is being moved
        let diskSelected;
        
        // add css to highlight lastElementChild
        /* if tower selected is empty then put disk on it
        change border back to normal
        if the disk is bigger than the one currently on tower then alert and reset
        if disk is smaller than the one currently on tower then add disk*/
        
        function moveDisk(evt) {
            let clickedTower = evt.currentTarget;
        
            if (currentMode === "pickUp") {
                diskSelected = clickedTower.lastElementChild;
                diskSelected.style = "border: 3px solid gold";
                currentMode = "putDown"
            } else if (currentMode === "putDown") {
                if (!clickedTower.lastElementChild) {
                    clickedTower.appendChild(diskSelected);
                    diskSelected.style = "border: 1px solid black";
                    currentMode = "pickUp"
                } else if (diskSelected.dataset.width < clickedTower.lastElementChild.dataset.width) { 
                    clickedTower.appendChild(diskSelected)
                    diskSelected.style = "border: 1px solid black";
                    currentMode = "pickUp"
                } else {
                    alert("No disk may be placed on top of a smaller disk!")
                    diskSelected.style = "border: 1px solid black";
                    currentMode = "pickUp"
                }
            }
        
            if (towerEnd.childElementCount === 4) {
                alert("Winner!!!");
                reset() /* refresh page to play again*/
            }
        }
        
        let reset = function () {
            window.location.reload();
        }
        