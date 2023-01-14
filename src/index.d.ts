import {TVConfig} from "./config";
import {ClassValue, ClassProp, OmitUndefined} from "./utils";

type TVSlots = string[];

// type TVSlotsTest = ["trigger", "menu", "item"];
// type Result = {[K in TVSlotsTest[number]]?: ClassValue};

type TVVariants<S extends string[]> = {
  [key: string]: {
    [key: string]: S extends undefined ? ClassValue : {[K in S[number]]?: ClassValue} | ClassValue;
  };
};

type TVCompoundVariants<V extends TVVariants<S>, S extends string[]> = Array<
  {
    [K in keyof V]?: keyof V[K];
  } & S extends undefined
    ? ClassProp
    : ClassProp<{[K in S[number]]?: ClassValue} | ClassValue>
>;

type TVDefaultVariants<V extends TVVariants<S>, S extends string[]> = {
  [K in keyof V]?: keyof V[K];
};

type TVReturnType<S extends TVSlots> = S extends string[]
  ? {[K in S[number]]: (slotProps: ClassProp) => string}
  : (slotProps: ClassProp) => string;

export declare function tv<
  S extends TVSlots,
  V extends TVVariants<S>,
  CV extends TVCompoundVariants<V, S>,
  DV extends TVDefaultVariants<V, S>,
  C extends TVConfig,
>(
  options: {
    base?: ClassValue;
    slots?: S;
    variants?: V;
    compoundVariants?: CV;
    defaultVariants?: DV;
  },
  config?: C,
): TVReturnType<S>;

export type VariantProps<Component extends (...args: any) => any> = Omit<
  OmitUndefined<Parameters<Component>[0]>,
  "class" | "className"
>;