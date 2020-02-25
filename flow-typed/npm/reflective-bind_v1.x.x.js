declare module "reflective-bind" {
  declare export function isReflective(mixed): boolean;
  declare export function reflectiveEqual(mixed, mixed): boolean;
  declare export function shouldComponentUpdate(mixed, mixed, mixed): boolean;
  declare export default Function;
}
