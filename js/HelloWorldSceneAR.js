'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroConstants,
  ViroPortal,
  ViroPortalScene,
  Viro360Video
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#ffffff" intensity={400} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]} position={[0, 2, 1]} color='#ffffff' castsShadow={true} />
        <Viro3DObject
          dragType='FixedToWorld'
          onDrag={() => { }}
          position={[0, 0, -0.25]}
          scale={[0.05, 0.05, 0.05]}
          source={require('./object_sphere/object_sphere.vrx')}
          resources={[
            require('./object_sphere/sphere_diffuse.png'),
            require('./object_sphere/sphere_specular.png')
          ]}
          type='VRX'
        />
        <Viro3DObject
          position={[0, 0, -0.75]} scale={[0.1, 0.1, 0.1]}
          source={require('./object_star_anim/object_star_anim.vrx')}
          resources={[
            require('./object_star_anim/object_star_diffuse.png'),
            require('./object_star_anim/object_star_specular.png')
          ]}
          type='VRX'
          animation={{ name: '02', run: true, loop: true, }}
        />
        <ViroPortalScene passable={true} >
          <ViroPortal position={[0, 0, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require('./portal_res/portal_ship/portal_ship.vrx')}
              resources={[
                require('./portal_res/portal_ship/portal_ship_diffuse.png'),
                require('./portal_res/portal_ship/portal_ship_normal.png'),
                require('./portal_res/portal_ship/portal_ship_specular.png')
              ]}
              type='VRX'
            />
          </ViroPortal>
          <Viro360Video source={require('./portal_res/360_surf.mp4')} loop={true} volume={0} />
        </ViroPortalScene>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;