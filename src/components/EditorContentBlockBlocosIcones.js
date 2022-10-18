import React, { useState, useEffect, useRef } from 'react'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES } from '@/dndTypes'

export default function EditorContentBlockBlocosIcones(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES

  const initialContent = props.initialContent || [
    { icon: '', text: '' }
  ]
  const onChange = props.onChange
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown
  
  const [content, setContent] = useState(initialContent)

  const fileInputs = useRef([])

  function handleAddItemClick(event) {
    setContent((content) => {
      let newContent = [
        ...content,
        { icon: '', text: '' }
      ]

      if (onChange) onChange(newContent)

      return newContent
    })
  }

  function handleItemTextChange(event, index) {
    const target = event.currentTarget
        
    setContent((content) => {
      let newContent = content.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            text: target.value
          }
        } 
        
        return item       
      })

      if (onChange) onChange(newContent)

      return newContent
    })
  }

  function handleItemIconChange(event, index) {
    const input = fileInputs.current[index]
    const files = input.files
    const file = files[0]

    const reader = new FileReader()
    
    reader.onload = (event) => {
      let icon = event.target.result

      setContent((content) => {
        let newContent = content.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              icon: icon
            }
          } 
          
          return item       
        })

        if (onChange) onChange(newContent)
        
        return newContent
      })
    }

    reader.readAsDataURL(file)
  }

  function renderItems() {
    return content.map((item, i) => {
      return (
        <div className="editor-content-block-blocos-icones-item" key={i}>
          <div className="editor-content-block-blocos-icones-item__icon">
            <input className="editor-content-block-blocos-icones-item__icon-input" type="file" accept="image/svg+xml" onChange={(event) => handleItemIconChange(event, i)} ref={(el) => fileInputs.current[i] = el}/>
            <div className="editor-content-block-blocos-icones-item__icon-preview">
              <img src={item.icon}/>
            </div>
          </div>
          <textarea className="editor-content-block-blocos-icones-item__text-input" placeholder="Texto..." type="text" value={item.text} onChange={(event) => handleItemTextChange(event, i)}/>
        </div>
      )
    })
  }

  return (
    <div className="editor-content-block editor-content-block-blocos-icones" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <button className="editor-content-block-blocos-icones_add" onClick={handleAddItemClick}>
        <i data-feather="plus"></i>
        Adicionar item
      </button>

      {renderItems()}

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        place="left"
      />
    </div>
  )
}

