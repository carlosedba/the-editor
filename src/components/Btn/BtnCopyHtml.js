import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function BtnCopyHtml(props) {
  const { runFeather } = useFeather()

  const html = props.html
  const onClick = props.onClick

  const [icon, setIcon] = useState('copy')
  const [text, setText] = useState('Copy HTML')

  function handleCopy() {
    setIcon('check')
    setText('Copied!')
    runFeather()

    setTimeout(() => {
      setIcon('copy')
      setText('Copy HTML')
    }, 2500)
  }

  return (
    <CopyToClipboard text={html} onCopy={handleCopy}>
      <button className="btn btn--one" onClick={onClick}>
        <div className="btn__icon">
          <i data-feather={icon}></i>
        </div>
        {text}
      </button>
    </CopyToClipboard>
  )
}

