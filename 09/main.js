#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];


// tail moves in response to head
// if different row and distance greater than 1 tail moves diagonally
// head moves to x0 and y-3 and tail is x1 and y0
// you move both towards H
// if Hx and Tx and Hy and Ty different move both Hy and Ty closer
// . .
// . .
// . . 0
// . T
// . . -2
// H .

const puzzle = puzzleStr.split('\n').map(val => val.split(' '))
const visited = new Set()

if (PART === 'one') {
    // positions
    const head = initializeKnot()
    const tail = initializeKnot()
    puzzle.forEach(([move, steps], idx) => {
        for (let i = 0; i < +steps; i++) {
            handleMove(move, head)
            respondToPreviousKnot(head, tail)
            visited.add(`${tail.x}_${tail.y}`)
        }
    })

    console.log(visited.size)
}

if (PART === 'two') {
    const knots = Array(10).fill(1).map((_) => {
        return initializeKnot()
    })
    // moves
    puzzle.forEach(([move, steps]) => {
        for (let i = 0; i < +steps; i++) {
            handleMove(move, knots[0])
            for (let j = 1; j < knots.length; j++) {
                respondToPreviousKnot(knots[j - 1], knots[j])
                visited.add(`${knots[knots.length - 1].x}_${knots[knots.length - 1].y}`)
            }
        }
    })
    console.log(visited.size)
}

function initializeKnot() {
    return {x: 0, y: 0}
}

function handleMove(direction, item1) {
    switch (direction) {
        case 'L':
            moveLeft(item1)
            break;
        case 'R':
            moveRight(item1)
            break;
        case 'U':
            moveUp(item1)
            break;
        case 'D':
            moveDown(item1)
            break;
    }
}

function respondToPreviousKnot(item1, item2) {
    if (!isHeadAndTailTouching(item1, item2)) {
        if (isDiagonal(item1, item2)) {
            moveCloser(item1, item2)
        } else if (item1.x != item2.x) {
            // moved right or left
            item1.x > item2.x ? moveRight(item2) : moveLeft(item2)
        } else {
            // moved up or down
            item1.y > item2.y ? moveUp(item2) : moveDown(item2)
        }
    }
}

function moveLeft(item) {
    item.x -= 1
}

function moveRight(item) {
    item.x += 1
}

function moveUp(item) {
    item.y += 1
}

function moveDown(item) {
    item.y -= 1
}

function isHeadAndTailTouching(item1, item2) {
    return isSameOrOne(item1.x, item2.x) && isSameOrOne(item1.y, item2.y)
}

function isSameOrOne(n1, n2) {
    return n1 === n2 || (n1 === n2 + 1 || n1 === n2 - 1)
}

function isDiagonal(item1, item2) {
    return item1.x !== item2.x && item1.y !== item2.y
}

// only for diagonals
function moveCloser(item1, item2) {
    if (item1.x < item2.x) {
        item2.x -= 1
    } else {
        item2.x += 1
    }

    if (item1.y < item2.y) {
        item2.y -= 1
    } else {
        item2.y += 1
    }
}