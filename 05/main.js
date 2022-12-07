#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const [layout, instruction] = puzzleStr.split('\n\n');

const initialStacks = buildInitialStacks(layout.split('\n'))

readSteps(initialStacks, instruction.split('\n'))

console.log(getTopContainers(initialStacks))

function translateStack(layout, index) {
    const stack = []
    for (let i = layout.length - 2; i >= 0; i--) {
        /[A-Z]/.test(layout[i][index]) && stack.push(layout[i][index])
    }
    return stack
}

function buildInitialStacks(layout) {
    const stacks = {}
    const indexesPosition = layout.length - 1
    for (let i = 0; i < layout[indexesPosition].length; i++) {
        if (/\d/.test(layout[indexesPosition][i])) {
            stacks[+layout[indexesPosition][i]] = translateStack(layout, i)
        }
    }
    return stacks
}

function readSteps(stacks, instructions) {
    for (let line of instructions) {
        const [moveCount, start, end] = line.match(/\d+/g)
        evaluateStep(stacks, moveCount, start, end)
    }
}

function evaluateStep(stacks, steps, start, end) {
    for (let i = 0; i < steps; i++) {
        const temp = stacks[start].pop()
        stacks[end].push(temp)
    }
}

// I know maps usually don't have order
function getTopContainers(stacks) {
    let word = ''
    for (let currStack of Object.values(stacks)) {
        word += currStack[currStack.length - 1]
    }
    return word
}