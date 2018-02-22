import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import HTML from 'react-native-render-html';
import LeafletButton from './LeafletButton';
import { renderVB, renderDB, renderModalforMultipleFiles, renderModalPresentation } from '../../helpers';


export default class FullText extends Component {
    state = {
        videoPath: [],
        documentPath: [],
        videos: false,
        documents: false,
        presentationModal: false
    }

    componentWillMount() {
        let videos = this.props.page.files.filter(file => file.type == 'video')

        let documents = this.props.page.files.filter(file => file.type == 'document');

        this.setState({ videoPath: videos, documentPath: documents });
    }

    hideModal = () => {
        this.setState({ videos: false, documents: false, presentationModal: false });
    }

    showModal = (which) => {
        this.setState({ [which]: true });
    }


    render() {
        return (
            <View style={styles.mainView}>
                {!this.props.fromHome && <LeafletButton showPresentationModal={() => this.showModal('presentationModal')} page={this.props.page} />}
                <View style={styles.body}>
                    <View style={{ height: '13%' }}>
                        <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={styles.headingText}>{this.props.subtitle}</Text>
                    </View>

                    <View style={styles.contentContainer}>

                        <View style={styles.contentText}>
                            <ScrollView>
                                <HTML html={this.props.text} />
                            </ScrollView>
                        </View>

                    </View>
                    <View style={styles.ButtonContainer}>

                        {renderVB(this.state.videoPath, this.showModal.bind(null, 'videos'))}
                        {renderDB(this.state.documentPath, this.showModal.bind(null, 'documents'))}

                    </View>

                </View>

                {renderModalforMultipleFiles('videos', this.state.videoPath, this.state.videos, this.hideModal)}
                {renderModalforMultipleFiles('documents', this.state.documentPath, this.state.documents, this.hideModal)}
                {renderModalPresentation('presentationModal', this.state.presentationModal, this.hideModal)}
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
        paddingBottom: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    contentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: '67%',
        marginBottom: 10,
    },
    contentText: {
        flex: 2.5,
        backgroundColor: '#ebeced',
        height: '100%',
        padding: 20,
        paddingTop: 30
    },
    ButtonContainer: {
        width: '100%',
        height: '20%',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 40,
    },
});