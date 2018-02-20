import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import RNFB from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';


export default class PdfList extends Component {

    state = {
        allVideos: global.videosJson.videos
    };
    /*
    Category(id) {
        this.setState({categorySelected: id});
    }
    */

    findAllVideos = () => {
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/`;
        const a = global.globalJson.files.filter(e => {
            if (e.type === 'video') {
                return pathToFiles + e.filename
            }
        })
        this.setState({ allVideos: a })
    }

    findThumb = (id) => {
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/`;
        let pageGdeImaSlika = global.globalJson.pages.find(page => {
            if (page.pageId === id)
                return page
        })
        const taNekaSlika = pageGdeImaSlika.files.find(file => {
            if (file.type === 'image')
                return file;
        })

        return (pathToFiles + taNekaSlika.filename);
    }

    

    renderAllVideos = () => {
        if (this.state.allVideos.length === 0) {
            return (
                <Text>There are no videous!!</Text>
            );
        } else {
            return (
                this.state.allVideos.map((video, i) => {
                    return (
                        <View style={styles.videoComponent} key={i}>
                            <View style={styles.video}>

                                <TouchableOpacity style={styles.videoThumbnail} onPress={() => Actions.VideoView({ videouri: `file://${RNFB.fs.dirs.DocumentDir}/${video.filename}` })}>
                                    <Image style={styles.videoThumbnail} source={{ uri: 'file://' + RNFB.fs.dirs.DocumentDir + '/videoThumbs/' + video.thumbnail }}
                                    />

                                </TouchableOpacity>
                            </View>
                            <Text style={styles.videoTitle}>{video.title}</Text>
                        </View>
                    )
                })
            );
        }

    }



    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.scrollPdfList}>
                        {this.renderAllVideos()}
                    </View>
                </ScrollView>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        width: '100%',
        height: '93%',
        paddingTop: 10,
        position: 'absolute',
        top: '7%',
        zIndex: 3,
    },

    scrollPdfList: {
        width: "100%",
        height: "100%",
        paddingTop: 20,
        backgroundColor: 'white',
        borderColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 35,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },

    videoComponent: {
        height: 220,
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'white',
        marginBottom: 20
    },

    video: {
        width: '100%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    videoThumbnail: {

        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 5,
    },

    videoPlay: {
        position: 'absolute',
        right: '45%',
        top: '45%',
        zIndex: 10
    },

    videoTitle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'left',
        height: '30%',
        width: '100%'
    },


});
