require('../styles/001.css'); //load bonus css for delete warnings in console (chrome itp.)
require('../styles/005.css');
require('../styles/003.css');
require('../styles/002.css');

import React from 'react';
import axios from 'axios';


class CurrentArticle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: 0
    }
  }

  render() {

    if( this.state.width == 0 )
      this.setState({ width: document.documentElement.clientWidth });

    const listItems = this.props.comments.map((item, key = 1) =>
      <div  key={ item.commentID }
            className={ item.priviliges == 1 ? 'commentText commentTextModer' : (item.priviliges == 2 ? 'commentText' : 'commentText commentTextAdmin')}>
        <div className="commentAuthor"> { item.login } </div>
        <div className="commentInfo">
          #{ key++ }
          #{ item.priviliges == 0 ? 'Administrator' : ( item.priviliges == 2 ? 'Użytkownik' : 'Moderator') }
        </div>
        <div className="commentText">
          { item.comText }
        </div>
      </div>
    )

    let imgUrl = '../images/extra/' + this.props.activeArtTab.artImageName;
    //console.log( imgUrl );
    var parameters = '';
    if( this.state.width >= 1800 )
      parameters = 'no-repeat center center fixed';
    else
      parameters = 'no-repeat center center';
    const background = {
      background: 'url(' + imgUrl + ') ' + parameters
    }

    var priviliges = '';
    if(this.props.activeArtTab.priviliges == 0)
      priviliges = 'Administrator';
    else if(this.props.activeArtTab.priviliges == 1)
      priviliges = 'Moderator';

    if(this.props.activeArt == 0){
      return(
        <div></div>
      )
    } else {
      return (
        <div>
          <div className="divImage">
            <div  className="divImageBackgroundTwo"
                  style={ background }>
              <div className={ this.state.width > 680 ? 'divImageTitle' : 'divImageTitleSM' }>
                { this.props.activeArtTab.artTitle }
                <div className="divImageTitleSubject">
                  Region: { this.props.regName } <br/>
                  Autor: { this.props.activeArtTab.login }
                </div>
              </div>
            </div>
          </div>
          <div style={ background } className="divImageFixedMobile">
            <div id={ this.state.width >= 1800 ? 'divArticle' : 'divArticleSM' }>
              <div id={ this.state.width >= 1800 ? 'generalDivArt' : 'generalDivArtSM' }>
                <div id={ this.state.width >= 1800 ? 'divArt' : 'divArtSM' }>
                  <div id={ this.state.width >= 1800 ? 'artTitle' : 'artTitleSM' }>{ this.props.activeArtTab.artTitle }</div>
                  <div id={ this.state.width >= 1800 ? 'artAuthor' : 'artAuthorSM' }>
                    #{ this.props.regName }
                    #{ this.props.activeArtTab.login }
                    #{ priviliges }
                    </div>
                  <div id={ this.state.width >= 1800 ? 'artText' : 'artTextSM' }>{ this.props.activeArtTab.artText }</div>
                  <RatingForm
                    activeArt={ this.props.activeArt }
                    width={ this.state.width }
                  />
                </div>
                <div id={ this.state.width >= 1800 ? 'divSeparator' : '' }></div>
                <div id={ this.state.width >= 1800 ? 'divComments' : 'divCommentsSM' }>
                  <div id={ this.state.width >= 1800 ? 'divComDisplay' : 'divComDisplaySM' }>
                    { listItems }
                  </div>
                  <CommentForm
                    giveComments={ this.props.giveComments }
                    comments={ this.props.comments }
                    activeArt={ this.props.activeArt }/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

class CommentForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      comSend: '',
      message: '',
      error: 0,
      userID: -1
    };
    this.sendCom = this.sendCom.bind(this);
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
        self.setState({ userID: response.data[0].id });
        //console.log(response);
      })
    .catch(function (response) {
        //handle error
        //console.log(response)
    });
  }


  sendCom( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('comSend', this.state.comSend);
    formData.append('activeArt', this.props.activeArt);
    axios({
        method: 'post',
        url: 'api/sendComment.php',
        data: formData,
        withCredentials: true,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        //handle success
        self.setState({ error: response.data });
        if(response.data == 1)
          self.setState({ message: 'aby dodać komentarz musisz być zalogowany!!!' });
        else
          self.setState({ message: 'Dodano Komentarz!!!' });
          self.props.giveComments( self.props.activeArt );
      })
    .catch(function (response) {
        //handle error
        //console.log(response);
    });
  }

  render() {
      if( this.state.userID != -1 )
        return (
          <div id={ this.state.width >= 1800 ? 'divComForm' : 'divComFormSM' }>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Napisz Komentarz"
              name="comSend"
              value={ this.state.comSend }
              onChange={ e => this.setState({ comSend: e.target.value }) }/>
            <button
              className="btn btn-success my2 my-sm-0"
              type="submit"
              onClick={ e => this.sendCom(e) }>
                Wyślij
            </button>
          </div>
        )
      else
        return (
          <div id={ this.state.width >= 1800 ? 'divComForm' : 'divComFormSM' }>
            <div id="divComFormMessage">Aby komentować musisz być zalogowany!</div>
          </div>
        )
  }
}

class RatingForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratingArt: 0,
      condition: 0,
      isRated: false,
      sessionActive: false,
      message: '',
      ratingSVG: 0,
      helpV: 0
    }
    this.checkRating = this.checkRating.bind(this);
  }

  componentWillMount() {
    this.checkRating();
  }

  componentWillUpdate() {
    if( this.state.ratingArt != this.props.activeArt ){
      this.checkRating();
      this.setState({ ratingArt: this.props.activeArt})
    }
  }

  checkRating() {
    var self = this;
    let formData = new FormData();
    formData.append('activeArt', this.props.activeArt);
    axios({
        method: 'post',
        url: 'api/checkRating.php',
        data: formData,
        withCredentials: true,
        responseType: 'stream'
    })
    .then(function (response) {
        //handle success
        self.setState({ message: '',
                        isRated: response.data[0].isRated,
                        sessionActive: response.data[0].sessionActive,
                        condition: response.data[0].rating,
                        ratingSVG: response.data[0].ratingSVG });
        //console.log(response);
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'nie udało sie sprawdzic!' });
        //console.log(response);
    });
  }

  sendRating( e ) {
    var self = this;
    e.preventDefault();
    let formData = new FormData();
    formData.append('activeArt', this.props.activeArt);
    formData.append('rating', this.state.condition);
    axios({
        method: 'post',
        url: 'api/sendRating.php',
        data: formData,
        withCredentials: true,
        responseType: 'stream'
    })
    .then(function (response) {
        //handle success
        self.setState({ message: 'dodano ocenę!',
                        isRated: true });
        self.checkRating();
      })
    .catch(function (response) {
        //handle error
        self.setState({ message: 'nie dodano oceny!' });
    });
  }

  render() {
    if ( this.state.isRated == false && this.state.sessionActive == true )
      return (
        <div id={ this.props.width >= 1800 ? 'artRating' : 'artRatingSM' }
            onMouseEnter={ () => this.setState({ condition: 0 }) }>
          <div id="s1"
            className={ this.state.condition >= 1 ? 'ratingStars ratingStarsGood' : 'ratingStars' }
            onMouseEnter={ e => this.setState({ condition: 1 }) }
            onClick={ e => this.sendRating( e ) }>★
          </div>
          <div id="s2"
            className={ this.state.condition >= 2 ? 'ratingStars ratingStarsGood' : 'ratingStars' }
            onMouseEnter={ e => this.setState({ condition: 2 }) }
            onClick={ e => this.sendRating( e ) }>★
          </div>
          <div id="s3"
            className={ this.state.condition >= 3 ? 'ratingStars ratingStarsGood' : 'ratingStars' }
            onMouseEnter={ e => this.setState({ condition: 3 }) }
            onClick={ e => this.sendRating( e ) }>★
          </div>
          <div id="s4"
            className={ this.state.condition >= 4 ? 'ratingStars ratingStarsGood' : 'ratingStars' }
            onMouseEnter={ e => this.setState({ condition: 4 }) }
            onClick={ e => this.sendRating( e ) }>★
          </div>
          <div id="s5"
            className={ this.state.condition == 5 ? 'ratingStars ratingStarsGood' : 'ratingStars' }
            onMouseEnter={ e => this.setState({ condition: 5 }) }
            onClick={ e => this.sendRating( e ) }>★
          </div>
          <div className="ratingStars"></div>
          <div className="ratingStars">{ this.state.condition }/5</div>
        </div>
      )
    else
      return (
        <div id={ this.props.width >= 1800 ? 'artRating' : 'artRatingSM' }>
          <div id="s1"
            className={ this.state.condition >= 1 ? 'ratingStars ratingStarsGood' : 'ratingStars' }>★
          </div>
          <div id="s2"
            className={ this.state.condition >= 2 ? 'ratingStars ratingStarsGood' : 'ratingStars' }>★
          </div>
          <div id="s3"
            className={ this.state.condition >= 3 ? 'ratingStars ratingStarsGood' : 'ratingStars' }>★
          </div>
          <div id="s4"
            className={ this.state.condition >= 4 ? 'ratingStars ratingStarsGood' : 'ratingStars' }>★
          </div>
          <div id="s5"
            className={ this.state.condition == 5 ? 'ratingStars ratingStarsGood' : 'ratingStars' }>★
          </div>
          <div className="ratingStars"></div>
          <div className="ratingStars">{ this.state.ratingSVG }/5</div>
        </div>
      )
  }
}

export default CurrentArticle;
