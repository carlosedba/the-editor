import React, { useState, useEffect } from 'react'

export default function Titulo(props) {
  const content = props.content

  return (
    <h2>{content}</h2>
  )
}

