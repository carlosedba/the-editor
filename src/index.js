import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import 'react-contexify/dist/ReactContexify.css'

import './assets/css/inputs.scss'
import './assets/css/fields.scss'
import './assets/css/buttons.scss'
import './assets/css/editor-sidebar-text-input.scss'
import './assets/css/editor-content-block-tooltip-input.scss'
import './assets/css/editor-content-block-tooltip.scss'
import './assets/css/editor-content-block-section.scss'
import './assets/css/editor-content-block-title.scss'
import './assets/css/editor-content-block-text.scss'
import './assets/css/editor-content-block-rich-text.scss'
import './assets/css/editor-content-block-icon-list.scss'
import './assets/css/editor-content-block-rich-icon-list.scss'
import './assets/css/editor-content-block-square-card.scss'
import './assets/css/editor-content-block-rich-square-card.scss'
import './assets/css/editor-content-block-button.scss'
import './assets/css/editor-content-block-youtube.scss'
import './assets/css/editor-content-block-placeholder.scss'
import './assets/css/main.scss'

import MainRouter from './components/MainRouter'

import store from './store'

function setDayJsLocale() {
  dayjs.locale('pt-br')
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
  setDayJsLocale()
}

main()