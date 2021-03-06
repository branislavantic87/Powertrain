import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ListView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFB from 'react-native-fetch-blob';
import he from 'he';

export default class Search extends Component {

    /**
     * represents state tracker
     * @field (string) text - from input field, used as parameter for search
     * @field (array) searchPages - result from search f'n, resource for render rows
     */
    state = {
        text: '',
        searchPages: [],
        searchFiles: [],
        searchMenus: [],
        buttonActive: 'content',
        menu: {},
        video: false,
        content: true
    }
    /**
     * Searches for Menu Object by MenuId
     */
    searchMenu(menuId) {
        return global.globalJson.menus[0].menu.find(element =>
            menuId == element.menuId
        )
    }

    /*Actions.reset("HBF", {from: this.searchMenu(), filtered: element})}*/

    /**
     * Returns array of JSX titles of pages containing text from search
     */
    createObject() {
        let rat = [];
        switch (this.state.buttonActive) {
            case 'content':
                console.log(this.state.searchMenus.concat(this.state.searchPages));
                rat2 = this.state.searchMenus.concat(this.state.searchPages);
                console.log(rat2);
                rat = this.state.searchPages.map((element, i) => {
                    // newElement = { ...element, breadcrumb: this.getBreadcrumb(element.menuId) };
                    const breadcrumb = this.getBreadcrumb(element.menuId);
                    return <TouchableOpacity key={i + 'touchViewPage'} onPress={() => Actions.reset('HBF', { from: this.searchMenu(element.menuId), filtered: Array(element) })}>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 3, borderColor: '#dddddd' }}>
                            <Image
                                style={{ height: 60, width: 75, marginRight: 20 }}
                                source={{ uri: 'file://' + this.pageImageHelper(element.pageId) }}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 25 }} key={element.pageId}>
                                    {he.decode(element.title)}
                            </Text>
                                <Text>{breadcrumb}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                })
                .concat(this.state.searchMenus.map((element, i) => {
                    const breadcrumb = this.getBreadcrumb(element.menuId);
                    return <TouchableOpacity key={i + 'touchViewMenu'} onPress={() => Actions.reset('HBF', { from: this.searchMenu(element.menuId), filtered: Array(element) })}>
                        <View key={i + 'viewMenu'} style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 3, borderColor: '#dddddd' }}>
                            <Image
                                style={{ height: 60, width: 60, marginRight: 35 }}
                                source={  require('./ico/top-bar/breadcrumbs.png')  /* + this.pageImageHelper(element.pageId)  */}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 25 }} key={element.menuId}>
                                    {he.decode(element.title)}
                            </Text>
                                <Text>{breadcrumb}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }));
                break;
            case 'video':
                rat = this.state.searchFiles.map((element, i) => {
                    const breadcrumb = this.getBreadcrumb(this.pageTitleHelperForFile(element.pageId).menuId);
                    if (element.type == 'video')
                    return <TouchableOpacity key={i} onPress={() => Actions.VideoView({ videouri: 'file://' + RNFB.fs.dirs.DocumentDir + '/' + element.fileId + '.' + element.ext })}>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 3, borderColor: '#dddddd' }}>
                            <Image
                                style={{ height: 60, width: 75, marginRight: 20 }}
                                source={{ uri: 'file://' + this.pageImageHelper(element.pageId) }}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 25 }} key={element.filename}>{he.decode(this.pageTitleHelperForFile(element.pageId).title)}</Text>
                                <Text>{breadcrumb}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                });
                break;

            default:
                break;
        }

        return (
            <ScrollView style={{ padding: 20 }}>
                {rat}
            </ScrollView>
        )
    }

    //Actions.reset('HBF', {from: this.searchMenu(this.pageTitleHelperForFile(element.pageId).menuId), filtered: Array(this.pageTitleHelperForFile(element.pageId))})

    /**
     * If file is found in some page, return basic page info
     * @argument (string)
     */
    pageTitleHelperForFile = (pid) => {
        return this.state.searchPages.find(p => p.pageId == pid);
    }

    /**
     * returns uri from first image it finds
     * @argument number page id 
     */
    pageImageHelper = (pid) => {
        let page = this.pageTitleHelperForFile(pid);
        let file = 'none';
        if (page.files != null)
            if (page.files.length > 0) {
                page.files.forEach(e => {
                    let dirs = RNFB.fs.dirs;
                    file = dirs.DocumentDir + '/' + e.fileId + '.' + e.ext;
                })
            }
        return file;
    }
    /**
     * This part of search finds menu items which include input text
     * @argument (string)
     * @argument (list of pages)
     */
    searchDoTitlesMENU = (item, where) => {

        return new Promise((resolve, reject) => {
            let rslt = where.filter(x =>
                x.title.toLowerCase().includes(item.toLowerCase())
            )
            resolve(rslt);
        })
    }

    searchDoTitlesPromiseWrapper = (item, where) => {
        return new Promise((resolve, reject) => {
            let foundMenus = this.searchDoTitlesMENU(item, where);
            resolve(foundMenus);
        })
    }

    getMenuTitle = (menuId, where) => {
        return new Promise((resolve, reject) => {
            let menu = where.find(menu => menu.menuId == menuId);
            resolve(menu);
        });
    }

    getBreadcrumb = (menuId, breadcrumb = '') => {
        let foundMenu = this.searchMenu(menuId);
        
        if (foundMenu.depth == 1) {
          breadcrumb = foundMenu.title + breadcrumb;
          breadcrumb = he.decode(breadcrumb);
          return breadcrumb;
        } else {
          breadcrumb = '->' + foundMenu.title + breadcrumb;
          return this.getBreadcrumb(foundMenu.parentId, breadcrumb);
        }
    
      }

    searchDoPages = (item, where) => {
        return new Promise((resolve, reject) => {
            itemL = item.toLowerCase();
            let foundPages = where.filter(x => {
                if (x.text != null)
                    if (
                        (x.text.toLowerCase().includes(itemL) || x.subtitle.toLowerCase().includes(itemL) || x.title.toLowerCase().includes(itemL)) ) {
                        return x;
                    }
                    else if (x.text == null)
                        if ((x.subtitle.toLowerCase().includes(itemL) || x.title.toLowerCase().includes(itemL)) ) {
                            return x;
                        };
            })
            resolve(foundPages)
        })
    }

    searchDoFiles = (where) => new Promise((resolve, reject) => {
        let foundFiles = [];
        if (where != null)
            where.forEach(e => {
                if (e.files != null)
                    e.files.forEach(ei => foundFiles.push(ei))
            })
        resolve(foundFiles);
    });

    searchPromise = (input) => {
        return new Promise((resolve, reject) => {

            let pages = global.globalJson.pages;
            let menus = global.globalJson.menus[0].menu;

            let resultMenus = [];
            this.searchDoTitlesPromiseWrapper(input, menus)
                .then(r => { r.forEach(val => { resultMenus.push(val) }) })

            let resultPages = [];
            let resultFiles = [];
            this.searchDoPages(input, pages)
                .then(r => {
                    r.forEach(val => resultPages.push(val));
                    this.searchDoFiles(r)
                        .then((rlt) => {
                            resultFiles = rlt;
                        })
                        .then(() => resolve({
                            foundMenus: resultMenus,
                            foundPages: resultPages,
                            foundFiles: resultFiles
                        }))
                })
        })
    }

    callMe = (stuff) => {
        if (stuff.length >= 3)
            this.searchPromise(stuff).then(({ foundMenus, foundPages, foundFiles }) => {
                this.setState({
                    searchPages: foundPages,
                    searchFiles: foundFiles,
                    searchMenus: foundMenus
                });
                // console.log(this.state.searchPages)
            });
    }


    render() {


        // if (this.state.text.length >= 3)
        //     this.searchPromise(this.state.text).then((r) => this.setState({ searchPages: r.foundPages }));

        return (

            <View style={styles.searchCont} >

                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <Text style={{ color: '#595959', fontSize: 20 }}>Choose the Category:</Text>
                    </View>
                    <View style={styles.ButtonsView}>
                        <TouchableOpacity style={[styles.ButtonContent, { backgroundColor: this.state.content ? '#ddd' : '#fff' }]} onPress={() => this.setState({ buttonActive: 'content', content: true, video: false })}>
                            <Image
                                style={styles.ButtonIconStyle22}
                                source={require('./ico/32/content-search.png')}
                            />
                            <Text style={styles.ButtonTextStyle}>CONTENT</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={[styles.ButtonContent, { backgroundColor: this.state.video ? '#ddd' : '#fff' }]} onPress={() => this.setState({ buttonActive: 'video', video: true, content: false })}>
                            <Image
                                style={styles.ButtonIconStyle2}
                                source={require('./ico/32/video-search.png')}

                            />
                            <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                        </TouchableOpacity >
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                        <TouchableWithoutFeedback>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('./ico/top-bar/search.png')}
                            />
                        </TouchableWithoutFeedback>
                        <View style={{ padding: 10 }}>
                            <TextInput
                                keyboardType='default'
                                placeholder="Search term"
                                style={styles.textInput}
                                onChangeText={(text) => {
                                    this.setState({ text });
                                    this.callMe(text)
                                }}
                                value={this.state.text}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        {this.createObject()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchCont: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        height: '93%',
        width: '100%',
        top: '7%',
        zIndex: 3,
        borderBottomWidth: 3,
        borderColor: '#dddddd',
    },
    textInput: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        fontSize: 16
    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    ButtonIconStyle22: {
        marginRight: 10,
        width: 28,
        height: 28
    },
    ButtonContent: {
        width: 200,
        height: 50,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderRadius: 0,
        paddingHorizontal: 40,
        backgroundColor: '#dddddd',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    ButtonsView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ButtonTextStyle: {
        fontSize: 20,
        color: '#595959'
    },
    ico: {
        height: 35,
        width: 35,
        margin: 10,
    }
});
