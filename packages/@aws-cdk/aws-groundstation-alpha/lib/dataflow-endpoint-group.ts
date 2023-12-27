import { Resource, Tag } from 'aws-cdk-lib';
import { CfnDataflowEndpointGroup } from 'aws-cdk-lib/aws-groundstation';
import { Construct } from 'constructs';
import { EndpointDetails } from './endpoint-details';

export interface DataflowEndpointGroupProps {
  readonly name?: string;
  readonly contactPrePassDurationSeconds?: number;
  readonly contactPostPassDurationSeconds?: number;
  readonly endpointDetails: EndpointDetails[];
  readonly tags?: Tag[];
}

export class DataflowEndpointGroup extends Resource {
  constructor(scope: Construct, id: string, props: DataflowEndpointGroupProps) {
    super(scope, id);
    new CfnDataflowEndpointGroup(scope, 'DataflowEndpointGroupResource', {
      contactPostPassDurationSeconds: props.contactPostPassDurationSeconds,
      contactPrePassDurationSeconds: props.contactPrePassDurationSeconds,
      endpointDetails: [{
        awsGroundStationAgentEndpoint: {
          name: 'AgentEndpoint',
          egressAddress: {
            socketAddress: {
              name: '127.0.0.1',
              port: 55000,
            },
          },
          ingressAddress: {
            socketAddress: {
              name: '127.0.0.1',
              portRange: {
                maximum: 45000,
                minimum: 44700,
              },
            },
          },
        },
      }],
    });
  }
}
