import React, { useState, useEffect } from 'react'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_TITULO } from '@/dndTypes'

export default function EditorContentBlockTitulo(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_TITULO

  const [value, setValue] = useState('')

  function handleChange(event) {
    const target = event.currentTarget
    setValue(target.value)
  }

  return (
    <div className="editor-content-block editor-content-block-titulo" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <input placeholder="Título" value={value} onChange={handleChange}/>

      <EditorContentBlockTooltip id={DND_TYPE}/>
    </div>
  )
}

