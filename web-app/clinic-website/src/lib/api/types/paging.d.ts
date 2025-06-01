export default interface Paging<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
}