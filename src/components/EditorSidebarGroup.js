import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function EditorSidebarGroup(props) {
  const title = props.title || ''

  return (
    <div className="editor-sidebar-group">
      <p className="editor-sidebar-group__title">{title}</p>
      <div className="editor-sidebar-group__content">
        {props.children}
      </div>
    </div>
  )
}

