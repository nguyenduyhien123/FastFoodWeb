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
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChangePassword } from './ChangePassword';
import { AccountEdit } from './AccountEdit';
//

export const UserInfo = () => {
    const { userInfo } = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const [accountError, setAccountError] = useState({});
    const [listTab, setListTab] = useState([
        {
            name : 'forgot-password',
            text : 'Đổi mật khẩu',
            component : <ChangePassword/>
        },
        {
            name : 'forgot-password',
            text : 'Cập nhật thông tin cá nhân',
            component : <AccountEdit/>
        },
        {
            name : 'forgot-password',
            text : 'Đơn hàng của bạn',
            component : ''
        },
        {
            name : 'forgot-password',
            text : 'Lịch sử mua hàng',
            component : '' 
        },
    ]);
    const [tabActive, setTabActive] = useState(0);

    console.log(account);
    return <div className='user-info'>
                <Row>
                    <Col xl={4}>
                    <CardLayout>
                    <ul className="nav-tab-user">
                        {
                            listTab?.map((data, index) => <li><button className={tabActive === index ? 'btn-action active' : 'btn-action'} onClick={() => setTabActive(index)}>{data.text}</button></li>)
                        }
                        </ul>
                    </CardLayout>
                    </Col>
                    <Col xl={8}>
                        {listTab[tabActive]?.component}
                    </Col>

                </Row>
    </div>
}