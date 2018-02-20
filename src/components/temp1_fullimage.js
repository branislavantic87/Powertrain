import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LeafletButton from './LeafletButton';
import Modall from './Modall';

export default class FullImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
  }

  componentWillMount() {
    console.log(this.props.files)
    let videos = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'mp4'
    })

    let documents = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'pdf'
    })

    this.setState({ videoPath: videos, documentPath: documents });
  }

  render() {

    return (
      <View style={styles.mainView}>
        {!this.props.fromHome && <LeafletButton page={this.props.page} />}

        <View style={styles.body}>

          <View style={styles.contentContainer}>

            <View style={styles.contentPic}>

              <Modall>
                <Image resizeMethod='resize' style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: this.props.files[0] }} />

              </Modall>
              <View style={styles.ButtonContainer}>
                {this.state.videoPath.length > 0 && <VB videouri={this.state.videoPath[0]} />}
                {this.state.documentPath.length > 0 && <DB documenturi={this.state.documentPath[0]} />}
              </View>

            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
  },
  contentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },
  contentPic: {
    flex: 3,
    height: '100%',
    backgroundColor: 'white',
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: '51%',
},
});
