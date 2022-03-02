import React, { Component, Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import CardBook from '../components/CardBook';
import Header from '../components/Header';
import { getRequest } from '../utils/GlobalFunc';

export default function Home() {
  const size = 12
  const navigate = useNavigate();
  const { state } = useLocation();
  const [category, setCategory] = useState({ "id": 1, "name": "Happiness \u0026 Mindfulness" })
  const [book, setBook] = useState([])
  const [bookTemp, setBookTemp] = useState([])
  const [pagination, setPagination] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  async function getBook() {
    setIsLoading(true)
    let response = await getRequest(`fee-assessment-books?categoryId=${category.id}&page=${page}&size=${size}`)
    setBook(response.data)
    setBookTemp(response.data)
    handleTotalPage()
    setIsLoading(false)
  }

  async function handleTotalPage() {
    let res = await getRequest(`fee-assessment-books?categoryId=${category.id}`)
    let total = Math.ceil(res.data.length / size)
    let tempPaginate = []
    let prevHidden = page - 2
    let nextHidden = page + 2

    for (let i = 1; i <= total; i++) {
      let v = i - 1
      let label = i
      let current = false

      if (page === v) current = true
      if ((v == prevHidden && i != 1) || (v == nextHidden && i != total)) label = '...'

      if (v >= prevHidden && v <= nextHidden) {
        tempPaginate.push({
          value: v,
          label,
          current
        })
      } else if (i == 1 || i == total) {
        tempPaginate.push({
          value: v,
          label,
          current
        })
      }
    }
    setPagination(tempPaginate)
  }

  function handleSearch() {
    let newBook = bookTemp.filter(item => item.title.toLowerCase().includes(search))
    setBook(newBook)
  }

  useEffect(() => {
    if(state) setCategory(state.category)
  }, [state])

  useEffect(() => {
    handleSearch()
  }, [search])

  useEffect(() => {
    getBook()
  }, [category, page])

  return (
    <>
      <Header onSearch={(v) => setSearch(v.target.value.toLowerCase())} changeCategory={(v) => navigate('/', { state: { category: v } })} />
      {isLoading ?
        <div className='loading'>
          <HashLoader size={35} color={'#516a69'} />
        </div>
        :
        <>
          <h2 className='title'>{decodeURI(category.name)}</h2>
          {book.length === 0 && <p className='text-center' style={{ color: 'grey' }}>Data tidak ditemukan</p>}
          <ul className="cards">
            {book.map((item, index) => <CardBook item={item} key={index} />)}
          </ul>
          {!search && <div className='pagination'>
            {pagination.map((item, index) => <Fragment key={index}>
              <button
                className={`page ${item.current ? ' active' : ''}`}
                onClick={() => setPage(item.value)}
              >
                {item.label}
              </button>
            </Fragment>
            )}
          </div>}
        </>
      }
    </>
  )
}