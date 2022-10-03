import React, { useRef, useState, useEffect } from 'react'

export default function PageBody(props) {
  return (
    <div className="page__body">
      {props.children}
    </div>
  )
}