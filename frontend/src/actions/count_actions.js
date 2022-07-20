export const INCREMENT_COUNTER = "INCREMENT_COUNTER"
export const DECREMENT_COUNTER = "DECREMENT_COUNTER"
export const RESET_COUNTER = "RESET_COUNTER"


export const incrementCount = count => {
  return {
    type: INCREMENT_COUNTER,
    count
  }
}

export const decrementCount = count => {
  return {
    type: DECREMENT_COUNTER,
    count
  }
}

export const resetCount = () => {
  return {
    type: RESET_COUNTER
  }
}