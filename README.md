# rmarganti/opinionated.nvim

A Neovim plugin containing a number of functions that are particularly suited to my way of working.

## Commands

### :OpinionatedEditTest

Open a test for the current file in a vertical split. Javascript and Typescript
files will receive a co-located `.spec.{js,jsx,ts,tsx}`. PHP files will receive
a test with a similar path, but instead of `app/wherever/Whatever.php`, it will
br `tests/unit/wherever/WhateverTest.php`.
