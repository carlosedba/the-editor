import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Modal from 'react-modal'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import './assets/css/inputs.scss'
import './assets/css/fields.scss'
import './assets/css/buttons.scss'
import './assets/css/editor-sidebar-text-input.scss'
import './assets/css/editor-content-block-tooltip-input.scss'
import './assets/css/editor-content-block-tooltip.scss'
import './assets/css/editor-content-block-secao.scss'
import './assets/css/editor-content-block-titulo.scss'
import './assets/css/editor-content-block-texto.scss'
import './assets/css/editor-content-block-lista-icones.scss'
import './assets/css/editor-content-block-blocos-icones.scss'
import './assets/css/editor-content-block-botao.scss'
import './assets/css/editor-content-block-youtube.scss'
import './assets/css/editor-content-block-placeholder.scss'
import './assets/css/editor-content-block-box-conhecer.scss'
import './assets/css/editor-content-block-box-descontos.scss'
import './assets/css/main.scss'

import MainRouter from './components/MainRouter'

import store from './store'

function setDayJsLocale() {
  dayjs.locale('pt-br')
}

function setModal() {
  Modal.setAppElement('#root')
}

function initReact() {
  const container = document.getElementById('root')
  const root = createRoot(container)
  
  root.render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <MainRouter/>
      </DndProvider>
    </Provider>
  )
}

function main() {
  initReact()
  setModal()
  setDayJsLocale()
}

main()