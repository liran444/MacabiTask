import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./layout.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import MainPage from "../main/main";

class Layout extends Component {
    render() {
        return (
            <BrowserRouter>
                <section className="layout">
                    <header>
                        <Header />
                    </header>

                    <main>
                        <Switch>
                            <Route path="/mainPage" component={MainPage} exact />
                            <Redirect from="/" to="/mainPage" exact />
                            <Redirect from="**" to="/mainPage" exact />
                        </Switch>
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </section>
            </BrowserRouter>
        );
    }
}

export default Layout;