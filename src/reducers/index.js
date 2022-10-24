import { combineReducers } from 'redux'

import BlockCache from './BlockCache'
import BlockTree from './BlockTree'
import Modal from './Modal'

const reducer = combineReducers({
  BlockCache,
  BlockTree,
  Modal,
})

export default reducer

 