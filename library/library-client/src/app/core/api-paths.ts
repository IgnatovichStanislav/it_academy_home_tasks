export const AuthPaths = {
  Signin: '/auth/token',
  Signup: '/auth/signup',
};

export enum ApiPaths {
  Books = '/books',
  BooksGetByFilter = '/books/getbyfilter',
  CategoriesGetByIds = '/categories/getbyids',
  CategoriesGetAll = '/categories/getall',

  AuthorsGetAll = '/authors/getall',
  AuthorsGetByIds = '/authors/getbyids',
  FavoriteBooksGet = '/favoritebooks/get',
  FavoriteBooksPost = '/favoritebooks/post',
  FavoriteBooksDelete = '/favoritebooks/delete',
}
