#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const short = puzzleStr.split('\n').map(val => val.split(' '))

const addx = 'addx'
const noop = 'noop'
const validCycles = new Set([20, 60, 100, 140, 180, 220])

let X = 1
let currentCycle = 1
let stepStarted = false
let i = 0
let signalStrength = 0

while (currentCycle <= 220) {
    const [operation, count] = short[i] || []
    if (operation == noop) {
        i += 1
    }
    if (validCycles.has(currentCycle)) {
        signalStrength += (X * currentCycle)
    }
    if (operation == addx && !stepStarted) {
        stepStarted = true
    } else if (operation == addx && stepStarted) {
        stepStarted = false
        X += +count
        i += 1
    }
    currentCycle += 1
}

console.log(signalStrength)