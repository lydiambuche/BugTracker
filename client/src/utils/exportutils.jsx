// src/utils/exportUtils.js
export const exportToCSV = (bugs) => {
  const headers = Object.keys(bugs[0]).join(",");
  const rows = bugs.map((bug) =>
    Object.values(bug).join(",")
  );
  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "bug_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
