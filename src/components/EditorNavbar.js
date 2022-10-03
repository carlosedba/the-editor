import React, { useState, useEffect } from 'react'

import LogoFaculdades from '@/assets/svg/logo_faculdades.svg'

import useFeather from '@/hooks/useFeather'

export default function EditorNavbar(props) {
  useFeather()

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
            <i data-feather="copy"></i>
          </div>
          Copiar código
        </button>
      </div>
    </nav>
  )
}

