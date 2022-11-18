import * as types from '@/actionTypes'

export function addBlock(id, props = {}) { 
  return {
    type: types.ADD_BLOCK,
    id: id,
    props: props,
  }
}

export function updateBlock(id, props = {}) {
  return {
    type: types.UPDATE_BLOCK,
    id: id,
    props: props,
  }
}

export function deleteBlock(id) { 
  return {
    type: types.DELETE_BLOCK,
    id: id,
  }
}

export function resetBlockTree() { 
  return {
    type: types.RESET_BLOCK_TREE,
  }
}

