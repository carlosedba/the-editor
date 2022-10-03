import React, { useRef, useState, useEffect } from 'react'
import * as dayjs from 'dayjs'

import Page from '@/components/Page/Page'
import PageHeader from '@/components/Page/PageHeader'
import PageBody from '@/components/Page/PageBody'
import Editor from '@/components/Editor'

import ModalHelper from '@/helpers/ModalHelper'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

export default function Inicio(props) {
  useFeather()

  useEffect(() => {}, [])

  return (
    <Page>
      <Editor/>
    </Page>
  )
}

