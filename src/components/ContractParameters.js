import React from 'react';
import './ContractParameters.scss';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

export default ({contractParameters, onClickTap}) => {
    return (
        <div className="col-xs-12 contract_parameters">
            <TextField floatingLabelText="cliff period" className="contract_parameter"  value={contractParameters.cliffPeriod} disabled={true}/>
            <TextField floatingLabelText="vesting period" className="contract_parameter"  value={contractParameters.vestingPeriod} disabled={true}/>
            <TextField floatingLabelText="max fadeout promille" className="contract_parameter" value={contractParameters.maxFadeoutPromille} disabled={true}/>
            <TextField floatingLabelText="bonus options promille" className="contract_parameter"  value={contractParameters.bonusOptionsPromille} disabled={true}/>
            <TextField floatingLabelText="new employee pool promille" className="contract_parameter"  value={contractParameters.newEmployeePoolPromille} disabled={true}/>
            <TextField floatingLabelText="total pool options" className="contract_parameter"  value={contractParameters.totalPoolOptions} disabled={true}/>
            <TextField floatingLabelText="strike price" className="contract_parameter"  value={contractParameters.strikePrice} disabled={true}/>
            <TextField floatingLabelText="wait for sign period" className="contract_parameter"  value={contractParameters.waitForSignPeriod} disabled={true}/>
            <RaisedButton label="Show Paper Contract" className="contract_parameter" onTouchTap={onClickTap}/>
        </div>
    )
};