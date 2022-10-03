import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'

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

import EditorContentBlockSecao from '@/components/EditorContentBlockSecao'

export default function EditorContent(props) {
  const [{ item, itemType, didDrop }, drop] = useDrop(
    () => ({
      accept: DND_EDITOR_SIDEBAR_BLOCK_SECAO,

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
    <div className="editor-content" ref={drop}>
      <EditorContentBlockSecao/>
      <EditorContentBlockSecao/>
      <EditorContentBlockSecao/>
    </div>
  )
}

