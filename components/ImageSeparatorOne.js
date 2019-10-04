require('../styles/005.css');

import React from 'react';

class ImageSeparatorOne extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: 0
    }
  }

  render() {

    if( this.state.width == 0 )
      this.setState({ width: document.documentElement.clientWidth });

    return (
      <div className="divImage">
        <div className={ this.state.width > 680 ? 'divImageBackgroundOne' : 'divImageBackgroundOneSM' }>
          <div className={ this.state.width > 680 ? 'divImageTitle' : 'divImageTitleSM' }>Mapa Atrakcji</div>
        </div>
      </div>
    )
  }
}

export default ImageSeparatorOne;
