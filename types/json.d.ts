declare module "*.json" {
  const value: Record<string, unknown> | Array<unknown>;
  export default value;
}