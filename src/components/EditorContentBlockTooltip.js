import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockTooltip(props) {
  useFeather()

  const id = props.id
  const place = props.place || 'bottom'

  return (
    <ReactTooltip 
      id={id}
      delayShow={160}
      delayUpdate={500}
      delayHide={500}
      place={place}
      effect="solid"
      type="light"
      padding="0"
      border={true}
      className="editor-content-block-tooltip"
    >
      <header className="editor-content-block-tooltip__header">
        <button className="editor-content-block-tooltip__action">
          <i data-feather="x"></i>
        </button>
        <button className="editor-content-block-tooltip__action">
          <i data-feather="chevron-up"></i>
        </button>
        <button className="editor-content-block-tooltip__action">
          <i data-feather="chevron-down"></i>
        </button>
      </header>
      <div className="editor-content-block-tooltip__content">
        {props.children}
      </div>
    </ReactTooltip>
  )
}

