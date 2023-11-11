export class PaginiateMetaRO {
  itemsPerPage: number;
  totalItems: number;
  totalPage: number;
  currentPage: number;
}

export abstract class PaginateRO<PaginateDataRO> {
  abstract data: PaginateDataRO[];
  meta: PaginiateMetaRO;
}
