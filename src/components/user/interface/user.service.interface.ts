export interface UserServiceInterface {
  getDetail(id, withExtraInfo?: boolean): Promise<any>;
}
