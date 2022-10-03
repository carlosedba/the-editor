import update from 'immutability-helper'
import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let name, props, error

  switch (action.type) {
    case types.ADD_MODAL:
      name = action.name
      props = action.props

      return update(state, {
        $merge: {
          [name]: {
            isOpen: false,
            ...props
          }
        }
      })

    case types.OPEN_MODAL:
      name = action.name
      props = action.props

      return update(state, {
        $merge: {
          [name]: {
            isOpen: true,
            ...props
          }
        }
      })

  case types.CLOSE_MODAL:
    name = action.name
    props = action.props

    return update(state, {
      $merge: {
        [name]: {
          isOpen: false,
          ...props
        }
      }
    })

  case types.UPDATE_MODAL:
    name = action.name
    props = action.props

    return update(state, {
      $merge: {
        [name]: props
      }
    })

  case types.RESET_MODAL:
    name = action.name

    return update(state, {
      [name]: {
        $set: {
          isOpen: false,
        }
      }
    })

  case types.REMOVE_MODAL:
    name = action.name

    return update(state, { $unset: [name] })

  default:
    return state
  }
}

