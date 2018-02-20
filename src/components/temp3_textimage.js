import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import VB from './VideoBtn';
import DB from './DocBtn';
import Modall from './Modall';
import LeafletButton from './LeafletButton';
import { renderVB, renderDB, renderModalforMultipleFiles } from '../../helpers';
import SwiperFlatList from './SwiperFlatList';
export const { width, height } = Dimensions.get('window');


export default class TextImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
    imagesPath: [],
    startSwiper: false,
    dimensions: undefined,
    videos: false,
    documents: false
  }

  onLayout(event) {
    if (this.state.dimensions) return
    let { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  }

  componentWillMount() {
    let videos = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'mp4'
    })

    let documents = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'pdf'
    })

    let images = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'jpg'
        || file.substring(file.length - 3, file.length) == 'png'
        || file.substring(file.length - 4, file.length) == 'jpeg'
    })

    this.setState({ videoPath: videos, documentPath: documents, imagesPath: images });
  }

  modalForMultiple = (what) => {
    return (
      <Modal
        isVisible={this.state[what]}
        onBackdropPress={() => this.setState({ [what]: false })}
        onBackButtonPress={() => this.setState({ [what]: false })}

      >
        <View style={{ borderWidth: 1, borderColor: 'black' }}>
          {this.renderListOfFiles(what)}
        </View>
      </Modal>
    );
  }

  renderListOfFiles = (what) => {
    let arr = what == 'videos' ? this.state.videoPath : this.state.documentPath;
    let whaturi = what == 'videos' ? 'videouri' : 'docuri';
    let whatView = what == 'videos' ? 'VideoView' : 'DocumentView';
    let fileNames = what == 'videos' ? this.props.page.files.filter(f => f.type == 'video') : this.props.page.files.filter(f => f.type == 'document');
    let reg = /[^/]+$/;
    return arr.map((f, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => { Actions[whatView]({ [whaturi]: f }); this.setState({ [what]: false }) }} >
          <Text style={{ fontSize: 30, color: 'green' }}>{reg.exec(f)[0]}</Text>
        </TouchableOpacity>
      );
    })
  }

  showVideosModal = () => {
    this.setState({ videos: true });
  }

  showDocumentModal = () => {
    this.setState({ documents: true });
  }

  hideModal = () => {
    this.setState({ videos: false, documents: false });
  }


  renderPics(w, h) {
    return this.state.imagesPath.map((pic, i) => {
      return (
        <View key={i} style={{ backgroundColor: 'white', width: w, height: h }}>
          <Modall pic={pic}>
            <Image resizeMethod='resize' style={[styles.swiperPic, { width: w, height: h }]} source={{ uri: pic }} />
          </Modall>
        </View>
      );
    })
  }

  render() {
    return (

      <View style={styles.mainView}>
        {!this.props.fromHome && <LeafletButton page={this.props.page} />}
        <View style={styles.body}>

          <View>
            <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
            <Text style={styles.headingText}>{this.props.subtitle}</Text>

          </View>

          <View style={styles.contentContainer}>

            <View style={styles.contentText}>
              <ScrollView contentContainerStyle={styles.scrollText}>
                <HTML html={this.props.text} />
              </ScrollView>

            </View>

            <View style={styles.contentPic} onLayout={(event) => this.onLayout(event)}>
              <View style={{ width: '100%', height: '85%' }}>
                <SwiperFlatList
                  showPagination
                  paginationActiveColor={'#999999'}
                  paginationDefaultColor={'#C9C9C9'}
                >
                  {this.state.dimensions && this.renderPics(this.state.dimensions.width, this.state.dimensions.height)}
                </SwiperFlatList>
              </View>
              <View style={styles.ButtonContainer}>
                {renderVB(this.state.videoPath, this.showVideosModal)}
                {renderDB(this.state.documentPath, this.showDocumentModal)}
                
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
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headingText: {
    color: '#494949',
    fontSize: 15,
  },
  headingMain: {
    paddingTop: 40,
    paddingBottom: 4,
    fontSize: 25,
    fontWeight: 'bold'
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: '7%',
    alignItems: 'center'
  },
  contentText: {
    flex: 2.5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    height: '100%',
  },
  contentPic: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  swiperPic: {
    alignSelf: 'center',
    resizeMode: 'cover'
  },
  ButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '15%',
  },
  pagination: {
    width: 10,
    height: 10
  },
  scrollText: {
    height: '85%',
    backgroundColor: '#ebeced',
    padding: 20
  },


});
