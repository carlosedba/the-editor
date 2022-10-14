import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Modal from 'react-modal'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import './assets/css/inputs.scss'
import './assets/css/fields.scss'
import './assets/css/buttons.scss'
import './assets/css/editor-content-block-secao.scss'
import './assets/css/editor-content-block-titulo.scss'
import './assets/css/editor-content-block-texto.scss'
import './assets/css/editor-content-block-lista-icones.scss'
import './assets/css/editor-content-block-blocos-icones.scss'
import './assets/css/editor-content-block-botao.scss'
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
  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Component/>
        </DndProvider>
      </Provider>
      , document.getElementById('root')
    )
  }
  
  render(MainRouter)

  // webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./components/MainRouter', () => {
      render(MainRouter)
    })
  }
}

function main() {
  initReact()
  setModal()
  setDayJsLocale()
}

main()