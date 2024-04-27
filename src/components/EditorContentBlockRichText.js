import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { $getRoot, $getSelection } from 'lexical'

import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { TRANSFORMERS } from '@lexical/markdown'
import { $generateHtmlFromNodes } from '@lexical/html'

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import TreeViewPlugin from '@/plugins/TreeViewPlugin'
import ToolbarPlugin from '@/plugins/ToolbarPlugin'
import ListMaxIndentLevelPlugin from '@/plugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from '@/plugins/CodeHighlightPlugin'
import AutoLinkPlugin from '@/plugins/AutoLinkPlugin'
import UpdateBlockPlugin from '@/plugins/UpdateBlockPlugin'

import ExampleTheme from '@/themes/ExampleTheme'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT } from '@/dndTypes'

function Placeholder() {
  return <div className="editor-placeholder">Seu texto...</div>
}

export default function EditorContentBlockRichText(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState({
    editorState: null, html: ''
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

  function handleLexicalChange(editorState, editor) {
    editor.update(() => {
      const root = $getRoot()
      const selection = $getSelection()
      const json = JSON.stringify(editorState)
      const html = $generateHtmlFromNodes(editor, null)

      setContent((content) => {
        let newContent = {
          editorState: json,
          html: html,
        }

        dispatch(updateBlock(id, {
          content: newContent
        }))

        return newContent
      })
    })
  }

  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    
    // Handling of errors during update
    onError(error) {
      throw error
    },
  
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  }

  return (
    <div className="editor-content-block editor-content-block-rich-text" data-tooltip-id={DND_TYPE}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleLexicalChange} />
            <UpdateBlockPlugin id={id} />
          </div>
        </div>
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
