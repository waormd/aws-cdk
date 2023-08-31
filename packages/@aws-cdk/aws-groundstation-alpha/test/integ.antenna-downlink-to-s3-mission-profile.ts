import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { AntennaDownlinkConfig, DataflowEdge, MissionProfile, S3RecordingConfig } from '../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-antenna-downlink-to-s3-mission-profile');

new MissionProfile(stack, 'GroundStationMissionProfile', {
  dataflowEdges: [
    new DataflowEdge(
      new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfigEdge'),
      new S3RecordingConfig(stack, 'S3RecordingConfigEdge'),
    ),
  ],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();