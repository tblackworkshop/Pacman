document.addEventListener('DOMContentLoaded', () => {
    //https://www.youtube.com/watch?v=CeUGlSl2i4Q
    
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 x 28 = 784 squares
    let score = 0
    
    //layout of grid and what is in the squares

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ]


    const squares = []
    //Legend
    //0 - pac-dot
    //1 - wall
    //3 - power-pellet
    //4 - empty

    //draw grid and render it
    function createBoard(){
        for (let i=0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board
            if(layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')
            }
        }
    }
    createBoard()
    
    let pacmanCurrentIndex = 490

    squares[pacmanCurrentIndex].classList.add('pac-man')
    
    //move pac-man

    function movePacman(e) {

        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.key) {
            case 'ArrowLeft':
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
                pacmanCurrentIndex -=1

                //check if pac-man is in the left exit
                if ((pacmanCurrentIndex -1) === 363) {
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    pacmanCurrentIndex = 391
                    squares[364].classList.remove('pac-man')
                }

                break
            case 'ArrowUp':
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair'))
                pacmanCurrentIndex -=width
                break
            case 'ArrowRight':
                if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && 
                !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
                pacmanCurrentIndex +=1

                 //check if pac-man is in the right exit
                 if((pacmanCurrentIndex + 1) === 392) {
                    squares[pacmanCurrentIndex].classList.add('pac-man')
                    pacmanCurrentIndex = 364
                    squares[391].classList.remove('pac-man')
                }
                break
            case 'ArrowDown':
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall') && 
                !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair'))
                pacmanCurrentIndex +=width
                break
            default: console.log('unused key')
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }
    document.addEventListener('keyup', movePacman)
    
    

    
    // let blinkyCurrentIndex = 197
    // squares[blinkyCurrentIndex].classList.add('blinky')
    // //smart move ghost
    
    // function moveBlinky () {
    //     const directions = [-1, +1, +width, -width]
    //     let direction = directions[Math.floor(Math.random() * directions.length)]
    //     let ghostTimerId = NaN

    //     ghostTimerId = setInterval(function() {
    //         if (!squares[blinkyCurrentIndex + direction].classList.contains('wall')) {
    //             squares[blinkyCurrentIndex].classList.remove('blinky')

                
    //             const [blinkyX, blinkyY] = getCoordinates(blinkyCurrentIndex)
    //             const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
    //             const [blinkyNewX, blinkyNewY] = getCoordinates(blinkyCurrentIndex + direction)

    //             //checkif new space closer to pacman

    //             function isXCoordCloser () {
    //                 if ((Math.abs(blinkyNewX - pacmanX)) < (Math.abs(blinkyX -pacmanX))) {
    //                     return true
    //                 } else return false
    //             }

    //             function isYCoordCloser () {
    //                 if ((Math.abs(blinkyNewY - pacmanY)) < (Math.abs(blinkyY -pacmanY))) {
    //                     return true
    //                 } else return false
    //             }

    //             if (isXCoordCloser() || isYCoordCloser()) {
    //                 blinkyCurrentIndex += direction
    //                 squares[blinkyCurrentIndex].classList.add('blinky')
    //             } else {
    //                 squares[blinkyCurrentIndex].classList.add('blinky') 
    //                 direction = directions[Math.floor(Math.random() * directions.length)]
    //             }
                
    //             squares[blinkyCurrentIndex].classList.add('blinky')

    //         } else direction = directions[Math.floor(Math.random() * directions.length)]

    //         //stop game when pacman is eaten
    //         if (squares[blinkyCurrentIndex].classList.contains('pac-man')) clearInterval(ghostTimerId)

    //     }, 300)
    // }

    // moveBlinky()

    
    //what happens when pac-man eats a pac-dot
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')

        }
    }

    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            score += 10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false)
        }

    //get Coordinates of pacman or ghost
    function getCoordinates(index) {
        return [index % width, Math.floor(index / width)]
    }



    // RESEARCH: website describing ghost movement logic
    // http://gameinternals.com/understanding-pac-man-ghost-behavior
    
    //create ghost template

    class Ghost {
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerId = NaN
            this.isScared = false
        }
    }

    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

//draw ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost))

//write the function to move the ghosts

function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
        //if the next square ghost is moving to does not contain a wall and a ghost you can move
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') && 
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
            
            //remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')

            
            const [ghostX, ghostY] = getCoordinates(ghost.currentIndex)
            const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
            const [ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + direction)

            //check if new square is closer to pacman
            function isXCoordCloser () {
                if ((Math.abs(ghostNewX - pacmanX)) < (Math.abs(ghostX -pacmanX))) {
                    return true
                } else return false
            }

            function isYCoordCloser () {
                if ((Math.abs(ghostNewY - pacmanY)) < (Math.abs(ghostY -pacmanY))) {
                    return true
                } else return false
            }

            //if x or y are closer to pacman then move into new square
            if (isXCoordCloser() || isYCoordCloser()) {
                //change the currentIndex to new safe square
                ghost.currentIndex += direction
                //redraw ghost in new safe square
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            } else {
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost')
                direction = directions[Math.floor(Math.random() * directions.length)]
            }

            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

        } else direction = directions[Math.floor(Math.random() * directions.length)]


        // //else find new direction to try and move
        // } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if ghost is currently scared
        if (ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        //if ghost is scared and pacman occupies same space
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
    }, ghost.speed)
}

function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        //stop ghost from moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //stop pacman from moving
        document.removeEventListener('keyup', movePacman)
        //alert delayed by 500ms
        // setTimeout(function(){alert('Game Over!')
        // }, 500)
        scoreDisplay.innerHTML = score + ' GAME OVER'
    }
}

//check for win
function checkForWin() {
    if (score >= 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', movePacman)
        scoreDisplay.innerHTML = score + ' YOU WON!'
    }
}


})