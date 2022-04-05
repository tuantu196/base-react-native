export declare type Primitive = string | boolean | number;
export declare const isPrimitive: (value: unknown) => value is Primitive;
export declare function convertToPrimitiveArray(
  value?: Primitive | Array<Primitive>
): Array<Primitive>;
