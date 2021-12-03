interface IRuleValue {
  (value: string): boolean | string;
}

export interface IRule {
  [key: string]: IRuleValue,
}
