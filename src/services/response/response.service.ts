import { StatusCodes } from "http-status-codes";

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
export interface ResponseMessage {
  message?: string;
}
export interface AppResponse<T = null> {
  status?: boolean;
  data?: T | T[];
  message?: string;
  code?: number;
  pagination?: Pagination;
}
export class ResponseService {
  

  formatDataResponse<T>(data: T): AppResponse<T> {
    const response: AppResponse<T> = {
      message: "success",
      code: StatusCodes.OK,
      data,
      status: true,
    };

    return response;
  }

  formatCustomResponse<T>(message: string, status: boolean, data?: T): AppResponse<T> {
    const response: AppResponse<T> = {
      message: message,
      code: StatusCodes.NOT_FOUND,
      data: data  ?? [],
      status: status,
    };

    return response;
  }
  formatSuccessResponse<T>(message: string, data?: T): AppResponse<T> {
    const response: AppResponse<T> = {
      message: message,
      code: StatusCodes.OK,
      data,
      status: true,
    };

    return response;
  }
}
