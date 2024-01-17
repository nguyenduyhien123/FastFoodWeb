import React from "react";
import Box from "../elements/Box";
import CardHeader from "./CardHeader";
import Pagination from "../Pagination";
import { LabelField } from "../fields";
import { Row, Col } from "react-bootstrap";
import ProductsTable from "../tables/ProductsTable";

export default function ProductsCard({ title, dotsMenu, table }) {
    return (
        <Box className="mc-card">
            <CardHeader title={ title } dotsMenu={ dotsMenu } />
            <Row xs={1} sm={2} xl={4} className="mb-4">
                {table.filter.map((item, index)=> (
                    <Col key={ index }>
                        <LabelField
                            type = { item.type }
                            label = { item.label }
                            option = { item.option }
                            placeholder = { item.placeholder }
                            labelDir = "label-col"
                            fieldSize = "w-100 h-md"
                        />
                    </Col>
                ))}
            </Row>
            <ProductsTable thead={ table.thead } tbody={ table.tbody } />
            <Pagination />
        </Box>
    )
}