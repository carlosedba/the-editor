import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { registerCodeHighlighting } from "@lexical/code"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export default function UpdateBlockPlugin(props) {
  const id = props.id

  const blockTree = useSelector(state => state.BlockTree)

  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (blockTree[id]) {
      let content = blockTree[id]['content']

      let editorState = content.editorState

      if (editorState) {
        editor.setEditorState(editor.parseEditorState(editorState))
      }
    }
  }, [editor])

  return null
}
