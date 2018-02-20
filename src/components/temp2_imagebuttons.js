import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import VB from './VideoBtn';
import DB from './DocBtn';
import Modall from './Modall';
import LeafletButton from './LeafletButton';

export default class ImageButtons extends Component {

    state = {
        videoPath: [],
        documentPath: [],
        image: '',
        whichOne: '',
        visableTwoBtns: false
    };

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

    render() {
        return (

            <View style={styles.mainView}>
                { !this.props.fromHome && <LeafletButton page={this.props.page} /> }
                <View style={styles.body}>

                    <View>
                        <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={styles.headingText}>{this.props.subtitle}</Text>

                    </View>


                    <View style={styles.contentContainer}>

                        <View style={styles.contentPic}>
                            <Modall>
                                <Image resizeMethod='resize' style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: this.state.image }} />
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
        position: 'absolute',
        height: '100%'
    },
    body: {
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    headingText: {
        color: '#494949',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 30
    },
    headingMain: {
        paddingTop: 20,
        paddingBottom: 4,
        fontSize: 25,
        fontWeight: 'bold'
    },
    contentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        marginBottom: 10,
        position: 'relative',
        flex: 1
    },
    contentPic: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center'
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





    floatingButtonsHolder: {
        position: 'absolute',
        width: 50,
        height: 158,

        zIndex: 49824982789,
        right: 0,
        top: 140
    },
    floatBtnAdd: {
        width: 50,
        height: 50,
    },

    add_leaflet: {
        paddingBottom: 4,
        paddingTop: 4,

    },
    add_presentation: {

    }
});

