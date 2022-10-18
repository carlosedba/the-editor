import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { nanoid } from 'nanoid'

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
        const ContentBlock = contentBlocks[itemType]

        setBlocks((blocks) => ([
          ...blocks,
          { id: nanoid(), order: null, blockType: itemType, Block: ContentBlock, content: null }
        ]))
      }
    }), []
  )

  useEffect(() => {
    if (didDrop) {
    }
  }, [didDrop])

  useEffect(() => {
    Log.dev('EditorContent', blocks)
  }, [blocks])

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

  function deleteBlock(index) {
    setBlocks((blocks) => blocks.filter((block, i) => i !== index))
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
    <div className="editor-content" ref={drop}>
      {renderBlocks()}
    </div>
  )
}

