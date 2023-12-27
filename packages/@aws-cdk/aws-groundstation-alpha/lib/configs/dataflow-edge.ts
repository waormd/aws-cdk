import { BaseDataflowPoint } from './dataflow-points';

export class DataflowEdge {
  readonly source: BaseDataflowPoint
  readonly destination: BaseDataflowPoint

  constructor(source: BaseDataflowPoint, destination: BaseDataflowPoint) {
    this.source = source;
    this.destination = destination;
  }
}
