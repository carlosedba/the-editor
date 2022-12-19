import Log from '@/utils/Log'
import React, { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'

export default function EditorSidebarBlock(props) {
  const type = props.type
  const Icon = props.icon || 'box'
  const name = props.name

  const [dragProps, drag] = useDrag(() => ({
    type: type,

    collect(monitor) {
      return {
        canDrag: monitor.canDrag(),
        isDragging: monitor.isDragging(),
        getItemType: monitor.getItemType(),
        getItem: monitor.getItem(),
        getDropResult: monitor.getDropResult(),
        didDrop: monitor.didDrop(),
      }
    }
  }))

  return (
    <div className="editor-sidebar-block" ref={drag}>
      <div className="editor-sidebar-block__icon">
        {(typeof Icon === 'function') ? (<Icon/>) : (<i data-feather={Icon}></i>)}
      </div>
      {name}
    </div>
  )
}

