import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import './UserInfo.scss'
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image, Text } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, DivideTitle, FileUpload } from "../../components";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const AccountEdit = () => {
    const { userInfo } = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const [accountError, setAccountError] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/accounts/',
            withCredentials: true,
        })
            .then(res => setAccount(res.data))
            .catch(() => {

            })
    }, []);
    const handleChooseImage = (e) => {
        let name = e.target.name;
        let file = e.target.files[0];
        setAccount({ ...account, [name]: file })
    }
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAccount({ ...account, [name]: value })
    }
    const handleSubmit = (e) => {
        let data = { ...account, _method: "PATCH" };
        axios({
            method: 'post',
            url: `http://localhost:8000/api/accounts/${userInfo?.id}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Cập nhật thành công",
                    icon: 'success',
                });
                setAccountError([]);
            })
            .catch(res => {
                Swal.fire({
                    title: res?.response?.data?.message || "Cập nhật thất bại",
                    icon: 'error',
                });
                setAccountError(res?.response?.data?.errors);
            })
    }
    return <>
        <CardLayout>
        <DivideTitle as={"h2"} title="Cập nhật thông tin" className="mb-4" />
            <Col xl={12} className='mt-3'>
                {/* Ảnh đại diện */}
                {(account?.avatar instanceof File) && <Box className="mc-user-avatar"><Image src={URL.createObjectURL(account?.avatar)} alt={"Ảnh đại diện 1"} ></Image>
                </Box>}
                {!(account?.avatar instanceof File) && <Box className="mc-user-avatar"><Image src={account?.avatar?.startsWith('https') ? account?.avatar : (account?.avatar ? `http://localhost:8000/storage/uploads/${account?.avatar}` : `http://localhost:8000/storage/Uploads/no-avatar.png`)} alt={"Ảnh đại diện 2"} ></Image></Box>}

                <FileUpload icon="cloud_upload" text="Chọn ảnh" name="avatar" accept="image/png, image/jpeg, image/jpgm, image/gif" onChange={handleChooseImage} />
                {accountError?.avatar && <Text className={"text-danger text-center"}>{accountError?.avatar[0]}</Text>}
            </Col>
            <Col xl={12} className='mt-4'>
                <Row>
                    <Col xl={6}><LegendField title={"Họ"} value={account?.lastname} name="lastname" onInput={handleChange} alert={accountError?.lastname} /></Col>
                    <Col xl={6}><LegendField title={"Tên"} value={account?.firstname || ""} name="firstname" onInput={handleChange} alert={accountError?.firstname} /></Col>
                    <Col xl={6}><LegendTextarea title={"Mô tả"} value={account?.description || ""} name="description" onInput={handleChange} alert={accountError?.description} draggable="false"
                    /></Col>
                    <Col xl={6}><LegendField title={"Email"} value={account?.email || ""} name="email" onInput={handleChange} alert={accountError?.email} readonly={true} /></Col>
                    <Col xl={6}><LegendField title={"Số điện thoại"} value={account?.phone || ""}
                        name="phone" onInput={handleChange} alert={accountError?.phone} /></Col>
                    <Col xl={6}><LegendField title={"Giới tính"} option={[{ name: 'Nam' }, { name: 'Nữ' }]}
                        value={account?.gender}
                        name="gender" onInput={handleChange} alert={accountError?.gender} /></Col>
                    <Col xl={6}><LegendField title={"Địa chỉ"} value={account?.address || ""} name="address" onInput={handleChange} alert={accountError?.address} /></Col>
                    <Col xl={6}><LegendField type={"date"} title={"Ngày sinh"} value={account?.birthday || ""} name="birthday" onInput={handleChange} alert={accountError?.birthday} /></Col>
                    <Button className="mc-btn primary  text-right" icon="add_circle" text="Cập nhật tài khoản" onClick={handleSubmit} />
                </Row>

            </Col>
        </CardLayout>    </>
}