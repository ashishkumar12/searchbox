import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import SearchBox from './../components/SearchBox';
class Home extends Component {
    state = {
        articles: []
    };
    componentWillMount(){
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    componentDidCatch(err){
        console.log('err',err);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="8" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} className="text-center" style={{marginTop : '25vh'}}>
                        <h1>Seach with Me!</h1>
                        <SearchBox/>
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
export default connect(mapStateToProps, {})(Home);