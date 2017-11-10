import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FindDonors } from '../store/action/auth'
import { FirebaseService } from '../helpers/firebaseService'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


class Donors extends Component {
    constructor(props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
        this.logOut = this.logOut.bind(this)
        this.state = { arr: [] }
    }
    onSearch(e) {
        let _self = this;
        e.preventDefault()
        let ref = FirebaseService.ref.child("/users");
        _self.arr = [];
        ref.orderByChild(this.refs.blood.value).equalTo(true).once('value', function (snapshot) {
            snapshot.forEach(childSnapshot => {
                _self.arr.push(childSnapshot.val())
            })
            _self.props.findDonor(_self.arr)
            _self.setState({
                arr: _self.props.storeReducer.user
            })
        });
    }
logOut(){
    FirebaseService.auth.signOut().then((u)=> {
        // console.log(u)
         this.context.router.push({
                pathname: "/login"
            })
}, (error)=> {
    alert(error)
    console.log(error)
});
}
    render() {
        const btn = {
            margin: "10px"
        }
        const style = {
            fontSize: '20px',
            padding: '2px 23px 2px 23px',
            boxShadow: '6px 6px 6px blue',
            border: 'outset 3px red'
        }

        const table = {
  height: 340,
  width: 430,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
   background : 'wheat',
   color : '#009999'
};

        return (
            <div className="App">
                    <RaisedButton label="LogOut" primary={true} style={btn} onClick={this.logOut} />
            
                <h1>Select Your Blood </h1>
                <form onSubmit={this.onSearch}>
                    <select style={style}
                        required
                        ref="blood">
                        <option>Blood Type   </option>
                        <option value="A">A   </option>
                        <option value="B">B   </option>
                        <option value="O">O   </option>
                        <option value="AB">AB </option>
                    </select>
                    <br />
                    <RaisedButton label="Check" type="submit" primary={true} style={btn} />
                </form>

                {this.state.arr.map((v, i) => {
                    return (
                <div>
                    <Paper style={table} zDepth={2}>

                    <table key={i}>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>
                            {v.firstname } {v.lastname} </td>
                            <hr/>
                            </tr> <hr/>
                            <tr>
                                <th>Email</th>
                                <td>
                            {v.email} </td>
                            </tr>
                            <hr/>
                            <tr>
                                <th>Age</th>
                                <td>
                            {v.age} </td>
                            </tr>
                            <hr/>
                            <tr>
                                <th>Address</th>
                                <td>
                            {v.address} </td>
                            </tr>
                            <hr/>
                            <tr>
                                <th>Mobile</th>
                                <td>
                            {v.mobile} </td>
                            </tr>
                            <hr/>
                            <tr>
                                <th>Date</th>
                                <td>
                            {v.date} </td>
                            </tr>
                            <hr/>
                            <tr>
                                <th>Blood Group</th>
                                    <td>
                            {v.blood} </td>
                            </tr>
                        </tbody>
                    </table>
                    </Paper>
                </div>
                    )
                })
                }
            </div>
        );
    }
}
Donors.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => { 
    return {
        storeReducer: state.UserReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        findDonor: (data) => {
            console.log(data)
            dispatch(FindDonors(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Donors);