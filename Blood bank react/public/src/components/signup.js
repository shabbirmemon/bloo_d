import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { FirebaseService } from '../helpers/firebaseService'
import { signUp } from '../store/action/auth'
import { SignupComponent } from '../container/signup'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            age: '',
            address: '',
            mobile: '',
            date: '',
            email: '',
            pass: ''
        }
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
        e.preventDefault();
        let multipath = {};
        let newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            address: this.state.address,
            mobile: this.state.mobile,
            date: this.state.date,
            email: this.state.email,
            pass: this.state.pass,
            blood: this.state.blood,
            A: ["A", "O"].indexOf(this.state.blood) !== -1 ? true : null,
            AB: ["A", "O", "AB", "B"].indexOf(this.state.blood) !== -1 ? true : null,
            B: ["B", "O"].indexOf(this.state.blood) !== -1 ? true : null,
            O: ["O"].indexOf(this.state.blood) !== -1 ? true : null,
            }
        FirebaseService.customAuth(newUser).then((user) => {
            multipath[`users/${user.uid}`] = newUser;
            FirebaseService.saveMultipath(multipath)
            newUser['uid'] = this.state.uid
            this.props.signUp(this.state)
            localStorage.setItem('currentUser', user.uid);
            this.context.router.push({
                pathname: "/donorList"
            })
        }).catch((error) => alert(error.message))
    }
    render() {
        return (
            <div className='commentBox'>
                <SignupComponent signUpState={this.state} _inputHandler={this.inputHandler} _submit={this.submit} />
                <Link to="/login">Login Account</Link>
            </div>
        );
    }
}
Register.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => { 
    return {
        authReducer: state
    }
}
const mapDispatchToProps = (dispatch) => { 
    return {
        signUp: (data) => {
            dispatch(signUp(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);