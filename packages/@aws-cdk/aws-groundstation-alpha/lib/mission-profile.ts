import { Resource, Tag } from 'aws-cdk-lib';
import { CfnMissionProfile } from 'aws-cdk-lib/aws-groundstation';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { DataflowEdge } from './configs/dataflow-edge';
import { TrackingConfig } from './configs/tracking';

export interface MissionProfileProps {
  readonly name?: string;
  readonly contactPrePassDurationSeconds?: number;
  readonly contactPostPassDurationSeconds?: number;
  readonly minimumViableContactDurationSeconds?: number;
  readonly streamsKmsKey?: Key;
  readonly streamsKmsRole?: Role;
  readonly tags?: Tag[];
  readonly trackingConfig?: TrackingConfig,
  readonly dataflowEdges: DataflowEdge[];
}

export class MissionProfile extends Resource {

  public readonly kmsKey: Key
  public readonly kmsRole: Role

  constructor(scope: Construct, id: string, props: MissionProfileProps) {
    super(scope, id);

    this.kmsKey = props.streamsKmsKey ?? new Key(this, 'Key');
    this.kmsRole = props.streamsKmsRole ?? new Role(this, 'Role', { assumedBy: new ServicePrincipal('groundstation.amazonaws.com') });

    new CfnMissionProfile(scope, 'Resource', {
      name: props.name ?? id,
      contactPrePassDurationSeconds: props.contactPrePassDurationSeconds ?? 100,
      contactPostPassDurationSeconds: props.contactPostPassDurationSeconds ?? 100,
      minimumViableContactDurationSeconds: props.minimumViableContactDurationSeconds ?? 100,
      streamsKmsKey: { kmsKeyArn: this.kmsKey.keyArn },
      streamsKmsRole: this.kmsRole.roleArn,
      tags: props.tags ?? [],
      trackingConfigArn: props.trackingConfig?.arn ?? new TrackingConfig(this, 'TrackingConfig').arn,
      dataflowEdges: props.dataflowEdges.map(edge => {
        return {
          destination: edge.destination.arn,
          source: edge.source.arn,
        };
      }),
    });
  }
}