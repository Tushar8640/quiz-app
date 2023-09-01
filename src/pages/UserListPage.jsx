import { useEffect } from "react";
import {
  useListOfUsersQuery,
  useMakeAdminMutation,
} from "../app/features/auth/authApi";

export default function UserListPage() {
  const { data, isLoading, refetch } = useListOfUsersQuery();
  const [makeAdmin, { data: adminData, error }] = useMakeAdminMutation();
  const users = data?.users;
  const handleMakeAdmin = (userId) => {
    // Dispatch the action to make a user an admin
    console.log(userId);
    makeAdmin({ id: userId });
    refetch();
  };
  useEffect(() => {
    if (!error) {
      refetch();
    }
  }, [error, refetch]);
  if (isLoading) {
    return <p>...loading</p>;
  }
  console.log(adminData);
  return (
    <div className="container mx-auto">
      UserListPage
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  {user.role === "user" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
