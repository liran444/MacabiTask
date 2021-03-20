import React, { Component } from "react";
import "./header.css";
import ResponsiveDialog from "../dialog/dialog";
import logo from "../../assets/macabi_logo.png";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_modal_open: false,
        };
    }

    modalHandler = () => {
        let boolean = this.state.is_modal_open;
        this.setState({ is_modal_open: !boolean });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top topHeadersContainer w-container">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="font-weight-light">
                                Welcome to Macabi
                            </span>
                            <button
                                onClick={this.modalHandler}
                                className="btn btn-primary font-weight-bold headerButton"
                            >
                                Add User
                            </button>
                        </div>
                        <div className="float-right">
                            <img className="logo" src={logo} alt="logo" />
                        </div>
                    </div>
                </nav>

                {this.state.is_modal_open && (
                    <ResponsiveDialog
                        open={this.state.is_modal_open}
                        admin_state={this.admin_state}
                        onClose={() => this.modalHandler()}
                        errorMessage={""}
                    />
                )}
            </div>
        );
    }
}

