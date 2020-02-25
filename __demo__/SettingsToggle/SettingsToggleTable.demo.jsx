/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";

import SettingsToggle from "../../SettingsToggle";
import Table from "../../table/Table";
import StaticCell from "../../table/StaticCell";

/**
 * @title Table
 */
export default function SettingsToggleTable() {
  function SettingsToggleShim({label}: {|+label: string|}) {
    const [value, setValue] = useState(false);

    return <SettingsToggle checked={value} onChange={setValue} label={label} />;
  }

  return (
    <div style={{height: 200}}>
      <Table
        data={[
          {
            id: "0",
            setting: <SettingsToggleShim label="Enable something" />,
          },
          {
            id: "1",
            setting: <SettingsToggleShim label="Enable another setting" />,
          },
          {
            id: "2",
            setting: <SettingsToggleShim label="Enable a third item" />,
          },
        ]}
        columnDefinitions={[
          {
            id: "settings",
            header: "Settings",
            render: row => (
              <StaticCell data={row}>
                {data => (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      paddingTop: "5px",
                      marginLeft: "-12px",
                    }}
                  >
                    {data.setting}
                  </div>
                )}
              </StaticCell>
            ),
            width: 300,
            comparator: (_a, _b) => 0,
          },
        ]}
        getUniqueRowId={data => data.id}
      />
    </div>
  );
}
