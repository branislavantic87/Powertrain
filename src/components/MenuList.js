import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
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
        console.log('componentWillMount()');
        this.setState({
            fromObj: global.globalJson.menus[global.language].menu.find(o =>
                o.menuId == this.props.from
            )
        });
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
        this.refs._scrollView2.scrollTo({ y: 0, x: 0, animated: true });
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
        let b = global.globalJson.menus[global.language].menu.filter(m => menu.depth == m.depth && menu.parentId == m.parentId)
        let a = b.findIndex(m => m.menuId == menu.menuId);
        return a/b.length*100;

    }

    componentDidMount() {
        console.log('componentDidMount()');
        this.chooseSelected(this.state.fromObj);
        let menu2Obj = findMenu(this.props.from);
        let menu2Index = this.findMenu2Index(menu2Obj);
        console.log(this.refs._scrollView1.scrollTo);
        /*setTimeout(() => {
            console.log('setTImeout()');
            this.refs._scrollView1.scrollTo({ y: 0, x: this.state.selected * menu1Width - (menu1Width * menu1scrollAwayFactor), animated: true });
            this.refs._scrollView2.scrollTo({ y: 0, x: menu2Index * 10, animated: true });
        }, 1000)*/
    }

    render() {
        return (
            <View style={styles.mainCont}>
                <ScrollView ref='_scrollView1' horizontal={true} style={styles.menu1Container} showsHorizontalScrollIndicator={false}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView ref='_scrollView2' showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row', flex: 1 }}>
                    {this.renderMenus2()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        flexDirection: 'row',

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
