import State from '../lib/state'

const state = new State({
  datasets: []
})

export default state
export const datasetsCursor = state.cursor(['datasets'])
