"use client";
import { useState } from "react";
import type { User } from "@/types/user.type";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid, Table } from "lucide-react";

interface ViewToggleProps {
  users: User[];
  search: string;
  pageNumber: number;
  pageSize: number;
  total: number;
}

export default function ViewToggle({
  users,
  search,
  pageNumber,
  pageSize,
  total,
}: ViewToggleProps) {
  const [view, setView] = useState<"grid" | "table">("grid");

  return (
    <div className="bg-surface p-4 rounded-md flex flex-col shadow-md">
      {/* Header + Toggle Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-on-surface font-bold text-2xl">Users</div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 border rounded-md ${view === "grid" ? "bg-primary text-on-primary" : "text-on-surface"}`}
            onClick={() => setView("grid")}
          >
            <Grid/>
          </button>
          <button
            className={`px-4 py-2 border rounded-md ${view === "table" ? "bg-primary text-on-primary" : "text-on-surface"}`}
            onClick={() => setView("table")}
          >
            <Table/>
          </button>
        </div>
      </div>

      {/* Grid or Table */}
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-md border bg-surface shadow-sm"
            >
              <h4 className="font-semibold text-on-surface">{user.name}</h4>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <p className="text-xs text-gray-400">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto border border-outline rounded-md shadow-md bg-surface">
          <table className="min-w-full divide-y divide-outline">
            <thead className="bg-container">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-outline">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-hover transition">
                  <td className="px-4 py-2 text-on-surface">{user.name}</td>
                  <td className="px-4 py-2 text-on-surface truncate">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-on-surface">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Link
          href={`/users?search=${search}&page=${Math.max(pageNumber - 1, 1)}`}
          className={`px-4 py-2 flex items-center text-sm font-medium border rounded-md ${pageNumber === 1 ? "opacity-50 pointer-events-none" : ""}`}
        >
          <ChevronLeft /> <span>Previous</span>
        </Link>
        <span className="text-sm text-on-surface">
          Page {pageNumber} of {Math.ceil(total / pageSize)}
        </span>
        <Link
          href={`/users?search=${search}&page=${pageNumber + 1}`}
          className={`px-4 py-2 flex items-center text-sm font-medium border rounded-md ${pageNumber * pageSize >= total ? "opacity-50 pointer-events-none" : ""}`}
        >
          <span>Next</span> <ChevronRight />
        </Link>
      </div>
    </div>
  );
}
