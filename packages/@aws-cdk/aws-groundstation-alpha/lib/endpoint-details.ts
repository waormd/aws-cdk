
export interface EndpointDetails {
  readonly awsGroundStationAgentEndpoint?: AwsGroundStationAgentEndpoint,
  readonly endpoint?: DataflowEndpoint,
  readonly securityDetails?: SecurityDetails
}

export interface AwsGroundStationAgentEndpoint {
  readonly agentStatus?: string,
  readonly auditResults?: string,
  readonly egressAddress?: ConnectionDetails,
  readonly ingressAddress?: RangedConnectionDetails,
  readonly name?: string
}

export interface ConnectionDetails {
  readonly mtu?: number,
  readonly socketAddress?: SocketAddress
}

export interface RangedConnectionDetails {
  readonly mtu?: number,
  readonly rangedSocketAddress?: RangedSocketAddress
}

export interface SocketAddress {
  readonly name?: string,
  readonly port?: number
}

export interface RangedSocketAddress {
  readonly name?: string,
  readonly portRange?: IntegerRange
}

export interface IntegerRange {
  readonly maximum?: number,
  readonly minimum?: number
}
export interface DataflowEndpoint {
  readonly address?: SocketAddress,
  readonly mtu?: number,
  readonly name?: string
}
export interface SecurityDetails {
  readonly roleArn?: string,
  readonly securityGroupIds?: string[],
  readonly subnetIds?: string[]
}
