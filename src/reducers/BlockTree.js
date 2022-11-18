import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let id = null
  let props = null
  let newState = null

  switch (action.type) {
    case types.ADD_BLOCK:
      id = action.id
      props = action.props

      return {
        ...state,
        [id]: props
      }

    case types.UPDATE_BLOCK:
      id = action.id
      props = action.props

      return {
        ...state,
        [id]: {
          ...state[id],
          ...props
        }
      }

    case types.DELETE_BLOCK:
      id = action.id
      newState = { ...state }

      delete newState[id]

      return newState

    case types.RESET_BLOCK_TREE:
      return INITIAL_STATE

    default:
      return state
  }
}

