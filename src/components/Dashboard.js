import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default class DashboardComponent extends Component {

  render() {

    return (

      //{/* <dashboardContainer */} STATICKI LAYOUT, POTREBNO RAZDVOJITI NA KOMPONENTE SVAKU KOCKICU
      <View style={styles.dashboardHolder}>
        <View style={styles.dashboardContainer}>

          {/* <singleSection */}
          <View style={styles.singleComponentHolder}>
            <View style={styles.space_1} />
            <View style={styles.singleComponentBig}>
              <View style={styles.singleComponentSmall}>
                <Text style={styles.innerText}> 15 </Text>
              </View>
            </View>
            <View style={styles.space_2} />
            <View style={styles.textFrame} >
              <Text style={styles.textTitle}> LEAFLETS SENT </Text>
            </View>
          </View>
          {/* </singleSection */}

          {/* <singleSection */}
          <View style={styles.singleComponentHolder}>
            <View style={styles.space_1} />
            <View style={styles.singleComponentBig}>
              <View style={styles.singleComponentSmall}>
                <Text style={styles.innerTextSmaller}> October 13th 2017 </Text>
              </View>
            </View>
            <View style={styles.space_2} />
            <View style={styles.textFrame} >
              <Text style={styles.textTitle}> LAST UPDATE </Text>
            </View>
          </View>
          {/* </singleSection */}

          {/* <singleSection */}
          <View style={styles.singleComponentHolder}>
            <View style={styles.space_1} />
            <View style={styles.singleComponentBig}>
              <View style={styles.singleComponentSmall}>
                <Text style={styles.innerText}> 11 </Text>
              </View>
            </View>
            <View style={styles.space_2} />
            <View style={styles.textFrame} >
              <Text style={styles.textTitle}> UPDATES AVAILABLE </Text>
            </View>
          </View>
          {/* </singleSection */}

          {/* <singleSection */}
          <View style={styles.singleComponentHolder}>
            <View style={styles.space_1} />
            <View style={styles.singleComponentBig}>
              <View style={styles.singleComponentSmall}>
                <Text style={styles.innerText}> 172 </Text>
              </View>
            </View>
            <View style={styles.space_2} />
            <View style={styles.textFrame} >
              <Text style={styles.textTitle}> PRODUCTS IN APP </Text>
            </View>
          </View>
          {/* </singleSection */}
        </View>



        <View style={styles.leafletHistory}>
          <Text style={styles.leafletTitle}>LEAFLET HISTORY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator style={styles.leafletHistory}>
            <View style={{ flexDirection: 'column', height: 320, flexWrap: 'wrap' }}>
         
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              <View style={styles.zajebancija}>
                <View style={{ height: '100%', width: '57%', justifyContent: 'center', alignItems: 'flex-start', }}>
                  <Text style={{ fontSize: 10 }}>Recipient:</Text>
                  <Text style={{ fontSize: 15 }}>John Doe Middlename</Text>
                  <Text style={{ fontSize: 15 }}>Longlastname</Text>
                </View>
                <View style={{ height: '100%', width: '37%', justifyContent: 'center', alignItems: 'flex-end', }}>
                  <Text style={{ fontSize: 10 }}>mail sent: Oct 13</Text>
                  <Text style={{ fontSize: 10 }}>opened: Oct 14</Text>
                  <Text style={{ fontSize: 10 }}>Leaflet read: Oct 15</Text>
                </View>
              </View>
              

            </View>
          </ScrollView>
        </View>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  leafletHistory: {
    flex: 1.3,
    width: '100%',
    height: '90%',
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: '#ebeced',
  },

  zajebancija: {
    width: 300,
    height: 70,
    margin: 5,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  leafletTitle: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#757575'
  },

  leafletsHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10
  },

  leafletCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  leafletSpace: {
    width: 300,
    height: 5,
    backgroundColor: '#F5F5F5'
  },

  singleThingy: {
    width: 300,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  leftHalf: {
    width: 180,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10
  },

  rightHalf: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  },

  fontSmall: {
    fontSize: 11,
  },

  fontLarge: {
    fontSize: 14,
  },

  dashboardHolder: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '93%',
    flexDirection: 'column',
    position: 'absolute',
    top: '7%',
    zIndex: 3,
  },

  dashboardContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: "60%",
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },

  singleComponentHolder: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 300
  },

  space_1: {
    width: 10,
    height: 20,
    backgroundColor: '#fff'
  },

  space_2: {
    width: 100,
    height: 20,
    backgroundColor: '#fff',
  },

  singleComponentBig: {
    width: 180,
    height: 180,
    backgroundColor: '#f44336',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90
  },

  singleComponentSmall: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerText: {
    fontSize: 35,
    color: '#757575'
  },

  innerTextSmaller: {
    fontSize: 20,
    color: '#757575',
    textAlign: 'center'
  },

  textFrame: {
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  textTitle: {
    fontSize: 16,
    color: '#9E9E9E',
    fontWeight: 'bold',
    padding: 0
  },

});
