require('../styles/004.css');
require('../styles/005.css');

import React from 'react';
import axios from 'axios';

class MenuPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iduser: '',
      login: '',
      password: '',
      score: 0,
      priviliges: 3,
      email: '',
      sessionActive: false,
      width: 0
    };
  }

  componentDidMount() {
    var self = this;
    axios({
        method: 'post',
        url: 'api/giveUser.php',
        withCredentials: true,
        responseType: 'stream'
    })
    .then(function (response) {
        //handle success
        self.setState({ iduser: response.data[0].id });
        self.setState({ login: response.data[0].login });
        self.setState({ password: response.data[0].password });
        self.setState({ score: response.data[0].score });
        self.setState({ priviliges: response.data[0].priviliges });
        self.setState({ email: response.data[0].email });
        self.setState({ sessionActive: true });
        //console.log(response);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  render() {

    if( this.state.width == 0 )
      this.setState({ width: document.documentElement.clientWidth });

    if(this.state.sessionActive == true && this.state.priviliges == 0)
      return(
        <div>
          <div className="divImage">
            <div className={ this.state.width > 680 ? 'divImageBackgroundZero' : 'divImageBackgroundZeroSM' }>
              <div className={ this.state.width > 680 ? 'divImageTitle' : 'divImageTitleSM' }>Panel Administracyjny</div>
            </div>
          </div>
          <PanelAdmin
            iduser={ this.state.iduser }
            login={ this.state.login }
            password={ this.state.password }
            score={ this.state.score }
            email={ this.state.email }
            width={ this.state.width }
          />
        </div>
      )
    else if(this.state.sessionActive == true && this.state.priviliges > 0)
      return(
        <div>
          <div className="divImage">
            <div className={ this.state.width > 680 ? 'divImageBackgroundZero' : 'divImageBackgroundZeroSM' }>
              <div className={ this.state.width > 680 ? 'divImageTitle' : 'divImageTitleSM' }>Panel Użytkownika</div>
            </div>
          </div>
          <PanelUser
            iduser={ this.state.iduser }
            login={ this.state.login }
            password={ this.state.password }
            priviliges={ this.state.priviliges }
            score={ this.state.score }
            email={ this.state.email }
            width={ this.state.width }
          />
        </div>
      )
    else
      return (
        <div></div>
      )
  }
}

class PanelUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      panelID: ''
    }
  }

  render() {
    return(
      <div>
        <div id={ this.props.width >= 1800 ? 'divPanel' : 'divPanelSM' }>
          <div id="divPanelBackground">
            <div id={ this.props.width >= 1800 ? 'generalDivPanel' : 'generalDivPanelSM' }>
              <div id={ this.props.width >= 1800 ? 'panelInterface' : 'panelInterfaceSM' }>
                <div id={ this.props.width >= 1800 ? 'divButtonCon' : 'divButtonConSM' }>
                  <div id={ this.props.width >= 1800 ? '' : 'divButtonConSMScroll' }>
                      <div className={ this.props.width >= 1800 ? '' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 0 }) }
                      >
                      Twoje Konto
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 1 }) }
                      >
                      Dodaj Artykuł
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 2 }) }
                      >
                      Ranking
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 3 }) }
                      >
                      Twoje Artykuły
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 4 }) }
                      >
                      Twoje Oceny
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 5 }) }
                      >
                      Twoje Komentarze
                    </div>
                  </div>
                </div>
              </div>
              <div id={ this.props.width >= 1800 ? 'divSeparator' : '' }></div>
              <PanelFormUser
                panelID={ this.state.panelID }
                iduser={this.props.iduser }
                login={ this.props.login }
                password={ this.props.password }
                priviliges={ this.props.priviliges }
                email={ this.props.email }
                score={ this.props.score }
                width={ this.props.width }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class PanelFormUser extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      password: '',
      message: '',
      users: [],
      articles: [],
      comments: [],
      ratings: [],
      titleArt: '',
      textArt: '',
      imageArt: '',
      imageFL: null,
      regionID: '',
      regions: [],
      whenDel: 0
    }
    this.giveUsersRanking = this.giveUsersRanking.bind(this);
    this.giveUserArticles = this.giveUserArticles.bind(this);
    this.giveUserComments = this.giveUserComments.bind(this);
    this.giveUserRatings = this.giveUserRatings.bind(this);
  }

  changePass( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('password', this.state.password);
    axios({
        method: 'post',
        url: 'api/changePass.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ message: 'Hasło Zmienione!' });
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'Nie Udało Się Zmienić Hasła!' });
      });
  }
  addArticle( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('titleArt', this.state.titleArt);
    formData.append('textArt', this.state.textArt);
    formData.append('regionID', this.state.regionID);
    formData.append('imageFL', this.state.imageFL);
    formData.append('imageArt', this.state.imageArt);
    axios({
        method: 'post',
        url: 'api/addArticle.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ message: 'Dodano Artykuł!' });
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'Nie Udało Się Dodać Artykułu!' });
      });
  }

  componentDidMount() {
    this.giveUsersRanking();
    this.giveUserArticles();
    this.giveUserComments();
    this.giveUserRatings();
  }

  componentDidUpdate() {
    if(this.state.whenDel == 1){
      this.giveUsersRanking();
      this.giveUserArticles();
      this.giveUserComments();
      this.giveUserRatings();
      this.setState({ whenDel: 0 });
    }
  }

  giveUsersRanking() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveUsersRanking.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ users: response.data });
        //console.log(self.state.users);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveUserArticles() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveUserArticles.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ articles: response.data });
        //console.log(self.state.articles);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveUserComments() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveUserComments.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ comments: response.data });
        //console.log(self.state.comments);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveUserRatings() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveUserRatings.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ ratings: response.data });
        //console.log(self.state.ratings);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  deleteArticle( e, articleID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('articleID', articleID);
    axios({
        method: 'post',
        url: 'api/deleteArticle.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }
  deleteComment( e, commentID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('commentID', commentID);
    axios({
        method: 'post',
        url: 'api/deleteComment.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }
  deleteRating( e, ratingID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('ratingID', ratingID);
    axios({
        method: 'post',
        url: 'api/deleteRating.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }

  render() {
    if( this.props.panelID == 0 ){
      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div id={ this.props.width >= 1800 ? 'panelAccount' : 'panelAccountSM' }>
            <div className="accountPass">Login: { this.props.login }</div>
            <div className="accountPass">Email: { this.props.email }</div>
            <div className="accountPass">Punkty: { this.props.score }</div>
            <div id="accountForm">
                <div className="divBttSep"/>
              <input
                className="form-control mr-sm-2 sepForm"
                type="password"
                placeholder="Wpisz Nowe Hasło"
                name="password"
                value={ this.state.password }
                onChange={ e => this.setState({ password: e.target.value }) }/>
                <div className="divBttSep">
                  { this.state.message }
                </div>
              <div className="btn btn-outline-light my-2 my-sm-0 divButton"
                  onClick={ e => this.changePass(e) }
                  >
                  Zmień Hasło
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if( this.props.panelID == 1 && this.props.priviliges == 1) {

      const listItems = this.state.regions.map((item, key = 1) =>
        <option
            value={ item.regionID }>
          { item.regName }
        </option>
      )

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div id={ this.props.width >= 1800 ? 'panelArticleAdd' : 'panelArticleAddSM' }>
            <form>
              <div id={ this.props.width >= 1800 ? 'articleAddFirst' : 'articleAddFirstSM' }>
                <input
                  className="form-control mr-sm-2 articleAddInputAlign"
                  type="text"
                  placeholder="Wpisz Tytuł Artykułu"
                  name="title"
                  value={ this.state.titleArt }
                  onChange={ e => this.setState({ titleArt: e.target.value }) }/>
                <div className={ this.props.width >= 1800 ? 'articleAddInputSep' : 'articleAddInputSepSM' }/>
                <select
                  className="form-control articleAddInputAlign"
                  onChange={ e => this.setState({ regionID: e.target.value }) }>
                    { listItems }
                </select>
                <div className={ this.props.width >= 1800 ? 'articleAddInputSep' : '' }/>
                <div className="articleAddInputAlign">
                  <div id="sendButton" className="btn btn-outline-light my-2 my-sm-0 ">
                      <input
                        type="file"
                        name="imageFL"
                        onChange={ e => this.imageHandle( e.target.files[0] ) }
                      />
                      <p>Wybierz zdjęcie</p>
                  </div>
                </div>
              </div>
              <div className={ this.props.width >= 1800 ? 'divBttSep' : '' }/>
              <textarea
                className="form-control mr-sm-2"
                rows={ this.props.width >= 1800 ? '20' : '15' }
                type="text"
                placeholder="Treść"
                name="textArt"
                value={ this.state.textArt }
                onChange={ e => this.setState({ textArt: e.target.value }) }/>
              <div className="divBttSep"/>
              <button className="btn btn-outline-light my-2 my-sm-0 divButton"
                  type="submit"
                  onClick={ e => this.addArticle(e) }>
                Dodaj Artykuł
              </button>
              <div className="divButton">
                { this.state.message }
              </div>
            </form>
          </div>
        </div>
      )
    }
    else if( this.props.panelID == 1 ) {
      return (
        <div id={ this.props.width >= 1800 ? 'messagePrivilige' : 'messagePriviligeSM' }>
          <p>musisz być conajmniej moderatorem na stronie, by móc dodawać artykuły!</p>
          <br />
          <p>uzyskując 600 punktów, masz możliwość zostania moderatorem</p>
          <br />
          <p>Komentarz - 5pkt</p>
          <br />
          <p>Ocenienie atrykułu - 2pkt</p>
        </div>
      );
    }
    else if( this.props.panelID == 2 ) {

      const listItems = this.state.users.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> { item.login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> { item.priviliges == 0 ? 'Administrator' : ( item.priviliges == 1 ? 'Moderator' : 'Użytkownik' ) } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> { item.score } </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> Login / Nazwa </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> Ranga </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRowU' : 'panelFormUserRowSMU' }> Punkty </div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 3 ) {

      const listItems = this.state.articles.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.regName } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }>
            <a onClick={ e => this.deleteArticle( e, item.articleID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Autor </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Tytuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Region </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 4 ) {

      const listItems = this.state.ratings.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.rating } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }>
            <a onClick={ e => this.deleteRating( e, item.ratingID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Ocena </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Oceniający </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Artykuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 5 ) {

      const listItems = this.state.comments.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTableCom" >
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.comText } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }>
            <a onClick={ e => this.deleteComment( e, item.commentID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Autor </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Artykuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Komentarz </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else
      return (
        <div></div>
      )
  }

}

class PanelAdmin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      panelID: ''
    }
  }

  render() {
    return(
      <div>
        <div id={ this.props.width >= 1800 ? 'divPanel' : 'divPanelSM' }>
          <div id="divPanelBackground">
            <div id={ this.props.width >= 1800 ? 'generalDivPanel' : 'generalDivPanelSM' }>
              <div id={ this.props.width >= 1800 ? 'panelInterface' : 'panelInterfaceSM' }>
                <div id={ this.props.width >= 1800 ? 'divButtonCon' : 'divButtonConSM' }>
                  <div id={ this.props.width >= 1800 ? '' : 'divButtonConSMScroll' }>
                      <div className={ this.props.width >= 1800 ? '' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                        onClick={ e => this.setState({ panelID: 0 }) }
                        >
                        Konto
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 1 }) }
                      >
                      Dodaj Artykuł
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 2 }) }
                      >
                      Użytkownicy
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 3 }) }
                      >
                      Artykuły
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 4 }) }
                      >
                      Oceny
                    </div>
                      <div className={ this.props.width >= 1800 ? 'divBttSep' : 'divBttSepSM' }/>
                    <div className={ this.props.width >= 1800 ? 'btn btn-outline-light my-2 my-sm-0 divButton' : 'btn btn-outline-light my-2 my-sm-0 divButtonSM' }
                      onClick={ e => this.setState({ panelID: 5 }) }
                      >
                      Komentarze
                    </div>
                  </div>
                </div>
              </div>
              <div id={ this.props.width >= 1800 ? 'divSeparator' : '' }></div>
              <PanelForm
                panelID={ this.state.panelID }
                iduser={this.props.iduser }
                login={ this.props.login }
                password={ this.props.password }
                email={ this.props.email }
                score={ this.props.score }
                width={ this.props.width }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class PanelForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      message: '',
      users: [],
      articles: [],
      comments: [],
      ratings: [],
      titleArt: '',
      textArt: '',
      imageArt: '',
      imageFL: null,
      regionID: '',
      regions: [],
      whenDel: 0
    }
    this.giveAllRegions = this.giveAllRegions.bind(this);
    this.giveAllUsers = this.giveAllUsers.bind(this);
    this.giveAllArticles = this.giveAllArticles.bind(this);
    this.giveAllComments = this.giveAllComments.bind(this);
    this.giveAllRatings = this.giveAllRatings.bind(this);

    this.deleteUser = this.deleteUser.bind(this);
    this.deleteRating = this.deleteRating.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  changePass( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('password', this.state.password);
    axios({
        method: 'post',
        url: 'api/changePass.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ message: 'Hasło Zmienione!' });
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'Nie Udało Się Zmienić Hasła!' });
      });
  }
  addArticle( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('titleArt', this.state.titleArt);
    formData.append('textArt', this.state.textArt);
    formData.append('regionID', this.state.regionID);
    formData.append('imageFL', this.state.imageFL);
    formData.append('imageArt', this.state.imageArt);
    axios({
        method: 'post',
        url: 'api/addArticle.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ message: 'Dodano Artykuł!' });
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'Nie Udało Się Dodać Artykułu!' });
      });
  }

  componentDidMount(){
    this.giveAllRegions();
    this.giveAllUsers();
    this.giveAllArticles();
    this.giveAllComments();
    this.giveAllRatings();
  }

  componentDidUpdate() {
    if(this.state.whenDel == 1){
      this.giveAllRegions();
      this.giveAllUsers();
      this.giveAllArticles();
      this.giveAllComments();
      this.giveAllRatings();
      this.setState({ whenDel: 0 });
    }
  }

  imageHandle( e ){
    this.setState({ imageFL: e,
                    imageArt: e.name });
  }

  giveAllUsers() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveAllUsers.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ users: response.data });
        //console.log(self.state.users);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveAllArticles() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveAllArticles.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ articles: response.data });
        //console.log(self.state.articles);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveAllComments() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveAllComments.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ comments: response.data });
        //console.log(self.state.comments);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveAllRatings() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveAllRatings.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ ratings: response.data });
        //console.log(self.state.ratings);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }
  giveAllRegions() {
    var self = this;
    axios({
        method: 'get',
        url: 'api/giveAllRegions.php',
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ regions: response.data });
        //console.log(self.state.regions);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }

  deleteUser( e, userID ){
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('userID', userID);
    axios({
        method: 'post',
        url: 'api/deleteUser.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }
  deleteArticle( e, articleID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('articleID', articleID);
    axios({
        method: 'post',
        url: 'api/deleteArticle.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }
  deleteComment( e, commentID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('commentID', commentID);
    axios({
        method: 'post',
        url: 'api/deleteComment.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }
  deleteRating( e, ratingID ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('ratingID', ratingID);
    axios({
        method: 'post',
        url: 'api/deleteRating.php',
        withCredentials: true,
        data: formData
    })
    .then(function (response) {
        //handle success
        self.setState({ whenDel: 1 });
      })
    .catch(function (response) {
        //handle error
    });
  }

  render() {
    if( this.props.panelID == 0 ){
      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div id={ this.props.width >= 1800 ? 'panelAccount' : 'panelAccountSM' }>
            <div className="accountPass">Login: { this.props.login }</div>
            <div className="accountPass">Email: { this.props.email }</div>
            <div className="accountPass">Punkty: { this.props.score }</div>
            <div id="accountForm">
                <div className="divBttSep"/>
              <input
                className="form-control mr-sm-2 sepForm"
                type="password"
                placeholder="Wpisz Nowe Hasło"
                name="password"
                value={ this.state.password }
                onChange={ e => this.setState({ password: e.target.value }) }/>
                <div className="divBttSep">
                  { this.state.message }
                </div>
              <div className="btn btn-outline-light my-2 my-sm-0 divButton"
                  onClick={ e => this.changePass(e) }
                  >
                  Zmień Hasło
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if( this.props.panelID == 1 ) {

      const listItems = this.state.regions.map((item, key = 1) =>
        <option
            value={ item.regionID }>
          { item.regName }
        </option>
      )

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div id={ this.props.width >= 1800 ? 'panelArticleAdd' : 'panelArticleAddSM' }>
            <form>
              <div id={ this.props.width >= 1800 ? 'articleAddFirst' : 'articleAddFirstSM' }>
                <input
                  className="form-control mr-sm-2 articleAddInputAlign"
                  type="text"
                  placeholder="Wpisz Tytuł Artykułu"
                  name="title"
                  value={ this.state.titleArt }
                  onChange={ e => this.setState({ titleArt: e.target.value }) }/>
                <div className={ this.props.width >= 1800 ? 'articleAddInputSep' : 'articleAddInputSepSM' }/>
                <select
                  className="form-control articleAddInputAlign"
                  onChange={ e => this.setState({ regionID: e.target.value }) }>
                    { listItems }
                </select>
                <div className={ this.props.width >= 1800 ? 'articleAddInputSep' : '' }/>
                <div className="articleAddInputAlign">
                  <div id="sendButton" className="btn btn-outline-light my-2 my-sm-0 ">
                      <input
                        type="file"
                        name="imageFL"
                        onChange={ e => this.imageHandle( e.target.files[0] ) }
                      />
                      <p>Wybierz zdjęcie</p>
                  </div>
                </div>
              </div>
              <div className={ this.props.width >= 1800 ? 'divBttSep' : '' }/>
              <textarea
                className="form-control mr-sm-2"
                rows={ this.props.width >= 1800 ? '20' : '15' }
                type="text"
                placeholder="Treść"
                name="textArt"
                value={ this.state.textArt }
                onChange={ e => this.setState({ textArt: e.target.value }) }/>
              <div className="divBttSep"/>
              <button className="btn btn-outline-light my-2 my-sm-0 divButton"
                  type="submit"
                  onClick={ e => this.addArticle(e) }>
                Dodaj Artykuł
              </button>
              <div className="divButton">
                { this.state.message }
              </div>
            </form>
          </div>
        </div>
      )
    }
    else if( this.props.panelID == 2 ) {

      const listItems = this.state.users.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> { item.login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> { item.priviliges == 0 ? 'Administrator' : ( item.priviliges == 1 ? 'Moderator' : 'Użytkownik' ) } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> { item.score } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> { item.email } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }>
            <a onClick={ e => this.deleteUser( e, item.userID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> Login / Nazwa </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> Ranga </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> Punkty </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> Mail </div>
            <div className={ this.props.width >= 1800 ? 'panelFormUserRow' : 'panelFormUserRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 3 ) {

      const listItems = this.state.articles.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> { item.regName } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }>
            <a onClick={ e => this.deleteArticle( e, item.articleID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Autor </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Tytuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Region </div>
            <div className={ this.props.width >= 1800 ? 'panelFormArticleRow' : 'panelFormArticleRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 4 ) {

      const listItems = this.state.ratings.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTable" >
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.rating } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }>
            <a onClick={ e => this.deleteRating( e, item.ratingID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Ocena </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Oceniający </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Artykuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormRatingsRow' : 'panelFormRatingsRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else if( this.props.panelID == 5 ) {

      const listItems = this.state.comments.map((item, key = 1) =>
        <div  key={ item.userID } className="panelFormTableCom" >
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.Login } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.artTitle } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> { item.comText } </div>
          <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }>
            <a onClick={ e => this.deleteComment( e, item.commentID ) }>
              Usuń
            </a>
          </div>
        </div>
      );

      return (
        <div id={ this.props.width >= 1800 ? 'panelForm' : 'panelFormSM' }>
          <div className="panelFormTable">
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Autor </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Artykuł </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Komentarz </div>
            <div className={ this.props.width >= 1800 ? 'panelFormCommentsRow' : 'panelFormCommentsRowSM' }> Działanie</div>
          </div>
            { listItems }
        </div>
      )
    }
    else
      return (
        <div></div>
      )
  }
}

export default MenuPanel;
