/**
 * TEAM: marketplace
 *
 * @flow
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {withKnobs, select, boolean} from "@storybook/addon-knobs";
import sections from "../sections";
import {ThemeProvider} from "../../context/ThemeNameContext";
import DeprecatedHorizontalGroup from "../../DeprecatedHorizontalGroup";
import DeprecatedVerticalGroup from "../../DeprecatedVerticalGroup";
import Text from "../../Text";
import Button from "../../button/Button";
import IconButton from "../../button/IconButton";
import AnchorButton from "../../button/AnchorButton";
import AnchorIconButton from "../../button/AnchorIconButton";

storiesOf(`${sections.buttons}`, module)
  .addDecorator(withKnobs)
  .add("Buttons", () => {
    const disabled = boolean("Disabled", false);

    return (
      <ThemeProvider theme={select("Theme", ["Base", "Transmission"], "Base")}>
        <DeprecatedVerticalGroup>
          <Text scale="headline">Buttons</Text>

          <DeprecatedHorizontalGroup>
            <DeprecatedVerticalGroup>
              <b>basic solid</b>
              <Button intent="basic" kind="solid" disabled={disabled}>
                Hello world
              </Button>
              <b>basic hollow</b>
              <Button intent="basic" kind="hollow" disabled={disabled}>
                Hello world
              </Button>
              <b>basic bare</b>
              <Button intent="basic" kind="bare" disabled={disabled}>
                Hello world
              </Button>
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>danger solid</b>
              <Button intent="danger" kind="solid" disabled={disabled}>
                Hello world
              </Button>
              <b>danger hollow</b>
              <Button intent="danger" kind="hollow" disabled={disabled}>
                Hello world
              </Button>
              <b>danger bare</b>
              <Button intent="danger" kind="bare" disabled={disabled}>
                Hello world
              </Button>
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>none hollow</b>
              <Button intent="none" kind="hollow" disabled={disabled}>
                Hello world
              </Button>
              <b>none bare</b>
              <Button intent="none" kind="bare" disabled={disabled}>
                Hello world
              </Button>
            </DeprecatedVerticalGroup>
          </DeprecatedHorizontalGroup>

          <br />

          <Text scale="headline">Icon Buttons</Text>
          <DeprecatedHorizontalGroup>
            <DeprecatedVerticalGroup>
              <b>basic hollow</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="hollow"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
              <b>basic bare</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="bare"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
              <b>basic blank</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="blank"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>danger hollow</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="hollow"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
              <b>danger bare</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="bare"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
              <b>danger blank</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="blank"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>none hollow</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="hollow"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
              <b>none bare</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="bare"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
              <b>none blank</b>
              <IconButton
                iconName="docs"
                type="button"
                kind="blank"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
          </DeprecatedHorizontalGroup>

          <br />

          <Text scale="headline">Anchor Buttons</Text>
          <DeprecatedHorizontalGroup>
            <DeprecatedVerticalGroup>
              <b>basic solid</b>
              <AnchorButton
                kind="solid"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
              <b>basic hollow</b>
              <AnchorButton
                kind="hollow"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
              <b>basic bare</b>
              <AnchorButton
                kind="bare"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
              <b>basic blank</b>
              <AnchorButton
                kind="blank"
                intent="basic"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>danger solid</b>
              <AnchorButton
                kind="solid"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
              <b>danger hollow</b>
              <AnchorButton
                kind="hollow"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
              <b>danger bare</b>
              <AnchorButton
                kind="bare"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
              <b>danger blank</b>
              <AnchorButton
                kind="blank"
                intent="danger"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>none hollow</b>
              <AnchorButton
                kind="hollow"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
              <b>none bare</b>
              <AnchorButton
                kind="bare"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
              <b>none blank</b>
              <AnchorButton
                kind="blank"
                intent="none"
                disabled={disabled}
                label="hello world"
              />
            </DeprecatedVerticalGroup>
          </DeprecatedHorizontalGroup>

          <br />

          <Text scale="headline">Anchor Icon Buttons</Text>
          <DeprecatedHorizontalGroup>
            <DeprecatedVerticalGroup>
              <b>basic solid</b>
              <AnchorIconButton
                iconName="docs"
                kind="solid"
                intent="basic"
                label="hello world"
                disabled={disabled}
              />
              <b>basic hollow</b>
              <AnchorIconButton
                iconName="docs"
                kind="hollow"
                intent="basic"
                label="hello world"
                disabled={disabled}
              />
              <b>basic bare</b>
              <AnchorIconButton
                iconName="docs"
                kind="bare"
                intent="basic"
                label="hello world"
                disabled={disabled}
              />
              <b>basic blank</b>
              <AnchorIconButton
                iconName="docs"
                kind="blank"
                intent="basic"
                label="hello world"
                disabled={disabled}
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>danger solid</b>
              <AnchorIconButton
                iconName="docs"
                kind="solid"
                intent="danger"
                label="hello world"
                disabled={disabled}
              />
              <b>danger hollow</b>
              <AnchorIconButton
                iconName="docs"
                kind="hollow"
                intent="danger"
                label="hello world"
                disabled={disabled}
              />
              <b>danger bare</b>
              <AnchorIconButton
                iconName="docs"
                kind="bare"
                intent="danger"
                label="hello world"
                disabled={disabled}
              />
              <b>danger blank</b>
              <AnchorIconButton
                iconName="docs"
                kind="blank"
                intent="danger"
                label="hello world"
                disabled={disabled}
              />
            </DeprecatedVerticalGroup>
            <DeprecatedVerticalGroup>
              <b>none hollow</b>
              <AnchorIconButton
                iconName="docs"
                kind="hollow"
                intent="none"
                label="hello world"
                disabled={disabled}
              />
              <b>none bare</b>
              <AnchorIconButton
                iconName="docs"
                kind="bare"
                intent="none"
                label="hello world"
                disabled={disabled}
              />
              <b>none blank</b>
              <AnchorIconButton
                iconName="docs"
                kind="blank"
                intent="none"
                label="hello world"
                disabled={disabled}
              />
            </DeprecatedVerticalGroup>
          </DeprecatedHorizontalGroup>
        </DeprecatedVerticalGroup>
      </ThemeProvider>
    );
  });
