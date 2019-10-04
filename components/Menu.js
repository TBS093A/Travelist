require('../styles/001.css');

import React from 'react';
import axios from 'axios';

class MenuAnimation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      condition: false,
      width: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      condition: !this.state.condition,
    });
  }

  render() {

    if( this.state.width == 0 )
      this.setState({ width: document.documentElement.clientWidth });

    return (
      <div>
        <MenuAnimationChildClick
          id={ this.state.width >= 1155 ? 'formNav' : 'formNavSM' }
          className={ this.state.width >= 1155 ? ( this.state.condition ? 'formNavOpen' : 'formNavClose' ) : ( this.state.condition ? 'formNavSMOpen' : 'formNavSMClose' ) }>
            <MenuFormLogin />
        </MenuAnimationChildClick>
        <MenuAnimationChildClick
          id={ this.state.width >= 1155 ? 'divLogo' : 'divLogoSM' }
          className={ this.state.width >= 1155 ? ( this.state.condition ? 'divLogoOpen' : 'divLogoClose' ) : ( this.state.condition ? 'divLogoSMOpen' : 'divLogoSMClose' ) }>
        </MenuAnimationChildClick>
        <MenuAnimationChildClick
          id={ this.state.width >= 1155 ? 'logo' : 'logoSM' }
          className={ this.state.width >= 1155 ? ( this.state.condition ? 'logoOpen' : 'logoClose' ) : ( this.state.condition ? 'logoSMOpen' : 'logoSMClose' ) }
          toggleClassName={ this.handleClick }>
        </MenuAnimationChildClick>
      </div>
    )
  }
}

class MenuAnimationChildClick extends React.Component {
  render() {
    return (
      <div
        id={ this.props.id }
        className={ this.props.className }
        onClick={ this.props.toggleClassName }
      >{this.props.children}</div>
    )
  }
}

class MenuFormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      score: 0,
      priviliges: 3,
      email: '',
      sessionActive: false,
      sessionRegister: false,
      error: null
    };
  }

  componentDidMount() {
    var self = this;
    axios({
        method: 'post',
        url: 'api/giveUser.php', //http://localhost:80/NodeProjects/Travelist/src/
        withCredentials: true,
        responseType: 'stream'
    })
    .then(function (response) {
        //handle success
        self.setState({ login: response.data[0].login });
        self.setState({ score: response.data[0].score });
        self.setState({ priviliges: response.data[0].priviliges });
        self.setState({ email: response.data[0].email });
        self.setState({ sessionActive: true });
        //console.log(response);
      })
    .catch(function (response) {
        //handle error
        //console.log(response.message)
    });
  }

  login( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('login', this.state.login)
    formData.append('password', this.state.password)
    axios({
        method: 'post',
        url: 'api/login.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ score: response.data[0].score });
        self.setState({ priviliges: response.data[0].priviliges });
        self.setState({ email: response.data[0].email });
        self.setState({ sessionActive: true });
        //console.log(self.state.login);
        location.reload();
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  logout( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('login', this.state.login);
    axios({
        method: 'post',
        url: 'api/logout.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ login: '' });
        self.setState({ password: '' });
        self.setState({ score: '' });
        self.setState({ priviliges: '' });
        self.setState({ email: '' });
        self.setState({ sessionActive: false });
        location.reload();
        //console.log(this.state.login);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  register( e ) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('login', this.state.login);
    formData.append('password', this.state.password);
    formData.append('email', this.state.email);
    axios({
        method: 'post',
        url: 'api/register.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        location.reload();
        alert(response.data);
        //console.log(self.state.login);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  render() {
    if(this.state.sessionActive && this.state.priviliges == 0){   //mini panel administracji
      return(
        <form>
          <div className="btn btn-outline-light my-2 my-sm-0">
            Użytkownik: {this.state.login}
          </div>
          <div className="btn btn-outline-light my-2 my-sm-0">
            Punkty: {this.state.score}
          </div>
          <div className="btn btn-outline-light my-2 my-sm-0">
            Administartor
          </div>
          <button
            className="btn btn-danger my-2 my-sm-0"
            onClick={ e => this.logout(e)}>
              Wyloguj
          </button>
        </form>
      )} else if(this.state.sessionActive){         //minipanel użytkownika
        return(
          <form>
            <div className="btn btn-outline-light my-2 my-sm-0">
              Użytkownik: {this.state.login}
            </div>
            <div className="btn btn-outline-light my-2 my-sm-0">
              Punkty: {this.state.score}
            </div>
            <div className="btn btn-outline-light my-2 my-sm-0">
              { this.state.priviliges == 3 ? 'Moderator' : 'Użytkownik' }
            </div>
            <button
              className="btn btn-danger my-2 my-sm-0"
              onClick={ e => this.logout(e)}>
                Wyloguj
            </button>
          </form>
      )} else if(!this.state.registerStart){    //logowanie
      return (
        <form>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Login"
            name="login"
            value={ this.state.login }
            onChange={ e => this.setState({ login: e.target.value }) }/>
          <input
            className="form-control mr-sm-2"
            type="password"
            placeholder="Hasło"
            name="password"
            value={ this.state.password }
            onChange={ e => this.setState({ password: e.target.value }) }/>
          <button
            className="btn btn-success my-2 my-sm-0"
            type="submit"
            onClick={ e => this.login(e) }>
              Zaloguj
          </button>
          <div
            className="btn btn-danger my-2 my-sm-0"
            onClick={ f => this.setState({ registerStart: true }) }>
              Rejestracja
          </div>
        </form>
      )
    } else if(this.state.registerStart){          //rejestracja
      return (
        <form>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Login"
          name="login"
          value={ this.state.login }
          onChange={ e => this.setState({ login: e.target.value }) }/>
        <input
          className="form-control mr-sm-2"
          type="password"
          placeholder="Hasło"
          name="password"
          value={ this.state.password }
          onChange={ e => this.setState({ password: e.target.value }) }/>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="E-Mail"
            name="email"
            value={ this.state.email }
            onChange={ e => this.setState({ email: e.target.value }) }/>
          <button
            className="btn btn-success my-2 my-sm-0"
            type="submit"
            onClick={ e => this.register(e) }>
              Zarejestruj
          </button>
          <button
            className="btn btn-danger my-2 my-sm-0"
            onClick={ f => this.setState({ registerStart: false }) }>
              Zrezygnuj
          </button>
        </form>
      )
    }
  }
}

export default MenuAnimation;
