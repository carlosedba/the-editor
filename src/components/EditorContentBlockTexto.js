import React, { useState, useEffect } from 'react'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_TEXTO } from '@/dndTypes'

export default function EditorContentBlockTexto(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_TEXTO

  const initialContent = props.initialContent || ''
  const onChange = props.onChange
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const [content, setContent] = useState(initialContent)

  function handleChange(event) {
    const target = event.currentTarget

    let value = target.value

    setContent(value)

    if (onChange) onChange(content)
  }

  return (
    <div className="editor-content-block editor-content-block-texto" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <textarea placeholder="Texto..." value={content} onChange={handleChange}/>

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  )
}

