import React, { useState, useEffect } from 'react'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockTitulo(props) {
  useFeather()

  return (
    <div className="editor-content-block editor-content-block-titulo" ref={drop}>
      <input/>
    </div>
  )
}

