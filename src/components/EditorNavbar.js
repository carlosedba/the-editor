import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'

import { addPageProperty } from '@/actions/Page'
import { addBlock, resetBlockTree } from '@/actions/BlockTree'
import { addBlockCacheEntry } from '@/actions/BlockCache'
import { load } from '@/actions/LoadedTree'

import LogoFaculdades from '@/assets/svg/logo_faculdades.svg'

import BtnCopiarWebP from '@/components/Btn/BtnCopiarWebP'

import useFeather from '@/hooks/useFeather'

import FaculdadesTemplate from '@/templates/FaculdadesTemplate'

import Log from '@/utils/Log'

import {
  DND_EDITOR_BLOCK_MODAL_INSCRICAO
} from '@/dndTypes'

import {
  VERSION
} from '@/globals'

export default function EditorNavbar(props) {
  useFeather()

  const page = useSelector(state => state.Page)
  const blockCache = useSelector(state => state.BlockCache)
  const blockTree = useSelector(state => state.BlockTree)

  const [html, setHtml] = useState('')
  const [tree, setTree] = useState([])

  const carregarInput = useRef(null)

  const dispatch = useDispatch()

  function arrayToTree(arr, parentId) {
    return arr.filter(item => item.parentId === parentId)
      .map(child => (
        {
          ...child,
          children: arrayToTree(arr, child.id)
        }
      ))
      .sort((a, b) => a.order - b.order)
  }

  function gerarHtml(templates, arr) {
    let html = ''

    for (let i = 0; i < arr.length; i++) {
      html = html + gerarHtmlObj(templates, arr[i])
    }
    
    return html
  }

  function gerarHtmlObj(templates, obj) {
    let html = ''

    if (obj.children && Array.isArray(obj.children) && obj.children.length > 0) {
      for (let i = 0; i < obj.children.length; i++) {
        let child = obj.children[i]
        let type = child.type
        let content = child.content || {}
        let template = templates[type]
        
        html = html + template({ content: content })        
      }
    }

    Log.dev(obj)

    let type = obj.type
    let template = templates[type]

    if (html === '') {
      let content = obj.content
      html = template({ content: content })    
    } else {
      html = template({ content: html })    
    }

  
    return html
  }

  function generateTree() {
    let arr = []
    let ids = Object.keys(blockTree)
    
    for (let id of ids) {
      arr.push({
        ...blockTree[id],
        id: id,
        order: blockCache[id] || null
      })
    }

    let tree = arrayToTree(arr)

    return tree
  }

  function copiarParaWebP() {
    let tree = generateTree()
    let html = gerarHtml(FaculdadesTemplate, tree)

    setHtml(html)
  }

  function salvar() { 
    let tree = generateTree()

    let json = JSON.stringify({
      version: VERSION,
      page: page,
      blockTree: blockTree,
      blockCache: blockCache,
      tree: tree,
    })

    let blob = new Blob([json], {
      type: 'application/json',
    })

    let datahora = dayjs().format('DD-MM-YYYY-HH[h]mm')
    let filename = `Sem nome - ${datahora}`
    let tipoCurso = page.tipoCurso
    let nomeCurso = page.nomeCurso

    if (tipoCurso && nomeCurso) {
      filename = `${tipoCurso} em ${nomeCurso} - ${datahora}`
    } else if (page.tipoCurso) {
      filename = `${tipoCurso} - ${datahora}`
    } else if (page.nomeCurso) {
      filename = `${nomeCurso} - ${datahora}`
    }

    saveAs(blob, filename)
  }

  function handleCarregarChange(event) {
    const input = carregarInput.current
    const files = input.files
    const file = files[0]

    const reader = new FileReader()
    
    reader.onload = (event) => {
      let json = event.target.result
      let obj = JSON.parse(json)
      let page = obj.page
      let blockTree = obj.blockTree
      let blockCache = obj.blockCache
      let tree = obj.tree
      
      let keys = []

      let hasModalInscricao = false
      
      if (page) {
        keys = Object.keys(page)
        for (let key of keys) {
          dispatch(addPageProperty(key, page[key]))
        }
      }

      if (blockTree) {
        keys = Object.keys(blockTree)

        /*
        for (let key of keys) {
          let block = blockTree[key]
          let type = block.type
          
          if (type === 'DND_EDITOR_BLOCK_MODAL_INSCRICAO') {
            hasModalInscricao = true
          }

          Log.dev(block, type, hasModalInscricao)
        }
        
        if (hasModalInscricao) {
          dispatch(resetBlockTree())
        }
        */

        for (let key of keys) {
          let block = blockTree[key]
          let type = block.type

          switch (type) {
            case DND_EDITOR_BLOCK_MODAL_INSCRICAO:
              continue
              break

            default:
              dispatch(addBlock(key, blockTree[key]))
          }
        }
      }

      if (blockCache) {
        keys = Object.keys(blockCache)
        for (let key of keys) {
          dispatch(addBlockCacheEntry(key, blockCache[key]))
        }
      }

      if (tree) dispatch(load(tree))
    }

    reader.readAsText(file)
  }

  return (
    <nav className="editor-navbar">
      <div className="editor-navbar__left">
        <div className="editor-navbar__brand">
          <i data-feather="edit"></i>
        </div> 
        <div className="editor-navbar__logo">
          <LogoFaculdades/>
        </div>
        <div className="editor-navbar__site">
          <p className="editor-navbar__label">Site</p>
          <p className="editor-navbar__value">Faculdades da Indústria</p>
        </div>
      </div>
      <div className="editor-navbar__right">
        <button className="btn btn--one">
          <div className="btn__icon">
            <i data-feather="upload"></i>
          </div>
          Carregar
          <input type="file" accept="application/json" onChange={handleCarregarChange} ref={carregarInput}/>
        </button>
        <button className="btn btn--one" onClick={salvar}>
          <div className="btn__icon">
            <i data-feather="save"></i>
          </div>
          Salvar
        </button>
        <BtnCopiarWebP html={html}  onClick={copiarParaWebP}/>
      </div>
    </nav>
  )
}

