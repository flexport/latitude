/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import {withKnobs, boolean} from "@storybook/addon-knobs";
import sections from "../sections";
import Group from "../../Group";
import DocumentTabs from "../../document/DocumentTabs/DocumentTabs";
import DocumentUploader from "../../document/DocumentUploader";

const stories = storiesOf(`${sections.navigation}`, module);
stories.addDecorator(withKnobs);

stories.add("Document Tabs", () => (
  <Group flexDirection="column" gap={20}>
    <DocumentTabsShim elementCount={3} />

    <DocumentTabsShim elementCount={10} />
    <DocumentTabsShim elementCount={10} size="s" />
  </Group>
));

stories.add("Document Tabs With Uploader", () => {
  const noFileAvailableUpdate = boolean("no file available update", false);

  return (
    <div style={{width: "600px", height: "600px"}}>
      <DocumentTabs
        documentNameOptions={["asdf1.pdf", "asdf2.pdf", "asdf3.pdf"].map(
          (name, key) => ({name, key})
        )}
        selectedKey={0}
        onAdd={() => {}}
        onSelect={() => {}}
        onDelete={() => {}}
        size="s"
      />

      <DocumentUploader
        document={null}
        onChange={() => {}}
        onNoFileAvailableUpdate={noFileAvailableUpdate ? () => {} : undefined}
        serverState="waiting"
      />
    </div>
  );
});

type Props = {|
  +elementCount: number,
  +size?: "s" | "m" | "l",
|};

function DocumentTabsShim({elementCount, size = "m"}: Props) {
  const [tabs, setTabs] = React.useState(
    Array.from({length: elementCount}, (_, i) => `ShipmentBillOfLading${i}.pdf`)
  );

  const [selectedKey, setSelectedKey] = React.useState(0);
  const [maxCount, setMaxCount] = React.useState(elementCount);

  const addTab = () => {
    const newTabs = tabs.slice();
    newTabs.push(`ShipmentBillOfLading${maxCount}.pdf`);
    setTabs(newTabs);
    setMaxCount(maxCount + 1);
  };

  const deleteTab = (docKey: number) => {
    const newTabs = tabs.slice();
    newTabs.splice(docKey, 1);
    setTabs(newTabs);
    setSelectedKey(docKey);
  };

  return (
    <div className={css(styles.container)}>
      <DocumentTabs
        onAdd={addTab}
        onDelete={deleteTab}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        documentNameOptions={tabs.map((name, key) => ({name, key}))}
        size={size}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "800px",
    height: "100px",
    border: "1px dashed black",
  },
});
