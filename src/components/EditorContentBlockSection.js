import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'

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

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import * as BlockUtil from '@/utils/BlockUtil'

import contentBlocks from '@/contentBlocks'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECTION,
  DND_EDITOR_SIDEBAR_BLOCK_TITLE,
  DND_EDITOR_SIDEBAR_BLOCK_TEXT,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT,
  DND_EDITOR_SIDEBAR_BLOCK_ICON_LIST,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_ICON_LIST,
  DND_EDITOR_SIDEBAR_BLOCK_SQUARE_CARD,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_SQUARE_CARD,
  DND_EDITOR_SIDEBAR_BLOCK_BUTTON,
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE,
} from '@/dndTypes'

export default function EditorContentBlockSection(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_SECTION

  const id = props.id
  const children = props.children
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)
  const blockCache = useSelector(state => state.BlockCache)
  const loadedTree = useSelector(state => state.LoadedTree)

  const [blocks, setBlocks] = useState([])

  const dispatch = useDispatch()
  
  const [collectedProps, drop] = useDrop(
    () => ({
      accept: [
        DND_EDITOR_SIDEBAR_BLOCK_TITLE,
        DND_EDITOR_SIDEBAR_BLOCK_TEXT,
        DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT,
        DND_EDITOR_SIDEBAR_BLOCK_ICON_LIST,
        DND_EDITOR_SIDEBAR_BLOCK_RICH_ICON_LIST,
        DND_EDITOR_SIDEBAR_BLOCK_SQUARE_CARD,
        DND_EDITOR_SIDEBAR_BLOCK_RICH_SQUARE_CARD,
        DND_EDITOR_SIDEBAR_BLOCK_BUTTON,
        DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE,
      ],

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
    if (!blockTree[id]) {
      dispatch(addBlock(id, {
        type: DND_TYPE,
      }))
    }
  }, [])

  useEffect(() => {
    if (children) {
      for (let block of children) {
        _addBlock(block.type, block.id)
      }
    }
  }, [children])

  function _addBlock(type, id) {
    const Component = contentBlocks[type]
    if (!id) id = nanoid()

    setBlocks((blocks) => {
      const lastIndex = blocks.length - 1
      const projectedIndex = lastIndex + 1
      //const order = projectedIndex + 1

      dispatch(addBlockCacheEntry(id, projectedIndex))

      let newArr = [
        ...blocks,
        {
          id: id,
          Component: Component
        }
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

  function handleDelete(event) {
    if (onDelete) onDelete()
  }
  
  function handleMoveUp(event) {
    if (onMoveUp) onMoveUp()
  }

  function handleMoveDown(event) {
    if (onMoveDown) onMoveDown()
  }

  function renderBlocks() {
    let parentId = id

    return blocks.map((block, i) => {
      Log.dev(block.id)
      const { id, Component } = block

      return (
        <Component
          id={id}
          parentId={parentId}
          onDelete={() => handleContentBlockDelete(id)}
          onMoveUp={() => handleContentBlockMoveUp(id)}
          onMoveDown={() => handleContentBlockMoveDown(id)}
          key={id}
        />
      )
    })
  }

  return (
    <div className="editor-content-block editor-content-block-section" ref={drop}>
      <header className="editor-content-block-header">
        <i data-feather="align-justify"></i>
        Section
      </header>

      <div className="editor-content-block-controller">
        <button onClick={handleMoveUp}><i data-feather="chevron-up"></i></button>
        <button onClick={handleMoveDown}><i data-feather="chevron-down"></i></button>
      </div>

      <button className="editor-content-block-remove" onClick={handleDelete}>
        <i data-feather="x"></i>
      </button>

      {renderBlocks()}
    </div>
  )
}

