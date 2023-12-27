import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { AntennaDownlinkConfig, FrequencyUnit, Polarization } from '../../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-groundstation-antenna-downlink-config');

new AntennaDownlinkConfig(stack, 'AntennaDownlinkConfig', {
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
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();