import React, { useState, useEffect } from 'react'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER } from '@/dndTypes'

export default function EditorContentBlockBoxConhecer(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER

  return (
    <div className="editor-content-block editor-content-block-placeholder editor-content-block-box-conhecer" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <div className="editor-content-block-placeholder__icon">
        <i data-feather="box"></i>
      </div>
      <h1 className="editor-content-block-placeholder__name">Box Conhecer</h1>

      <EditorContentBlockTooltip id={DND_TYPE}/>
    </div>
  )
}

