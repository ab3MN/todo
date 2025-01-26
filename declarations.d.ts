declare module 'eslint-plugin-react';
declare module 'eslint-plugin-react-hooks';
declare module 'eslint-plugin-import';
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
  export default ReactComponent;
}
