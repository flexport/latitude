For some reason we have a build step which generates the webpack config files in
`..`. So don't edit those files, instead edit the files in this directory and
then run `yarn webpack:config`.

TODO(dmnd): Get rid of this silliness.
