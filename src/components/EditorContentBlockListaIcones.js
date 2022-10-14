import React, { useState, useEffect } from 'react'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockListaIcones(props) {
  useFeather()

  const [value, setValue] = useState('')
  const [items, setItems] = useState([
    { icon: '', text: '' }
  ])

  function handleChange(event) {
    const target = event.currentTarget
    setValue(target.value)
  }

  function handleAddItemClick(event) {
    setItems((items) => ([
      ...items,
      { icon: '', text: '' }
    ]))
  }

  function handleItemTextChange(event, index) {
    const target = event.currentTarget
        
    setItems((items) => {
      return items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            text: target.value
          }
        } 
        
        return item       
      })
    })
  }

  function renderItems() {
    return items.map((item, i) => {
      return (
        <div className="editor-content-block-lista-icones-item">
          <div className="editor-content-block-lista-icones-item__icon">
            <input className="editor-content-block-lista-icones-item__icon-input" type="file" accept="image/svg+xml"/>
            <div className="editor-content-block-lista-icones-item__icon-preview" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
          </div>
          <input className="editor-content-block-lista-icones-item__text-input" placeholder="Texto..." type="text" value={item.text} onChange={(event) => handleItemTextChange(event, i)}/>
        </div>
      )
    })
  }

  return (
    <div className="editor-content-block editor-content-block-lista-icones">
      <button className="editor-content-block-lista-icones_add" onClick={handleAddItemClick}>
        <i data-feather="plus"></i>
        Adicionar item
      </button>
      {renderItems()}
    </div>
  )
}

