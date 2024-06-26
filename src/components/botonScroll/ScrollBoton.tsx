"use client"
import React, { useState, useEffect } from 'react'
import './scrollBoton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'

const ScrollTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div className='top-to-btm'>
            {' '}
            {showTopBtn && (
                <FontAwesomeIcon icon={faCircleChevronUp} className='icon-position icon-style' onClick={goToTop} />
            )}{' '}
        </div>
    )
}
export default ScrollTop