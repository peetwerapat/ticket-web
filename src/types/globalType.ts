export interface IPagination {
  page: number;
  pageSize: number;
  totalPages?: number;
  totalCounts?: number;
}

export interface IBaseParams extends IPagination {
  search?: string;
  sort?: string;
  order?: string;
}

export interface IBaseResponse {
  message: string;
  statusCode: number;
}

export interface IBaseResponseData<T> extends IBaseResponse {
  data: T;
}

export interface IResponseWithPaginate<T> extends IBaseResponse {
  data: T;
  pagination: IPagination;
}

export interface IOption {
  value: string;
  label: string;
  extra?: string;
}
