import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Handlebars from 'handlebars'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { saveAs } from 'file-saver'

import LogoFaculdades from '@/assets/svg/logo_faculdades.svg'

import useFeather from '@/hooks/useFeather'

import FaculdadesTemplate from '@/templates/FaculdadesTemplate'

import Log from '@/utils/Log'
import { addBlock } from '@/actions/BlockTree'
import { addBlockCacheEntry } from '@/actions/BlockCache'
import { load } from '@/actions/LoadedTree'

export default function EditorNavbar(props) {
  useFeather()

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

    let type = obj.type
    let template = templates[type]

    html = template({ content: html })      

    return html
  }

  function generateTree() {
    let arr = []
    let ids = Object.keys(blockTree)
    
    for (let id of ids) {
      arr.push({
        ...blockTree[id],
        id: id,
        order: blockCache[id]
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
      blockTree: blockTree,
      blockCache: blockCache,
      tree: tree,
    })

    let blob = new Blob([json], {
      type: 'application/json',
    })

    saveAs(blob, 'teste.json')
  }

  function handleCarregarChange(event) {
    const input = carregarInput.current
    const files = input.files
    const file = files[0]

    const reader = new FileReader()
    
    reader.onload = (event) => {
      let json = event.target.result
      let obj = JSON.parse(json)
      let blockTree = obj.blockTree
      let blockCache = obj.blockCache
      let tree = obj.tree
      
      let keys = Object.keys(blockTree)
      for (let key of keys) {
        dispatch(addBlock(key, blockTree[key]))
      }
      
      keys = Object.keys(blockCache)
      for (let key of keys) {
        dispatch(addBlockCacheEntry(key, blockCache[key]))
      }

      dispatch(load(tree))
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
        <CopyToClipboard text={html}>
          <button className="btn btn--one" onClick={copiarParaWebP}>
            <div className="btn__icon">
              <i data-feather="copy"></i>
            </div>
            Copiar para o WebP
          </button>
        </CopyToClipboard>
      </div>
    </nav>
  )
}

