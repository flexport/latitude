/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {storiesOf} from "@storybook/react";
import {number, withKnobs} from "@storybook/addon-knobs";
import sections from "./sections";
import FormSection from "../form/FormSection";
import FormRow from "../form/FormRow";
import Rule from "../form/Rule";
import Label from "../Label";
import TextInput from "../TextInput";

import Text from "../Text";
import TextareaInput from "../TextareaInput";
import DeprecatedVerticalGroup from "../DeprecatedVerticalGroup";
import DeprecatedHorizontalGroup from "../DeprecatedHorizontalGroup";
import FloatInput from "../FloatInput";
import Checkbox from "../Checkbox";
import RadioGroup from "../radio/RadioGroup";
import Button from "../button/Button";
import DateTimeInput from "../date/DateTimeInput";
import InputError from "../InputError";

const stories = storiesOf(sections.formLayout, module);

stories.addDecorator(withKnobs);
const widthSpecs = {
  range: true,
  min: 320,
  max: 1000,
  step: 20,
};
const colWidthSpecs = {
  range: true,
  min: 60,
  max: 740,
  step: 10,
};

stories
  .add("basic", () => (
    <div style={{width: `${number("Form Width", 600, widthSpecs, `form`)}px`}}>
      <FormSection
        columns={3}
        columnGap={20}
        minColumnWidth={number("Min Col Width", 120, colWidthSpecs, `columns`)}
      >
        <FormRow columnSpans={[1, 2]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Last name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
    </div>
  ))
  .add("Form section with title", () => (
    <div style={{width: `${number("Form Width", 500, widthSpecs, `form`)}px`}}>
      <FormSection
        columns={2}
        columnGap={20}
        minColumnWidth={number("Min Col Width", 180, colWidthSpecs, `columns`)}
        sectionTitle="Section"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus orci nec mollis feugiat.
      "
      >
        <FormRow columnSpans={[1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Last name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
    </div>
  ))
  .add("Input with error", () => (
    <FormRow columnSpans={[1]}>
      <InputError errorText="This ain't right" showError={true}>
        <TextInput
          disabled={false}
          isInvalid={true}
          onChange={() => undefined}
          placeholder=""
          size="m"
          value=""
        />
      </InputError>
    </FormRow>
  ))
  .add("multi-section", () => (
    <div style={{width: `${number("Form Width", 740, widthSpecs, `form`)}px`}}>
      <FormSection
        sectionTitle="Section A"
        columns={2}
        columnGap={20}
        minColumnWidth={number(
          "Min Col Width A",
          180,
          colWidthSpecs,
          `columns`
        )}
      >
        <FormRow columnSpans={[1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Last name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
      <Rule />
      <FormSection
        sectionTitle="Section B"
        columns={2}
        columnGap={20}
        minColumnWidth={number(
          "Min Col Width B",
          180,
          colWidthSpecs,
          `columns`
        )}
      >
        <FormRow columnSpans={[1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Last name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
    </div>
  ))
  .add("multiple rows", () => (
    <div style={{width: `${number("Form Width", 740, widthSpecs, `form`)}px`}}>
      <FormSection
        columns={4}
        columnGap={20}
        minColumnWidth={number("Min Col Width", 180, colWidthSpecs, `columns`)}
      >
        <FormRow columnSpans={[1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Last name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[1, 1, 1, 1]}>
          <Label value="Length">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Width">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Height">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="Depth">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
    </div>
  ))
  .add("tester", () => (
    <div style={{width: `${number("Form Width", 740, widthSpecs, `form`)}px`}}>
      <FormSection
        columns={4}
        columnGap={20}
        minColumnWidth={number("Min Col Width", 140, colWidthSpecs, `columns`)}
      >
        <FormRow columnSpans={[1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[1, 1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[1, 1, 1, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[2]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[2, 2]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[3]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[3, 1]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
        <FormRow columnSpans={[4]}>
          <Label value="First name">
            <TextInput
              disabled={false}
              isInvalid={false}
              onChange={() => undefined}
              placeholder=""
              size="m"
              value=""
            />
          </Label>
        </FormRow>
      </FormSection>
    </div>
  ))
  .add("Create carrier booking form", () => (
    <div style={{width: "1000px"}}>
      <DeprecatedVerticalGroup spacing="xl">
        <DeprecatedVerticalGroup spacing="m">
          <Text scale="title" weight="bold">
            Create Carrier Booking
          </Text>
          <div style={{maxWidth: "540px"}}>
            <Text>
              {`A carrier booking request is a request that is placed with a carrier
            such as CMA to secure space on an ocean vessel. An approved carrier
            booking request comes with what we call a "Shipping Order (SO)" that
            functions as "your ticket on the boat".`}
            </Text>
          </div>
        </DeprecatedVerticalGroup>
        <Rule />
      </DeprecatedVerticalGroup>
      <div
        style={{width: `${number("Form Width", 940, widthSpecs, `form`)}px`}}
      >
        <FormSection
          columns={4}
          columnGap={20}
          minColumnWidth={number(
            "Min Col Width",
            140,
            colWidthSpecs,
            `columns`
          )}
          sectionTitle="Booking details"
        >
          <FormRow columnSpans={[2, 2]}>
            <Label value="Carrier" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
            <Label value="Contract" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
          </FormRow>

          <FormRow columnSpans={[2]}>
            <RadioGroup
              size="s"
              isInline={false}
              onChange={() => undefined}
              options={[
                {
                  label: "Add booking details made offline",
                  value: "Add booking details made offline",
                },
                {
                  label: "Create a direct booking",
                  value: "Create a direct booking",
                },
              ]}
              value="Create a direct booking"
            />
          </FormRow>

          <FormRow columnSpans={[2]}>
            <Label value="Client" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
          </FormRow>

          <FormRow columnSpans={[2]}>
            <Label value="Booking number" indicateRequired={true}>
              <FloatInput value={null} onChange={() => {}} />
            </Label>
          </FormRow>
        </FormSection>

        <Rule />

        <FormSection
          columns={4}
          columnGap={20}
          minColumnWidth={number(
            "Min Col Width",
            140,
            colWidthSpecs,
            `columns`
          )}
          sectionTitle="Voyage details"
          description="Voyage must start from Yantian, China (place of receipt).
        Remember to include intermodal voyages (e.g. feeder or rail)
        if applicable."
        >
          <FormRow columnSpans={[2, 2]}>
            <Label value="From" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
            <Label value="To" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Label value="Departure (+3days)" indicateRequired={true}>
              <TextInput onChange={() => undefined} value="" />
            </Label>
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Checkbox
              onChange={() => undefined}
              label="Include nearby"
              checked={true}
            />
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Button type="button" intent="basic" kind="hollow">
              Find voyage
            </Button>
          </FormRow>
        </FormSection>

        <Rule />

        <FormSection
          columns={1}
          columnGap={20}
          minColumnWidth={number(
            "Min Col Width",
            140,
            colWidthSpecs,
            `columns`
          )}
          sectionTitle="Cargo details"
        >
          <FormSection
            columns={4}
            columnGap={20}
            minColumnWidth={number(
              "Min Col Width",
              140,
              colWidthSpecs,
              `columns`
            )}
            sectionTitle="40 ft HC ventilated(10)"
            onRequestDelete={() => undefined}
          >
            <FormRow columnSpans={[1, 1, 1, 1]}>
              <Label value="Container" indicateRequired={true}>
                <TextInput onChange={() => undefined} value="" />
              </Label>
              <Label value="Quantity" indicateRequired={true}>
                <TextInput onChange={() => undefined} value="" />
              </Label>
              <Label value="Status" indicateRequired={true}>
                <TextInput onChange={() => undefined} value="" />
              </Label>
              <Label value="SO Number" indicateRequired={true}>
                <TextInput onChange={() => undefined} value="" />
              </Label>
            </FormRow>
          </FormSection>
          <FormRow columnSpans={[1]}>
            <Checkbox
              onChange={() => undefined}
              label="Subject to roll"
              checked={true}
            />
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Button type="button" intent="basic" kind="hollow">
              Add another container
            </Button>
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Label value="SI Cutoff">
              <DateTimeInput
                onChange={() => undefined}
                timeZone="UTC"
                value={{
                  calendarDate: null,
                  wallTime: null,
                }}
              />
            </Label>
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Label value="SI Cutoff">
              <DateTimeInput
                onChange={() => undefined}
                timeZone="UTC"
                value={{
                  calendarDate: null,
                  wallTime: null,
                }}
              />
            </Label>
          </FormRow>
          <FormRow columnSpans={[1]}>
            <Label value="SI Cutoff">
              <DateTimeInput
                onChange={() => undefined}
                timeZone="UTC"
                value={{
                  calendarDate: null,
                  wallTime: null,
                }}
              />
            </Label>
          </FormRow>
        </FormSection>
        <Rule />

        <FormSection
          columns={4}
          columnGap={20}
          minColumnWidth={number(
            "Min Col Width",
            140,
            colWidthSpecs,
            `columns`
          )}
          sectionTitle="More details"
        >
          <FormRow columnSpans={[2]}>
            <Label value="Booking office">
              <TextInput onChange={() => undefined} value="" />
            </Label>
          </FormRow>
          <FormRow columnSpans={[3]}>
            <Label value="Description of goods">
              <TextareaInput rows={4} value="" onChange={() => undefined} />
            </Label>
          </FormRow>
          <FormRow columnSpans={[1, 1, 1]}>
            <Label value="Total weight">
              <Text>24,704.00 kg</Text>
            </Label>
            <Label value="Total Volume">
              <Text>177,000 cbm</Text>
            </Label>
            <Label value="Pieces">
              <Text>2,000 cartons on 100 pallets</Text>
            </Label>
          </FormRow>
          <FormRow columnSpans={[3]}>
            <Label value="Additional notes and remarks">
              <TextareaInput rows={4} value="" onChange={() => undefined} />
            </Label>
          </FormRow>
        </FormSection>
        <Rule />
        <DeprecatedHorizontalGroup mainAlign="end" spacing="m">
          <Button kind="hollow">Cancel</Button>
          <Button kind="solid" intent="basic">
            Submit
          </Button>
        </DeprecatedHorizontalGroup>
      </div>
    </div>
  ));
