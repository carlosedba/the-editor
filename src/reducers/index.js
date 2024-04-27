import { combineReducers } from 'redux'

import BlockCache from './BlockCache'
import BlockTree from './BlockTree'
import LoadedTree from './LoadedTree'
import Page from './Page'

const reducer = combineReducers({
  BlockCache,
  BlockTree,
  LoadedTree,
  Page,
})

export default reducer

 