import * as types from '@/actionTypes'

export function load(content) { 
  return {
    type: types.LOAD,
    content: content,
  }
}


