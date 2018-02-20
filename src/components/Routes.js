import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux'
import Home from './Home';
import HBF from './HBF';
import VideoView from './Video';
import DocumentView from './Doc';
import App from '../../App';
import PdfList from './PdfList';
import Settings from './Settings';
import Notification from './Notification';

export default class Routes extends React.Component {

  render() {

    return (

      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="app" component={App} title='App' />
          <Scene key="settings" component={Settings} title="Settings" initial={false} />
          <Scene key="notification" component={Notification} title="Notification" initial={false} />
          <Scene key="home" component={Home} title="Home" initial={true}/>
          <Scene key="HBF" component={HBF} title="HBF" />
          <Scene key="VideoView" component={VideoView} title="VideoView" />
          <Scene key="DocumentView" component={DocumentView} title="DocumentView" />
          {/* <Scene key="pdfList" component={PdfList} title="PdfList"initial={false} /> */}
          {/* <Scene key="videoList" component={VideoList} title="VideoList" initial={false} /> */}
        </Stack>
      </Router>
    )
  }
}
