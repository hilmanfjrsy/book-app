import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import CardBook from '../components/CardBook';
import Header from '../components/Header';
import { ContextProvider } from '../context/BaseContext';

export default function MyBook() {
  const navigate = useNavigate()
  const context = useContext(ContextProvider)
  const book = context.myBook
  const ct = context.category
  const [myBook, setMyBook] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getBook() {
    setIsLoading(true)
    let newCt = JSON.parse(JSON.stringify(ct))

    book.forEach(v => {
      let temp = []
      let findIdx = ct.findIndex(item => item.id == v.category_id)
      if (findIdx >= 0 && v) {
        temp.push(v)
        newCt[findIdx].myBook = temp.concat(newCt[findIdx].myBook || [])
      }
    });
    newCt = newCt.filter(item => item.hasOwnProperty('myBook'))
    setMyBook(newCt)
    setIsLoading(false)
  }

  useEffect(() => {
    getBook()
  }, [context])

  return (
    <>
      <Header changeCategory={(v) => navigate('/', { state: { category: v } })} />
      {isLoading ?
        <div className='loading'>
          <HashLoader size={35} color={'#516a69'} />
        </div>
        :
        <>
          {myBook.length === 0 && <p className='text-center' style={{ color: 'grey' }}>Data tidak ditemukan</p>}
          {myBook.map((item, index) =>
            <Fragment key={index}>
              <h2 className='title'>{decodeURI(item.name)} ({item.myBook.length})</h2>
              <ul className="cards">
                {item.myBook.map((items, idx) => <CardBook item={items} key={idx} />)}
              </ul>
            </Fragment>
          )}
        </>
      }
    </>
  )
}