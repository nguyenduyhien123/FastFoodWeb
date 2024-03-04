import { useContext, useState } from 'react';
import './UserInfo.scss';
//
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Anchor } from "../../components/elements";
// import 'sweetalert2/dist/sweetalert2.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AccountEdit } from './AccountEdit';
import { ChangePassword } from './ChangePassword';
import { ManageOrder } from './ManageOrder';
//

export const UserInfo = () => {
    const location = useLocation();
    const path = location.pathname;
    // console.log(path); // In ra đường dẫn trên URL
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
    // console.log(tabActive);
    // console.log(account);
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