import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function EditorSidebarBlocks(props) {
  return (
    <div className="editor-sidebar-blocks">
      {props.children}
    </div>
  )
}

