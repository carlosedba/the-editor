import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function EditorSidebar(props) {
  const side = props.side || 'left'

  return (
    <nav className={classNames('editor-sidebar', `editor-sidebar--${side}`)}>
      {props.children}
    </nav>
  )
}

