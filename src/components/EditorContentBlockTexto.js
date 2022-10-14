import React, { useState, useEffect } from 'react'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockTexto(props) {
  useFeather()

  const [value, setValue] = useState('')

  function handleChange(event) {
    const target = event.currentTarget
    setValue(target.value)
  }

  return (
    <div className="editor-content-block editor-content-block-texto">
      <textarea placeholder="Texto..." value={value} onChange={handleChange}/>
    </div>
  )
}

