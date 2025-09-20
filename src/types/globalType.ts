export interface IMeta {
  page: number;
  limit: number;
  totalPages?: number;
  total?: number;
}

export interface IBaseResponse {
  message: {
    th: string;
    en: string;
  };
  statusCode: number;
}

export interface IBaseResponseData<T> extends IBaseResponse {
  data: T;
}

export interface IResponseWithPaginate<T> extends IBaseResponse {
  data: T;
  meta: IMeta;
}

export interface IOption {
  value: string;
  label: string;
  extra?: string;
}
