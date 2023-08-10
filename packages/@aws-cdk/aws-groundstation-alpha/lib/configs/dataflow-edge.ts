import { BaseDataflowPoint } from './dataflow-points';

export class DataflowEdge {
  readonly destination: BaseDataflowPoint
  readonly source: BaseDataflowPoint

  constructor(source: BaseDataflowPoint, destination: BaseDataflowPoint) {
    this.source = source;
    this.destination = destination;
  }
}
