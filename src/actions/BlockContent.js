import * as types from '@/actionTypes'

export function addBlockContent(id, props = {}) { 
  return {
    type: types.ADD_BLOCK_CONTENT,
    id: id,
    props: props,
  }
}

export function updateBlockContent(id, props = {}) {
  return {
    type: types.UPDATE_BLOCK_CONTENT,
    id: id,
    props: props,
  }
}

export function deleteBlockContent(id) { 
  return {
    type: types.DELETE_BLOCK_CONTENT,
    id: id,
  }
}

