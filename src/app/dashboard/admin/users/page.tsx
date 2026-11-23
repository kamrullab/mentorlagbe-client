"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  plan: string;
  createdAt: string;
  isSuperAdmin?: boolean;
};

export default function Page() {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => api<User[]>("/users/admin/all"),
  });

  async function changeRole(id: string, role: User["role"]) {
    try {
      await api(`/users/admin/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return <>
    <span className="eyebrow">Administration</span>
    <h1 className="section-title">User management</h1>
    <table className="data-table">
      <thead><tr><th>User</th><th>Plan</th><th>Role</th></tr></thead>
      <tbody>{data.map((user) => <tr key={user._id}>
        <td>
          {user.name}
          {user.isSuperAdmin && <span className="super-admin-badge"><ShieldCheck size={13}/>Super Admin</span>}
          <br/><small>{user.email}</small>
        </td>
        <td>{user.plan}</td>
        <td>{user.isSuperAdmin
          ? <span className="super-admin-lock"><ShieldCheck size={15}/>Protected</span>
          : <select aria-label={`Role for ${user.name}`} value={user.role} onChange={(event) => changeRole(user._id, event.target.value as User["role"])}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>}
        </td>
      </tr>)}</tbody>
    </table>
  </>;
}

