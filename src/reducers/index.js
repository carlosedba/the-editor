import { combineReducers } from 'redux'

import BlockCache from './BlockCache'
import BlockContent from './BlockContent'
import BlockTree from './BlockTree'
import Modal from './Modal'

const reducer = combineReducers({
  BlockCache,
  BlockContent,
  BlockTree,
  Modal,
})

export default reducer

 