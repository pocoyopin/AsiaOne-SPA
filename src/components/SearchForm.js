import {useState, useEffect} from 'react'
import axios from 'axios'
import FormContent from './FormContent'
import Pagination from './Pagination'

const API_URL = process.env.REACT_APP_DATA_API

function SearchForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [title, setTitle] = useState('')
    const [movieList, setMovieList] = useState([])
    const [totalList, setTotalList] = useState(0)
    const [curPage, setCurPage] = useState(1)

    useEffect(() => {
        const searchMovie = async () => {
            setIsLoading(true)
            const res = await axios.get(`${API_URL}&s=${title}&page=${curPage}`)
            if (res.data['Response'] === 'False') {
                setErrorMessage(res.data['Error'])
            } else {
                setErrorMessage('')
                setMovieList(res.data['Search'])
                setTotalList(res.data['totalResults'])
            }
            console.log(res.data)
            setIsLoading(false)
        }

        if (title) {
            searchMovie()
        }
    }, [curPage])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const searchMovie = async () => {
            setIsLoading(true)
            const res = await axios.get(`${API_URL}&s=${title}&page=${curPage}`)
            if (res.data['Response'] === 'False') {
                setErrorMessage(res.data['Error'])
            } else {
                setErrorMessage('')
                setCurPage(1)
                setMovieList(res.data['Search'])
                setTotalList(res.data['totalResults'])
            }
            console.log(res.data)
            setIsLoading(false)
        }

        searchMovie()
    }

    const handlePrevPage = () => {
        if (curPage > 1) {
            setCurPage(curPage - 1)
        }
    }

    const handleNextPage = () => {
        if (curPage < Math.ceil(totalList/10)) {
            setCurPage(curPage + 1)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search a movie" onChange={handleTitleChange} value={title} />
                <button type="submit">Search</button>
            </form>
            {isLoading ?
            <div>
                <p>Loading...</p>
            </div>
            :
            errorMessage ?
            <div>
                <p>{errorMessage}</p>
            </div>
            :
            totalList > 0 &&
            <>
                <FormContent movies={movieList} />
                <Pagination current={curPage} total={totalList} onPrev={handlePrevPage} onNext={handleNextPage} />
            </>
            }
        </div>
    );
}

export default SearchForm;
