import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import HTML from 'react-native-render-html';


export default class HotspotImage extends Component {

    state = {
        videoPath: [],
        documentPath: [],
        image: ''
    };
//provera fajlova za video i doc dugme
    componentWillMount() {
        let videos = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'mp4'
        })

        let documents = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'pdf'
        })

        let images = this.props.files.find(file => {
            return file.substring(file.length - 3, file.length) == 'jpg' 
            || file.substring(file.length - 3, file.length) == 'png' 
            || file.substring(file.length - 4, file.length) == 'jpeg'
        })


        this.setState({ videoPath: videos, documentPath: documents, image: images });
    }

    componentDidMount() {
        StatusBar.setHidden(true);
     }

     //ispis svih hotspotova
    getPosistionsFromJSON = () => {
        // const fileJSON = require('./img/file.json');
        // console.log(fileJSON);

        spots = this.props.hotspot.spots.map((spot, i) =>
          <View key={i + '.viewMaster'} style={{ flexDirection: 'row', position: "absolute", zIndex: 20, top: (spot.y-4) + '%', left: (spot.x) + '%', height: 50 }}>
            <TouchableOpacity key={i} style={{ padding: 5, marginTop: 10 }} >
              <Image key={i + '.image'} source={require('./ico/32/hotspot.png')} />
            </TouchableOpacity>
            <View key={i + '.viewSlave'} style={styles.hotspotTitileView}>
              <Text key={i + '.text'} style={styles.hotspotTitle}>{spot.pageTitle}</Text>
            </View>
          </View>
        );
        return spots;
      }
   
    render() {
        return (
            <View style={styles.mainView}>
      
              <View style={styles.body}>
      
                <View style={styles.contentContainer}>
      
                <Image resizeMethod='resize' style={{width: '100%', height: '100%', resizeMode: 'cover', zIndex: 1}} source={{ uri: this.state.image }}/>

                  {this.getPosistionsFromJSON()}

                  <View style={styles.ButtonContainer}>
                                {this.state.videoPath.length > 0 && <VB videouri={this.state.videoPath[0]} />}
                                {this.state.documentPath.length > 0 && <DB documenturi={this.state.documentPath[0]} />}
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
      width: '100%'
    },
    contentContainer: {
      marginTop: 10,
      width: '100%',
      height: '100%',
      marginBottom: 5,
    },
    hotspotTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#da281c'
    },
  
    hotspotTitileView: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: 'white',
      height: 25,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
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
  