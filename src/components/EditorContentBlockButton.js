import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'
import EditorContentBlockTooltipInput from '@/components/EditorContentBlockTooltipInput'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_BUTTON } from '@/dndTypes'

export default function EditorContentBlockButton(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_BUTTON

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState({
    name: '', url: ''
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (blockTree[id]) {
      let content = blockTree[id]['content']
      setContent(content)
    } else {
      dispatch(addBlock(id, {
        type: DND_TYPE,
        parentId: parentId,
        content: content
      }))
    }
  }, [])

  function handleNameChange(event) {
    const target = event.currentTarget

    let value = target.value

    setContent((content) => {
      let newContent = {
        ...content,
        name: value
      }

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  function handleUrlChange(value) {
    setContent((content) => {
      let newContent = {
        ...content,
        url: value
      }

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  return (
    <div className="editor-content-block editor-content-block-button" data-tooltip-id={DND_TYPE}>
      <div className="editor-content-block-button__btn">
        <input placeholder="Botão" value={content.name} onChange={handleNameChange}/>
      </div>
      
      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        place="right"
      >
        <EditorContentBlockTooltipInput initialValue={content.url} label="URL" onChange={handleUrlChange}/>
      </EditorContentBlockTooltip>
    </div>
  )
}

