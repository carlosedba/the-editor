import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorContentBlockTooltipInput(props) {
  useFeather()

  const [value, setValue] = useState('')

  const label = props.label
  const onChange = props.onChange

  function handleChange(event) {
    const target = event.currentTarget

    let value = target.value

    setValue(value)

    if (onChange) onChange(value)
  }

  return (
    <div className="editor-content-block-tooltip-input">
      <label className="editor-content-block-tooltip-input__label">{label}</label>
      <input className="editor-content-block-tooltip-input__input" value={value} onChange={handleChange}/>
    </div>
  )
}

