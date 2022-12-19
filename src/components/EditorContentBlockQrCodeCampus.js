import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import IcQrCode from '@/assets/svg/ic_qr_code.svg'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CAMPUS } from '@/dndTypes'

export default function EditorContentBlockQrCodeCampus(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CAMPUS

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!blockTree[id]) {
      dispatch(addBlock(id, {
        type: DND_TYPE,
        parentId: parentId,
      }))
    }
  }, [])

  return (
    <div className="editor-content-block editor-content-block-placeholder editor-content-block-qr-code-campus" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <div className="editor-content-block-placeholder__icon">
        <IcQrCode/>
      </div>
      <h1 className="editor-content-block-placeholder__name">QR Code E-MEC Campus</h1>

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  )
}

