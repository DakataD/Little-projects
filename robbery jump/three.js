import { setCustomProperty,incrementCustomProperty,getCustomProperty } from "./updateCustomPropertys.js";

const SPEED = 0.05
const THREE_INTERVAL_MIN = 500
const THREE_INTERVAL_MAX = 2000
const worldElem = document.querySelector('[data-world]');



let nextThreeTime 
export function setupThree() {
nextThreeTime = THREE_INTERVAL_MIN
document.querySelectorAll('[data-three]').forEach(three => {
    three.remove();
})
}

export function updateThree(delta, speedScale) {
    document.querySelectorAll('[data-three]').forEach(three => {
        incrementCustomProperty(three, "--left", delta * speedScale * SPEED * -1)
        
        if(getCustomProperty(three, "--left") <= -100) {
            three.remove()
        }
    })
   

    if(nextThreeTime <= 0) {
        createThree()
        nextThreeTime = randomNumberBetween(THREE_INTERVAL_MIN, THREE_INTERVAL_MAX) / speedScale
    }
    nextThreeTime -= delta
}
export function getThreeRects() {
    return [...document.querySelectorAll("[data-three]")].map(three => {
        return three.getBoundingClientRect()
    })
}

function createThree() {
    const three = document.createElement('img');
    three.dataset.three = true
    three.src = 'imgs/three.png'
    three.classList.add('three');
    setCustomProperty(three, "--left", 100)
    worldElem.append(three)
}

function randomNumberBetween(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min)
}