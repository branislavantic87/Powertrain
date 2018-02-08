import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';
import RNFB from 'react-native-fetch-blob';
import HotspotImage from './temp5_imageHotspot';

class Body extends Component {


    filterBody() {
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/`
        //const pathToFiles = RNFB.fs.dirs.DocumentDir + '/';
        return this.props.pages.map(page => {

            let title = page.title;
            let subtitle = page.subtitle;
            let text = page.text;
            let files = [];
            // promeniti naziv prema JSON-u i proveriti da li ih ima
            let hotspot = [];

            if (page.files) {
                files = page.files.map(file => {
                    return pathToFiles + file.fileId + '.' + file.ext;
                })
            }

            switch (page.templateId) {
                case '1':
                    return <FullImage key={page.pageId} files={files} />
                    break;

                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} text={text} />
                    break;

                case '4':
                    return <FullText key={page.pageId} subtitle={subtitle} templateTitle={title} text={text} />
                    break;

                    case '5':
                    return <HotspotImage key={page.pageId} files={files} hotspot={hotspot} /> 
                    break;

                default:
                    console.log('WTF?!');
            }
        })
    }

    render() {

        return (

            <View style={styles.bodyCont}>
            
                <Swiper 
                    loop={false}
                    paginationStyle={styles.pagginationStyle}
                    removeClippedSubviews={true}
                    activeDot={<View style={{backgroundColor: '#9B9B9B', width: 13, height: 13, borderRadius: 25, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: '5%',}} />}
                    dot={<View style={{backgroundColor: 'white', width: 13, height: 13, borderRadius: 25, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: '5%', borderWidth: 1.5, borderColor: '#9B9B9B'}} />}
                >
                    {this.filterBody()}
                </Swiper>

            </View>
        );

    }
}

const styles = StyleSheet.create({
    bodyCont: {
        backgroundColor: 'white',
        width: '100%',
        height: '93%'
    },
    pagginationStyle: {
        bottom: 0,
        backgroundColor: '#fff'
    },
    
});

export default Body;