import React, { Component, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ContextProvider } from '../context/BaseContext';

export default function CardBook({ item }) {
  const context = useContext(ContextProvider)
  const checkBookmark = context.myBook.findIndex((val) => val.id === item.id)

  function handleBookmark() {
    let temp = [...context.myBook]

    if (checkBookmark == -1) {
      temp.push(item)
      toast.success(`${item.title} added to bookmark`);
    } else {
      temp.splice(checkBookmark, 1)
      toast.error(`${item.title} remove from bookmark`);
    }

    localStorage.setItem('myBook', JSON.stringify(temp))
    context.setMyBook(temp)
  }

  return (
    <li>
      <div className="card">
        <img src={item.cover_url} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header justify-between">
            <div className="card__header-text">
              <h3 className="card__title">{item.title}</h3>
              <span className="card__status">{item.authors.join(', ')}</span>
            </div>
            <button
              className="btn"
              onClick={handleBookmark}
            >
              <i className="fa-solid fa-bookmark" style={{ fontSize: 25, color: checkBookmark >= 0 ? '#516a69' : '#d4d4d4' }}></i>
            </button>
          </div>
          <p className="card__description">{item.description}</p>
        </div>
      </div>
    </li>
  )
}