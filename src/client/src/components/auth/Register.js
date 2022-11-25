import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';

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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            handle: this.state.name,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.password2
        };

        axios.post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }));
    }

  render() {

    const { errors } = this.state;

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

export default Register;