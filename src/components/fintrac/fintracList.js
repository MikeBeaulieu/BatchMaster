"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var FintracActions = require('../../actions/fintracActions');
var toastr = require('toastr');

var FintracList = React.createClass({
  propTypes: {
		fintracimports: React.PropTypes.array.isRequired
	},
  render: function(){
    
    var createImportRow = function(theimport){
     
      return (
        <tr key={theimport.header.tradeid} >
          <td><Link to="manageFintracImport" params={{importid: theimport.importid}}>{theimport.importid}</Link></td>
          <td><Link to="manageFintracImport" params={{importid: theimport.header.tradeid}}>{theimport.header.tradeid}</Link></td>
         
          <td>{theimport.header.transactionid}</td>
          <td>{theimport.header.transactionsource}</td>
          <td>{theimport.header.reporttype}</td>
          </tr>
      );
    };
    return (
      <div>
        <table className="table">
          <thead>
            <th>Import ID</th>
            <th>Trade ID</th>
            <th>Trans #</th>
            <th>Trans Source</th>
            <th>Trans Type</th>
            </thead>
            <tbody>
              {this.props.fintracimports.map(createImportRow, this)}
              </tbody>
          </table>
        </div>
    );
  }
});

module.exports = FintracList;
