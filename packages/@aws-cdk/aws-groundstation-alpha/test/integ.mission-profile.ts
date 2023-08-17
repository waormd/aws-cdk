import * as cdk from 'aws-cdk-lib/core';
import * as integ from '@aws-cdk/integ-tests-alpha';
import { DataflowEdge, AntennaDownlinkConfig, S3RecordingConfig, MissionProfile } from '../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-cdk-ground-station-1');

const s3RecordingConfig = new S3RecordingConfig(stack, 'S3RecordingConfig');
const antennaDownlinkConfig = new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfig');

new MissionProfile(stack, 'GroundStationMissionProfile', {
  dataflowEdges: [new DataflowEdge(antennaDownlinkConfig, s3RecordingConfig)],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();