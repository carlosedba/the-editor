import { nanoid } from 'nanoid'

import {
  addBlock,
  updateBlock,
  deleteBlock,
} from '@/actions/BlockTree'

import {
  addBlockCacheEntry,
  updateBlockCacheEntry,
  deleteBlockCacheEntry,
} from '@/actions/BlockCache'

import store from '@/store'

function add(type) {}