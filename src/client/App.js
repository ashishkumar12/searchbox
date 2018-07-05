import React,{Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCategories} from './actions';
class App extends Component{
    componentDidMount(){
        
    }
    render(){
        const {route} = this.props;
        const { disabled, checked } = this.props;
        return (
                <div className='app_wrapper'>
                    {renderRoutes(route.routes)}
                </div>
        );
    }
}


export default connect(null,{})(App);
