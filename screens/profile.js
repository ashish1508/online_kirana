import React from 'react';
import { StyleSheet, Text, View,Button ,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';

class ProfileView extends React.Component {

    state = {
        barcodes: []
      }
      
    barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.log(barcode.data))
    this.setState({ barcodes })
    }


    renderBarcodes = () => (
    <View>{this.state.barcodes.map(this.renderBarcode)}</View>
    )
      
    renderBarcode = ({ data }) =>
    Alert.alert(
        'Scanned Data',
        data,
        [
        {
            text: 'Okay',
            onPress: () => console.log('Okay Pressed'),
            style: 'cancel'
        }
        ],
        { cancelable: false }
    )


    _signOutAsync =  () => {
        this.props.removeUserToken()
            .then(() => {
            
            })
            .catch(error => {
                this.setState({ error })
            })
    };

    render() {
        return (
          <View style={styles.container}>
            <RNCamera
             style={styles.scanner}
             ref={ref => {
                this.camera = ref
              }}
             onGoogleVisionBarcodesDetected={this.barcodeRecognized}>
             {this.renderBarcodes}
             </RNCamera>
            
          </View>
        )
      }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: 'black',
    
   },
   scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);