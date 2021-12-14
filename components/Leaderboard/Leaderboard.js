import React from "react";
import DataTable from "react-data-table-component";
import Button from "../atoms/Button";
import { useRouter } from "next/router";

// A super simple expandable component.{JSON.stringify(data, null, 2)}
const ExpandedComponent = ({ data }) => {
  const router = useRouter();
  return (
    <div className="p-6 top-border row-child">
      <div className="flex gap-x-12 mb-2">
        <div className="basis-1/3">
          <dl>
            <dt className="font-semibold">Pitch us your project in a tweet</dt>
            <dd className="mb-5">{data.productPitch || "N.A."}</dd>
          </dl>
        </div>
        <div className="basis-2/3">
          <dl>
            <dt className="font-semibold">Background of each founder</dt>
            <dd className="mb-5">{data.evidenceOfExceptionalAbility || "N.A"}</dd>
          </dl>
        </div>
      </div>
      <div className="flex gap-x-12 mb-2">
        <div className="basis-1/3">{/*  links go here */}</div>
        <div className="basis-2/3">
          <Button
            color="primary-outline"
            onClick={() => router.push({ pathname: "/dao-race/[id]", query: { id: data._id } })}
          >
            View Full Application
          </Button>
        </div>
      </div>
    </div>
  );
};

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  table: {
    style: {
      color: "white",
      marginTop: "3.5rem",
      marginBottom: "0.95rem",
    },
  },
  headRow: {
    style: {
      minHeight: "72px",
      background: "#00000005",
      border: "0 !important",
      borderRadius: "0.5rem",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#6b7280",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  rows: {
    style: {
      minHeight: "72px",
      background: "#FFFFFF",
      border: "0 !important",
      boxShadow: "rgb(149 157 165 / 20%) 0px 8px 24px",
      position: "relative",
      width: "calc(100% - 25px)",
      margin: "0.45rem 0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: "#000000",
      fontSize: "1rem",
    },
  },
};

const columns = [
  {
    name: "Rank",
    selector: (row) => row.rank,
  },
  {
    name: "Votes",
    selector: (row) => (
      <label
        className="vote-badge"
        style={{
          background: "rgb(228, 241, 252)",
          background:
            "linear-gradient(90deg,rgba(228, 241, 252, 100%) 0%,rgba(218, 223, 252, 100%) 35%,rgba(236, 229, 249, 100%) 100%)",
        }}
      >
        {row.voteCount}
      </label>
    ),
  },
  {
    name: "Name",
    selector: (row) => row.projectName ?? placeholderDiv,
  },
  {
    name: "Submitted by",
    selector: (row) => row.discordId ?? placeholderDiv,
  },
  // {
  //   name: "Date submitted",
  //   selector: (row) => row.submittedAt,
  // },
];

const placeholderDiv = (
  <div
    className="h-3 w-3/5 animate-pulse"
    style={{
      background: "linear-gradient(90deg, #E5E5E5 0%, rgba(255,255,255,1) 100%)",
    }}
  ></div>
);

const Leaderboard = ({ data, numRows }) => {
  let rows = JSON.parse(JSON.stringify(data));
  if (numRows) {
    rows = rows.slice(0, numRows);
  }
  console.log(rows);
  return (
    <div className="leaderboard-list">
      <div className="dtable">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={rows}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
