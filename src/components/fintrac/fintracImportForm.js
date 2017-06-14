"use strict";

var React = require('react');
var Input = require('../common/textInput');

var FintracImportForm = React.createClass({
    propTypes: {
        fintracimport: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>Manage FINTRAC Import</h1>
                <Input
                    name="tradeid"
                    label="Trade ID"
                    value={this.props.fintracimport.header.tradeid}
                    onChange={this.props.onChange}
                    error={this.props.errors.tradeid} />

                <Input
                    name="transactionid"
                    label="Transaction ID"
                    value={this.props.fintracimport.header.transactionid}
                    onChange={this.props.onChange}
                    error={this.props.errors.tradeid} />    

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = FintracImportForm;