import * as types from '@/actionTypes'

export function addBlockCacheEntry(id, props = {}) { 
  return {
    type: types.ADD_BLOCK_CACHE_ENTRY,
    id: id,
    props: props,
  }
}

export function updateBlockCacheEntry(id, props = {}) {
  return {
    type: types.UPDATE_BLOCK_CACHE_ENTRY,
    id: id,
    props: props,
  }
}

export function deleteBlockCacheEntry(id) { 
  return {
    type: types.DELETE_BLOCK_CACHE_ENTRY,
    id: id,
  }
}

