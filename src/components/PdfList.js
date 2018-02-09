import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFB from 'react-native-fetch-blob';


export default class PdfList extends Component {

    state = {
        settingsText: '',
        categorySelected: '',
        allPdf: global.globalPdf
    };

    Category(id) {
        this.setState({ categorySelected: id });
    }

    renderAllCategories = () => {
        return this.state.allPdf.documents.map((file, i) => {
            return (
                <TouchableOpacity key={i} style={[styles.btn_settings, { backgroundColor: this.state.categorySelected == file.category ? 'white' : '#D7D7D7', borderColor: this.state.categorySelected == file.category ? '#959595' : 'white' }]}
                    onPress={() => { this.Category(file.category); this.setState({ settingsText: file.category }) }}>
                    <Text style={styles.btn_text}>{file.category}</Text>
                </TouchableOpacity>
            );
        })
    }

    pdfList = (list) => {
        return list.map((lista, i) => {
            return (
                <TouchableOpacity key={i} style={{width: '48%', marginRight: 4}} onPress={() => Actions.DocumentView({ docuri: `file://${RNFB.fs.dirs.DocumentDir}/${lista.fileId}.pdf` })}>
                    <View style={styles.pdf_list_tag}>

                        <Image
                            style={{ width: 30, height: 30, padding: 5, marginLeft: 5, alignSelf: 'center' }}
                            source={require('./ico/32/pdf.png')}
                        />

                        <Text style={styles.pdf_text} numberOfLines={1}>{lista.title}</Text>

                    </View>
                </TouchableOpacity>
            );
        })
    }

    renderOstalo = () => {
        return this.state.allPdf.documents.map(fajl => {
            if (this.state.settingsText === fajl.category) {
                return (
                    <View key={fajl.category} style={styles.pdf_list}>
                        <View style={styles.category_tag}>
                            <Text style={styles.text}>{fajl.category}</Text>
                        </View>
                        {this.pdfList(fajl.files)}
                    </View >
                );
            }
        })
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.category_list}>
                    <View style={{ width: '100%' }}>
                        <ScrollView>
                            {this.renderAllCategories()}
                        </ScrollView>
                    </View>
                </View>

                <ScrollView>
                    {this.renderOstalo()}
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
        flexDirection: 'row',
        position: 'absolute',
        top: '7%',
        zIndex: 3,
        paddingTop: 10
    },
    category_list: {
        width: '30%',
        backgroundColor: 'white',
        height: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
        padding: 2
    },
    pdf_list: {
        width: '100%',
        backgroundColor: 'white',
        height: "100%",
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 25
    },

    pdf_list_tag: {
        width: '100%',
        height: 70,
        flexDirection: 'row',

    },

    pdf_text: {
        width: '85%',
        fontSize: 16,
        marginLeft: 15,
        color: '#4E4E4E',
        textAlign: 'left',
        padding: 20,
        borderWidth: 1,
        borderColor: '#959595',
        alignSelf: 'center'
    },

    category_tag: {
        height: 60,
        width: '98%',
        justifyContent: 'center',
        paddingLeft: 10,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#959595',
        margin: 2
    },

    btn_settings: {
        height: 60,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 3
    },

    btn_text: {
        fontSize: 18,
        textAlign: 'left',
        color: '#4E4E4E'
    },

    text: {
        fontSize: 18,
        padding: 10,
        marginLeft: 10,
        color: '#4E4E4E',
        justifyContent: 'center'
    }
});
