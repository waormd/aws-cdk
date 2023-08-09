import { Construct } from 'constructs';
import { DecodeConfig, DemodulationConfig, Eirp, SpectrumConfig, UplinkSpectrumConfig } from './signals';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Resource } from 'aws-cdk-lib';
import { CfnConfig } from 'aws-cdk-lib/aws-groundstation';

export interface AntennaDownlinkConfigProps {
  readonly name?: string,
  readonly spectrumConfig?: SpectrumConfig,
}

export abstract class BaseDataflowPoint extends Resource {
  abstract readonly arn: string;
}

export class AntennaDownlinkConfig extends BaseDataflowPoint {
  public readonly arn: string
  constructor(scope: Construct, id: string, props: AntennaDownlinkConfigProps = {}) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'Resource', {
      name: props.name ?? id,
      configData: {
        antennaDownlinkConfig: {
          spectrumConfig: {
            bandwidth: {
              units: props?.spectrumConfig?.bandwidth?.units,
              value: props?.spectrumConfig?.bandwidth?.value,
            },
            centerFrequency: {
              units: props?.spectrumConfig?.centerFrequency?.units,
              value: props?.spectrumConfig?.centerFrequency?.value,
            },
            polarization: props?.spectrumConfig?.polarization,
          },
        },
      },
    }).attrArn;
  }
}

export interface AntennaDownlinkDemodDecodeConfigProps {
  readonly name?: string,
  readonly decodeConfig?: DecodeConfig,
  readonly demodulationConfig?: DemodulationConfig,
  readonly spectrumConfig?: SpectrumConfig,
}

export class AntennaDownlinkDemodDecodeConfig extends BaseDataflowPoint {
  public readonly arn: string
  constructor(scope: Construct, id: string, props: AntennaDownlinkDemodDecodeConfigProps = {}) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'Resource', {
      name: props.name ?? id,
      configData: {
        antennaDownlinkDemodDecodeConfig: {
          decodeConfig: {
            unvalidatedJson: props.decodeConfig?.unvalidatedJson,
          },
          demodulationConfig: {
            unvalidatedJson: props.demodulationConfig?.unvalidatedJson,
          },
          spectrumConfig: {
            bandwidth: {
              units: props.spectrumConfig?.bandwidth?.units,
              value: props.spectrumConfig?.bandwidth?.value,
            },
            centerFrequency: {
              units: props.spectrumConfig?.centerFrequency?.units,
              value: props.spectrumConfig?.centerFrequency?.value,
            },
            polarization: props.spectrumConfig?.polarization,
          },
        },
      },
    }).attrArn;
  }
}

export interface AntennaUplinkConfigProps {
  readonly name?: string
  readonly spectrumConfig?: UplinkSpectrumConfig,
  readonly targetEirp?: Eirp,
  readonly transmitDisabled?: boolean
}

export class AntennaUplinkConfig extends BaseDataflowPoint {
  public readonly arn: string
  constructor(scope: Construct, id: string, props: AntennaUplinkConfigProps = {}) {
    super(scope, id);
    this.arn = new CfnConfig(scope, 'Resource', {
      name: props.name ?? id,
      configData: {
        antennaUplinkConfig: {
          spectrumConfig: {
            centerFrequency: props.spectrumConfig?.centerFrequency,
            polarization: props.spectrumConfig?.polarization,
          },
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
    this.arn = new CfnConfig(scope, 'Resource', {
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
    this.arn = new CfnConfig(scope, 'Resource', {
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
  public readonly role: Role;

  constructor(scope: Construct, id: string, props: S3RecordingConfigProps = {}) {
    super(scope, id);
    this.role = props.role ?? new Role(this, 'Role', { assumedBy: new ServicePrincipal('groundstation.amazonaws.com') });
    this.bucket = props.bucket ?? new Bucket(this, 'Bucket');

    if (!props.role || !props.bucket) {
      this.bucket.grantWrite(this.role);
    }

    this.arn = new CfnConfig(scope, 'Resource', {
      name: props.name ?? id,
      configData: {
        s3RecordingConfig: {
          bucketArn: this.bucket.bucketArn,
          roleArn: this.role.roleArn,
        },
      },
    }).attrArn;
  }
}