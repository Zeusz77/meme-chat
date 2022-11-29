import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../../utils/withRouter';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componenetWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            handle: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.password2
        };

        this.props.registerUser(newUser, this.props.router.navigate);
    }

  render() {

    const { errors } = this.props.errors;

    return (
    <div className="register">
        <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <input type="text" className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.handle
                })} 
                    placeholder="Name" name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                />
                {errors.handle ? <div className="invalid-feedback">{errors.handle}</div> : null}
                </div>
                <div className="form-group">
                <input type="email" className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.email
                })} 
                    placeholder="Email Address" name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                />
                {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                <input type="password" className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.password
                })} 
                    placeholder="Password" name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                />
                {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
                </div>
                <div className="form-group">
                <input type="password" className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.passwordConfirm
                })} 
                    placeholder="Confirm Password" name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                />
                {errors.passwordConfirm ? <div className="invalid-feedback">{errors.passwordConfirm}</div> : null}
                </div>
                <input type="submit" className="btn btn-lg btn-primary mt-4 w-100" />
            </form>
            </div>
        </div>
        </div>
    </div>
    )
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));