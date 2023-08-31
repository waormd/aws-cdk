import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { AntennaDownlinkDemodDecodeConfig } from '../../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-antenna-downlink-demod-decode-config');

new AntennaDownlinkDemodDecodeConfig(stack, 'AntennaDownlinkDemodDecodeConfig', {
  decodeConfigUnvalidatedJson: '{}',
  demodulationConfigUnvalidatedJson: '{}',
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();