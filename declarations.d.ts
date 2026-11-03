declare module "*.css" {}
declare type Styled<T> = ComponentType<T & { className?: string }>
