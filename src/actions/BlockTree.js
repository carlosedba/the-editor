import * as types from '@/actionTypes'

export function addBlock(block = {}) { 
  return {
    type: types.ADD_BLOCK,
    block: block,
  }
}

export function updateBlock(index, props = {}) {
  return {
    type: types.UPDATE_BLOCK,
    index: index,
    props: props,
  }
}

export function deleteBlock(index) { 
  return {
    type: types.DELETE_BLOCK,
    index: index,
  }
}

