import React, { useState, useEffect } from 'react'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockTitulo(props) {
  useFeather()

  const [value, setValue] = useState('')

  function handleChange(event) {
    Log.dev(event.currentTarget)
  }

  return (
    <div className="editor-content-block editor-content-block-titulo">
      <input value={value} onChange={handleChange}/>
    </div>
  )
}

