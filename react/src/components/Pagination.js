import React, { useEffect, useState } from "react";
import { Box, Icon, Item, List, Text } from "./elements";

export default function Pagination({data, rows, onPageChange}) {
    //
    const [rowsPerPage, setRowsPerPage] = useState(rows);
    const [totalPage, setTotalPage] = useState(0);
    const [pageActive, setPageActive] = useState(1);
    const [pageInfo, setPageInfo] = useState({start : 0, end : 0});
    const [pages, setPages] = useState([]);
    const [totalRow, setTotalRow] = useState(16);
    //const [dataShow, setDataShow] = useState([]);
    console.log(data);
    useEffect(() => {
        let numberPages = Math.ceil(data?.length / rowsPerPage);
        setTotalPage(numberPages);
        let total = [];
        for(let i = 1; i < numberPages + 1; i++)
        {
          total.push(i);
        }
        setPages(total);
      }, [totalRow, rowsPerPage]);
      useEffect(() => {
        let row123 = show();
        // onPageChange(row123)
      }, [pageActive]);
    
      function show() {
        let start1 = pageActive * rowsPerPage - rowsPerPage;
        let end1 = pageActive * rowsPerPage;
        console.log('bắt đầu', start1, ' Kết thúc, ',end1);
        end1 = end1 > totalRow ? totalRow : end1;
        return { start: start1, end: end1 };
      }
      function handleNext() {
        if (pageActive < totalPage) {
          setPageActive(pageActive + 1);
        }
      }
    
      function handlePrev() {
        if (pageActive > 1) {
          setPageActive(pageActive - 1);
        }
      }

      console.log('TotalPAge ', totalPage);
      console.log('PageACtive ',pageActive );
      const renderPagination = () => {
        const pagination = [];
    
        if (pageActive !== 1) {
          pagination.push(
            <Item className="mc-paginate-item" key="prev" onClick={() => setPageActive(pageActive - 1)}>
               <Icon type="chevron_left"/>
            </Item>
          );
        }
    
        if (pageActive > 2) {
          pagination.push(
            <li key="first" onClick={() => setPageActive(1)}>
              1
            </li>
          );
          if (pageActive > 3) {
            pagination.push(<li key="ellipsis1">...</li>);
          }
        }
    
        for (let i = Math.max(1, pageActive - 1); i <= Math.min(totalPage, pageActive + 1); i++) {
          pagination.push(
            <Item
              key={i}
              className={i === pageActive ? 'mc-paginate-item active' : 'mc-paginate-item'}
              onClick={() => setPageActive(i)}
            >
              {i}
            </Item>
          );
        }
    
        if (pageActive < totalPage - 1) {
          if (pageActive < totalPage - 2) {
            pagination.push(<Item className="mc-paginate-item" key="ellipsis2">...</Item>);
          }
          pagination.push(
            <Item className="mc-paginate-item" key={totalPage} onClick={() => setPageActive(totalPage)}>
              {totalPage}
            </Item>
          );
        }
    
        if (pageActive !== totalPage) {
          pagination.push(
            <Item className="mc-paginate-item" key="next" onClick={() => setPageActive(pageActive + 1)}>
                <Icon type="chevron_right" />
            </Item>
          );
        }
        return pagination;

      }
    return (
        <Box className="mc-paginate">
            <Text className="mc-paginate-title">Showing <b>12</b> of <b>60</b> Results</Text>
            <List className="mc-paginate-list">
                {/* <Item className="mc-paginate-item" >
                    <Icon type="chevron_left" onClick={handlePrev}/>
                </Item>
                {(pageActive - 2 > 0 || pageActive == 0 ) && <Item className="mc-paginate-item">{pageActive == 0 ? pageActive : pageActive - 2}</Item>} 
                {pageActive - 1 > 0 && <Item className="mc-paginate-item">{pageActive - 1}</Item>} 
                {pageActive > 0 && <Item className="mc-paginate-item">{pageActive}</Item>} 
                {(pageActive + 1 < totalPage || pageActive == totalPage - 1 ) &&  <Item className="mc-paginate-item">{pageActive + 1}</Item>} 
                {pageActive + 2 < totalPage && <Item className="mc-paginate-item">{pageActive + 2}</Item>} 
                <Item className="mc-paginate-item">
                    <Icon type="chevron_right"  onClick={handleNext}/>
                </Item> */}
                {renderPagination()}
            </List>
        </Box>
    )
}