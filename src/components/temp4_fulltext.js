import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import HTML from 'react-native-render-html';
import LeafletButton from './LeafletButton';
import { renderVB, renderDB, renderModalforMultipleFiles } from '../../helpers';


export default class FullText extends Component {
    state = {
        videoPath: [],
        documentPath: [],
        videos: false,
        documents: false
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

    hideModal = () => {
        this.setState({ videos: false, documents: false });
    }

    showModal = (which) => {
        this.setState({ [which]: true });
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
                            <ScrollView>
                                <HTML html={this.props.text} />
                            </ScrollView>
                        </View>
                        <View style={styles.ButtonContainer}>
                            {renderVB(this.state.videoPath, this.showModal.bind(null, 'videos'))}
                            {renderDB(this.state.documentPath, this.showModal.bind(null, 'documents'))}
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
        paddingBottom: 35
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
        marginBottom: 25,
    },
    contentText: {
        flex: 2.5,
        backgroundColor: '#ebeced',
        height: '100%',
        padding: 20,
        paddingTop: 30
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