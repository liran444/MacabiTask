import React, { Component } from 'react';
import TableComponent from "../table/table";
import axios from "axios";
import { server_url } from "../../config";
import { store } from "../../redux/store";
import { InitUsersArray } from "../../redux/action-type";
import ResponsiveDialog from "../dialog/dialog";
import "./main.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fields: [],
            directionSymbol: {
                symbol: 'asc'
            },
            is_modal_open: false,
        };
    }

    modalHandler = () => {
        let boolean = this.state.is_modal_open;
        this.setState({ is_modal_open: !boolean });
    }

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                users: store.getState().users,
            })
        );
        // Retrieving all users data from the server on init
        await this.getAllUsers();
    }

    async getAllUsers() {
        try {
            const response = await axios.get(
                `${server_url}/users/`
            );

            // response.data = all the users data that was retrieved from the server
            let usersData = response.data;
            let keys = Object.keys(usersData[0]);
            // Extracting the object keys so that we can use them as fields in our table
            this.setState({ users: usersData, fields: keys });

            store.dispatch({
                type: InitUsersArray,
                payload: usersData,
            });

        } catch (error) {
            console.log(error.response?.data);
            this.errorMessage = "Failed to get Users - " + error.response?.data;
            this.setState({ is_modal_open: true });
        }
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    /**
     * An on click function that sorts columns in two directions
     * Ascending and Descending,
     * The function gets a key (string) which helps in identifying the clicked
     * field/column on the table and then proceeds to sort it accordingly
     * @param {string} key - The field that was clicked on the table
     */
    onClickedSortColumn = (key) => {
        let usersStateCopy = [...this.state.users];
        this.setState({
            users: usersStateCopy.sort((a, b) => {
                const asc = this.state.directionSymbol[key] === 'asc';
                if (a[key] < b[key]) {
                    return asc ? -1 : 1;
                } else if (a[key] > b[key]) {
                    return asc ? 1 : -1;
                } else {
                    return 0;
                }
            }),

            directionSymbol: {
                [key]: this.state.directionSymbol[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            }
        });
    }

    render() {
        return (
            <div>
                <div className="mainHeadersContainer w-container">
                    <p className="mainheader">We Are Glad You Chose<br /> Macabi</p>
                    <p className="mainsubheader">Always by your side</p>
                    <p className="tableheader">Active Users:</p>

                    {
                        this.state.users?.length === 0 && (
                            // If there are no users then this message will be displayed
                            <span className="alertMessage">
                                There are no users to display at this moment
                            </span>
                        )
                    }
                </div>
                {(this.state.users?.length !== 0 && this.state.fields?.length !== 0) && (
                    <TableComponent fields={this.state.fields} data={this.state.users}
                        onClickedSortColumn={this.onClickedSortColumn} isColumnSorted={this.state.directionSymbol} />
                )}

                {this.state.is_modal_open && (
                    <ResponsiveDialog
                        open={this.state.is_modal_open}
                        admin_state={this.admin_state}
                        onClose={() => this.modalHandler()}
                        errorMessage={this.errorMessage}
                    />
                )}
            </div>
        );
    }
}

export default Main;
