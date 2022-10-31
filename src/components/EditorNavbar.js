import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Handlebars from 'handlebars'

import LogoFaculdades from '@/assets/svg/logo_faculdades.svg'

import useFeather from '@/hooks/useFeather'

import FaculdadesTemplate from '@/templates/FaculdadesTemplate'

import Log from '@/utils/Log'

export default function EditorNavbar(props) {
  useFeather()

  const blockCache = useSelector(state => state.BlockCache)
  const blockTree = useSelector(state => state.BlockTree)

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] || []
  
      return {
        ...acc,
        [key]: [...curGroup, obj].sort((a, b) => a.order - b.order)
      }
    }, {})
  }

  function tree(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] || []
  
      return {
        ...acc,
        [key]: [...curGroup, obj].sort((a, b) => a.order - b.order)
      }
    }, {})
  }

  function arrayToTree(arr, parentId) {
    return arr.filter(item => item.parentId === parentId)
      .map(child => (
        {
          ...child,
          children: arrayToTree(arr, child.id)
        }
      ))
  }

  function renderHtml(str, templates = {}, obj = {}, parent) {
    let type = obj.type
    let content = obj.content || {}
    let template = templates[type]

    Log.dev(type, obj)

    str = str + template({ content: content })
    Log.dev(str)

    if (obj.children && Array.isArray(obj.children) && obj.children.length > 0) {
      for (let i = 0; i < obj.children.length; i++) {
        let child = obj.children[i]
        
        return renderHtml(str, templates, child, obj)
      }
    } else if (parent) {
      return renderHtml(str, templates, parent)
    }

    return str
  }

  function iter(level) {
    return function (node)  {
        console.log('node', level, node)
        (node.children || []).forEach(iter(level + 1))
    }
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

  function copiarParaWebP() {
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
    Log.dev(tree)

    let nodeHtml = ''
    for (let node of tree) {
      //nodeHtml = renderHtml(nodeHtml, FaculdadesTemplate, node)
      Log.dev(nodeHtml)
    }
    Log.dev('final', nodeHtml)

    //tree.forEach(iter(0))

    teste3(tree)
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
        </button>
        <button className="btn btn--one">
          <div className="btn__icon">
            <i data-feather="save"></i>
          </div>
          Salvar
        </button>
        <button className="btn btn--one" onClick={copiarParaWebP}>
          <div className="btn__icon">
            <i data-feather="copy"></i>
          </div>
          Copiar para o WebP
        </button>
      </div>
    </nav>
  )
}

