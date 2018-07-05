    import React,{Component} from 'react';
    import { Row, Col } from 'reactstrap';
    import { Card, CardImg, CardText, CardBody,
        CardTitle, CardSubtitle, Button } from 'reactstrap';
    class ProductDetails extends Component{
        render(){
            const {product} = this.props;
            return(
                <Row style={{marginTop : '4em'}}>
                    <Col xs="12" md="12" lg="4">
                        <img src="https://www.polarpak.ca/img/no-image.png" className="img-responsive"/>
                    </Col>
                    <Col xs="12" md="12" lg="8">
                        <Card>
                            <CardBody>
                                <CardTitle>{product.Name}</CardTitle>
                                <dl className="item-property">
                                    <dd>
                                    <small>{product.Category} | {product.MainCategory}</small>
                                    </dd>
                                </dl>
                                <dl className="item-property">
                                    <dt>Price</dt>
                                    <dd className="text-success">{product.CurrencyCode} {product.Price}</dd>
                                </dl>
                                <dl className="item-property">
                                    <dt>Description</dt>
                                    <dd>{product.Description}</dd>
                                </dl>
                                <dl className="item-property">
                                    <dt>Availability</dt>
                                    <dd>{product.Status}</dd>
                                </dl>
                                <dl className="item-property">
                                    <dt>Dimensions</dt>
                                    <dd>{product.Height} x {product.Width} x {product.Depth} {product.DimUnit}</dd>
                                </dl>
                                <dl className="item-property">
                                    <dt>Supplier</dt>
                                    <dd>{product.SupplierName}</dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }

    export default ProductDetails;