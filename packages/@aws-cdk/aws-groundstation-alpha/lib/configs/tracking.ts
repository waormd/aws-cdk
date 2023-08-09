import { Resource } from 'aws-cdk-lib';
import { CfnConfig } from 'aws-cdk-lib/aws-groundstation';
import { Construct } from 'constructs';

export enum Autotrack {
  PREFERRED = 'PREFERRED',
  REMOVED = 'REMOVED',
  REQUIRED = 'REQUIRED',
}

export interface TrackingConfigProps {
  readonly name?: string,
  readonly autotrack?: Autotrack,
}

export class TrackingConfig extends Resource {
  public readonly arn: string
  constructor(scope: Construct, id: string, props: TrackingConfigProps = {}) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'Resource', {
      name: props.name ?? id,
      configData: {
        trackingConfig: {
          autotrack: props.autotrack ?? Autotrack.PREFERRED,
        },
      },
    }).attrArn;
  }
}