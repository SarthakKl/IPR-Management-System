import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { fetchAllApplications } from '../../utils/api/reviewerApi';
import Button from '../ui/button/Button';
import ApplicationModal from './ApplicationModal';
import './SearchDatabase.scss'

const SearchDatabase = () => {
    const [applications, setApplications] = useState([])
    const [errorEncoutered, setError] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [applicationShown, showApplicationState] = useState(null)
    const [iprSelected, setIPR] = useState('')

    const getAllApplications = async () => {
        const response = await fetchAllApplications()
        if(response.error){
            return setError(response.error)
        }
        setApplications(response.allApplications)
        setSearchResult(response.allApplications)
        // console.log(searchResult)x
    }
    
    const highlightSearchTerm = (value, toSearch) => {
        const words = value.split(new RegExp(`(${toSearch})`, 'gi'));
        return words.map((word) => {
            return word.toLowerCase() === toSearch ? (<span className='highlighted-word'>{word}</span>):word;
        })
        
    }
    const handleSearch = (event) => {
        const toSearch = event.target.value.toLowerCase()
        console.log(toSearch,applications)
        const f = applications.filter((application_s)=>{
            let application = [
                application_s.title,application_s.status,application_s.ipr_type,application_s.createdAt, 
                application_s.clientName,application_s.description
            ]
            let r = false
            application.forEach((item)=>{
                if(item?.toString()?.toLowerCase()?.includes(toSearch))r=true
            })
            return r
        })
        console.log(f)
        setSearchResult(f)
        setSearchTerm(toSearch)
        return
    }
    const filterByIprType = (e) => {
        // console.log(e.target[e.target.selectedIndex].value)
        const selectedType = e.target[e.target.selectedIndex].value
        setSearchTerm('')
        setIPR(selectedType)
        if(selectedType === 'IPR Type')
            return setSearchResult(applications)
        setSearchResult(applications.filter((value) => {
            console.log(selectedType)
            return value.ipr_type === selectedType
        }))
    }
    const editTime = (time) => {
        return time.slice(0, time.indexOf('GMT') - 1);
    }
    useEffect(() => {
        getAllApplications()
        console.log(searchResult)
    }, [])
    return (
        <div className='search-body'>
            <div className='search-header'>
                <div className='search-box'>
                    <input
                        type='text'
                        placeholder='Search...'
                        onChange={handleSearch}
                        value = {searchTerm}
                    />
                    {/* <Button disabled = {searchTerm === ''} onClick = {onSearch}>
                        Search
                    </Button> */}
                </div>  
                <Form.Select aria-label="IPR TYPE" onChange={filterByIprType}>
                    <option>IPR Type</option>
                    <option value="patent">Patent</option>
                    <option value="trademark">Trademark</option>
                    <option value="copyright">Copyright</option>
                </Form.Select>
            </div>
            <table className='data-table'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>IPR Type</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Applied At</th>
                    <th>Client</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    searchResult.length > 0 && 
                    searchResult.map((application, index) => {
                        return (
                        <tr key={index}>
                            <td>
                                {   
                                    highlightSearchTerm(application.title, searchTerm).map((word, i) => 
                                    <React.Fragment key={i}>
                                        {word}
                                    </React.Fragment>)
                                }
                            </td>
                            <td>
                                {
                                    highlightSearchTerm(application.ipr_type, searchTerm).map((word, i) => 
                                    <React.Fragment key={i}>
                                        {word}
                                    </React.Fragment>)
                                }
                            </td>
                            <td className='status'><span>{application.status}</span></td>
                            <td className='description'>
                                {
                                    highlightSearchTerm(application.description, searchTerm).map((word, i) => 
                                    <React.Fragment key={i}>
                                        {word}
                                    </React.Fragment>)
                                }
                            </td>
                            <td>
                                { 
                                    highlightSearchTerm(editTime(new Date(application.createdAt)?.toString()), searchTerm)
                                    .map((word, i) => 
                                        <React.Fragment key={i}>
                                            {word}
                                        </React.Fragment>)
                                }
                            </td>
                            <td>
                                {
                                    highlightSearchTerm(application.clientName, searchTerm).map((word, i) => 
                                        <React.Fragment key={i}>
                                            {word}
                                        </React.Fragment>)
                                }
                            </td>
                            <td>
                                <Button onClick={() => showApplicationState(application)}>
                                    Open
                                </Button>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {
                searchResult.length == 0 &&
                <div className='no-record-msg'>
                    No records found
                </div>
            }
            <ApplicationModal
                applicationShown = {applicationShown}
                showApplicationState = {showApplicationState}
            />
        </div>
    )
}
export default SearchDatabase