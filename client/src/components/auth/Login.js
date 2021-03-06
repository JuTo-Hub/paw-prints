import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "../layout/footer.css"
import GetAllPosts from "../layout/GetAllPosts";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }


  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //Redux 
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }


  handleRegisterChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    console.log(userData);
  };

  render() {
    const { errors } = this.state;
    console.log(this.props.auth);
    return (
      <div className="background">
        <div className="hero-section noBackground">
          <div className="container">
            <h1 id="title">PawPrints</h1>
            <h3 className="subTitle">Helping You Find Your Lost Companion</h3>
            <hr />
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2 nerko">

                <Link to="/" className="btn-flat waves-effect">
                  <i className="material-icons left">keyboard_backspace</i>
                  Back to home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4 className="nerko">
                    <b>Login</b> below
                  </h4>
                  <p className="grey-text text-darken-1 nerko">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                      <div className="medium-3 cell"></div>
                      <div className="medium-6 cell">
                        <label htmlFor="email">Email</label>
                        <input
                          onChange={this.handleRegisterChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                          type="email"
                          placeholder="Email"
                          className={classnames("input radius cell", { invalid: errors.email || errors.emailnotfound })}
                        />
                        
                        <span className="red-text">
                          {errors.email}
                          {errors.emailnotfound}
                        </span>
                      </div>
                      <div className="medium-3 cell"></div>
                      <div className="medium-3 cell"></div>
                      <div className="medium-6 cell">
                        <label htmlFor="password">Password
                          <input
                            onChange={this.handleRegisterChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            placeholder="Password"
                            className={classnames("", { invalid: errors.password || errors.passwordincorrect })}
                          />
                        </label>
                        <span className="red-text">
                          {errors.password}
                          {errors.passwordincorrect}
                        </span>
                      </div>
                      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <div class="medium-6 cell">
                          <button type="submit" class="radius success button large" id="signUpButton">
                            Log In
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-section noBackground">
          <div className="col s12 center-align">
            <GetAllPosts />
            {/* 
                    The home page for loggen in people will include this page.
                    After creating a post, people will be redirected here
                  */}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,

  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);