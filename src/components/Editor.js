import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorNavbar from '@/components/EditorNavbar'
import EditorSidebar from '@/components/EditorSidebar'
import EditorSidebarGroup from '@/components/EditorSidebarGroup'
import EditorSidebarBlocks from '@/components/EditorSidebarBlocks'
import EditorSidebarBlock from '@/components/EditorSidebarBlock'
import EditorSidebarTextInput from '@/components/EditorSidebarTextInput'
import EditorContent from '@/components/EditorContent'

import Log from '@/utils/Log'

import { VERSION } from '@/constants'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECTION,
  DND_EDITOR_SIDEBAR_BLOCK_TITLE,
  DND_EDITOR_SIDEBAR_BLOCK_TEXT,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT,
  DND_EDITOR_SIDEBAR_BLOCK_ICON_LIST,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_ICON_LIST,
  DND_EDITOR_SIDEBAR_BLOCK_SQUARE_CARD,
  DND_EDITOR_SIDEBAR_BLOCK_RICH_SQUARE_CARD,
  DND_EDITOR_SIDEBAR_BLOCK_BUTTON,
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE,
} from '@/dndTypes'

export default function Editor(props) {
  const page = useSelector((state) => state.Page)

  const dispatch = useDispatch()

  return (
    <div className="editor">
      <header className="editor__header">
        <EditorNavbar/>
      </header>

      <div className="editor__body">
        <div className="editor__left">
          <EditorSidebar side="left">
            <EditorSidebarGroup title="Blocks">
              <EditorSidebarBlocks>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_SECTION} icon="align-justify" name="Section"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TITLE} icon="type" name="Title"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TEXT} icon="edit-2" name="Text"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT} icon="edit-3" name="Rich Text"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_ICON_LIST} icon="list" name="Icon List"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_RICH_ICON_LIST} icon="list" name="Rich Icon List"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_SQUARE_CARD} icon="square" name="Square Cards"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_RICH_SQUARE_CARD} icon="square" name="Rich Square Cards"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BUTTON} icon="mouse-pointer" name="Button"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE} icon="youtube" name="YouTube Video"/>
              </EditorSidebarBlocks>
            </EditorSidebarGroup>
          </EditorSidebar>
        </div>

        <div className="editor__center">
          <EditorContent/>
        </div>

        <div className="editor__right">
          <EditorSidebar side="right">
            <EditorSidebarGroup title="Sidepanel" type="with-division">
              <EditorSidebarTextInput name="loremIpsum" label="Lorem Ipsum Field"/>
              <EditorSidebarTextInput name="sitMet" label="Sit Met Field"/>
            </EditorSidebarGroup>
          </EditorSidebar>
          </div>
      </div>

      <div className="editor__version">THE EDITOR - VERSION: {VERSION}</div>
    </div>
  )
}

