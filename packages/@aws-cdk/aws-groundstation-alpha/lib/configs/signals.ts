export enum FrequencyUnit {
  KHZ = 'KHz',
  MHZ = 'MHz',
  GHZ = 'GHz'
}

export enum Polarization {
  NONE = 'NONE',
  LEFT_HAND = 'LEFT_HAND',
  RIGHT_HAND = 'RIGHT_HAND'
}

export interface FrequencyBandwidth {
  readonly units?: FrequencyUnit,
  readonly value?: number
}

export interface Frequency {
  readonly units?: FrequencyUnit,
  readonly value?: number
}

export interface Eirp {
  readonly units?: string,
  readonly value?: number
}

export interface SpectrumConfig {
  readonly bandwidth?: FrequencyBandwidth
  readonly centerFrequency?: Frequency,
  readonly polarization?: Polarization
}

export interface UplinkSpectrumConfig {
  readonly centerFrequency?: Frequency,
  readonly polarization?: Polarization
}