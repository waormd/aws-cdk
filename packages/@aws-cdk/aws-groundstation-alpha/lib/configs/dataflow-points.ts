import { Resource } from 'aws-cdk-lib';
import { CfnConfig } from 'aws-cdk-lib/aws-groundstation';
import { Effect, PolicyDocument, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Eirp, SpectrumConfig, UplinkSpectrumConfig } from './signals';

export interface AntennaDownlinkConfigProps {
  readonly name?: string,
  readonly spectrumConfig: SpectrumConfig,
}

export abstract class BaseDataflowPoint extends Resource {
  abstract readonly arn: string;
}

export class AntennaDownlinkConfig extends BaseDataflowPoint {
  public readonly arn: string

  constructor(scope: Construct, id: string, props: AntennaDownlinkConfigProps) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'AntennaDownlinkConfigResource', {
      name: props.name ?? id,
      configData: {
        antennaDownlinkConfig: {
          spectrumConfig: props.spectrumConfig,
        },
      },
    }).attrArn;
  }
}

export interface AntennaDownlinkDemodDecodeConfigProps {
  readonly name?: string,
  readonly decodeConfigUnvalidatedJson: string,
  readonly demodulationConfigUnvalidatedJson: string,
  readonly spectrumConfig: SpectrumConfig,
}

export class AntennaDownlinkDemodDecodeConfig extends BaseDataflowPoint {
  public readonly arn: string

  constructor(scope: Construct, id: string, props: AntennaDownlinkDemodDecodeConfigProps) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'AntennaDownlinkDemodDecodeConfigResource', {
      name: props.name ?? id,
      configData: {
        antennaDownlinkDemodDecodeConfig: {
          decodeConfig: {
            unvalidatedJson: props.decodeConfigUnvalidatedJson,
          },
          demodulationConfig: {
            unvalidatedJson: props.demodulationConfigUnvalidatedJson,
          },
          spectrumConfig: props.spectrumConfig,
        },
      },
    }).attrArn;
  }
}

export interface AntennaUplinkConfigProps {
  readonly name?: string
  readonly spectrumConfig: UplinkSpectrumConfig,
  readonly targetEirp: Eirp,
  readonly transmitDisabled?: boolean
}

export class AntennaUplinkConfig extends BaseDataflowPoint {
  public readonly arn: string

  constructor(scope: Construct, id: string, props: AntennaUplinkConfigProps) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'AntennaUplinkConfigResource', {
      name: props.name ?? id,
      configData: {
        antennaUplinkConfig: {
          spectrumConfig: props.spectrumConfig,
          targetEirp: props.targetEirp,
          transmitDisabled: props.transmitDisabled ?? false,
        },
      },
    }).attrArn;
  }
}

export interface DataflowEndpointConfigProps {
  readonly name?: string
  readonly dataflowEndpointName: string,
  readonly dataflowEndpointRegion: string
}

export class DataflowEndpointConfig extends BaseDataflowPoint {
  public readonly arn: string

  constructor(scope: Construct, id: string, props: DataflowEndpointConfigProps) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'DataflowEndpointConfigResource', {
      name: props.name ?? id,
      configData: {
        dataflowEndpointConfig: {
          dataflowEndpointName: props.dataflowEndpointName,
          dataflowEndpointRegion: props.dataflowEndpointRegion,
        },
      },
    }).attrArn;
  }
}

export interface UplinkEchoConfigProps {
  readonly name?: string,
  readonly antennaUplinkConfigArn: string,
  readonly enabled?: boolean
}

export class UplinkEchoConfig extends BaseDataflowPoint {
  public readonly arn: string

  constructor(scope: Construct, id: string, props: UplinkEchoConfigProps) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'UplinkEchoConfigResource', {
      name: props.name ?? id,
      configData: {
        uplinkEchoConfig: {
          antennaUplinkConfigArn: props.antennaUplinkConfigArn,
          enabled: props?.enabled ?? true,
        },
      },
    }).attrArn;
  }
}

export interface S3RecordingConfigProps {
  readonly name?: string,
  readonly bucket?: Bucket,
  readonly prefix?: string,
  readonly role?: Role,
}

export class S3RecordingConfig extends BaseDataflowPoint {
  public readonly arn: string;
  public readonly bucket: Bucket;
  public readonly s3DeliveryRole: Role;

  constructor(scope: Construct, id: string, props: S3RecordingConfigProps = {}) {
    super(scope, id);

    this.bucket = props.bucket ?? new Bucket(this, 'Bucket', { bucketName: `aws-groundstation.${ id.toLowerCase() }` });
    this.s3DeliveryRole = props.role ?? this.deliveryRole(this.bucket.bucketArn);
    this.arn = new CfnConfig(scope, 'S3RecordingConfigResource', {
      name: props.name ?? id,
      configData: {
        s3RecordingConfig: {
          bucketArn: this.bucket.bucketArn,
          roleArn: this.s3DeliveryRole.roleArn,
          prefix: props.prefix,
        },
      },
    }).attrArn;
  }

  private deliveryRole(bucketArn: string) {
    return new Role(this, 'Role', {
      assumedBy: new ServicePrincipal('groundstation.amazonaws.com'),
      inlinePolicies: {
        groundStationPolicies: new PolicyDocument({
          statements: [
            new PolicyStatement({
              resources: [
                bucketArn,
                `${bucketArn}/*`,
              ],
              actions: [
                's3:GetBucketLocation',
                's3:PutObject',
              ],
              effect: Effect.ALLOW,
            }),
          ],
        }),
      },
    });
  }
}