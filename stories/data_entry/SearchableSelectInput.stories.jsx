/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react/dist/client/preview";
import sections from "../sections";
import SearchableSelectInput, {
  type Option,
} from "../../select/SearchableSelectInput";

import CustomModal, {defaultModalStyles} from "../../modal/CustomModal";
import {include, padding} from "../../styles";
import Button from "../../button/Button";

const stories = storiesOf(
  `${sections.dataEntry}/SearchableSelectInput`,
  module
);

stories.add("basic usage", () => (
  <div className={css(styles.container)}>
    <SearchableSelectInputLauncher
      options={[
        {label: "grey10", value: "grey10"},
        {label: "grey20", value: "grey20"},
        {label: "grey30", value: "grey30"},
        {label: "grey40", value: "grey40"},
        {label: "grey50", value: "grey50"},
        {label: "grey60", value: "grey60"},
        {label: "blue10", value: "blue10"},
        {label: "blue20", value: "blue20"},
        {label: "blue30", value: "blue30"},
        {label: "blue40", value: "blue40"},
        {label: "blue50", value: "blue50"},
        {label: "blue60", value: "blue60"},
        {label: "blue70", value: "blue70"},
        {label: "blue80", value: "blue80"},
        {label: "blue90", value: "blue90"},
      ]}
    />
    <SearchableSelectInputLauncher
      options={[
        {label: "grey10", value: "grey10"},
        {label: "grey20", value: "grey20"},
        {label: "grey30", value: "grey30"},
        {label: "grey40", value: "grey40"},
        {label: "grey50", value: "grey50"},
        {label: "grey60", value: "grey60"},
        {label: "blue10", value: "blue10"},
        {label: "blue20", value: "blue20"},
        {label: "blue30", value: "blue30"},
        {label: "blue40", value: "blue40"},
        {label: "blue50", value: "blue50"},
        {label: "blue60", value: "blue60"},
        {label: "blue70", value: "blue70"},
        {label: "blue80", value: "blue80"},
        {label: "blue90", value: "blue90"},
      ]}
    />

    <SearchableSelectInputLauncher
      options={[
        {label: "grey10", value: "grey10", section: "SECTION 1"},
        /* eslint-disable jsx-a11y/no-distracting-elements */
        {
          label: "grey20",
          value: "grey20",
          section: "SECTION 1",
          customView: <b>Custom Item</b>,
        },
        {label: "grey30", value: "grey30", section: "SECTION 1"},
        {label: "grey40", value: "grey40", section: "SECTION 1"},
        {label: "grey50", value: "grey50", section: "SECTION 1"},
        {label: "grey60", value: "grey60", section: "SECTION 1"},
        {label: "blue10", value: "blue10", section: "SECTION 2"},
        {label: "blue20", value: "blue20", section: "SECTION 2"},
        {label: "blue30", value: "blue30", section: "SECTION 2"},
        {label: "blue40", value: "blue40", section: "SECTION 2"},
        {label: "blue50", value: "blue50", section: "SECTION 2"},
        {label: "blue60", value: "blue60", section: "SECTION 2"},
      ]}
      sectionOrder={["SECTION 1", "SECTION 2"]}
    />
    <ModalTest />
  </div>
));

type Props = {|
  +options: $ReadOnlyArray<Option<string>>,
  +sectionOrder?: $ReadOnlyArray<string>,
|};

const SearchableSelectInputLauncher = ({options, sectionOrder}: Props) => {
  const [selected, setSelected] = React.useState(options[0].value);

  const handleChange = newValue => {
    setSelected(newValue);
  };

  return (
    <SearchableSelectInput
      isNullable={true}
      options={options}
      value={selected}
      onChange={handleChange}
      sectionOrder={sectionOrder}
      placeholder="Pick a color"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "grid",
    gridGap: "20px",
    width: "200px",
  },
  modal: {
    ...include(padding.a.m),
    backgroundColor: "white",
    display: "flex",
    width: "200px",
  },
});

function ModalTest() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <CustomModal
        isOpen={isOpen}
        closeOptions={{
          onRequestClose: () => {
            setIsOpen(false);
          },
          shouldCloseOnEsc: true,
          shouldCloseOnOverlayClick: true,
        }}
        className={css(defaultModalStyles.content, styles.modal)}
      >
        <SearchableSelectInputLauncher
          options={[
            {label: "grey10", value: "grey10", section: "SECTION 1"},
            /* eslint-disable jsx-a11y/no-distracting-elements */
            {
              label: "grey20",
              value: "grey20",
              section: "SECTION 1",
              customView: <b>Custom Item</b>,
            },
            {label: "grey30", value: "grey30", section: "SECTION 1"},
            {label: "grey40", value: "grey40", section: "SECTION 1"},
            {label: "grey50", value: "grey50", section: "SECTION 1"},
            {label: "grey60", value: "grey60", section: "SECTION 1"},
            {label: "blue10", value: "blue10", section: "SECTION 2"},
            {label: "blue20", value: "blue20", section: "SECTION 2"},
            {label: "blue30", value: "blue30", section: "SECTION 2"},
            {label: "blue40", value: "blue40", section: "SECTION 2"},
            {label: "blue50", value: "blue50", section: "SECTION 2"},
            {label: "blue60", value: "blue60", section: "SECTION 2"},
          ]}
          sectionOrder={["SECTION 1", "SECTION 2"]}
        />
      </CustomModal>
    </div>
  );
}
