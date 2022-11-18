import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let name = null
  let value = null
  let newState = null

  switch (action.type) {
    case types.ADD_PAGE_PROPERTY:
      name = action.name
      value = action.value

      return {
        ...state,
        [name]: value
      }

    case types.UPDATE_PAGE_PROPERTY:
      name = action.name
      value = action.value

      return {
        ...state,
        [name]: value
      }

    case types.DELETE_PAGE_PROPERTY:
      name = action.name
      newState = { ...state }

      delete newState[name]

      return newState

    default:
      return state
  }
}

