import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

import FadeVariants from '@/animation/FadeVariants'

export default function Page(props) {
  const className = props.className || ''

  return (
    <motion.div className={classNames('page', className)} initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
      {props.children}
    </motion.div>
  )
}