import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib/core';
import { S3RecordingConfig } from '../../lib';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'aws-s3-recording-config');

new S3RecordingConfig(stack, 'S3RecordingConfig');

new integ.IntegTest(app, 'GroundStationMissionProfileTest', {
  testCases: [stack],
});

app.synth();