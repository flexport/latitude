/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import TextCell from "../TextCell";
import InteractableCell from "../InteractableCell";
import Button from "../../button/Button";
import {type ColumnDefinition} from "../Table";

const columnDefinitions: Array<ColumnDefinition<any>> = [
  {
    id: "id",
    header: "ID",
    render: row => (
      <TextCell value={row.id} verticalAlign="center" horizontalAlign="start" />
    ),
    width: 50,
    comparator: (a, b) => a.id - b.id,
    aggregateComparator: (as, bs) => as.length - bs.length,
  },
  {
    id: "name",
    header: "Name",
    render: row => (
      <TextCell
        value={row.name}
        verticalAlign="center"
        horizontalAlign="start"
      />
    ),
    width: 150,
    comparator: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: "email",
    header: "Email",
    render: row => (
      <TextCell
        value={row.email}
        verticalAlign="center"
        horizontalAlign="start"
      />
    ),
    width: 200,
    comparator: (a, b) => a.email.localeCompare(b.email),
  },
  {
    id: "date",
    header: "Date",
    render: row => (
      <TextCell
        value={row.date}
        verticalAlign="center"
        horizontalAlign="start"
      />
    ),
    width: 200,
    comparator: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    id: "city",
    header: "City",
    render: row => (
      <TextCell
        value={row.city}
        verticalAlign="center"
        horizontalAlign="start"
      />
    ),
    width: 150,
    comparator: (a, b) => a.city.localeCompare(b.city),
  },
  {
    id: "amount",
    header: "Amount",
    headerAlignment: "right",
    render: row => (
      <TextCell
        value={row.amount}
        verticalAlign="center"
        horizontalAlign="end"
      />
    ),
    width: 70,
    comparator: (a, b) => a.amount - b.amount,
  },
  {
    id: "company",
    header: "Company",
    render: row => (
      <TextCell
        value={row.company}
        verticalAlign="center"
        horizontalAlign="start"
      />
    ),
    width: 100,
  },
  {
    id: "cta",
    header: "",
    render: () => (
      <InteractableCell>
        <Button size="s" onClick={() => {}}>
          CTA
        </Button>
      </InteractableCell>
    ),
    width: 75,
  },
];

export default columnDefinitions;
