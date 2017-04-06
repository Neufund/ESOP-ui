import React from 'react';
import './Esop.scss';

import chart from '../images/esop_chart.jpg';
import paperContract from '../images/contract.png';

import EmployeeList from '../components/EmployeeList'
import EmployeeAdd from '../components/EmployeeAdd'
import EmployeeDetails from '../components/EmployeeDetails'
import ContractAddresses from '../components/ContractAddresses'
import ContractStats from '../components/ContractStats'

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';

export default class Esop extends React.Component {

    constructor(props) {
        super(props);
        this.store = props.store;

        this.state = {
            esop_desc_open: false,
            paper_contract_open: false
        };
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleEsopDescOpen = () => {
        this.setState({esop_desc_open: true});
    };

    handleEsopDescClose = () => {
        this.setState({esop_desc_open: false});
    };

    handlePaperContractOpen = () => {
        this.setState({paper_contract_open: true});
    };

    handlePaperContractClose = () => {
        this.setState({paper_contract_open: false});
    };

    render() {
        let userState = this.store.getState().user;
        let ESOPState = this.store.getState().ESOP;

        let contractStats = {
            ESOPState: ESOPState.ESOPState,
            employeesNo: ESOPState.employees.length,
            optionsGiven: ESOPState.totalOptions - ESOPState.remainingOptions,
            optionsLeft: ESOPState.remainingOptions
        };

        const actions = [
            <IconButton tooltip="Download">
                <FontIcon className="material-icons">file_download</FontIcon>
            </IconButton>,
            <IconButton tooltip="Print">
                <FontIcon className="material-icons">print</FontIcon>
            </IconButton>,
        ];

        return (
            <div className="row">
                <div className="col-xs-12 col-md-10 col-md-offset-1">
                    <div className="esop">
                        <div className="row">
                            <div className="col-xs-12 col-md-3">
                                <h1>Neufund ESOP details</h1>
                            </div>
                            <div className="col-xs-12 col-md-7 read_more">
                                <RaisedButton className="read_more_button" label="Read more what ESOP is"
                                              onTouchTap={this.handleEsopDescOpen}/>
                            </div>
                        </div>

                        <ContractAddresses RoTAddress="0xc41e8639e44d551eb9f96149de3d2bc3e9cd72df"
                                           ESOPAddress={ESOPState.ESOPAddress}
                                           OptionsConverterAddress={ESOPState.optionsConverter}/>
                        <ContractStats contractStats={contractStats}/>
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Contract parameters:</h2>
                            </div>
                        </div>

                        <div className="row">
                            <Tabs>
                                <Tab label="Parameters">
                                    <div className="col-xs-12 contract_parameters">
                                        <TextField floatingLabelText="cliff duration" className="contract_parameter"
                                                   value="1 year" disabled={true}/>
                                        <TextField floatingLabelText="vesting duration" className="contract_parameter"
                                                   value="4 years" disabled={true}/>
                                        <TextField floatingLabelText="max fadeout promille"
                                                   className="contract_parameter"
                                                   value="20%" disabled={true}/>
                                        <TextField floatingLabelText="exit bonus promille"
                                                   className="contract_parameter"
                                                   value="25%" disabled={true}/>
                                        <TextField floatingLabelText="new employee pool promille"
                                                   className="contract_parameter"
                                                   value="10%" disabled={true}/>
                                        <TextField floatingLabelText="total options" className="contract_parameter"
                                                   value="1 000 000" disabled={true}/>

                                        <RaisedButton label="Show Paper Contract" className="contract_parameter"
                                                      onTouchTap={this.handlePaperContractOpen}/>
                                    </div>
                                </Tab>
                                <Tab label="Visualisation">
                                    <div className="col-xs-12">
                                        <img className="contract_chart" src={chart}/>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Employees:</h2>
                            </div>
                        </div>
                        {userState.userType == "ceo" &&
                        <EmployeeAdd/>
                        }

                        <div className="row">
                            <div className="col-xs-12">
                                <EmployeeList/>
                            </div>
                        </div>

                        {(userState.userType == "ceo" || userState.userType == "employee") &&
                        <div className="row">
                            <div className="col-xs-12 ">
                                <EmployeeDetails store={this.store}/>
                            </div>
                        </div>
                        }

                        {userState.userType == "ceo" &&
                        <div className="row">
                            <div className="col-xs-12 convert_options">
                                <h2>Convert options:</h2>
                                <TextField floatingLabelText="Convert options contract address"
                                           style={{width: "32.000rem"}}/>
                                <br />
                                <RaisedButton className="read_more_button" label="Convert options"
                                              onTouchTap={() => alert("This will close ESOP and convert options")}/>
                            </div>
                        </div>
                        }

                        <Dialog
                            modal={false}
                            open={this.state.esop_desc_open}
                            onRequestClose={this.handleEsopDescClose}
                        >
                            <h2>Short introduction</h2>
                            <p>So generally it should be something short with link to our github page where user will
                                find long
                                detailed description</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Audax negotium, dicerem
                                impudens, nisi
                                hoc institutum postea translatum ad philosophos nostros esset. Igitur ne dolorem
                                quidem.</p>
                            <p>Mihi enim satis est, ipsis non satis. Duo Reges: constructio interrete. Deinde disputat,
                                quod
                                cuiusque generis animantium statui deceat extremum. Indicant pueri, in quibus ut in
                                speculis
                                natura cernitur. Qui non moveatur et offensione turpitudinis et comprobatione
                                honestatis? Ait
                                enim se, si uratur, Quam hoc suave! dicturum. Urgent tamen et nihil remittunt. An hoc
                                usque
                                quaque, aliter in vita? Ille vero, si insipiens-quo certe, quoniam tyrannus -, numquam
                                beatus;
                                Quis non odit sordidos, vanos, leves, futtiles?</p>
                            <p>Progredientibus autem aetatibus sensim tardeve potius quasi nosmet ipsos cognoscimus.
                                Quam illa
                                ardentis amores excitaret sui! Cur tandem? Hoc est non modo cor non habere, sed ne
                                palatum
                                quidem. At iste non dolendi status non vocatur voluptas. Ratio quidem vestra sic cogit.
                                Videsne
                                quam sit magna dissensio? Qui igitur convenit ab alia voluptate dicere naturam
                                proficisci, in
                                alia summum bonum ponere? Quamquam id quidem licebit iis existimare, qui legerint.</p>

                            <p><a target="_blank" href="https://github.com/Neufund/ESOP">This is link click me</a></p>
                        </Dialog>

                        <Dialog
                            modal={false}
                            open={this.state.paper_contract_open}
                            onRequestClose={this.handlePaperContractClose}
                            actions={actions}
                        >
                            <h2>Paper contract</h2>
                            <div>
                                <img className="paper_contract_img" src={paperContract}/>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
};