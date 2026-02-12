'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  texts: string[]
  speed?: number
  delayBetween?: number
  className?: string
}

export function TypeWriter({ texts, speed = 50, delayBetween = 2000, className = '' }: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting && charIndex < currentText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex])
        setCharIndex((prev) => prev + 1)
      }, speed)
    } else if (!isDeleting && charIndex === currentText.length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, delayBetween)
    } else if (isDeleting && charIndex > 0) {
      // Deleting backward
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
        setCharIndex((prev) => prev - 1)
      }, speed / 2)
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timer)
  }, [charIndex, currentIndex, displayedText, isDeleting, texts, speed, delayBetween])

  return (
    <h1 className={className}>
      {displayedText}
      <span className="inline-block w-1 h-12 ml-1 bg-white animate-pulse" />
    </h1>
  )
}
