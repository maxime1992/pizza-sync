type TypeWithId<T> = T & { id: string };

export abstract class NormalizedModel<TypeWithoutId> {
  private id = 0;
  protected byId: { [key: string]: TypeWithId<TypeWithoutId> } = {};
  protected allIds: string[] = [];

  // set it to true will run the sortBy method
  // every time there's a call to `create`
  // or on every resource added with the `setNormalizedData`
  protected sort: boolean = false;

  constructor(private idPrefix: string) {}

  private getNewId() {
    return `${this.idPrefix}${this.id++}`;
  }

  protected sortBy(
    el1: TypeWithId<TypeWithoutId>,
    el2: TypeWithId<TypeWithoutId>
  ): number {
    return 0;
  }

  create(element: TypeWithoutId): TypeWithId<TypeWithoutId> {
    const newId = this.getNewId();

    // `as any` syntax is a way to avoid the error of using
    // spread operator on a variable with a generic type
    this.byId[newId] = { ...(element as any), id: newId };
    this.allIds.push(newId);

    if (this.sort) {
      this.sortIds();
    }

    return this.byId[newId];
  }

  delete(id: string): boolean {
    if (!this.byId[id]) {
      return false;
    }

    delete this.byId[id];

    this.allIds = this.allIds.filter(_id => _id !== id);
    return true;
  }

  setNormalizedData({
    byId,
    allIds,
  }: {
    byId: { [key: string]: TypeWithId<TypeWithoutId> };
    allIds: string[];
  }) {
    this.byId = byId;
    this.allIds = allIds;

    if (this.sort) {
      this.sortIds();
    }
  }

  getNormalizedData() {
    return {
      byId: this.byId,
      allIds: this.allIds,
    };
  }

  private sortIds() {
    this.allIds = this.allIds
      .map(id => this.byId[id])
      .sort((el1, el2) => this.sortBy(el1, el2))
      .map(el => el.id);
  }
}
