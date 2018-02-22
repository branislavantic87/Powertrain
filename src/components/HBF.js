import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Settings, TouchableWithoutFeedback } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import SettingsComponent from './Settings';
import Languages from './Languages';
import NotificationComponent from './Notification';
import Search from './Search';
import PdfList from './PdfList';
import Dashboard from './Dashboard';
import PresentationNewComponent from './PresentationNew';
import Breadcrumbs from './Breadcrumbs';
import Leaflets from './Leaflets';
import Videos from './Videos';
import LeafletButtons from './LeafletButton';



class HBF extends Component {

    state = {
        visibleMenu: false,
        visibleSearch: false,
        visiblelanguage: false,
        visiblesettings: false,
        visibleVideos: false,
        visiblePdf: false,
        languangeId: 0,
        visiblenotification: false,
        visibledashboard: false,
        visiblepresentation: false,

        visiblebreadcrumbs: false,
        visibleleaflets: false,
        visiblevideos: false,
        whatIsOpen: ''
    }

    render() {
        return (

            <View>
                {this.state.visibleMenu && <TouchableWithoutFeedback onPress={() => this.setState({ visibleMenu: false })} ><View style={{ backgroundColor: 'black', opacity: 0.3, position: 'absolute', top: 0, zIndex: 5, height: '100%', width: '100%' }}></View></TouchableWithoutFeedback>}
                <Header
                    whatIsOpen={this.state.whatIsOpen}
                    title={this.props.from.title}
                    onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false, whatIsOpen: '' }) : this.setState({ visiblelanguage: true, visibleMenu: false, visibleSearch: false, visiblesettings: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'language' }) }}
                    onPressSearch={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false, whatIsOpen: '' }) : this.setState({ visibleSearch: true, visibleMenu: false, visiblelanguage: false, visiblesettings: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'search' }) }}
                    onPressSettings={() => { this.state.visiblesettings ? this.setState({ visiblesettings: false, whatIsOpen: '' }) : this.setState({ visiblesettings: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'settings' }) }}
                    onPressVideos={() => { this.state.visiblevideos ? this.setState({ visiblevideos: false, whatIsOpen: '' }) : this.setState({ visiblevideos: true, visiblesettings: false, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblePdf: false, visiblenotification: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'videos' }) }}
                    onPressMediaCenter={() => { this.state.visiblePdf ? this.setState({ visiblePdf: false, whatIsOpen: '' }) : this.setState({ visiblePdf: true, visiblelanguage: false, visibleMenu: false, visibleSearch: false, visiblesettings: false, visiblevideos: false, visiblenotification: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'mediacenter' }) }}
                    onPressNotification={() => { this.state.visiblenotification ? this.setState({ visiblenotification: false, whatIsOpen: '' }) : this.setState({ visiblenotification: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblesettings: false, visiblePdf: false, visiblevideos: false, visibledashboard: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'notifications' }) }}
                    onPressDashboard={() => { this.state.visibledashboard ? this.setState({ visibledashboard: false, whatIsOpen: '' }) : this.setState({ visibledashboard: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visiblesettings: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'dashboard' }) }}
                    onPressPresentation={() => { this.state.visiblepresentation ? this.setState({ visiblepresentation: false, whatIsOpen: '' }) : this.setState({ visiblepresentation: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visiblesettings: false, visiblepresentationsort: false, visibledashboard: false, visiblebreadcrumbs: false, visibleleaflets: false, whatIsOpen: 'presentation' }) }}
                    onPressBreadcrumbs={() => { this.state.visiblebreadcrumbs ? this.setState({ visiblebreadcrumbs: false, whatIsOpen: '' }) : this.setState({ visiblebreadcrumbs: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visiblesettings: false, visiblepresentation: false, visiblepresentationsort: false, visibleleaflets: false, whatIsOpen: 'breadcrumbs' }) }}
                    onPressLeaflets={() => { this.state.visibleleaflets ? this.setState({ visibleleaflets: false, whatIsOpen: '' }) : this.setState({ visibleleaflets: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visiblevideos: false, visiblePdf: false, visiblenotification: false, visiblesettings: false, visiblepresentation: false, visiblepresentationsort: false, visiblebreadcrumbs: false, whatIsOpen: 'leaflets' }) }}
                //  onPressPresentation={() => { this.state.visiblepresentationsort ? this.setState({ visiblepresentationsort: false }) : this.setState({ visiblepresentationsort: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false, visibleVideos: false, visiblePdf: false, visiblenotification: false, visiblesettings: false, visibledashboard: false, visiblepresentation: false }) }}
                />


                {this.state.visiblelanguage &&
                    <Languages />
                }
                {this.state.visibleSearch &&
                    <Search />
                }
                {this.state.visiblesettings &&
                    <SettingsComponent />
                }
                {this.state.visiblenotification &&
                    <NotificationComponent />
                }


                {this.state.visiblePdf &&
                    <PdfList />
                }
                {this.state.visibledashboard &&
                    <Dashboard />
                }
                {this.state.visiblebreadcrumbs &&
                    <Breadcrumbs from={this.props.from.menuId} />
                }
                {this.state.visibleleaflets &&
                    <Leaflets />
                }
                {this.state.visiblevideos &&
                    <Videos />
                }

                {
                    this.state.visiblepresentation &&
                    <PresentationNewComponent  lookingAt={this.props.filtered? this.props.filtered : ''} closePresentation={() => { this.setState({ visiblepresentation: false, whatIsOpen: '' }) }} />
                }

                {/* {
                    this.state.visiblepresentationsort &&
                    <PresentationSortComponent />

                }  */}

                {this.state.isModalVisibleForgotPswd &&
                    <ForgotPassword
                        ForgotPswdBack={() => { this.setState({ isModalVisibleForgotPswd: !this.state.isModalVisibleForgotPswd, isModalVisible: !this.state.isModalVisible }) }}
                        ForgotPswdDrop={() => { this.setState({ isModalVisibleForgotPswd: !this.state.isModalVisibleForgotPswd }) }} />
                }

                <Body fromHome={this.props.fromHome} style={{ bottom: 10 }} pages={this.props.filtered} />

                {/* <LeafletButtons
                    onPressPresentation={() => { this.setState({ visiblepresentation: !this.state.visiblepresentation }) }}
                /> */}

                {!this.state.visibleMenu &&
                    <View style={{ position: 'absolute', width: 50, height: 50, bottom: 15, left: 15, zIndex: 5 }}>
                        <TouchableOpacity onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} style={{ width: '100%', height: '100%' }}>
                            <Image style={styles.ico} source={require('./ico/32/main-menu.png')} />
                        </TouchableOpacity>
                    </View>
                }

                <View style={{ position: 'absolute', bottom: 0, height: this.state.visibleMenu ? undefined : 0, zIndex: 6, width: '100%' }}>
                    <MenuList selected={this.props.selected} data={global.globalJson} from={this.props.from.menuId} />
                </View>

            </View >

        );
    }

}

const styles = StyleSheet.create({

    content3: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '15%'
    },

    videotour: {
        backgroundColor: '#4169e1',
        width: 270,
        height: 39,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 90,
        paddingTop: 50
    },

    ico2: {
        width: 24,
        marginRight: 20,
        height: 24,
        marginTop: 10
    },

    content2: {
        justifyContent: 'flex-start',
        marginLeft: '15%',
    },

    ico: {
        height: 50,
        width: 50,
    },

});

export default HBF;
