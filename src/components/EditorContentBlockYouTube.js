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

import { DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE } from '@/dndTypes'

export default function EditorContentBlockYouTube(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState({
    url: '', videoId: ''
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

  function handleUrlChange(event) {
    const target = event.currentTarget

    let value = target.value

    // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    let youtubeRegex = /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i
    let videoId = value.match(youtubeRegex)[8] || ''

    setContent((content) => {
      let newContent = {
        ...content,
        url: value,
        videoId: videoId,
      }

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  return (
    <div className="editor-content-block editor-content-block-youtube" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <div className="editor-content-block-youtube__header">
        <div className="editor-content-block-youtube__icon">
          <i data-feather="youtube"></i>
        </div>
        <h1 className="editor-content-block-youtube__name">Vídeo do YouTube</h1>
      </div>
      <div className="editor-content-block-youtube__input">
        <label>URL do vídeo</label>
        <input placeholder="" value={content.url} onChange={handleUrlChange}/>
      </div>
      
      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      >
      </EditorContentBlockTooltip>
    </div>
  )
}

