import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'
import EditorContentBlockTooltipInput from '@/components/EditorContentBlockTooltipInput'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_BOTAO } from '@/dndTypes'

export default function EditorContentBlockBotao(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_BOTAO

  const [blockProps, setBlockProps] = useState({
    name: '', url: ''
  })

  function handleNameChange(event) {
    const target = event.currentTarget

    let value = target.value

    setBlockProps((blockProps) => ({
      ...blockProps,
      name: value
    }))
  }

  return (
    <div className="editor-content-block editor-content-block-botao" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <div className="editor-content-block-botao__btn">
        <input placeholder="Botão" value={blockProps.name} onChange={handleNameChange}/>
      </div>
      
      <EditorContentBlockTooltip id={DND_TYPE} place="right">
        <EditorContentBlockTooltipInput label="URL"/>
      </EditorContentBlockTooltip>
    </div>
  )
}

