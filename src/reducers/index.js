import { combineReducers } from 'redux'

import BlockCache from './BlockCache'
import BlockTree from './BlockTree'
import LoadedTree from './LoadedTree'
import Modal from './Modal'
import Page from './Page'

const reducer = combineReducers({
  BlockCache,
  BlockTree,
  LoadedTree,
  Modal,
  Page,
})

export default reducer

 