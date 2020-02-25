/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import typeof {countries as countriesType} from "./constants/AddressOptionConstants.generated";

type Country = $Keys<countriesType>;
const PATH = "https://assets.flexport.com/flags/svg/1/";
const EXTENSION = ".svg";

type Props = {|
  /** The `ISO 3166-1 aplpha` 2 character country code that you wish to display */
  +countryCode: Country,
  /** Flags have square dimensions and will default to width: 100% unless a maxWidth is specified. */
  +maxWidth?: number,
|};

type State = {|
  loaded: boolean,
  error?: any,
|};

/**
 * @short An SVG icon component specifically for country flags.
 * @brandStatus V2
 * @status Stable
 * @category General
 * @extends React.Component */
export default class Flag extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }
  handleLoaded = () => {
    this.setState({loaded: true});
  };
  render() {
    const {countryCode, maxWidth} = this.props;
    return (
      <img
        src={`${PATH}${countryCode}${EXTENSION}`}
        alt={`${countryCode} Flag`}
        className={css(styles.fade, this.state.loaded && styles.fadeIn)}
        style={{
          width: "100%",
          maxWidth: maxWidth ? `${maxWidth}px` : null,
          height: maxWidth ? `${maxWidth}px` : "auto",
        }}
        onLoad={this.handleLoaded}
      />
    );
  }
}

const styles = StyleSheet.create({
  fade: {
    opacity: 0,
    transition: "opacity 0.2s cubic-bezier(.42,0,.58,1)",
  },
  fadeIn: {
    opacity: 1,
  },
});
