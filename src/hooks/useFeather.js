import React, { useEffect } from 'react'

export default function useFeather() {
  useEffect(() => {
    window.feather.replace()
  })

  function runFeather() {
    window.feather.replace()
  }

  return {
    runFeather
  }
}