import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, NavigationActions } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { Actions } from 'react-native-router-flux';

export default class VideoView extends Component {

    render() {
        return (


            <View style={{ flex: 1 }}>
                <VideoPlayer
                    source={{ uri: this.props.videouri }}   // Can be a URL or a local file.
                    controlTimeout={2000}
                    onBack={() => Actions.pop()}
                    // Store reference
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}                           // Mutes the audio entirely.
                    paused={false}                          // Pauses playback entirely.
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={false}                           // Repeat forever.
                    playInBackground={false}                // Audio continues to play when app entering background.
                    playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                    ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                    progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                    onLoadStart={this.loadStart}            // Callback when video starts to load
                    onLoad={this.setDuration}               // Callback when video loads
                    onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    onEnd={() => Actions.pop()}                      // Callback when playback finishes
                    onError={this.videoError}               // Callback when video cannot be loaded
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                    style={{ width: '100%', height: '100%' }} />
            </View>


        );
    }
}

const styles = StyleSheet.create({

});