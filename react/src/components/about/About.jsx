
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export const About = () => {
    return <div className="container">
        <h1 className="m-2">Chef Food</h1>
        <p className="m-2">ChefFood là website bán đồ ăn nhanh uy tín tại Việt Nam với hơn 10 năm kinh nghiệm. Chúng tôi tự hào mang đến cho khách hàng:
        </p>
        <ul>
            <li><FontAwesomeIcon icon={faCheck} />&nbsp;Hệ thống nhà hàng đa dạng: Chef Food liên kết với hơn 1000 nhà hàng uy tín trên toàn quốc</li>
            <li><FontAwesomeIcon icon={faCheck} />&nbsp;Thực đơn phong phú: Thỏa mãn mọi sở thích với hàng ngàn món ăn ngon, từ món khai vị, món chính đến món tráng miệng. </li>
            <li><FontAwesomeIcon icon={faCheck} />&nbsp;Giao hàng nhanh chóng: Đội ngũ shipper chuyên nghiệp của ChefFood luôn sẵn sàng giao hàng đến tận nơi cho bạn trong thời gian ngắn nhất. </li>
            <li><FontAwesomeIcon icon={faCheck} />&nbsp;Giá cả hợp lý: ChefFood luôn cam kết mang đến cho khách hàng những sản phẩm chất lượng với giá cả cạnh tranh nhất.</li>
            <li><FontAwesomeIcon icon={faCheck} />&nbsp;Khuyến mãi hấp dẫn: Thường xuyên có các chương trình khuyến mãi, ưu đãi dành cho khách hàng.</li>

        </ul>
    </div>;
}