import * as types from '@/actionTypes'

export function addPageProperty(name, value) { 
  return {
    type: types.ADD_PAGE_PROPERTY,
    name: name,
    value: value,
  }
}

export function updatePageProperty(name, value) {
  return {
    type: types.UPDATE_PAGE_PROPERTY,
    name: name,
    value: value,
  }
}

export function deletePageProperty(name) { 
  return {
    type: types.DELETE_PAGE_PROPERTY,
    name: name,
  }
}

