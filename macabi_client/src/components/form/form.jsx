import React, { Component } from "react";
import "./form.css";
import axios from "axios";
import { store } from "../../redux/store";
import { AddUser } from "../../redux/action-type";
import { server_url } from "../../config";
import { User } from "../../models/user";
import ResponsiveDialog from "../dialog/dialog";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            age: "",
            is_modal_open: false,
        };
        this.errorMessage = "";
    }

    onUsernameChanged = (args) => {
        const username = args.target.value;
        this.setState({ username });
    };

    onEmailChanged = (args) => {
        const email = args.target.value;
        this.setState({ email });
    };

    onAgeChanged = (args) => {
        const age = +args.target.value;
        this.setState({ age });
    };

    addUser = async () => {
        try {
            let addUserDetails = new User(
                this.state.username,
                this.state.email,
                this.state.age,
            );

            await axios.post(
                `${server_url}/users/`,
                addUserDetails
            );

            store.dispatch({
                type: AddUser,
                payload: addUserDetails,
            });
            // Closes the modal / Responsive Dialog
            this.props.onClose();
        } catch (error) {
            console.log(error.response?.data);
            this.errorMessage = "Failed to add User - " + error.response?.data;
            this.setState({ is_modal_open: true });
        }
    };

    /**
     * @param {object} event - The event of the form, used for preventing the form from refreshing
     * (its default action on submit) 
     */
    onFormSubmitted = async (event) => {
        event.preventDefault();
        await this.addUser();
    };

    isAgeValid = () => {
        let { age } = this.state;

        if (age < 1) {
            this.errorMessage = "Missing Age";
            return false;
        }
        if (age > 127) {
            this.errorMessage = "Invalid Age";
            return false;
        }

        return true;
    };

    isUsernameValid = () => {
        let { username } = this.state;
        if (!username) {
            this.errorMessage = "Missing Username";
            return false;
        }

        let username_length = username?.trim().length;
        let doesUsernameContainNumbers = /\d/.test(username);

        if (username_length < 2 || doesUsernameContainNumbers || username_length > 45) {
            this.errorMessage = "Username must contain between 2 - 45 letters";
            return false;
        }

        return true;
    }

    isEmailValid = () => {
        let { email } = this.state;
        if (!email) {
            this.errorMessage = "Missing Email";
            return false;
        }

        let email_length = email?.trim().length;
        let email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

        if (!email_pattern.test(email) || email_length > 45) {
            this.errorMessage = "Email address is invalid";
            return false;
        }

        return true;
    }


    isFormValid = () => {
        if (
            this.isUsernameValid() && this.isEmailValid() && this.isAgeValid()
        ) {
            return true;
        }

        return false;
    };

    onModalClosed() {
        this.setState({ is_modal_open: false });
        this.errorMessage = "";
    }

    render() {
        return (
            <div className="vacation-form">
                <form
                    className="vacation-form"
                    onSubmit={(event) => {
                        this.onFormSubmitted(event);
                    }}
                >
                    <div>
                        <div>
                            <span className="formSpan">Username:</span>
                            <input
                                type="text"
                                placeholder="* Enter Username..."
                                name="username"
                                value={this.state.username}
                                onChange={this.onUsernameChanged}
                            />

                            <span className="formSpan">Email:</span>
                            <input
                                type="text"
                                placeholder="* Enter Email..."
                                name="Email"
                                value={this.state.email}
                                onChange={this.onEmailChanged}
                            />

                            <span className="formSpan">Age:</span>
                            <input
                                type="number"
                                placeholder="* Enter Age"
                                name="age"
                                value={this.state.age || ""}
                                onChange={this.onAgeChanged}
                            />

                            {!this.isFormValid() && (
                                <div className="alertMessage">
                                    <span>{this.errorMessage}</span>
                                </div>
                            )}

                            {this.isFormValid() && (
                                <div className="center">
                                    <input type="submit" className="submitButton" />
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {this.state.is_modal_open && (
                    <ResponsiveDialog
                        open={this.state.is_modal_open}
                        onClose={() => this.onModalClosed()}
                        errorMessage={this.errorMessage}
                    />
                )}
            </div>
        );
    }
}
