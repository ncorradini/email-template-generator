export const styles = {
  table: {
    borderCollapse: "collapse" as const,
    width: "100%",
    tableLayout: "auto" as const,
    border: "1px solid #000",
  },
  cell: {
    width: "50px",
    textAlign: "left" as const,
    verticalAlign: "middle",
    padding: "0",
  },
  editable: {
    cursor: "text",
    width: "100%",
    height: "100%",
    display: "block",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
};
