import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import IcQrCode from '@/assets/svg/ic_qr_code.svg'

import EditorNavbar from '@/components/EditorNavbar'
import EditorSidebar from '@/components/EditorSidebar'
import EditorSidebarGroup from '@/components/EditorSidebarGroup'
import EditorSidebarBlocks from '@/components/EditorSidebarBlocks'
import EditorSidebarBlock from '@/components/EditorSidebarBlock'
import EditorSidebarTextInput from '@/components/EditorSidebarTextInput'
import EditorContent from '@/components/EditorContent'

import Log from '@/utils/Log'

import { VERSION } from '@/globals'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECAO,
  DND_EDITOR_SIDEBAR_BLOCK_TITULO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO_LEX,
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS,
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CAMPUS,
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CIC,
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_SJP,
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_LONDRINA,
  DND_EDITOR_BLOCK_MODAL_INSCRICAO,
} from '@/dndTypes'

export default function Editor(props) {
  const [idModalInscricao, setIdModalInscricao] = useState(nanoid())
  const [contentModalInscricao, setContentModalInscricao] = useState({})

  const page = useSelector((state) => state.Page)

  const dispatch = useDispatch()

  useEffect(() => {
    adicionarModalInscricao()
  }, [])

  useEffect(() => {
    dispatch(updateBlock(idModalInscricao, {
      content: contentModalInscricao
    }))
  }, [contentModalInscricao])

  function adicionarModalInscricao() {
    dispatch(addBlock(idModalInscricao, {
      type: DND_EDITOR_BLOCK_MODAL_INSCRICAO,
      content: {
        tipoCurso: page.tipoCurso,
        nomeCurso: page.nomeCurso,
        linkInscricaoVestibularTradicional: page.linkInscricaoVestibularTradicional,
        linkInscricaoVestibularOnline: page.linkInscricaoVestibularOnline,
        linkInscricaoBolsaEnem: page.linkInscricaoBolsaEnem,
        linkInscricaoPortadorDiploma: page.linkInscricaoPortadorDiploma,
      }
    }))
  }

  function atualizarModalInscricao(name, value) {
    setContentModalInscricao((contentModalInscricao) => ({
      ...contentModalInscricao,
      [name]: value
    }))
  }

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
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TEXTO} icon="edit-2" name="Texto simples"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_TEXTO_LEX} icon="edit-3" name="Texto"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES} icon="list" name="Lista com ícones"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES} icon="square" name="Blocos com ícones"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BOTAO} icon="mouse-pointer" name="Botão"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE} icon="youtube" name="Vídeo do YouTube"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS} icon="box" name="Box Descontos"/>
              </EditorSidebarBlocks>
            </EditorSidebarGroup>
            <EditorSidebarGroup title="QR-CODES E-MEC">
              <EditorSidebarBlocks>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CAMPUS} icon={IcQrCode} name="Campus"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CIC} icon={IcQrCode} name="CIC"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_SJP} icon={IcQrCode} name="SJP"/>
                <EditorSidebarBlock type={DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_LONDRINA} icon={IcQrCode} name="Londrina"/>
              </EditorSidebarBlocks>
            </EditorSidebarGroup>
          </EditorSidebar>
        </div>

        <div className="editor__center">
          <EditorContent/>
        </div>

        <div className="editor__right">
          <EditorSidebar side="right">
            <EditorSidebarGroup title="Geral" type="with-division">
              <EditorSidebarTextInput name="tipoCurso" label="Tipo do Curso" onChange={atualizarModalInscricao}/>
              <EditorSidebarTextInput name="nomeCurso" label="Nome do Curso" onChange={atualizarModalInscricao}/>
            </EditorSidebarGroup>
            <EditorSidebarGroup title="Links de inscrição" type="with-division">
              <EditorSidebarTextInput name="linkInscricaoVestibularTradicional" label="Vestibular Tradicional" onChange={atualizarModalInscricao}/>
              <EditorSidebarTextInput name="linkInscricaoVestibularOnline" label="Vestibular Online" onChange={atualizarModalInscricao}/>
              <EditorSidebarTextInput name="linkInscricaoBolsaEnem" label="Bolsa do ENEM" onChange={atualizarModalInscricao}/>
              <EditorSidebarTextInput name="linkInscricaoTransferencia" label="Transferência" onChange={atualizarModalInscricao}/>
              <EditorSidebarTextInput name="linkInscricaoPortadorDiploma" label="Portador de Diploma" onChange={atualizarModalInscricao}/>
            </EditorSidebarGroup>
          </EditorSidebar>
          </div>
      </div>

      <div className="editor__version">EDITOR - VERSÃO: {VERSION}</div>
    </div>
  )
}

