import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

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
  
  const [{ item, itemType, didDrop }, drop] = useDrop(
    () => ({
      accept: [
        DND_EDITOR_SIDEBAR_BLOCK_TITULO
      ],

      collect(monitor) {
        return {
          item: monitor.getItem(),
          itemType: monitor.getItemType(),
          didDrop: monitor.didDrop(),
        }
      }
    }), []
  )

  useEffect(() => {
    if (didDrop && itemType) {
      Log.dev(itemType)
    }
  }, [didDrop])

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
    </div>
  )
}

