import {
  addModal,
  openModal,
  closeModal,
  updateModal,
  resetModal,
  removeModal,
} from '@/actions/Modal'

import store from '@/store'

function getModal(name) {
  return get(name)
}
  
function get(name) {
  let state = store.getState()
  let modal = state.Modal[name]

  if (modal) return modal
}

function open(name, props = {}) {
  return store.dispatch(openModal(name, props))
}

function close(name, props = {}) {
  return store.dispatch(closeModal(name, props))
}

function update(name, props = {}) {
  return store.dispatch(updateModal(name, props))
}

function reset(name) {
  return store.dispatch(resetModal(name))
}

function remove(name) {
  return store.dispatch(removeModal(name))
}

export default {
  getModal,
  get,
  open,
  close,
  update,
  reset,
  remove
}