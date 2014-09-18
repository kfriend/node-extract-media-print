# Node `@media print` extractor
Extracts `@media print` statements from a CSS stylesheet and spits it back at you.

## Why would I ever want to use this?
Our BFF IE 8 is still around, and he doesn't support @media statements. This package allows you
to write you stylesheets using `@media print`, then extract them later. You can take the extracted
statements and shove them into a print stylesheet, which you can then throw at IE 8.

## Heads-up
- This package currently doesn't do anything special with "complex" `@media print` statements, meaning
something like `@media print and (min-width: 800px)`. They will be included in the extracted CSS, but will
not be stripped of its "print" media type; `@media print and (min-width: 800px)` will be returned as
`@media print and (min-width: 800px)`. It would be possible to use a media-query-stripping package to
remove the "complex" portions of any media queries, after extracting them.

## Warning
- This package is experimental!

## Issues and bugs
- Please create an issue for any bugs or problems.

## TODOs and possible TODOs
- Add option for including "global" styles or not. Currently strips them out?
- Add support for parsing opposite styles, to get all styles that are not print styles?
- Add options for matching using css-mediaquery?
- Add support for pulling in a media-query-stripping package?
- Handle complex media queries, such as `@media screen and print and (max-wi...)` and strip out "print" part?