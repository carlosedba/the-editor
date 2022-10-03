import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { brl } from 'alya-brasil'
import alyaApi from 'alya-react-api'

import Modal from '@/components/Modal/Modal'
import Tag from '@/components/Tag'

import ModalHelper from '@/helpers/ModalHelper'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { MODAL_ADICIONAR_TAGS } from '@/modalTypes'

import { MODEL_TAG } from '@/modelTypes'

import { FiCheck } from 'react-icons/fi'

export default function ModalAdicionarTags(props) {
  useFeather()

  const MODAL_NAME = MODAL_ADICIONAR_TAGS

  const [tags, setTags] = useState([])
  const [tagsSelecionadas, setTagsSelecionadas] = useState([])

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    Log.dev(tagsSelecionadas)
  }, [tagsSelecionadas])

  function onAfterOpen() {
    let modal = ModalHelper.getModal(MODAL_NAME)
    let idPagamento = modal.params.id_pagamento
  }

  function fetchTags() {
    alyaApi.send({
      name: 'main',
      data: {
        model: MODEL_TAG,
        action: 'findAll',
      }
    })
    .then((response) => { 
      if (response.wasSuccessful()) {
        let result = response.getResult()
        setTags(result)
      } else {
        console.error(response.getError())
      }
    })
    .catch(console.error)
  }

  function handleTagChange(event) {
    if (event.status === 'checked') {
      setTagsSelecionadas([...tagsSelecionadas, event.item.id_tag ])
    } else {
      setTagsSelecionadas(tagsSelecionadas.filter((id_tag) => id_tag !== event.item.id_tag))
    }
  }

  function renderTags() {
    return tags.map((tag) => (
      <Tag tag={tag} onChange={handleTagChange} key={tag.id_tag}/>
    ))
  }

  return (
    <Modal name={MODAL_NAME} onAfterOpen={onAfterOpen}>
      <div className="modal modal--adicionar-tags">
        <div className="modal__header">
          <div className="modal__titles">
            <p className="modal__title">Selecione as tags</p>
          </div>
        </div>
        <div className="modal__content">
          <div className="tags">
            {renderTags()}
          </div>
        </div>
        <div className="modal__actions">
          <button className="btn btn--two">
            <FiCheck/>
          </button>
        </div>
      </div>
    </Modal>
  )
}