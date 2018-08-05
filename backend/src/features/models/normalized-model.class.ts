type TypeWithId<T> = T & { id: string };

export abstract class NormalizedModel<TypeWithoutId> {
  private id = 0;
  protected entities: { [key: string]: TypeWithId<TypeWithoutId> } = {};
  protected ids: string[] = [];

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
    this.entities[newId] = { ...(element as any), id: newId };
    this.ids.push(newId);

    if (this.sort) {
      this.sortIds();
    }

    return this.entities[newId];
  }

  delete(id: string): boolean {
    if (!this.entities[id]) {
      return false;
    }

    delete this.entities[id];

    this.ids = this.ids.filter(_id => _id !== id);
    return true;
  }

  setNormalizedData({
    entities,
    ids,
  }: {
    entities: { [key: string]: TypeWithId<TypeWithoutId> };
    ids: string[];
  }) {
    this.entities = entities;
    this.ids = ids;

    if (this.sort) {
      this.sortIds();
    }
  }

  getNormalizedData() {
    return {
      entities: this.entities,
      ids: this.ids,
    };
  }

  private sortIds() {
    this.ids = this.ids
      .map(id => this.entities[id])
      .sort((el1, el2) => this.sortBy(el1, el2))
      .map(el => el.id);
  }
}
