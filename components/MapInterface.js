require('../styles/002.css');
require('../styles/005.css');

import React from 'react';

class MapInterface extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    const listItems = this.props.regArts.map((item) =>
      <a onClick={ e => this.props.giveArtID( e, item.articleID ) }>
        <div key={ item.articleID } className={ this.props.width >= 1800 ? 'articleList' : 'articleList articleListSM' }>
          <div className="listColAuthor">{ item.login }</div>
          <div className="listColTitle">{ item.artTitle }</div>
        </div>
      </a>)

    return (
      <div>
        <div className={ this.props.width >= 1800 ? 'regionTitle' : 'regionTitleSM regionTitle' }>{ this.props.regName }</div>
        <div className={ this.props.width >= 1800 ? 'articleListT' : 'articleListT articleListSM' }>
          <div className="listColAuthorT">Autor</div>
          <div className="listColTitleT">Artykuł</div>
        </div>
        <div id={ this.props.width >= 1800 ? 'generalList' : 'generalListSM' }>
          { listItems }
        </div>
      </div>
    )
  }
}

export default MapInterface;
