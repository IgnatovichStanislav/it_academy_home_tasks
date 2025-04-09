export type BooksFilter = {
  author?: number;
  sortBy?: string;
  showFavorites?: boolean;
} & CatalogFilter;

export type CatalogFilter = {
  categoryId?: number;
};
