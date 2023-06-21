import React from "react";
import { Row, Col} from "reactstrap";

import {Link} from 'react-router-dom'


import './index.css';

function GoBook() {

  return (
    <div>
      <Row noGutters className="text-center align-items-center park-cta">
        <Col>
          <p className="looking-for-park">
            If you're looking for great park
            <i className="fas fa-park-slice park-slice"></i>
          </p>
          <Link to="/Book" className="book-Table-btn">Book a Table</Link>
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
      <Col>
          
        </Col>
        
      </Row>
    </div>
  );
};

export default GoBook
