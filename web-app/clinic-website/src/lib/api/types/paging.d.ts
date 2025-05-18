export default interface Paging<T> {
  data: T[];
  totalItems: number;
  page: number;
  limit: number;
}