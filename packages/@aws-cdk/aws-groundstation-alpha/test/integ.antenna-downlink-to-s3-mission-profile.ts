import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import {
  AntennaDownlinkConfig,
  DataflowEdge,
  FrequencyUnit,
  MissionProfile,
  Polarization,
  S3RecordingConfig,
} from '../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-antenna-downlink-to-s3-mission-profile');

new MissionProfile(stack, 'GroundStationMissionProfile', {
  dataflowEdges: [
    new DataflowEdge(
      new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfigEdge', {
        spectrumConfig: {
          bandwidth: {
            value: 100,
            units: FrequencyUnit.MHZ,
          },
          centerFrequency: {
            value: 7812,
            units: FrequencyUnit.MHZ,
          },
          polarization: Polarization.RIGHT_HAND,
        },
      }),
      new S3RecordingConfig(stack, 'S3RecordingConfigEdge'),
    ),
  ],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();