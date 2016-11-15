import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import Camera from 'react-native-camera';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth
  },
  overlay: {
    height: windowHeight,
    width: windowWidth,
    borderWidth: (windowWidth - 200) / 2,
    borderTopWidth: (windowHeight - 200) / 2,
    borderBottomWidth: (windowHeight - 200) / 2,
    borderColor: 'rgba(9, 12, 6, 0.7)'
  },
  qr: {
    opacity: 0.7
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    left: -40,
    right: -40,
    marginTop: 50,
    backgroundColor: 'transparent'
  }
});

export default class CameraView extends Component {
  _onBarCodeRead(data) {
    console.log('qr code', data);
  }

  render() {
    return (
      <View style={this.props.style}>
        <Camera style={styles.camera} onBarCodeRead={this._onBarCodeRead} keepAwake={true}>
          <View style={styles.overlay}>
            <Image source={require('../img/qr.png')} style={styles.qr} width={200} height={200} />

            <Text style={styles.text}>
              Scan the QR code on your computer screen.
            </Text>
          </View>
        </Camera>
      </View>
    );
  }
}
