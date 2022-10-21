import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
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

import {
  addBlockContent,
  updateBlockContent,
  deleteBlockContent,
} from '@/actions/BlockContent'

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

  const index = props.index
  const onChange = props.onChange
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const [blocks, setBlocks] = useState([])
  
  const [{ item, itemType, didDrop }, drop] = useDrop(
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
        const Component = contentBlocks[itemType]
        const id = nanoid()

        const lastIndex = blockTree.length - 1
        const projectedIndex = lastIndex + 1
        const order = projectedIndex + 1

        setBlocks((blocks) => {
          let newBlocks = [
            ...blocks,
            {
              id: id, 
              Component: Component
            }
          ]

          if (onChange) onChange(newBlocks)

          return newBlocks
        })
      }
    }), []
  )

  useEffect(() => {
    if (didDrop) {
      Log.dev('secao', didDrop, itemType)
    }
  }, [didDrop])

  useEffect(() => {
    Log.dev('EditorContentBlockSecao', blocks)
  }, [blocks])

  function updateBlock(index, props) {
    setBlocks((blocks) => {
      let newBlocks = blocks.map((block, i) => {
        if (i !== index) return block
  
        return {
          ...block,
          ...props
        }
      })

      if (onChange) onChange(newBlocks)

      return newBlocks
    })
  }

  function deleteBlock(index) {
    setBlocks((blocks) => {
      let newBlocks = blocks.filter((block, i) => i !== index)

      if (onChange) onChange(newBlocks)

      return newBlocks
    })
  }

  function handleContentBlockMoveUp(index) {
    setBlocks((blocks) => {
      let newBlocks = BlockUtil.moveUp(blocks, index)
      
      if (onChange) onChange(newBlocks)

      return newBlocks
    })
  }

  function handleContentBlockMoveDown(index) {
    setBlocks((blocks) => {
      let newBlocks = BlockUtil.moveDown(blocks, index)
      
      if (onChange) onChange(newBlocks)

      return newBlocks
    })
  }

  function handleContentBlockChange(index, blockContent) {
    updateBlock(index, { content: blockContent })
  }

  function handleContentBlockDelete(index) {
    deleteBlock(index)
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
    return blocks.map((block, i) => {
      const { Block } = block

      return (
        <Block
          key={block.id}
          initialContent={block.content}
          onChange={(content) => handleContentBlockChange(i, content)}
          onDelete={() => handleContentBlockDelete(i)}
          onMoveUp={() => handleContentBlockMoveUp(i)}
          onMoveDown={() => handleContentBlockMoveDown(i)}
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

