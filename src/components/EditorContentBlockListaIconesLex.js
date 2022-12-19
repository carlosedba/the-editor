import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { $getRoot, $getSelection } from 'lexical'
import { nanoid } from 'nanoid'
import { saveAs } from 'file-saver'
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu
} from 'react-contexify'

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
import SideToolbarPlugin from '@/plugins/SideToolbarPlugin'
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

import { DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES_LEX } from '@/dndTypes'

function Placeholder() {
  return <div className="editor-placeholder">Seu texto...</div>
}

export default function EditorContentBlockListaIconesLex(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES_LEX

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState([
    { icon: '', editorState: null, html: '' }
  ])

  const [menuId, setMenuId] = useState(nanoid())

  const dispatch = useDispatch()

  const fileInputs = useRef([])

  const { show } = useContextMenu({
    id: menuId
  })

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

  function handleAddItemClick(event) {
    setContent((content) => {
      let newContent = [
        ...content,
        { icon: '', editorState: null, html: '' }
      ]

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  function handleItemLexicalChange(editorState, editor, index) {  
    editor.update(() => {      
      const root = $getRoot()
      const selection = $getSelection()
      const json = JSON.stringify(editorState)
      const html = $generateHtmlFromNodes(editor, null)

      setContent((content) => {
        let newContent = content.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              editorState: json,
              html: html,
            }
          }
          
          return item       
        })

        dispatch(updateBlock(id, {
          content: newContent
        }))

        return newContent
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

        dispatch(updateBlock(id, {
          content: newContent
        }))

        return newContent
      })
    }

    reader.readAsBinaryString(file)
  }

  function handleBaixarSvg({ event, props }) {
    let icon = props.icon

    let blob = new Blob([icon], {
      type: 'image/svg+xml',
    })

    saveAs(blob, 'icone.svg')
  }

  function renderItems() {
    return content.map((item, i) => {
      return (
        <div className="editor-content-block-lista-icones-lex-item" key={id}>
          <div className="editor-content-block-lista-icones-lex-item__icon" onContextMenu={(event) => show({ event: event, props: item })}>
            <input className="editor-content-block-lista-icones-lex-item__icon-input" type="file" accept="image/svg+xml" onChange={(event) => handleItemIconChange(event, i)} ref={(el) => fileInputs.current[i] = el}/>
            <div className="editor-content-block-lista-icones-item-lex__icon-preview" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
          </div>
          <LexicalComposer initialConfig={editorConfig}>
            <div className="lexical">
              <SideToolbarPlugin />
              <RichTextPlugin
                contentEditable={<ContentEditable className="lexical-editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <AutoFocusPlugin />
              <LinkPlugin />
              <AutoLinkPlugin />
              <OnChangePlugin onChange={(editorState, editor) => handleItemLexicalChange(editorState, editor, i)} />
            </div>
          </LexicalComposer>
        </div>
      )
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
    <div className="editor-content-block editor-content-block-lista-icones-lex" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <button className="editor-content-block-lista-icones-lex_add" onClick={handleAddItemClick}>
        <i data-feather="plus"></i>
        Adicionar item
      </button>

      {renderItems()}

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        place="right"
      />

      <Menu id={menuId}>
        <Item onClick={handleBaixarSvg}>Baixar SVG</Item>
      </Menu>
    </div>
  )
}
