import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let id = null
  let props = null
  let newState = null

  switch (action.type) {
    case types.ADD_BLOCK_CACHE_ENTRY:
      id = action.id
      props = action.props

      return {
        ...state,
        [id]: props
      }

    case types.UPDATE_BLOCK_CACHE_ENTRY:
      id = action.id
      props = action.props

      return {
        ...state,
        [id]: props
      }

    case types.DELETE_BLOCK_CACHE_ENTRY:
      id = action.id
      newState = { ...state }

      delete newState[id]
      
      return newState

    default:
      return state
  }
}

