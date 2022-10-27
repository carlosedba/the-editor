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
  DND_EDITOR_SIDEBAR_BLOCK_SECAO,
  DND_EDITOR_SIDEBAR_BLOCK_TITULO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS
} from '@/dndTypes'

export default function EditorContentBlockSecao(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_SECAO

  const id = props.id
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)
  const blockCache = useSelector(state => state.BlockCache)

  const [blocks, setBlocks] = useState([])

  const dispatch = useDispatch()
  
  const [collectedProps, drop] = useDrop(
    () => ({
      accept: [
        DND_EDITOR_SIDEBAR_BLOCK_TITULO,
        DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
        DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
        DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
        DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
        DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
        DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS,
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

  function _addBlock(type) {
    const Component = contentBlocks[type]
    const id = nanoid()

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
    <div className="editor-content-block editor-content-block-secao" ref={drop}>
      <header className="editor-content-block-header">
        <i data-feather="align-justify"></i>
        Seção
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

