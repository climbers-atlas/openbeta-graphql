import { BBox } from '@turf/helpers'
import { MUUID } from 'uuid-mongodb'

import { AreaType } from './db/AreaTypes.js'
import type MutableAreaDataSource from './model/MutableAreaDataSource.js'
import type TickDataSource from './model/TickDataSource.js'
import type HistoryDataSouce from './model/ChangeLogDataSource.js'
import type MutableMediaDataSource from './model/MutableMediaDataSource.js'
import MutableClimbDataSource from './model/MutableClimbDataSource.js'

export enum SortDirection {
  ASC = 1,
  DESC = -1
}

export type Sortable = 'area_name'

export type Sort = Record<Sortable, SortDirection>

type Filterable = 'area_name' | 'leaf_status' | 'path_tokens' | 'field_compare'

export interface ComparisonFilterParams {
  field: 'totalClimbs' | 'density'
  num: number
  comparison: 'lt' | 'gt' | 'eq'
}

export interface AreaFilterParams {
  match: string
  exactMatch: boolean | undefined
}

export interface LeafStatusParams {
  isLeaf: boolean
}

export interface PathTokenParams {
  tokens: string[]
  exactMatch: boolean | undefined
  size: number
}

type FilterParams = AreaFilterParams | LeafStatusParams | PathTokenParams | ComparisonFilterParams[]
export type GQLFilter = Record<Filterable, FilterParams>

export type LNGLAT = [number, number]
export type BBoxType = BBox
export interface StatisticsType {
  totalClimbs: number
  totalCrags: number
}

export interface CragsNear {
  _id: string
  count: number
  crags: AreaType
}

export interface QueryByIdType {
  id?: string
  uuid?: string
}

export interface AuthUserType {
  roles: string[]
  uuid: MUUID | undefined
}

export interface DataSourcesType {
  areas: MutableAreaDataSource
  ticks: TickDataSource
  history: HistoryDataSouce
  media: MutableMediaDataSource
  climbs: MutableClimbDataSource
}

export interface Context {
  dataSources: DataSourcesType
}

export interface ContextWithAuth extends Context {
  user: AuthUserType
}
