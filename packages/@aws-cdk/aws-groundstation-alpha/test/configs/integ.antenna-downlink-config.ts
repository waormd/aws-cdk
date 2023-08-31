import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { AntennaDownlinkConfig } from '../../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-antenna-downlink-config');

new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfig');

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();