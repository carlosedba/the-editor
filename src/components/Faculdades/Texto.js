import React, { useState, useEffect } from 'react'

export default function Texto(props) {
  const content = props.content

  return (
    <div>{content}</div>
  )
}

