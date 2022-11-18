import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  addPageProperty,
  updatePageProperty,
} from '@/actions/Page'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function EditorSidebarTextInput(props) {
  useFeather()

  const label = props.label
  const name = props.name
  const onChange = props.onChange

  const page = useSelector((state) => state.Page)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!page[name]) {
      dispatch(addPageProperty(name, ''))
    }
  }, [])

  useEffect(() => {
    if (onChange) {
      let value = page[name]
      onChange(name, value)
    }
  }, [page[name]])

  function handleChange(event) {
    const target = event.currentTarget

    let value = target.value

    dispatch(updatePageProperty(name, value))
  }

  return (
    <div className="editor-sidebar-text-input">
      <label className="editor-sidebar-text-input__label">{label}</label>
      <input className="editor-sidebar-text-input__input" value={page[name] || ''} onChange={handleChange}/>
    </div>
  )
}

