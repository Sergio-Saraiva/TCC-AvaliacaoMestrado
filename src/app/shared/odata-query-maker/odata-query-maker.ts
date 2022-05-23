import { OrderBy } from './enums/order-by';
import { FilterMaker } from './filter-maker';
import { BuilderOptions } from './interfaces/builder-options';

export class ODataQueryMaker {
  private selects: string[] = [];
  private filters: string[] = [];
  private orderBys: string[] = [];
  private ranges: string[] = [];
  private expands: ODataQueryMaker[] = [];
  private sorts: string[] = [];

  constructor(
    private options?: BuilderOptions,
    private extendedPropName?: string
  ) {
    if (!this.options) {
      this.options = { ignoreNull: true };
    }
  }

  public orderBy(field: string): ODataQueryMaker {
    return this.orderByInternal(field, OrderBy.Asc);
  }

  public orderByDesc(field: string): ODataQueryMaker {
    return this.orderByInternal(field, OrderBy.Desc);
  }

  private orderByInternal(field: string, order: OrderBy): ODataQueryMaker {
    if (!field || field.length == 0) {
      return this;
    }

    return this.freeOrderBy(`${field} ${order}`);
  }

  public freeOrderBy(orderBy: string): ODataQueryMaker {
    this.orderBys.push(orderBy);

    return this;
  }

  public expand(
    field: string,
    func?: (query: ODataQueryMaker) => void,
    options?: BuilderOptions
  ): ODataQueryMaker {
    if (options) {
      options = this.options;
    }

    const expandQuery = new ODataQueryMaker(options, field);

    if (func !== null) {
      func(expandQuery);
    }

    this.expands.push(expandQuery);

    return this;
  }

  public filter(predicate: (filter: FilterMaker) => FilterMaker): this {
    if (this.filters.length > 1) {
      this.filters.push('and');
    }

    this.filters.push(predicate(new FilterMaker(this.options)).generate());

    return this;
  }

  public select(...fields: string[]): ODataQueryMaker {
    const selects: string[] = [];
    for (const field of fields) {
      selects.push(field);
    }

    this.selects = selects;

    return this;
  }

  private checkAndAppend(
    result: string,
    prefix: string,
    delimiter: string,
    variable: any
  ): string {
    if (variable == null) {
      return result;
    }

    if (typeof variable === 'number' && variable === 0) {
      return result;
    }

    if (typeof variable === 'boolean' && !variable) {
      return result;
    }

    if (variable) {
      return this.append(result, prefix, delimiter, variable);
    }

    return result;
  }

  private append(
    result: string,
    prefix: string,
    delimiter: string,
    variable: any
  ): string {
    const length = result.length;

    if (length > 0) {
      result = `${result}${delimiter}${prefix}=${variable}`;
    } else {
      result = `${prefix}=${variable}`;
    }

    return result;
  }

  public range(start: number, end: number): this {
    if (start !== null && end !== null) {
      this.ranges.push(`[${start},${end}]`);

      return this;
    }
  }

  public sort(key: string, way: OrderBy): this {
    this.sorts.push(`["${key}","${way}"]`);
    return this;
  }

  public generate(): string {
    const isExpand =
      this.extendedPropName != null && this.extendedPropName.length > 0;

    let query = '';
    const delimiter = isExpand ? ';' : '&';

    if (this.ranges.length > 0) {
      query = this.checkAndAppend(
        query,
        'range',
        delimiter,
        this.ranges.join(`,`)
      );
    }

    if (this.sorts.length > 0) {
      query = this.checkAndAppend(
        query,
        'sort',
        delimiter,
        this.sorts.join(`,`)
      );
    }

    if (this.filters.length > 0) {
      console.log(`aqui`);
      query = this.checkAndAppend(
        query,
        'filter',
        delimiter,
        this.filters.join(`,`)
      );
    }

    if (this.orderBys.length > 0) {
      query = this.checkAndAppend(
        query,
        'orderby',
        delimiter,
        this.orderBys.join(`,`)
      );
    }

    if (this.selects.length > 0) {
      query = this.checkAndAppend(
        query,
        'select',
        delimiter,
        this.selects.join(`,`)
      );
    }

    if (this.expands.length > 0) {
      const result = [];
      for (const item of this.expands) {
        result.push(item.generate());
      }

      if (result.length > 0) {
        query = this.checkAndAppend(
          query,
          'expand',
          delimiter,
          result.join(',')
        );
      }
    }

    if (query.length > 0 && isExpand) {
      query = `(${query})`;
    }

    if (isExpand) {
      query = `${this.extendedPropName}${query}`;
    }

    return query;
  }
}
