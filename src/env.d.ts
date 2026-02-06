/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Declaración de módulos para componentes Astro
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module "*.astro" {
  const component: any;
  export default component;
}
