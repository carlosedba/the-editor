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

  const initialContent = props.initialContent || {
    name: '', url: ''
  }
  const onChange = props.onChange
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const [content, setContent] = useState(initialContent)

  function handleNameChange(event) {
    const target = event.currentTarget

    let value = target.value

    setContent((content) => {
      let newContent = {
        ...content,
        name: value
      }

      if (onChange) onChange(newContent)

      return newContent
    })
  }

  function handleUrlChange(value) {
    setContent((content) => {
      let newContent = {
        ...content,
        url: value
      }

      if (onChange) onChange(newContent)

      return newContent
    })
  }

  return (
    <div className="editor-content-block editor-content-block-botao" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <div className="editor-content-block-botao__btn">
        <input placeholder="Botão" value={content.name} onChange={handleNameChange}/>
      </div>
      
      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        place="right"
      >
        <EditorContentBlockTooltipInput initialValue={content.url} label="URL" onChange={handleUrlChange}/>
      </EditorContentBlockTooltip>
    </div>
  )
}

