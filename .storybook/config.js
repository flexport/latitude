import React from "react";
import {configure, addDecorator} from "@storybook/react";

import Container from "./Container";

addDecorator(story => <Container story={story} />);

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.jsx?$/), module);
