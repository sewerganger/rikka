export type SizeType =
  | 'tiny'
  | 'small'
  | 'normal'
  | 'large'
  | 'largest'
  | [number | string, number | string]
  | React.CSSProperties
  | [string]
  | [number]
  | undefined;

export const is = {
  type(obj: unknown, str: string): boolean {
    return Object.prototype.toString.call(obj) === `[object ${str}]`;
  },
  string(obj: unknown): obj is string {
    return this.type(obj, 'String');
  },
  object(obj: unknown): obj is object {
    return this.type(obj, 'Object');
  },
  function(obj: unknown): obj is Function {
    return this.type(obj, 'Function');
  },
  null(obj: unknown): obj is null {
    return this.type(obj, 'Null');
  },
  undefined(obj: unknown): obj is undefined {
    return this.type(obj, 'Undefined');
  },
  number(obj: unknown): obj is number {
    return this.type(obj, 'Number');
  }
};

export const accordType = (a: any, b: string, c: any) => (is.type(a, b) ? a : c);

/* eslint-disable @typescript-eslint/indent*/
export const handleSize = (size: SizeType): SizeType =>
  Array.isArray(size)
    ? 1 === size.length
      ? { width: accordType(size[0], 'String', size![0] + 'px') }
      : {
          width: accordType(size[0], 'String', size[0] + 'px'),
          height: accordType(size[1], 'String', size[1] + 'px')
        }
    : size;

export const color = {
  violet_dark: '#222244',
  violet_light: '#2d2b55',
  violet_a: '#7457ff'
};

export * from './hooks';

export * from './store';