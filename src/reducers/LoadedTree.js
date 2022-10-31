import * as types from '@/actionTypes'

const INITIAL_STATE = null

export default function(state = INITIAL_STATE, action) {
  let content = null

  switch (action.type) {
    case types.LOAD:
      content = action.content

      return content

    default:
      return state
  }
}

