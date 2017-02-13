import React, { Component, PropTypes } from 'react'
import { container } from '../../../Adrenaline';
import { browserHistory, Link } from 'react-router'
import Loader from '../../components/Loader';
var STATIC_ASSETS_CDN = process.env.STATIC_ASSETS_CDN || '';
var WEBPACK_ASSETS = process.env.WEBPACK_ASSETS || '';
class Player extends Component {
  state = {
    channel: {}
  }
  static propTypes = {
    channel: PropTypes.object,
    isFetching: PropTypes.bool.isRequired
  }

  createMarkup() {
    var embedCode = this.props.channel && this.props.channel.embedCode ? this.props.channel.embedCode : '';
    return {__html: embedCode}
  }
  
  goBack() {
    return browserHistory.goBack();
  }
  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <div>
        <div >
          <div style={{margin: '0px 50px', cursor: 'pointer'}}>
            <Link onClick={this.goBack}><img src={require('../../commonResources/back.gif')} alt="Home Button" /></Link>
          </div>
        </div>
        <div >
          <div className="playerContainer" dangerouslySetInnerHTML={this.createMarkup()} />
        </div>
      </div>
    )
  }
}
export default container({
  query: `
    query getChannel($channelId: String){
      channel(channelId: $channelId) {
        embedCode
      }
    }
  `, variables: (props) => ({'channelId': props.params.channelId})
})(Player);
