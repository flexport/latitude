/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */
import {StyleSheet} from "aphrodite";

/**
 * This file is a collection of flexbox rules meant exclusively for latitude/Flex.jsx
 *
 * Flex.jsx mirrors certain flexbox rules 1:1. Rather than inline the flexbox styles
 * it is better to break them out to a stylesheet in order to ensure we get vendor
 * prefixing.
 *
 *
 */

const flexboxStyles = {
  flexWrap: StyleSheet.create({
    nowrap: {
      flexWrap: "nowrap",
    },
    wrap: {
      flexWrap: "wrap",
    },
    "wrap-reverse": {
      flexWrap: "wrap-reverse",
    },
  }),
  flexDirection: StyleSheet.create({
    row: {
      flexDirection: "row",
    },
    "row-reverse": {
      flexDirection: "row-reverse",
    },
    column: {
      flexDirection: "column",
    },
    "column-reverse": {
      flexDirection: "column-reverse",
    },
  }),
  justifyContent: StyleSheet.create({
    center: {
      justifyContent: "center",
    },
    start: {
      justifyContent: "start",
    },
    end: {
      justifyContent: "end",
    },
    "flex-start": {
      justifyContent: "flex-start",
    },
    "flex-end": {
      justifyContent: "flex-end",
    },
    left: {
      justifyContent: "left",
    },
    right: {
      justifyContent: "right",
    },
    normal: {
      justifyContent: "normal",
    },
    "space-between": {
      justifyContent: "space-between",
    },
    "space-around": {
      justifyContent: "space-around",
    },
    "space-evenly": {
      justifyContent: "space-evenly",
    },
    stretch: {
      justifyContent: "stretch",
    },
    "safe center": {
      justifyContent: "safe center",
    },
    "unsafe center": {
      justifyContent: "unsafe center",
    },
  }),
  alignItems: StyleSheet.create({
    normal: {
      alignItems: "normal",
    },
    stretch: {
      alignItems: "stretch",
    },
    center: {
      alignItems: "center",
    },
    start: {
      alignItems: "start",
    },
    end: {
      alignItems: "end",
    },
    "flex-start": {
      alignItems: "flex-start",
    },
    "flex-end": {
      alignItems: "flex-end",
    },
    "self-start": {
      alignItems: "self-start",
    },
    "self-end": {
      alignItems: "self-end",
    },
    baseline: {
      alignItems: "baseline",
    },
    "first baseline": {
      alignItems: "first baseline",
    },
    "last baseline": {
      alignItems: "last baseline",
    },
    "safe center": {
      alignItems: "safe center",
    },
    "unsafe center": {
      alignItems: "unsafe center",
    },
  }),
};

export default flexboxStyles;
