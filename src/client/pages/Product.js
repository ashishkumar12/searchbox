import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import ProductDetails from './../components/ProductDetails';
const jsonData = require('./../../helpers/products.json');
class Product extends Component {
    state = {
    };
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    componentDidCatch(err){
        console.log('err',err);
    }
    render() {
        const {product_id} = this.props.match.params;
        const product = jsonData.ProductCollection.filter((obj) => obj.ProductId == product_id);
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <ProductDetails product={product[0]}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export const loadData = (store) => {
    return [
    ];
}
const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, {})(Product);