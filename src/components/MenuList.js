import React, { Component } from 'react';
import { ScrollView, View, InteractionManager } from 'react-native';
import _ from 'lodash';
import TimerMixin from 'react-timer-mixin';
import Menu1 from './Menu1';
import Menu2 from './Menu2';
import { findMenu } from '../../helpers';

const menu1Width = 300;
const menu1scrollAwayFactor = 1.5;
const menu2Width = 200;


class MenuList extends React.PureComponent {

    state = {
        //languangeId: 2,
        menus: this.props.data.menuTrees[global.language].menuTree, // promeniti lang u dinamicki (ovo je samo english)
        selected: this.props.selected || 0,
        pages: this.props.data.pages,
        fromObj: {}
    };



    componentWillMount() {
        this.setState({
            fromObj: global.globalJson.menus[global.language].menu.find(o =>
                o.menuId == this.props.from
            )
        })
    }

    chooseSelected(m) {
        if (m.parentId == 0) {
            this.state.menus.map((cale, i) => {
                if (cale.menuId == m.menuId) {

                    this.setState({ selected: i })
                }
            })
        }
        else {
            let a = global.globalJson.menus[global.language].menu.find(x => x.menuId == m.parentId);
            this.chooseSelected(a)
        }
    }


    componentDidUpdate() {
        this.refs._scrollView2.scrollTo({ y: 0, x: 0, animated: false });
    }

    renderMenus1() {
        return this.state.menus.map((menu, i) =>
            <Menu1 onPress={() => this.setState({ selected: i })}
                isPressed={this.state.selected == i ? true : false}
                key={menu.menuId}
                menu1={menu}

            />
        );
    }

    renderMenus2() {
        if (this.state.menus[this.state.selected]) {
            if (this.state.menus[this.state.selected].children) {
                return this.state.menus[this.state.selected].children.map(menu =>

                    <Menu2
                        key={menu.menuId}
                        menu2={menu}
                        pages={this.state.pages}
                        from={this.props.from}
                        isPressed={this.props.from == menu.menuId ? true : false}
                        selected={this.state.selected}
                    />
                );
            }
        }
    }

    findMenu2Index = (menu) => {


    }

    findMenu2 = (menu) => {
        if(menu.depth==2) {
            return menu;
        } else {
            return this.findMenu2(findMenu(menu.parentId))
        }
    }

    findChildrens3 = (menu) => {
        
    }


    componentDidMount() {

        this.chooseSelected(this.state.fromObj);
        let menuObj = findMenu(this.props.from);
        let menu2Obj = this.findMenu2(menuObj);
        console.log(menu2Obj);
        /*InteractionManager.runAfterInteractions(() => {
            console.log('setTImeout1');
            
            setTimeout(() => {
                console.log('setTImeout1');
                this.refs._scrollView1.scrollTo({ y: 0, x: this.state.selected * menu1Width - (menu1Width * menu1scrollAwayFactor), animated: false });
                this.refs._scrollView2.scrollTo({ y: 0, x: menu2Index * 10, animated: false });
            }, 1)
            console.log('setTImeout2');
        })*/


    }

    render() {
        return (
            <View style={styles.mainCont}>

                <ScrollView ref='_scrollView1' style={styles.menu1Container} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView ref='_scrollView2' style={{ flexDirection: 'row', flex: 1 }} showsHorizontalScrollIndicator={false} horizontal={true}>
                    {this.renderMenus2()}
                </ScrollView>

            </View>
        );
    }
}

const styles = {
    menu1Container: {
        flexDirection: 'row',
        backgroundColor: '#d8d8d8'
    },
    mainCont: {
        backgroundColor: '#F5F5F5',
        paddingBottom: 0,
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 4,
        bottom: '0%'
    }
}


export default MenuList;
