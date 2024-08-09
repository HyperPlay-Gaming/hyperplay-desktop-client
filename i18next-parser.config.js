module.exports = {
  contextSeparator: '_',
  // Key separator used in your translation keys

  createOldCatalogs: false,
  // Save the \_old files

  customValueTemplate: null,
  // If you wish to customize the value output the value as an object, you can set your own format.
  // ${defaultValue} is the default value you set in your translation function.
  // Any other custom property will be automatically extracted.
  //
  // Example:
  // {
  //   message: "${defaultValue}",
  //   description: "${maxLength}", // t('my-key', {maxLength: 150})
  // }

  defaultNamespace: 'translation',
  // Default namespace used in your i18next config

  defaultValue: null,
  // Default value to give to empty keys

  failOnWarnings: false,
  // Exit with an exit code of 1 on warnings

  // If you wish to customize options in internally used i18next instance, you can define an object with any
  // configuration property supported by i18next (https://www.i18next.com/overview/configuration-options).
  // { compatibilityJSON: 'v3' } can be used to generate v3 compatible plurals.
  // settings 'v3' since Weblate is also configured for v3 compatibility
  i18nextOptions: { compatibilityJSON: 'v3' },

  indentation: 4,
  // Indentation of the catalog files

  input: ['src/**/*.{ts,tsx}'],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file

  keepRemoved: false,
  // Keep keys from the catalog that are no longer in code

  keySeparator: '.',
  // Key separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  // see below for more details
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: [
      {
        attr: 'i18nKey', // Attribute for the keys
        lexer: 'JsxLexer'
      }
    ],
    default: ['JavascriptLexer']
  },

  lineEnding: 'match',
  // Control the line ending. See options at https://github.com/ryanve/eol

  locales: ['en'],
  // An array of the locales in your applications

  namespaceSeparator: ':',
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  // the problem with that is that we need all keys to have a default value otherwise they will be removed
  // resetDefaultValueLocale: 'en',
  // The locale to compare with default values to determine whether a default value has been changed.
  // If this is set and a default value differs from a translation in the specified locale, all entries
  // for that key across locales are reset to the default value, and existing translations are moved to
  // the `_old` file.

  skipDefaultValues: false,
  // Whether to ignore default values.

  sort: true,
  // Whether or not to sort the catalog

  verbose: true
  // Display info about the parsing including some stat
}
