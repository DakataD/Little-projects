import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomPropertys.js"
  
  const roberElem = document.querySelector("[data-rober]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0016
  const ROBER_FRAME_COUNT = 2
  const FRAME_TIME = 200
  
  let isJumping
  let roberFrame
  let currentFrameTime
  let yVelocity
  export function setupRober() {
    isJumping = false
    roberFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(roberElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateRober(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getRoberRect() {
    return roberElem.getBoundingClientRect()
  }
  
  export function setRoberLose() {
    roberElem.src = "imgs/lose.png"
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      roberElem.src = `imgs/stay.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      roberFrame = (roberFrame + 1) % ROBER_FRAME_COUNT
      roberElem.src = `imgs/run${roberFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(roberElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(roberElem, "--bottom") <= 0) {
      setCustomProperty(roberElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }