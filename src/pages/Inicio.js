import React, { useRef, useState, useEffect } from 'react'

import Page from '@/components/Page/Page'
import Editor from '@/components/Editor'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function Inicio(props) {
  useFeather()

  return (
    <Page>
      <Editor/>
    </Page>
  )
}

