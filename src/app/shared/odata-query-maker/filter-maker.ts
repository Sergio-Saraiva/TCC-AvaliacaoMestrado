import { ComparisonOperator } from './enums/comparison-operators';
import { OrderBy } from './enums/order-by';
import { StringOperator } from './enums/string-operator';
import { BuilderOptions } from './interfaces/builder-options';
import { JsonFilter } from './interfaces/json-filter';

type valueFilterType =
  | string
  | number
  | boolean
  | Date
  | Array<valueFilterType>;

export class FilterMaker {
  private filters: string[] = [];
  private jsonFilter: JsonFilter[] = [];

  constructor(private options: BuilderOptions) {}

  public valueFilter(
    field: string,
    operator: ComparisonOperator,
    value: valueFilterType
  ): this {
    if (!this.options.ignoreNull || value !== null) {
      if (!Array.isArray(value)) {
        this.filters.push(`${field} ${operator} ${this.getValue(value)}`);
      } else {
        const innerFilter = new FilterMaker(this.options);
        for (const item of value) {
          innerFilter.valueFilter(field, operator, item).or();
        }
        this.filters.push(`(${innerFilter.generate()})`);
      }
    }

    this.verifyLastElement();

    return this;
  }

  public filter(key: string, value: any): this {
    this.jsonFilter.push({
      key: key,
      value: value,
    });

    return this;
  }

  public stringFilter(
    field: string,
    operator: StringOperator,
    value: string | Array<string>
  ): this {
    if (!this.options.ignoreNull || value) {
      if (!Array.isArray(value)) {
        this.filters.push(
          `${operator}(tolower(${field}), tolower('${value.trim()}'))`
        );
      } else {
        const innerFilter = new FilterMaker(this.options);
        for (const item of value) {
          innerFilter.stringFilter(field, operator, item).or();
        }
        this.filters.push(`(${innerFilter.generate()})`);
      }
    }

    this.verifyLastElement();

    return this;
  }

  private verifyLastElement(): void {
    const lastElement = this.filters.pop();
    if (
      lastElement !== undefined &&
      lastElement !== 'and' &&
      lastElement !== 'or'
    ) {
      this.filters.push(lastElement);
    }
  }

  public freeFilter(text: string): this {
    if (!this.options.ignoreNull || text) {
      this.filters.push(text);
    }

    this.verifyLastElement();
    return this;
  }

  private addLogicalOperator(logical: string) {
    if (this.filters.length > 0) {
      this.filters.push(logical);
    }

    return this;
  }

  public and(): this {
    return this.addLogicalOperator('and');
  }

  public or() {
    return this.addLogicalOperator('or');
  }

  public andFilter = (predicate: (filter: FilterMaker) => FilterMaker) => {
    return this.logicalFilter('and', predicate);
  };

  public orFilter = (predicate: (filter: FilterMaker) => FilterMaker) => {
    return this.logicalFilter('or', predicate);
  };

  private logicalFilter(
    logical: string,
    predicate: (filter: FilterMaker) => FilterMaker
  ): this {
    const innerFilter = predicate(new FilterMaker(this.options)).generate();
    if (innerFilter) {
      this.addLogicalOperator(logical);
      this.filters.push(`(${innerFilter})`);
    }

    return this;
  }

  private getValue(value: valueFilterType): any {
    let type: string = typeof value;
    if (value instanceof Date) {
      type = 'data';
    }

    switch (type) {
      case 'string':
        return `'${value}'`;
      case 'date':
        return `${(value as Date).toISOString()}`;
      default:
        return `${value}`;
    }
  }

  public generate(): string {
    if (this.jsonFilter || this.jsonFilter.length > 1) {
      this.makeJsonFilter();
    }

    if (!this.filters || this.filters.length < 1) {
      return '';
    }

    this.verifyLastElement();
    return this.filters.map((f) => f).join(' ');
  }

  private makeJsonFilter() {
    let result: string = '{';
    this.jsonFilter.map((j, index) => {
      if (index + 1 < this.jsonFilter.length) {
        result = result.concat(`"${j.key}":"${j.value ? j.value : ''}",`);
      }
    });
    result = result.concat(
      `"${this.jsonFilter[this.jsonFilter.length - 1].key}":"${
        this.jsonFilter[this.jsonFilter.length - 1].value
          ? this.jsonFilter[this.jsonFilter.length - 1].value
          : ''
      }"`
    );
    result = result.concat('}');
    this.filters.push(result);
  }
}
