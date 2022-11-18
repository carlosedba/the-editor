import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { nanoid } from 'nanoid'

import {
  addBlock,
  updateBlock,
  deleteBlock,
  resetBlockTree
} from '@/actions/BlockTree'

import {
  addBlockCacheEntry,
  updateBlockCacheEntry,
  deleteBlockCacheEntry,
} from '@/actions/BlockCache'

import EditorContentBlockSecao from '@/components/EditorContentBlockSecao'

import Log from '@/utils/Log'

import * as BlockUtil from '@/utils/BlockUtil'

import contentBlocks from '@/contentBlocks'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECAO,
  DND_EDITOR_SIDEBAR_BLOCK_TITULO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS
} from '@/dndTypes'

export default function EditorContent(props) {
  const blockTree = useSelector(state => state.BlockCache)
  const blockCache = useSelector(state => state.BlockCache)
  const loadedTree = useSelector(state => state.LoadedTree)

  const [blocks, setBlocks] = useState([])

  const dispatch = useDispatch()

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: DND_EDITOR_SIDEBAR_BLOCK_SECAO,

      collect(monitor) {
        return {
          item: monitor.getItem(),
          itemType: monitor.getItemType(),
          didDrop: monitor.didDrop(),
        }
      },

      drop(item, monitor) {
        const itemType = monitor.getItemType()
        _addBlock(itemType)
      }
    }), []
  )

  useEffect(() => {
    if (loadedTree) {
      for (let block of loadedTree) {
        if (block.type.includes('DND_EDITOR_SIDEBAR_BLOCK')) {
          _addBlock(block.type, block.id, block.children)
        }
      }
    }
  }, [loadedTree])

  function _addBlock(type, id, children) {
    const Component = contentBlocks[type]
    if (!id) id = nanoid()

    setBlocks((blocks) => {
      const lastIndex = blocks.length - 1
      const projectedIndex = lastIndex + 1
      //const order = projectedIndex + 1

      dispatch(addBlockCacheEntry(id, projectedIndex))

      let obj = {
        id: id,
        Component: Component,
      }

      if (children) {
        obj.children = children
      }

      let newArr = [
        ...blocks,
        obj
      ]

      return newArr
    })
  }

  function _updateBlock(id, props) {
    const index = blockCache[id]

    setBlocks((blocks) => {
      let newArr = [...blocks]

      newArr[index] = [
        ...newArr[index],
        ...props
      ]

      return newArr
    })
  }

  function _moveBlockUp(id) {
    const index = blockCache[id]

    setBlocks((blocks) => {
      let newArr = [...blocks]
      let newIndex = index - 1

      if (newIndex >= 0) {
        let element = blocks[index]
    
        newArr.splice(index, 1);
        newArr.splice(newIndex, 0, element)

        for (let i = 0; i < newArr.length; i++) {
          dispatch(updateBlockCacheEntry(newArr[i]['id'], i))
        }   
    }

      return newArr
    })
  }

  function _moveBlockDown(id) {
    const index = blockCache[id]

    setBlocks((blocks) => {
      let newArr = [...blocks]
      let newIndex = index + 1

      if (newIndex < blocks.length) {
        let element = blocks[index]
    
        newArr.splice(index, 1);
        newArr.splice(newIndex, 0, element)
        
        for (let i = 0; i < newArr.length; i++) {
          dispatch(updateBlockCacheEntry(newArr[i]['id'], i))
        }   
      }

      return newArr
    })
  }

  function _deleteBlock(id) {
    const index = blockCache[id]

    setBlocks((blocks) => {
      let newArr = blocks.filter((block, i) => i !== index)
        
      dispatch(deleteBlockCacheEntry(id))

      for (let i = 0; i < newArr.length; i++) {
        dispatch(updateBlockCacheEntry(newArr[i]['id'], i))
      }   

      dispatch(deleteBlock(id))

      return newArr
    })
  }

  function handleContentBlockMoveUp(id) {
    _moveBlockUp(id)
  }

  function handleContentBlockMoveDown(id) {
    _moveBlockDown(id)
  }

  function handleContentBlockDelete(id) {
    _deleteBlock(id)
  }

  function renderBlocks() {
    return blocks.map((block, i) => {
      const { id, Component, children } = block

      return (
        <Component
          id={id}
          children={children}
          onDelete={() => handleContentBlockDelete(id)}
          onMoveUp={() => handleContentBlockMoveUp(id)}
          onMoveDown={() => handleContentBlockMoveDown(id)}
          key={id}
        />
      )
    })
  }

  return (
    <div className="editor-content" ref={drop}>
      {renderBlocks()}
    </div>
  )
}

