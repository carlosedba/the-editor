import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

export default function EditorSidebarGroup(props) {
  const title = props.title || ''
  const type = props.type

  const [typeClassName, setTypeClassName] = useState('')

  useEffect(() => {
    setTypeClassName(`editor-sidebar-group--${type}`)
  }, [type])

  return (
    <div className={classNames('editor-sidebar-group', {
      [typeClassName]: typeClassName
    })}>
      <header className="editor-sidebar-group__header">
        <p className="editor-sidebar-group__title">{title}</p>
      </header>
      <div className="editor-sidebar-group__content">
        {props.children}
      </div>
    </div>
  )
}

