import React from 'react';
import './OpenESOP.scss';
import {web3} from '../web3'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Init extends React.Component {

    constructor(props) {
        super(props);
        this.store = props.store;
        this.services = props.services;

        this.state = {
            allowValidation: false,
            totalPoolOptions: '',
            totalPoolOptionsValidation: '',
            cliffPeriod: '',
            cliffPeriodValidation: '',
            vestingPeriod: '',
            vestingPeriodValidation: '',
            residualAmount: '',
            residualAmountValidation: '',
            bonusOptions: '',
            bonusOptionsValidation: '',
            newEmployeePool: '',
            newEmployeePoolValidation: '',
            optionsPerShare: '',
            optionsPerShareValidation: '',
            ESOPLegalWrapperIPFSHash: '',
            ESOPLegalWrapperIPFSHashValidation: ''
        };
    }

    validateTotalPoolOptions = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'value must be bigger than zero';
        }
        this.setState({totalPoolOptionsValidation: validationOutcome});
        return validationOutcome;
    };

    validateCliffPeriod = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'time period must be bigger than zero';
        }
        this.setState({cliffPeriodValidation: validationOutcome});
        return validationOutcome;
    };

    validateVestingPeriod = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'time period must be bigger than zero';
        }
        this.setState({vestingPeriodValidation: validationOutcome});
        return validationOutcome;
    };

    validateResidualAmount = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'value must be bigger than zero';
        }
        this.setState({residualAmountValidation: validationOutcome});
        return validationOutcome;
    };

    validateBonusOptions = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'value must be bigger than zero';
        }
        this.setState({bonusOptionsValidation: validationOutcome});
        return validationOutcome;
    };

    validateNewEmployeePool = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'value must be bigger than zero';
        }
        this.setState({newEmployeePoolValidation: validationOutcome});
        return validationOutcome;
    };

    validateOptionsPerShare = (value) => {
        let validationOutcome = value === '' ? "please fill this field" : "";

        if (validationOutcome == "") {
            let num = parseInt(value);
            if (isNaN(num))
                validationOutcome = 'value us not a number';
            else if (num <= 0)
                validationOutcome = 'value must be bigger than zero';
        }
        this.setState({optionsPerShareValidation: validationOutcome});
        return validationOutcome;
    };

    validatESOPLegalWrapperIPFSHash = (value) => {
        let validationOutcome = value === "" ? "please fill this field" : "";
        this.setState({ESOPLegalWrapperIPFSHashValidation: validationOutcome});
        return validationOutcome;
    };

    handleTextFieldChange = (fieldName, validateFunction) =>
        (event, newValue) => {
            let obj = {};
            obj[fieldName] = newValue;
            this.setState(obj);
            if (this.state.allowValidation) {
                validateFunction(newValue);
            }
        };

    validateFields = () => {
        let validateTotalPoolOptions = this.validateTotalPoolOptions(this.state.totalPoolOptions) == '';
        let validateCliffPeriod = this.validateCliffPeriod(this.state.cliffPeriod) == '';
        let validateVestingPeriod = this.validateVestingPeriod(this.state.vestingPeriod) == '';
        let validateResidualAmount = this.validateResidualAmount(this.state.residualAmount) == '';
        let validateBonusOptions = this.validateBonusOptions(this.state.bonusOptions) == '';
        let validateNewEmployeePool = this.validateNewEmployeePool(this.state.newEmployeePool) == '';
        let validateOptionsPerShare = this.validateOptionsPerShare(this.state.optionsPerShare) == '';
        let validatESOPLegalWrapperIPFSHash = this.validatESOPLegalWrapperIPFSHash(this.state.ESOPLegalWrapperIPFSHash) == '';

        return validateTotalPoolOptions && validateCliffPeriod && validateVestingPeriod
            && validateResidualAmount && validateBonusOptions && validateNewEmployeePool && validateOptionsPerShare
            && validatESOPLegalWrapperIPFSHash;
    };

    handleOpenEsopButton = () => {

        this.setState({allowValidation: true});
        let formIsValid = this.validateFields();

        if (!formIsValid) {
            return;
        }
        console.log('open esop');
        return;

        let year = 365 * 24 * 60 * 60;

        let totalPoolOptions = parseInt(this.state.totalPoolOptions);
        let ESOPLegalWrapperIPFSHash = web3.toBigNumber('0x' + new Buffer(this.state.ESOPLegalWrapperIPFSHash, 'ascii').toString('hex'));
        let cliffPeriod = parseInt(this.state.cliffPeriod) * year;
        let vestingPeriod = parseInt(this.state.vestingPeriod) * year;
        let residualAmount = parseInt(this.state.residualAmount) * 100;
        let bonusOptions = parseInt(this.state.bonusOptions) * 100;
        let newEmployeePool = parseInt(this.state.newEmployeePool) * 100;
        let optionsPerShare = parseInt(this.state.optionsPerShare);

        this.store.dispatch({
            type: "SHOW_CONFIRM_TRANSACTION_DIALOG",
            confirmTransactionDialog: true
        });

        this.services.ESOPService.openESOP(totalPoolOptions, ESOPLegalWrapperIPFSHash, cliffPeriod, vestingPeriod,
            residualAmount, bonusOptions, newEmployeePool, optionsPerShare).then(
            success => {
                this.services.ESOPService.getESOPDataFromContract();
                this.services.ESOPService.obtainContractAddreses();
                this.store.dispatch({
                    type: "SHOW_CONFIRM_TRANSACTION_DIALOG",
                    confirmTransactionDialog: false
                });
            },
            error => {
                this.store.dispatch({
                    type: "SHOW_CONFIRM_TRANSACTION_DIALOG",
                    confirmTransactionDialog: false
                });

                this.store.dispatch({
                    type: "SHOW_ERROR_DIALOG",
                    errorDialog: true
                });
                console.log(error);
            }
        );
    };

    render() {
        let ESOPState = this.store.getState().ESOP;
        let UIstate = this.store.getState().UI;
        let userState = this.store.getState().user;

        let textFieldsProps = {};

        textFieldsProps.totalPoolOptionsProps = {
            floatingLabelText: "total pool options",
            className: "contract_parameter",
            value: this.state.totalPoolOptions,
            onChange: this.handleTextFieldChange("totalPoolOptions", this.validateTotalPoolOptions)
        };

        textFieldsProps.cliffPeriodProps = {
            floatingLabelText: "cliff period [years]",
            className: "contract_parameter",
            value: this.state.cliffPeriod,
            onChange: this.handleTextFieldChange("cliffPeriod", this.validateCliffPeriod)
        };

        textFieldsProps.vestingPeriodProps = {
            floatingLabelText: "vesting period [years]",
            className: "contract_parameter",
            value: this.state.vestingPeriod,
            onChange: this.handleTextFieldChange("vestingPeriod", this.validateVestingPeriod)
        };

        textFieldsProps.residualAmountProps = {
            floatingLabelText: "residual amount [%]",
            className: "contract_parameter",
            value: this.state.residualAmount,
            onChange: this.handleTextFieldChange("residualAmount", this.validateResidualAmount)
        };

        textFieldsProps.bonusOptionsProps = {
            floatingLabelText: "bonus options[%]",
            className: "contract_parameter",
            value: this.state.bonusOptions,
            onChange: this.handleTextFieldChange("bonusOptions", this.validateBonusOptions)
        };

        textFieldsProps.newEmployeePoolProps = {
            floatingLabelText: "new employee % of pool [%]",
            className: "contract_parameter",
            value: this.state.newEmployeePool,
            onChange: this.handleTextFieldChange("newEmployeePool", this.validateNewEmployeePool)
        };

        textFieldsProps.optionsPerShareProps = {
            floatingLabelText: "options per share",
            className: "contract_parameter",
            value: this.state.optionsPerShare,
            onChange: this.handleTextFieldChange("optionsPerShare", this.validateOptionsPerShare)
        };

        textFieldsProps.ESOPLegalWrapperIPFSHashProps = {
            floatingLabelText: "ESOP Legal Wrapper IPFS Hash",
            style: {width: "32.000rem"},
            value: this.state.ESOPLegalWrapperIPFSHash,
            onChange: this.handleTextFieldChange("ESOPLegalWrapperIPFSHash", this.validatESOPLegalWrapperIPFSHash)
        };

        if (this.state.allowValidation) {
            textFieldsProps.totalPoolOptionsProps.errorText = this.state.totalPoolOptionsValidation;
            textFieldsProps.cliffPeriodProps.errorText = this.state.cliffPeriodValidation;
            textFieldsProps.vestingPeriodProps.errorText = this.state.vestingPeriodValidation;
            textFieldsProps.residualAmountProps.errorText = this.state.residualAmountValidation;
            textFieldsProps.bonusOptionsProps.errorText = this.state.bonusOptionsValidation;
            textFieldsProps.newEmployeePoolProps.errorText = this.state.newEmployeePoolValidation;
            textFieldsProps.optionsPerShareProps.errorText = this.state.optionsPerShareValidation;
            textFieldsProps.ESOPLegalWrapperIPFSHashProps.errorText = this.state.ESOPLegalWrapperIPFSHashValidation;
        }

        return (
            <div className="new_esop">
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1">
                        <h1>New ESOP</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-offset-1">
                        <h2>ESOP contract addresses</h2>
                        <TextField floatingLabelText="Root of Trust" value={ESOPState.RoTAddress}
                                   style={{width: "32.000rem"}} disabled={true}/> <br />
                        <TextField floatingLabelText="ESOP smart contract" value={ESOPState.ESOPAddress}
                                   style={{width: "32.000rem"}} disabled={true}/> <br />
                    </div>
                </div>

                {//userState.userType != "ceo" ?
                    userState.userType == "cos" ?
                        <div className="row">
                            <div className="col-xs-12 col-md-10 col-md-offset-1">
                                <h3>Please use company account to open ESOP</h3>
                            </div>
                        </div> :
                        <div>
                            <div className="row">
                                <div className="col-xs-12 col-md-10 col-md-offset-1">
                                    <h2>Please fill esop params and open esop</h2>

                                    <TextField {...textFieldsProps.totalPoolOptionsProps}/>
                                    <TextField {...textFieldsProps.cliffPeriodProps}/>
                                    <TextField {...textFieldsProps.vestingPeriodProps}/>
                                    <TextField {...textFieldsProps.residualAmountProps}/>
                                    <TextField {...textFieldsProps.bonusOptionsProps}/>
                                    <TextField {...textFieldsProps.newEmployeePoolProps}/>
                                    <TextField {...textFieldsProps.optionsPerShareProps}/>
                                    <br />
                                    <TextField {...textFieldsProps.ESOPLegalWrapperIPFSHashProps}/>
                                    <RaisedButton label="Validate doc" className="validate_button"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-md-10 col-md-offset-1">
                                    <RaisedButton label="Open ESOP" onClick={this.handleOpenEsopButton}
                                                  className="start_button"/>
                                </div>
                            </div>

                        </div>
                }
            </div>
        )
    }
};