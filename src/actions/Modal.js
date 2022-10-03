import * as types from '@/actionTypes'

export function addModal(name, props = {}) { 
  return {
    type: types.ADD_MODAL,
    name: name,
    props: props,
  }
}

export function openModal(name, props = {}) {
  return {
    type: types.OPEN_MODAL,
    name: name,
    props: props,
  }
}

export function closeModal(name, props = {}) { 
  return {
    type: types.CLOSE_MODAL,
    name: name,
    props: props,
  }
}

export function updateModal(name, props = {}) { 
  return {
    type: types.UPDATE_MODAL,
    name: name,
    props: props,
  }
}

export function resetModal(name) { 
  return {
    type: types.RESET_MODAL,
    name: name,
  }
}

export function removeModal(name) { 
  return {
    type: types.REMOVE_MODAL,
    name: name,
  }
}

