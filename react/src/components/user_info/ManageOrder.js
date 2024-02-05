import { useEffect, useState } from "react"
import DivideTitle from "../DivideTitle"
import { CardLayout } from "../cards"
import './ManageOrder.scss';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import data from '../../data/master/manageOrder.json';
import OrdersUserTable from "../tables/OrdersUserTable";
import { IconField } from "../fields";
import { Button } from "../elements";
export const ManageOrder = () => {
    const [listTab, setListTab] = useState([
        {
            text: 'Tất cả',
            id: 0
        },
        {
            text: 'Đã đặt',
            id: 1
        },
        {
            text: 'Đã xác nhận',
            id: 2
        },
        {
            text: 'Đang giao',
            id: 3
        },
        {
            text: 'Đã giao',
            id: 4
        },
        {
            text: 'Đã huỷ',
            id: 5
        },
    ]);
    const [tabActive, setTabActive] = useState(0);
    const [listOrder, setListOrder] = useState([]);
    const [contentSearch, setContentSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState(0);
    const [listTypeSearch, setListTypeSearch] = useState([
        {
            name : 'code',
            text : 'Mã đơn hàng'
        },
        {
            name : 'name',
            text : 'Tên sản phẩm'
        }
    ]);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Gọi hàm tìm kiếm ở đây
            getOrders();
        }, 300); // Đợi 300ms trước khi gọi hàm tìm kiếm

        return () => clearTimeout(delayDebounceFn);
    }, [contentSearch]);
    const getOrders = (status_id) => {
        let param2 = listTypeSearch[typeSearch]?.name;
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getInvoiceByUser',
            withCredentials: true,
            params: {
                status_id: status_id,
                [param2] : contentSearch
            }
        })
            .then((res) => {
                setListOrder(res.data)
            })
            .catch((err) => {

            })
    }
    const handleRefreshData = () => {
        getOrders(listTab[tabActive]?.id);
    }
    useEffect(() => {
        getOrders(listTab[tabActive]?.id);
    }, [tabActive]);
    console.log(typeSearch);
    return <div className="manage-order">
        <CardLayout>
            <DivideTitle as={"h2"} title="Quản lý đơn hàng" className="mb-4" />
            <Col xl={12} className="list-tab-order">
                {listTab?.map((tab, index) => {
                    return <div onClick={() => {
                        setTabActive(index);
                        setContentSearch("");
                    }} className={`tab-item ${index === tabActive ? 'active' : ''}`}>{tab?.text}</div>
                })}
            </Col>
            <Row className="mt-1">
                <Col xl={12}>
                    <Row>
                    <Button icon={"refresh"} text={"Làm mới dữ liệu" } className={"mc-btn primary m-2 fs-5" } onClick={() => {
                        handleRefreshData();
                    }}/>
                    </Row>
                    <Row>
                        <Col xl={3}>
                        <IconField icon={"search"} option={listTypeSearch} classes={"w-100 h-md"} placeholder={"Chọn tiêu chí tìm kiếm"} onChange={(e) => setTypeSearch(e.target.value)}/>
                        </Col>
                        <Col xl={9}>
                        <IconField type={"text"} classes={"w-100 h-md"} placeholder={`Tìm kiếm theo ${listTypeSearch[typeSearch]?.text}`} value={contentSearch} onChange={(e) => setContentSearch(e.target.value)} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="mt-3"></div>
            <Col xl={12} >
                <OrdersUserTable thead={data?.thead} tbody={listOrder}>
                </OrdersUserTable>
            </Col>
        </CardLayout>
    </div>
} 