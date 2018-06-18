declare module 'crud' {
  export interface Meta {
    results: {
      total: number;
      all: number;
    };
    page: {
      limit: number;
      offset: number;
      current: number;
      total: number;
    }
  }

  export interface CRUDAble<U, With = string> {
    All(): Promise<{
      data: U[];
      meta: Meta;
    }>;

    Get(id: string, token?: string): Promise<{
      data: U;
      meta: Meta;
    }>;

    Limit(value: number): CRUDAble<U>;

    Offset(value: number): CRUDAble<U>;

    Sort(value: string): CRUDAble<U>;

    With(includes: With): CRUDAble<U>;
  }

  export interface FilterOptions<
    Eq extends string = never,
    Like extends string = never,
    Gt extends string = never,
    Ge extends string = never,
    Lt extends string = never,
    Le extends string = never
  > {
    eq?: { [key in Eq]?: string };
    like?: { [key in Like]?: string };
    gt?: { [key in Gt]?: string };
    ge?: { [key in Ge]?: string };
    lt?: { [key in Lt]?: string };
    le?: { [key in Le]?: string };
  }

  export interface Filterable<
    U,
    With = string,
    Eq extends string = never,
    Like extends string = never,
    Gt extends string = never,
    Ge extends string = never,
    Lt extends string = never,
    Le extends string = never
  > extends CRUDAble<U, With> {
    Filter(options: FilterOptions<Eq, Like, Gt, Ge, Lt, Le>): Filterable<U>;
  }

  export interface Creatable<T, U> {
    Create(product: T): Promise<U>;
  }
}
