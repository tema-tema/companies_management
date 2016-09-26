import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Companies from '/imports/api/companies.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  renderCompanies() {
    return this.props.companies.map((company) =>
      <div key={company._id}>
        <h1>{company.name}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <AccountsUIWrapper />
        </header>
        <br />
        {this.renderCompanies()}
      </div>
    );
  }
}

App.propTypes = {

};

export default createContainer(() => {
  Meteor.subscribe('companies');
  return {
    companies: Companies.find({}).fetch(),
  };
}, App);
