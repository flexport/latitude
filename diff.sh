# TEAM: frontend_infra

#!/usr/bin/env bash

# Script for diffing with the monorepo. Helps verify no regressions happened.
# Instructions:
#   1. Move it to the parent of your flexport and latitude directories
#   2. Uncomment some commands
#   3. `./diff.sh`

WAJ=webpack/assets/javascripts

# git diff on arbitrary files
function diff() {
  # echo "diff() $@"
  git --no-pager diff --no-index $@
}

# diff two directories excluding tests and demo files
function diffdir() {
  mdir=$1
  ldir=$2
  exclude=$3
  exclude2=$4

  # TODO(dmnd): I suck at bash; someone please tell me how to do this
  if [ -n "$exclude2" ]; then
    FILES="$(cd $ldir; fd -tf -E __demo__ -E __tests__ -E $exclude -E $exclude2)"
  else
    if [ -n "$exclude" ]; then
      FILES="$(cd $ldir; fd -tf -E __demo__ -E __tests__ -E $exclude)"
    else
      FILES="$(cd $ldir; fd -tf -E __demo__ -E __tests__)"
    fi
  fi


  for file in $FILES; do
    # echo $file
    diff $mdir/$file $ldir/$file
  done;
}

## diff latitude directories
function latdiffdir() {
  diffdir flexport/$WAJ/latitude/$1 latitude/$1 $2 $3
}

## diff waj directories
function wajdiffdir() {
  diffdir flexport/$WAJ/$1 latitude/$1 $2 $3
}

## root latitude files - lgtm!
# diff flexport/$WAJ/latitude/Badge.jsx latitude/Badge.jsx
# diff flexport/$WAJ/latitude/Banner.jsx latitude/Banner.jsx
# diff flexport/$WAJ/latitude/Checkbox.jsx latitude/Checkbox.jsx
# diff flexport/$WAJ/latitude/CheckboxList.jsx latitude/CheckboxList.jsx
# diff flexport/$WAJ/latitude/CustomDropdownButton.jsx latitude/CustomDropdownButton.jsx
# diff flexport/$WAJ/latitude/DeprecatedHorizontalGroup.jsx latitude/DeprecatedHorizontalGroup.jsx
# diff flexport/$WAJ/latitude/DeprecatedVerticalGroup.jsx latitude/DeprecatedVerticalGroup.jsx
# diff flexport/$WAJ/latitude/Drawer.jsx latitude/Drawer.jsx
# diff flexport/$WAJ/latitude/DropdownButton.jsx latitude/DropdownButton.jsx
# diff flexport/$WAJ/latitude/Flag.jsx latitude/Flag.jsx
# diff flexport/$WAJ/latitude/Flex.jsx latitude/Flex.jsx
# diff flexport/$WAJ/latitude/FloatInput.jsx latitude/FloatInput.jsx
# diff flexport/$WAJ/latitude/GraphicIcon.jsx latitude/GraphicIcon.jsx
# diff flexport/$WAJ/latitude/Group.jsx latitude/Group.jsx
# diff flexport/$WAJ/latitude/HelpTooltip.jsx latitude/HelpTooltip.jsx
# diff flexport/$WAJ/latitude/Icon.jsx latitude/Icon.jsx
# diff flexport/$WAJ/latitude/InlineEdit.jsx latitude/InlineEdit.jsx
# diff flexport/$WAJ/latitude/InputError.jsx latitude/InputError.jsx
# diff flexport/$WAJ/latitude/InputGroup.jsx latitude/InputGroup.jsx
# diff flexport/$WAJ/latitude/Label.jsx latitude/Label.jsx
# diff flexport/$WAJ/latitude/Link.jsx latitude/Link.jsx
# diff flexport/$WAJ/latitude/Loader.jsx latitude/Loader.jsx
# diff flexport/$WAJ/latitude/Logo.jsx latitude/Logo.jsx
# diff flexport/$WAJ/latitude/Markdown.jsx latitude/Markdown.jsx
# diff flexport/$WAJ/latitude/MultiInput.jsx latitude/MultiInput.jsx
# diff flexport/$WAJ/latitude/Pill.jsx latitude/Pill.jsx
# diff flexport/$WAJ/latitude/Portal.jsx latitude/Portal.jsx
# diff flexport/$WAJ/latitude/ProgressBar.jsx latitude/ProgressBar.jsx
# diff flexport/$WAJ/latitude/SettingsToggle.jsx latitude/SettingsToggle.jsx
# diff flexport/$WAJ/latitude/Text.jsx latitude/Text.jsx
# diff flexport/$WAJ/latitude/TextInput.jsx latitude/TextInput.jsx
# diff flexport/$WAJ/latitude/TextInputAutocomplete.jsx latitude/TextInputAutocomplete.jsx
# diff flexport/$WAJ/latitude/TextLink.jsx latitude/TextLink.jsx
# diff flexport/$WAJ/latitude/TextLinkAction.jsx latitude/TextLinkAction.jsx
# diff flexport/$WAJ/latitude/TextLinkContext.jsx latitude/TextLinkContext.jsx
# diff flexport/$WAJ/latitude/TextareaInput.jsx latitude/TextareaInput.jsx
# diff flexport/$WAJ/latitude/Tooltip.jsx latitude/Tooltip.jsx
# diff flexport/$WAJ/latitude/colors.js latitude/colors.js
# diff flexport/$WAJ/latitude/sizes.js latitude/sizes.js

## latitude dirs - lgtm
# latdiffdir button
# latdiffdir date
# latdiffdir document
# latdiffdir filter
# latdiffdir form
# latdiffdir grid
# latdiffdir modal
# latdiffdir popover
# latdiffdir popup
# latdiffdir progress
# latdiffdir radio
# latdiffdir select
# latdiffdir table
# latdiffdir tabs
# latdiffdir takeover
# latdiffdir toast
# latdiffdir context ThemeNameContext.jsx
# diff flexport/$WAJ/context/ThemeNameContext.jsx latitude/context/ThemeNameContext.jsx

# diffdir flexport/$WAJ/components/base_candidate latitude/base_candidate

## tools dir - lgtm
# wajdiffdir tools FluxDispatcher.js
# diff flexport/$WAJ/dispatcher/AppDispatcher.js latitude/tools/FluxDispatcher.js

## other random directories
# wajdiffdir _harness
# wajdiffdir config
# wajdiffdir connectors
# wajdiffdir constants
# wajdiffdir dispatch
# wajdiffdir hooks
# wajdiffdir vendor_stylesheets
# wajdiffdir styles deprecatedWhitespace.js whitespace.js
# diff flexport/$WAJ/styles/whitespace.js latitude/styles/deprecatedWhitespace.js
# diff flexport/$WAJ/latitude/styles/whitespace.js latitude/styles/whitespace.js


## root files
# diff flexport/babel.config.js latitude/babel.config.js
# diff flexport/jest.config.js latitude/jest.config.js
# diff flexport/package.json latitude/package.json
# diff flexport/prettier.config.js latitude/prettier.config.js

## webpack configs - no regressions possible
# diffdir flexport/webpack/scripts latitude/scripts

## stories — TODO(dmnd): still messy unfortunately
# diffdir flexport/$WAJ/components/stories latitude/stories

## design system app - ignoring for now, we don't want it here anyway
# wajdiffdir design_system

## yarn.lock - not risky, really hard to read diff
# diff flexport/yarn.lock latitude/yarn.lock

## new files - no regressions possible
# latitude/LICENSE
# latitude/README.md
# latitude/config.unused.js
