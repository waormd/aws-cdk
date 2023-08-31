import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { DataflowEndpointConfig } from '../../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-dataflow-endpoint-config');

new DataflowEndpointConfig(stack, 'DataflowEndpointConfig', {
  dataflowEndpointName: 'name',
  dataflowEndpointRegion: 'us-east-1',
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();