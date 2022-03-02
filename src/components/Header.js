import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../context/BaseContext';
import { getRequest } from '../utils/GlobalFunc'
import './Header.css'

export default function Header({ onSearch, changeCategory }) {
  const navigate = useNavigate()
  const context = useContext(ContextProvider)
  const category = context.category

  useEffect(() => {
    // Other important pens.
    // Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
    // Dashboard: https://codepen.io/themustafaomar/pen/jLMPKm

    let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
    let dropdownIsOpen = false

    // Handle dropdown menues
    if (dropdowns.length) {
      dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', (event) => {
          let target = document.querySelector(`#${event.target.dataset.dropdown}`)

          if (target) {
            if (target.classList.contains('show')) {
              target.classList.remove('show')
              dropdownIsOpen = false
            } else {
              target.classList.add('show')
              dropdownIsOpen = true
            }
          }
        })
      })
    }

    // Handle closing dropdowns if a user clicked the body
    window.addEventListener('mouseup', (event) => {
      if (dropdownIsOpen) {
        dropdowns.forEach((dropdownButton) => {
          let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
          let targetIsDropdown = dropdown == event.target

          if (dropdownButton == event.target) {
            return
          }

          if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
            dropdown.classList.remove('show')
          }
        })
      }
    })

    // Open links in mobiles
    document.querySelector('.navbar-toggler')
      .addEventListener('click', () => {
        let navbarMenu = document.querySelector('.navbar-menu')

        if (navbarMenu.style.display === 'flex') {
          navbarMenu.style.display = 'none'
          return
        }

        navbarMenu.style.display = 'flex'
      })

  }, [])

  function handleCategory(e, item) {
    e.preventDefault()
    changeCategory(item)
  }

  function handlePage(e, location) {
    e.preventDefault()
    navigate(location)
  }

  return (
    <nav className="navbar">
      <div className="container">

        <div className="navbar-header">
          <button className="navbar-toggler" data-toggle="open-navbar1">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a href="#" onClick={(e) => handlePage(e, '/')}>
            <h4>Boo<span>ku</span></h4>
          </a>
        </div>

        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            <li className="navbar-dropdown">
              <a href="#" className="dropdown-toggler" data-dropdown="my-dropdown-id">
                Categories <i className="fa fa-angle-down"></i>
              </a>
              <ul className="dropdown" id="my-dropdown-id">
                {category.map((item, index) => <Fragment key={index}>
                  <li><a href="#" onClick={(e) => handleCategory(e, item)}>{decodeURI(item.name)}</a></li>
                  <li className="separator"></li>
                </Fragment>)}
              </ul>
            </li>
            <li><a href="#" onClick={(e) => handlePage(e, '/mybook')} >MyBook</a></li>
            {onSearch && <li className='navbar-input'>
              <input
                onChange={onSearch}
                placeholder='Search...'
                type={'text'} />
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}