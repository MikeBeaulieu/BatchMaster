"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

var FintracStore = require('../../stores/fintracStore');
var FintracActions = require('../../actions/fintracActions');
var FintracList = require('./fintracList');

var FintracPage = React.createClass({
  getInitialState: function(){
    return {
      fintracimports: FintracStore.getAllImports()
    };
  },
  render: function(){
    return (
      <div>
        <h1>FINTRAC Imports</h1>
        <FintracList fintracimports={this.state.fintracimports}/>
        </div>
    );
  }

});

module.exports = FintracPage;
