import { BaseDataflowPoint } from './dataflow-points';

export class DataflowEdge {
  readonly destination: BaseDataflowPoint
  readonly source: BaseDataflowPoint

  constructor(destination: BaseDataflowPoint, source: BaseDataflowPoint) {
    this.destination = destination;
    this.source = source;
  }
}
