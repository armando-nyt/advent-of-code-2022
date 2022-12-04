#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const puzzle = puzzleStr.split('\n');

const tallies = puzzle.reduce((totals, curr) => {
    if (curr) {
        totals[totals.length - 1] += +curr
    } else {
        totals.push(0)
    }
    return totals
}, [0])

// part one
if (PART === 'one') {
    const mostCals = tallies.reduce((highest, curr) => {
        return curr > highest ? curr : highest
    }, 0)

    console.log(mostCals)
}

// part two
if (PART === 'two') {
    const highestThree = tallies.sort((a, b) => b - a).slice(0, 3)

    const totalThree = highestThree.reduce((tot, curr) => tot + curr)

    console.log(totalThree)
}
