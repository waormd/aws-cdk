import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { DataflowEndpointGroup } from '../lib';

const app = new cdk.App();

// we associate this stack with an explicit environment since this is required by the
// environmental context provider used in `fromLookup`. CDK_INTEG_XXX are set
// when producing the .expected file and CDK_DEFAULT_XXX is passed in through from
// the CLI in actual deployment.
const env = {
  account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
};

const stack = new cdk.Stack(app, 'aws-groundstation-dataflow-endpoint-group', { env });

new DataflowEndpointGroup(stack, 'GroundStationDataflowEndpointGroup', {
  contactPostPassDurationSeconds: 180,
  contactPrePassDurationSeconds: 120,
  endpointDetails: [
    {
      awsGroundStationAgentEndpoint: {
        name: 'aws-gs-endpoint',
        egressAddress: {
          socketAddress: {
            name: '127.0.0.1',
            port: 55000,
          },
        },
        ingressAddress: {
          rangedSocketAddress: {
            name: '127.0.0.1',
            portRange: {
              maximum: 45000,
              minimum: 44700,
            },
          },
        },
      },
    },
  ],
});

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();