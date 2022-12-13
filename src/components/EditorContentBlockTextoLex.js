import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {$getRoot, $getSelection} from 'lexical'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_TEXTO_LEX } from '@/dndTypes'

export default function EditorContentBlockTextoLex(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_TEXTO_LEX

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState('')

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

  function handleChange(event) {
    const target = event.currentTarget

    let value = target.value

    setContent(value)

    dispatch(updateBlock(id, {
      content: value
    }))
  }

  function onError(err) {
    console.error(err)
  }

  function onChange(editorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot()
      const selection = $getSelection()

      console.log(root, selection)
    })
  }

  const initialConfig = {
    namespace: DND_TYPE, 
    onError: onError,
  }

  return (
    <div className="editor-content-block editor-content-block-texto" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Texto...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  )
}
