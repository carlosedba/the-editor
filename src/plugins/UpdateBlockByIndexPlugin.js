import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { registerCodeHighlighting } from "@lexical/code"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import Log from '@/utils/Log'

export default function UpdateBlockByIndexPlugin(props) {
  const id = props.id
  const index = props.index

  const blockTree = useSelector(state => state.BlockTree)

  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (blockTree[id]) {
      Log.dev(props.id, props.index, blockTree[id]['content'])
      
      let content = blockTree[id]['content'][index]

      if (content) {
        let editorState = content.editorState
  
        if (editorState) {
          editor.setEditorState(editor.parseEditorState(editorState))
        }
      }
    }
  }, [editor])

  return null
}
