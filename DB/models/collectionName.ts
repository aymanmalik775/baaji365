export const CollectionName = {
  USER: 'User'
};

export const getTableName = (environment: string, collectionName: string) =>
  `${environment}-${collectionName}`;
