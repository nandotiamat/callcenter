import React from 'react'

const Pagination = ({totalClients, recordsPerPage, currentPage, setCurrentPage}) => {

    let pages = [];

    for(var  i = 1; i < Math.ceil(totalClients/recordsPerPage) + 1; i++) {
        pages.push(i);
    }

    return (
        <div className='mt-2 pagination'>
            {
                pages.map((page, index) => {
                    return <button className={"pagination-link " + (currentPage == page ? "is-current" : null)} key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination