import {MenuItem} from 'reactstrap';
import {AsyncTypeahead,Menu, menuItemContainer} from 'react-bootstrap-typeahead';
import React,{Component,Fragment} from 'react';
import {FormGroup} from 'reactstrap';
import { Badge } from 'reactstrap';
const jsonData = require('./../../../helpers/products.json');

class SearchBox extends Component {
    state = {
      allowNew: false,
      isLoading: false,
      multiple: false,
      options: [],
    };
  
    _handleSearch = (query) => {
      this.setState({isLoading: true});
      const timer = setTimeout(() => {
          const options = jsonData.ProductCollection;
            this.setState({
                isLoading: false,
                options,
            });
            clearTimeout(timer);
      },1000);
    }
    render() {
        return (
          <div>
            <AsyncTypeahead
              {...this.state}
              labelKey="Name"
              filterBy={['Name','MainCategory','Category', 'SupplierName']}
              minLength={3}
              onSearch={this._handleSearch}
              placeholder="Search your product here..."
              renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                  {results.map((product,index) => (
                      <li key={index} className="dropdown-item">
                          <a href={`/products/${product.ProductId}`} className="search-list-item">
                            {product.Name} @ {product.Price} {product.CurrencyCode}
                            <small className="pull-right">{product.Category} <Badge color="secondary">{product.Quantity}</Badge></small>
                         </a>
                      </li>
                  ))}
                </Menu>
              )}
            />
          </div>
        );
      }
    
  }
  
  export default SearchBox;