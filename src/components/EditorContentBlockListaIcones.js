import React, { useState, useEffect, useRef } from 'react'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES } from '@/dndTypes'

export default function EditorContentBlockListaIcones(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES

  const [value, setValue] = useState('')
  const [items, setItems] = useState([
    { icon: '', text: '' }
  ])

  const fileInputs = useRef([])

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

  function handleItemIconChange(event, index) {
    const input = fileInputs.current[index]
    const files = input.files
    const file = files[0]

    const reader = new FileReader()
    
    reader.onload = (event) => {
      let icon = event.target.result

      setItems((items) => {
        return items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              icon: icon
            }
          } 
          
          return item       
        })
      })
    }

    reader.readAsDataURL(file)
  }

  function renderItems() {
    return items.map((item, i) => {
      return (
        <div className="editor-content-block-lista-icones-item" key={i}>
          <div className="editor-content-block-lista-icones-item__icon">
            <input className="editor-content-block-lista-icones-item__icon-input" type="file" accept="image/svg+xml" onChange={(event) => handleItemIconChange(event, i)} ref={(el) => fileInputs.current[i] = el}/>
            <div className="editor-content-block-lista-icones-item__icon-preview">
              <img src={item.icon}/>
            </div>
          </div>
          <input className="editor-content-block-lista-icones-item__text-input" placeholder="Texto..." type="text" value={item.text} onChange={(event) => handleItemTextChange(event, i)}/>
        </div>
      )
    })
  }

  return (
    <div className="editor-content-block editor-content-block-lista-icones" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <button className="editor-content-block-lista-icones_add" onClick={handleAddItemClick}>
        <i data-feather="plus"></i>
        Adicionar item
      </button>

      {renderItems()}

      <EditorContentBlockTooltip id={DND_TYPE} place="right"/>
    </div>
  )
}

