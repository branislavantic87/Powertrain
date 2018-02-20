import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback, Dimensions, ImageBackground } from 'react-native';
import RNFB from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import LeafletButton from './LeafletButton';
import { findPageObjectById, findMenuObjectById, findMenu1Selected, aaa } from '../../helpers';

const margine = 0.0;

export default class HotspotImage extends Component {

    state = {
        layoutWidth: 0,
        layoutHeigth: 0,
        picExists: false
    }


    findInfoAboutMenu = (p) => {
        // this.props.from == ceo objekat menija
        // this.props.selected == index od meni 1
        // this.props.filtered == [ pageObj ]
        let filtered = findPageObjectById(p);
        let from = findMenuObjectById(filtered[0].menuId);
        let selected = findMenu1Selected(from);
        return { filtered, from, selected };
    }

    hotspotRedirect = (spot) => {
        let { filtered, from, selected } = this.findInfoAboutMenu(spot.linkPageId);
        Actions.reset('HBF', { filtered, from, selected });
    }

    getPosistionsFromJSON = () => {
        //console.log('layoutWidth: ' + this.state.layoutWidth + ' layoutHeight: ' + this.state.layoutHeigth);
        //console.log(this.props);
        const hotspots = this.props.page.hotspots;
        //console.log('hotspots:', hotspots);

        return (hotspots.map((spot, i) => {
            const posx = this.state.layoutWidth * (spot.x / 1000) + Dimensions.get('screen').width * margine / 2;
            // const posx = this.state.layoutWidth * (spot.x / 1000) + Dimensions.get('screen').width * 0.07;
            const posy = this.state.layoutHeigth * (spot.y / 1000) - 19;
            return (
                <View key={i + '.viewMaster'} style={{ flexDirection: 'row', position: "absolute", zIndex: 20, left: posx - 10, top: posy - 10 }}>
                    <TouchableOpacity
                        key={i}
                        style={{ marginTop: 17 }}
                        onPress={() => {
                            let { filtered, from, selected } = this.findInfoAboutMenu(spot.linkPageId);
                            Actions.reset('HBF', { filtered, from, selected });
                        }}
                    >
                        <Image key={i + '.image'} source={require('./ico/32/hotspot.png')} />
                    </TouchableOpacity>
<TouchableOpacity onPress={() => this.hotspotRedirect(spot)}>
                    <ImageBackground key={i + '.viewSlave'}
                        style={styles.hotspotTitileView}
                        source={require('./ico/32/123.png')}
                   >
                       <Text key={i + '.text'} style={styles.hotspotTitle}>{spot.label}</Text>
                  </ImageBackground>
                  </TouchableOpacity>
                    {/* <View key={i + '.viewSlave'} style={[styles.hotspotTitileView, {marginBottom: 17} ]}>
                        <Text key={i + '.text'} style={styles.hotspotTitle}>{spot.label}</Text>
                    </View> */}
                </View>
            );
        }));
    }

    componentWillMount() {
        RNFB.fs.exists(RNFB.fs.dirs.DocumentDir + '/' + this.props.page.files.find(e => e.ext == 'jpg').filename)
        .then(res => res ? this.setState({picExists: true}) : this.setState({picExists: false}))
    }

    render() {

        return (
            <View style={styles.mainView} >
                {!this.props.fromHome && <LeafletButton page={this.props.page} />}
                <View style={styles.body}>
                    <View style={styles.contentContainer}>
                        {<Image
                            ref='_image'
                            resizeMode='cover'
                            style={styles.imageStyle}
                            onLayout={event => {
                                const width = event.nativeEvent.layout.width;
                                const height = event.nativeEvent.layout.height;
                                //console.log('event', width, height);
                                this.setState(() => ({ layoutWidth: width, layoutHeigth: height }));
                            }}
                            source={{ uri: 'file://' + RNFB.fs.dirs.DocumentDir + '/' + this.props.page.files.find(e => e.ext == 'jpg').filename }} />}
                        {this.state.picExists && this.getPosistionsFromJSON()}
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
        marginTop: 0,
        marginBottom: 5,
    },
    hotspotTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#da281c',
    },

    hotspotTitileView: {
        backgroundColor: 'transparent',
        height: 25,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: Dimensions.get('screen').width - Dimensions.get('screen').width * margine,
        height: Dimensions.get('screen').height - Dimensions.get('screen').height * margine,
        resizeMode: 'cover',
        zIndex: 1,
        marginLeft: Dimensions.get('screen').width * margine / 2
    }

});
