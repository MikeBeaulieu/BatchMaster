"use strict";

var React = require('react');
var Router = require('react-router');
var FintracImportForm = require('./fintracImportForm');
var FintracActions = require('../../actions/fintracActions');
var FintracStore = require('../../stores/fintracStore');
var toastr = require('toastr');

var ManageFintracImportPage = React.createClass({
  mixins: [
      Router.Navigation
  ],

  statics: {
      willTransitionFrom: function(transition, component) {
          if(component.state.dirty && !confirm('Leave without saving?')) {
              transition.abort();
          }
      }
  },

  getInitialState: function() {
      return {
          fintracimport: { tradeid: ''},
          errors: {},
          dirty: false
      };
  },

  componentWillMount: function() {
      console.log('componentWillMount:: props: ' + this.props.params.importid);
      var fintracImportId = this.props.params.importid; // from the path '/fintrac:importid'
      
      if (fintracImportId){
          this.setState({fintracimport: FintracStore.getFintracImportById(fintracImportId) });
      }
  },

  setFintracImportState: function(event) {
      this.setState( {dirty: true});
      var field = event.target.name;
      var value = event.target.value;
      this.state.fintracimport[field] = value;
      console.log('setFintracImportState::state: ' + this.state.fintracimport);
      return this.setState({fintracimport: this.state.fintracimport});
  },

  fintracFormIsValid: function() {
      var formIsValid = true;
      this.state.errors = {}; // clear any previous errors.

      if (this.state.fintracimport.header.tradeid.length < 6) {
          this.state.errors.tradeid = 'Trade ID must be at least 6 characers';
          formIsValid = false;
      }

      this.setState( {errors: this.state.errors});
      return formIsValid;
  },

  saveFintracImport: function(event) {
      event.preventDefault();

      if (!this.fintracFormIsValid()) {
          return;
      }

      if (this.state.FintracImportForm.id) {
          FintracActions.updateFintrac(this.state.fintracimport);
      } else {
        FintracActions.createFintrac(this.state.fintracimport);
      }    
      
      this.setState( {dirty: false});
      toastr.success('Import saved.');
      this.transitionTo('fintrac');
  },

  render: function() {
      console.log('render:: state: ' + this.state.fintracimport);

      return (
          <FintracImportForm
           fintracimport={this.state.fintracimport}
           onChange={this.setFintracImportState}
           onSave={this.saveFintracImport}
           errors={this.state.errors} />
      );
  }
});

module.exports = ManageFintracImportPage;