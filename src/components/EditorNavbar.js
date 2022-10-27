import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Handlebars from 'handlebars'

import LogoFaculdades from '@/assets/svg/logo_faculdades.svg'

import useFeather from '@/hooks/useFeather'

export default function EditorNavbar(props) {
  useFeather()

  const blockTree = useSelector(state => state.BlockTree)

  function copiar() {
    console.log(blockTree)
  }

  return (
    <nav className="editor-navbar">
      <div className="editor-navbar__left">
        <div className="editor-navbar__brand">
          <i data-feather="edit"></i>
        </div>
        <div className="editor-navbar__logo">
          <LogoFaculdades/>
        </div>
        <div className="editor-navbar__site">
          <p className="editor-navbar__label">Site</p>
          <p className="editor-navbar__value">Faculdades da Indústria</p>
        </div>
      </div>
      <div className="editor-navbar__right">
        <button className="btn btn--one">
          <div className="btn__icon">
            <i data-feather="upload"></i>
          </div>
          Carregar
        </button>
        <button className="btn btn--one">
          <div className="btn__icon">
            <i data-feather="save"></i>
          </div>
          Salvar
        </button>
        <button className="btn btn--one" onClick={copiar}>
          <div className="btn__icon">
            <i data-feather="copy"></i>
          </div>
          Copiar para o WebP
        </button>
      </div>
    </nav>
  )
}

