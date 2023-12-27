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

const stack = new cdk.Stack(app, 'aws-groundstation-snpp-jpss-demo-mission-profile');

new MissionProfile(stack, 'SnppJpssGroundStationMissionProfile', {
  dataflowEdges: [
    new DataflowEdge(
      new AntennaDownlinkConfig(stack, 'SnppJpssAntennaDownlinkConfigEdge', {
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
      new S3RecordingConfig(stack, 'SnppJpssS3RecordingConfigEdge'),
    ),
  ],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();

