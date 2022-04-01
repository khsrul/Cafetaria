import React from 'react'
import { Pagination } from 'react-bootstrap'

const index = (props) => {
    // Init page number as array
    const pageNumbers = [];

    // get number of page from totalpost/post perpage
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Pagination>
                {
                    pageNumbers.map((getNum, index) => (
                        <Pagination.Item key={index} onClick={() => props.paginate(getNum)} active={getNum === props.currentPage}>{getNum}</Pagination.Item>
                    ))
                }
            </Pagination>
        </>
    )
}

export default index