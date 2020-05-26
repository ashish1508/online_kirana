import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView ,Animated,StatusBar,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { removeUserToken } from '../redux/actions';
import GridComp from '../Components/grid'


const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class CategoriesView extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          scrollY: new Animated.Value(
            // iOS has negative initial scroll value because content inset...
            Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
          ),
          refreshing: false,
        };
      }
    
      _renderScrollViewContent() {
        const data = Array.from({ length: 15 });
        return (
          <View style={styles.scrollViewContent}>
            <View style={{backgroundColor:"#A997DF",height:"3%",width:"100%",margin:"1%"}}>
            <Text adjustsFontSizeToFit style={{backgroundColor:"white",fontSize:20}}>Sri Venkateshwara</Text>
            <Text adjustsFontSizeToFit style={{backgroundColor:"white",fontSize:20}}>Kirana and General Stores</Text>
            </View>
            <GridComp/>
            {/* {data.map((_, i) => (
              <View key={i} style={styles.row}>
                <Text>{i}</Text>
              </View>
            ))} */}
          </View>
        );
      }
    
      render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.
        const scrollY = Animated.add(
          this.state.scrollY,
          Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [0, -HEADER_SCROLL_DISTANCE],
          extrapolate: 'clamp',
        });
    
        const imageOpacity = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
          outputRange: [1, 1, 0],
          extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [0, 100],
          extrapolate: 'clamp',
        });
    
        const titleScale = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
          outputRange: [1, 1, 0.8],
          extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
          outputRange: [0, 0, -8],
          extrapolate: 'clamp',
        });
    
        return (
          <View style={styles.fill}>
            <StatusBar
              translucent
              barStyle="light-content"
              backgroundColor="rgba(0, 0, 0, 0.251)"
            />
            <Animated.ScrollView
              style={styles.fill}
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                { useNativeDriver: true },
              )}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => this.setState({ refreshing: false }), 1000);
                  }}
                  // Android offset for RefreshControl
                  progressViewOffset={HEADER_MAX_HEIGHT}
                />
              }
              // iOS offset for RefreshControl
              contentInset={{
                top: HEADER_MAX_HEIGHT,
              }}
              contentOffset={{
                y: -HEADER_MAX_HEIGHT,
              }}
            >
              {this._renderScrollViewContent()}
            </Animated.ScrollView>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.header,
                { transform: [{ translateY: headerTranslate }] },
              ]}
            >
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  {
                    opacity: imageOpacity,
                    transform: [{ translateY: imageTranslate }],
                  },
                ]}
                source={require('../Components/sup120.jpg')}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.bar,
                {
                  transform: [
                    { scale: titleScale },
                    { translateY: titleTranslate },
                  ],
                },
              ]}
            >
              <Text style={styles.title}>Title</Text>
            </Animated.View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    fill: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#A997DF',
      overflow: 'hidden',
      height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: null,
      height: HEADER_MAX_HEIGHT,
      resizeMode: 'cover',
    },
    bar: {
      backgroundColor: 'transparent',
      marginTop: Platform.OS === 'ios' ? 28 : 38,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    title: {
      color: 'white',
      fontSize: 18,
    },
    scrollViewContent: {
      // iOS uses content inset, which acts like padding.
      paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    },
    row: {
      height: 40,
      margin: 16,
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const mapStateToProps = state => ({
    token: state.token,
});

const mapDispatchToProps = dispatch => ({
    removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);