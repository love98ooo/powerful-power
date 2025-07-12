export const locales = ['en', 'zh'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'zh';

export const namespaces = ['common'] as const;
export type Namespace = typeof namespaces[number];
export const defaultNamespace: Namespace = 'common'; 