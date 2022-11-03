import React, { useState, useEffect } from 'react'

import EditorNavbar from '@/components/EditorNavbar'
import EditorSidebar from '@/components/EditorSidebar'
import EditorSidebarGroup from '@/components/EditorSidebarGroup'
import EditorSidebarBlocks from '@/components/EditorSidebarBlocks'
import EditorSidebarBlock from '@/components/EditorSidebarBlock'
import EditorContent from '@/components/EditorContent'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECAO,
  DND_EDITOR_SIDEBAR_BLOCK_TITULO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS,
} from '@/dndTypes'

export default function Editor(props) {
  return (
    <div className="editor">
      <header className="editor__header">
        <EditorNavbar/>
      </header>

      <div className="editor__body">
        <div className="editor__left">
          <EditorSidebar side="left">
            <EditorSidebarGroup title="Blocos">
              <EditorSidebarBlocks>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_SECAO} icon="align-justify" name="Seção"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TITULO} icon="type" name="Título"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TEXTO} icon="edit-3" name="Texto"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES} icon="list" name="Lista com ícones"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES} icon="square" name="Blocos com ícones"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BOTAO} icon="mouse-pointer" name="Botão"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE} icon="youtube" name="Vídeo do YouTube"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER} icon="box" name="Box Conhecer"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS} icon="box" name="Box Descontos"/>
              </EditorSidebarBlocks>
            </EditorSidebarGroup>
          </EditorSidebar>
        </div>

        <div className="editor__center">
          <EditorContent/>
        </div>

        <div className="editor__right">
          <EditorSidebar side="right"></EditorSidebar>
          </div>
      </div>
    </div>
  )
}

