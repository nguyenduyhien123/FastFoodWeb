import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import './UserInfo.scss'
//
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image, Text } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userEdit.json";
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChangePassword } from './ChangePassword';
import { AccountEdit } from './AccountEdit';
import { ManageOrder } from './ManageOrder';
//

export const UserInfo = () => {
    const location = useLocation();
    const path = location.pathname;
<<<<<<< HEAD
    console.log(path); // In ra đường dẫn trên URL
=======
    // console.log(path); // In ra đường dẫn trên URL
>>>>>>> master
    const { userInfo } = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const [accountError, setAccountError] = useState({});
    const [listTab, setListTab] = useState([
        {
            name : 'forgot-password',
            text : 'Cập nhật thông tin cá nhân',
            component : <AccountEdit/>,
            link : '/accounts/edit'
        },
        {
            name : 'forgot-password',
            text : 'Quản lý đơn hàng',
            component : <ManageOrder/>,
            link : '/accounts/manage-order'
        },
        {
            name : 'forgot-password',
            text : 'Đổi mật khẩu',
            component : <ChangePassword/>,
            link : '/accounts/change-password'
        },

    ]);
    const [tabActive, setTabActive] = useState(() => {
        return listTab.findIndex((tab) => tab.link == path);
    });
<<<<<<< HEAD
    console.log(tabActive);
    console.log(account);
=======
    // console.log(tabActive);
    // console.log(account);
>>>>>>> master
    return <div className='user-info'>
                <Row>
                    <Col xl={3}>
                    <CardLayout>
                    <ul className="nav-tab-user">
                        {
                            listTab?.map((data, index) => <li><Anchor href={data?.link} className={tabActive === index ? 'btn-action active' : 'btn-action'} onClick={() => setTabActive(index)}>{data.text}</Anchor></li>)
                        }
                        </ul>
                    </CardLayout>
                    </Col>
                    <Col xl={9}>
                        {listTab[tabActive]?.component}
                    </Col>

                </Row>
    </div>
}