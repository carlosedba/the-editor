import { combineReducers } from 'redux'

import BlockCache from './BlockCache'
import BlockTree from './BlockTree'
import LoadedTree from './LoadedTree'
import Modal from './Modal'

const reducer = combineReducers({
  BlockCache,
  BlockTree,
  LoadedTree,
  Modal,
})

export default reducer

 