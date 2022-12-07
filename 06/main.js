#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

if (PART === 'one') {
    console.log(partOne(puzzleStr))
}

if (PART === 'two') {
    console.log(
        indexToHumanCount([...puzzleStr].findIndex((_, i, arr) => {
            if (i < 13) return false
            return allUniqueValues(arr.slice(i - 13, i + 1))
        }))
    )
}

function partOne(str) {
    for (let i = 3; i < str.length; i++) {
        const lastFour = str.slice(i - 3, i + 1)
        if (allUniqueValues(lastFour)) return i + 1
    }
}

function allUniqueValues(list) {
    const uniques = new Set(list)
    return uniques.size === list.length
}

function indexToHumanCount(n) {
    return n + 1
}