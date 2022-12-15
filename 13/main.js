#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const puzzle = puzzleStr.split(/\n\n/)

if (PART === 'one') {
    const rightOrder = puzzle.reduce((count, packets, idx) => {
        const [left, right] = packets.split('\n').map(val => JSON.parse(val))
        // return [...count, comparePackets(left, right)]
        return comparePackets(left, right) ? count + (1 + idx) : count
        // }, [])
    }, 0)

    console.log(rightOrder)
}

if (PART === 'two') {
    const TwoDiv = [[2]]
    const SixDiv = [[6]]

    const packetList = puzzle.reduce((flattened, packets, idx) => {
        const [left, right] = packets.split('\n').map(val => JSON.parse(val))
        return [...flattened, left, right]
    }, [TwoDiv, SixDiv])

    const sorted = packetList.sort(sortPackets)
    // console.log(sorted)
    const productDivIndexes = sorted.reduce((prod, curr, idx) => {
        if (curr === TwoDiv || curr === SixDiv) return prod * (idx + 1)
        return prod
    }, 1)
    console.log(productDivIndexes)
}

function comparePackets(left, right) {
    if (Number.isInteger(left) && Number.isInteger(right)) {
        const diff = left - right
        return diff === 0 ? null : diff > 0 ? false : true
    }

    if (Array.isArray(left) && !Array.isArray(right)) {
        return comparePackets(left, [right])
    }

    if (!Array.isArray(left) && Array.isArray(right)) {
        return comparePackets([left], right)
    }

    let isInOrder = null
    for (let i = 0; i < left.length; i++) {
        let l = left[i]
        let r = right[i]

        if (r === undefined) return false

        isInOrder = comparePackets(l, r)
        if (isInOrder !== null) return isInOrder
    }

    // if loop completed and the isInOrder is null either values where equal or no comparable values were present
    // ensure the left was smaller or equal in length to right
    return left.length < right.length ? true : null
}

function sortPackets(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        const diff = a - b
        return diff === 0 ? null : diff
    }

    if (Array.isArray(a) && !Array.isArray(b)) {
        return sortPackets(a, [b])
    }

    if (!Array.isArray(a) && Array.isArray(b)) {
        return sortPackets([a], b)
    }

    for (let i = 0; i < a.length; i++) {
        if (b[i] === undefined) return 1

        const order = sortPackets(a[i], b[i])
        if (order !== null) return order
    }
    return a.length - b.length
}