import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { AntennaDownlinkConfig, DataflowEdge, MissionProfile, S3RecordingConfig } from '../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-cdk-ground-station-1');

new MissionProfile(stack, 'GroundStationMissionProfile', {
  dataflowEdges: [
    new DataflowEdge(
      new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfig'),
      new S3RecordingConfig(stack, 'S3RecordingConfig'),
    ),
  ],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();