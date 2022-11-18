import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function BtnCopiarWebP(props) {
  const { runFeather } = useFeather()

  const html = props.html
  const onClick = props.onClick

  const [icon, setIcon] = useState('copy')
  const [text, setText] = useState('Copiar para o WebP')

  function handleCopy() {
    setIcon('check')
    setText('Copiado!')
    runFeather()

    setTimeout(() => {
      setIcon('copy')
      setText('Copiar para o WebP')
    }, 2500)
  }

  return (
    <CopyToClipboard text={html} onCopy={handleCopy}>
      <button className="btn btn--one btn--copiar" onClick={onClick}>
        <div className="btn__icon">
          <i data-feather={icon}></i>
        </div>
        {text}
      </button>
    </CopyToClipboard>
  )
}

