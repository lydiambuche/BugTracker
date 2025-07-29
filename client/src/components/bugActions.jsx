// src/components/BugActions.jsx
export default function BugActions({ bugs }) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <p>{bugs.length} bugs found</p>
      <div className="space-x-2">
        <button className="btn btn-sm">Bulk Assign</button>
        <button className="btn btn-sm">Update Status</button>
      </div>
    </div>
  );
}
