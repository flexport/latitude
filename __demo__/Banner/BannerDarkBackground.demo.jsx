/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {type Node} from "react";
import {css, StyleSheet} from "aphrodite";

import {padding} from "../../styles";
import colors from "../../colors";
import Banner from "../../Banner";

/**
 * @title Banner without close button
 * @description Ommitting the closeButton callback will cause the close button to be omitted.
 */
export default function BannerWithoutCloseButton() {
  type Props = {|+children: Node|};

  const styles = StyleSheet.create({bg: {backgroundColor: colors.grey10}});

  const ComponentWithDarkBackground = ({children}: Props) => (
    <div className={css(padding.a.xl, styles.bg)}>{children}</div>
  );

  return (
    <ComponentWithDarkBackground>
      <Banner
        iconName="flag"
        intent="default-light"
        message="You can distinguish this banner from its background!"
      />
    </ComponentWithDarkBackground>
  );
}
