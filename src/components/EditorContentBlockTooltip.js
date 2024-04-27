import React, { useState, useEffect } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'
import { func } from 'prop-types'

export default function EditorContentBlockTooltip(props) {
  useFeather()

  const id = props.id
  const place = props.place || 'bottom'
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  function handleDelete(event) {
    if (onDelete) onDelete()
  }
  
  function handleMoveUp(event) {
    if (onMoveUp) onMoveUp()
  }

  function handleMoveDown(event) {
    if (onMoveDown) onMoveDown()
  }

  function onAfterShow() {
    window.feather.replace()
  }

  return (
    <ReactTooltip 
      id={id}
      delayShow={160}
      delayUpdate={500}
      delayHide={500}
      place={place}
      effect="float"
      type="light"
      padding="0"
      border="1px solid #000"
      opacity="1"
      clickable={true}
      afterShow={onAfterShow}
      style={{ backgroundColor: '#fff', zIndex: 1000 }}
      className="editor-content-block-tooltip"
    >
      <header className="editor-content-block-tooltip__header">
        <button className="editor-content-block-tooltip__action" onClick={handleDelete}>
          <i data-feather="x"></i>
        </button>
        <button className="editor-content-block-tooltip__action" onClick={handleMoveUp}>
          <i data-feather="chevron-up"></i>
        </button>
        <button className="editor-content-block-tooltip__action" onClick={handleMoveDown}>
          <i data-feather="chevron-down"></i>
        </button>
      </header>
      <div className="editor-content-block-tooltip__content">
        {props.children}
      </div>
    </ReactTooltip>
  )
}

