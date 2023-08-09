import { Construct } from 'constructs';
import { EndpointDetails } from './endpoint-details';
import { CfnDataflowEndpointGroup } from 'aws-cdk-lib/aws-groundstation';
import { Resource, Tag } from 'aws-cdk-lib';

export interface DataflowEndpointGroupProps {
  readonly name?: string;
  readonly contactPrePassDurationSeconds?: number;
  readonly contactPostPassDurationSeconds?: number;
  readonly endpointDetails?: EndpointDetails[];
  readonly tags?: Tag[];
}

export class DataflowEndpointGroup extends Resource {
  constructor(scope: Construct, id: string, props: DataflowEndpointGroupProps) {
    super(scope, id);
    new CfnDataflowEndpointGroup(scope, 'Resource', {
      contactPostPassDurationSeconds: props.contactPostPassDurationSeconds,
      contactPrePassDurationSeconds: props.contactPrePassDurationSeconds,
      endpointDetails: props.endpointDetails == undefined ? [] : props.endpointDetails.map(endpointDetails => {
        const awsGroundStationAgentEndpoint = endpointDetails?.awsGroundStationAgentEndpoint;
        return {
          awsGroundStationAgentEndpoint: {
            agentStatus: awsGroundStationAgentEndpoint?.agentStatus,
            auditResults: awsGroundStationAgentEndpoint?.auditResults,
            egressAddress: {
              mtu: awsGroundStationAgentEndpoint?.egressAddress?.mtu,
              socketAddress: {
                name: awsGroundStationAgentEndpoint?.egressAddress?.socketAddress?.name,
                port: awsGroundStationAgentEndpoint?.egressAddress?.socketAddress?.port,
              },
            },
            ingressAddress: {
              mtu: awsGroundStationAgentEndpoint?.ingressAddress?.mtu,
              socketAddress: {
                name: awsGroundStationAgentEndpoint?.ingressAddress?.rangedSocketAddress?.name,
                port: {
                  maximum: awsGroundStationAgentEndpoint?.ingressAddress?.rangedSocketAddress?.portRange?.maximum,
                  minimum: awsGroundStationAgentEndpoint?.ingressAddress?.rangedSocketAddress?.portRange?.minimum,
                },
              },
            },
            name: awsGroundStationAgentEndpoint?.name,
          },
          endpoint: {
            mtu: endpointDetails?.endpoint?.mtu,
            name: endpointDetails?.endpoint?.name,
            address: {
              name: endpointDetails?.endpoint?.address?.name,
              port: endpointDetails?.endpoint?.address?.port,
            },
          },
          securityDetails: {
            roleArn: endpointDetails?.securityDetails?.roleArn,
            securityGroupIds: endpointDetails?.securityDetails?.securityGroupIds,

          },
        };
      }),
      tags: props.tags,
    });
  }
}