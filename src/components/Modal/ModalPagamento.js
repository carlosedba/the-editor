import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { brl } from 'alya-brasil'

import Modal from '@/components/Modal/Modal'

import ModalHelper from '@/helpers/ModalHelper'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import {
  MODAL_PAGAMENTO,
  MODAL_ADICIONAR_TAGS
} from '@/modalTypes'

export default function ModalPagamento(props) {
  useFeather()

  const MODAL_NAME = MODAL_PAGAMENTO

  const [pagamento, setPagamento] = useState({})

  function onAfterOpen() {
    let modal = ModalHelper.getModal(MODAL_NAME)
    let pagamento = modal.data.pagamento

    if (pagamento) {
      setPagamento(pagamento)
      Log.dev(pagamento)
    }
  }

  function handleAdicionarTagClick(event) {
    ModalHelper.open({
      name: MODAL_ADICIONAR_TAGS,
      params: {
        id_pagamento: pagamento.id_pagamento
      }
    })

    ModalHelper.close({ name: MODAL_NAME })
  }

  return (
    <Modal name={MODAL_NAME} onAfterOpen={onAfterOpen}>
      <div className="modal modal--pagamento">
        <div className="modal__header">
          <div className="modal__titles">
            <p className="modal__hat">Pagamento</p>
            <p className="modal__title">{pagamento.nome}</p>
          </div>
        </div>
        <div className="modal__content">
          <div className="fields">
            <div className="fields__row">
              <div className="field field--w1">
                <div className="field__label">Data</div>
                <div className="field__value">{dayjs(pagamento.data).format('DD/MM/YYYY')}</div>
              </div>
              <div className="field field--w1">
                <div className="field__label">Valor</div>
                <div className="field__value">R$ {brl(parseFloat(pagamento.valorReal)).format()}</div>
              </div>
            </div>
            <div className="field">
              <div className="field__label">Tags</div>
              <button className="btn btn--one" onClick={handleAdicionarTagClick}>
                <div className="btn__icon">
                  <i data-feather="plus"></i>
                </div>
                Adicionar tags
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}