/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {storiesOf} from "@storybook/react";
import sections from "../sections";
import Grid from "../../grid/Grid";
import Row from "../../grid/Row";
import Cell from "../../grid/Cell";
import Text from "../../Text";
import latitudeColors from "../../colors";

const stories = storiesOf(`${sections.layout}/Grid`, module);

const Example = () => (
  <div className={css(exampleStyles.container, exampleStyles.colors)} />
);

stories
  .add("basic", () => (
    <div className={css(styles.container)}>
      <Grid gutter={20} rowGap={32}>
        <Row>
          <Cell span={12}>
            <Text>Grid with 20px gutters and a 32px rowGap.</Text>
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 6},
              sm: {span: 4},
              md: {span: 3},
              lg: {span: 2},
              xl: {span: 1},
            }}
          >
            <Example />
          </Cell>
        </Row>

        <Row>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 6},
              md: {span: 4},
              lg: {span: 3},
              xl: {span: 2},
            }}
          >
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 12},
              md: {span: 6},
              lg: {span: 4},
              xl: {span: 3},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 12},
              md: {span: 6},
              lg: {span: 4},
              xl: {span: 3},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 12},
              md: {span: 6},
              lg: {span: 4},
              xl: {span: 3},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              sm: {span: 12},
              md: {span: 6},
              lg: {span: 4},
              xl: {span: 3},
            }}
          >
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell
            span={{
              xs: {span: 12},
              lg: {span: 6},
              xl: {span: 4},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              lg: {span: 6},
              xl: {span: 4},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              lg: {span: 6},
              xl: {span: 4},
            }}
          >
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell
            span={{
              xs: {span: 12},
              xl: {span: 6},
            }}
          >
            <Example />
          </Cell>
          <Cell
            span={{
              xs: {span: 12},
              xl: {span: 6},
            }}
          >
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={12}>
            <Example />
          </Cell>
        </Row>
      </Grid>
    </div>
  ))

  .add("columns", () => (
    <div className={css(styles.container)}>
      <Grid gutter={20} rowGap={32}>
        <Row>
          <Cell span={12}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
      </Grid>
    </div>
  ))

  .add("offset", () => (
    <div className={css(styles.container)}>
      <Grid gutter={20} rowGap={32}>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 11}}}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 10}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 9}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 8}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 7}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 6}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 5}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 4}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 3}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 2}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={{xs: {span: 1, offset: 1}}}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
        <Row>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
          <Cell span={1}>
            <Example />
          </Cell>
        </Row>
      </Grid>
    </div>
  ));

const styles = StyleSheet.create({
  container: {
    background: latitudeColors.white,
  },
});

const exampleStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: "12px 0px",
  },
  colors: {
    background: latitudeColors.grey20,
    "@media (min-width: 480px)": {
      background: latitudeColors.red20,
    },
    "@media (min-width: 768px)": {
      background: latitudeColors.orange20,
    },
    "@media (min-width: 1024px)": {
      background: latitudeColors.green20,
    },
    "@media (min-width: 1440px)": {
      background: latitudeColors.indigo20,
    },
  },
});
