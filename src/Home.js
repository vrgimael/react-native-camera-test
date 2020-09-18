import React, {useRef, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';

import {RNCamera} from 'react-native-camera';
import Video from 'react-native-video';

const width = Dimensions.get('screen').width;

function Home(props) {
  const camera = useRef();
  const [isRecording, setRecording] = useState(false);
  const [file, setFile] = useState(null);

  function onPress() {
    if (!isRecording && !file) {
      setRecording(true);
      camera.current.recordAsync(videoCameraOptions).then((res) => {
        console.log({res});
        setRecording(false);
        setFile(res);
      });
    } else if (isRecording) {
      camera.current.stopRecording();
    } else {
      setFile(null);
    }
  }

  console.log({props, isRecording, file});

  return (
    <View style={styles.wrapper}>
      {file ? (
        <Video
          source={file}
          resizeMode={'contain'}
          style={styles.preview}
          repeat={true}
        />
      ) : null}
      <RNCamera style={[styles.camera, file && styles.hide]} ref={camera} />
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          isRecording && styles.recording,
          file && styles.hasFile,
        ]}
      />
    </View>
  );
}

const buttonSize = 80;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width,
    height: width,
  },
  preview: {
    backgroundColor: 'gray',
    width,
    height: width,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    marginTop: 50,
    borderWidth: 5,
    borderColor: 'red',
  },
  recording: {
    backgroundColor: 'red',
  },
  hasFile: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  hide: {
    display: 'none',
  },
});

const videoCameraOptions = {};

export default Home;
