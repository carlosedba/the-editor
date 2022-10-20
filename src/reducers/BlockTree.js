import * as types from '@/actionTypes'

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  let block = null
  let index = null
  let props = null

  switch (action.type) {
    case types.ADD_BLOCK:
      block = action.block

      return [
        ...state,
        block
      ]

    case types.UPDATE_BLOCK:
      index = action.index
      props = action.props

      return state.map((block, i) => {
        if (i !== index) return block
  
        return {
          ...block,
          ...props
        }
      })

    case types.DELETE_BLOCK:
      index = action.index

      return state.filter((block, i) => i !== index)

    default:
      return state
  }
}

