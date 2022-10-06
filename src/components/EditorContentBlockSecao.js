import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

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

  const [blocks, setBlocks] = useState([])
  
  const [{ item, itemType, didDrop }, drop] = useDrop(
    () => ({
      accept: DND_EDITOR_SIDEBAR_BLOCK_TITULO,

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

        setBlocks([
          ...blocks,
          { order: null, Block: ContentBlock }
        ])
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

  function renderBlocks() {
    return blocks.map((block, i) => {
      const { Block } = block

      return (<Block key={i}/>)
    })
  }

  return (
    <div className="editor-content-block editor-content-block-secao" ref={drop}>
      <header className="editor-content-block__header">
        <i data-feather="align-justify"></i>
        Seção
      </header>

      <div className="editor-content-block__controller">
        <button><i data-feather="chevron-up"></i></button>
        <button><i data-feather="chevron-down"></i></button>
      </div>

      <button className="editor-content-block__remove">
        <i data-feather="x"></i>
      </button>

      {renderBlocks()}
    </div>
  )
}

