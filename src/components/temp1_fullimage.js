import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LeafletButton from './LeafletButton';
import Modall from './Modall';
import { renderVB, renderDB, renderModalforMultipleFiles } from '../../helpers';

export default class FullImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
    videos: false,
    documents: false,
  }

  componentWillMount() {
    let videos = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'mp4'
    })

    let documents = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'pdf'
    })

    this.setState({ videoPath: videos, documentPath: documents });
  }

  hideModal = () => {
    this.setState({ videos: false, documents: false });
  }

  showModal = (which) => {
    this.setState({[which]: true});
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
                {renderVB(this.state.videoPath, this.showModal.bind(null, 'videos'))}
                {renderDB(this.state.documentPath, this.showModal.bind(null, 'documents'))}
              </View>

            </View>

          </View>

        </View>

        {renderModalforMultipleFiles('videos', this.state.videoPath, this.state.videos, this.hideModal)}
        {renderModalforMultipleFiles('documents', this.state.documentPath, this.state.documents, this.hideModal)}
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
    bottom: 25,
    right: 25,
    width: '51%',
  },
});
