import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
  const [blocks, setBlocks] = useState([])
  const [index, setIndex] = useState({})

  const blockTree = useSelector(state => state.BlockTree)
  const blockCache = useSelector(state => state.BlockCache)
  const blockContent = useSelector(state => state.BlockContent)

  const [{ item, itemType, didDrop }, drop] = useDrop(
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
        const Component = contentBlocks[itemType]
        const id = nanoid()

        const lastIndex = blockTree.length - 1
        const projectedIndex = lastIndex + 1
        const order = projectedIndex + 1

        addBlock({
          id: id,
          type: itemType,
          Component: Component
        })

        addBlockCacheEntry(id, [projectedIndex])
      }
    }), []
  )

  function updateBlock(index, props) {
    setBlocks((blocks) => {
      return blocks.map((block, i) => {
        if (i !== index) return block
  
        return {
          ...block,
          ...props
        }
      })
    })
  }

  function handleContentBlockMoveUp(index) {
    setBlocks((blocks) => BlockUtil.moveUp(blocks, index))
  }

  function handleContentBlockMoveDown(index) {
    setBlocks((blocks) => BlockUtil.moveDown(blocks, index))
  }

  function handleContentBlockChange(index, blockContent) {
    updateBlock(index, { content: blockContent })
  }

  function handleContentBlockDelete(index) {
    deleteBlock(index)
  }

  function renderBlocks() {
    return blockTree.map((block, i) => {
      const { Component } = block

      return (
        <Component
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
    <div className="editor-content" ref={drop}>
      {renderBlocks()}
    </div>
  )
}

