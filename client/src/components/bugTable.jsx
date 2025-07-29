export default function BugTable({ bugs }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug, index) => (
            <tr key={index}>
              <td>{bug.id}</td>
              <td>{bug.title}</td>
              <td>{bug.priority}</td>
              <td>{bug.status}</td>
              <td>{bug.assignedTo}</td>
              <td>{bug.createdAt}</td>
              <td>{bug.updatedAt}</td>
              <td className="space-x-1">
                <button className="btn btn-xs btn-info">View</button>
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
