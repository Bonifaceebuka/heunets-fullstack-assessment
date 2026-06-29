import React, { useState } from "react";

export default function CreateProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    dueDate: "",
    budget: "",
    visibility: "Private",
    members: "",
    tags: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create New Project
          </h1>
          <p className="mt-2 text-slate-600">
            Create a new workspace for your team.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Project Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="CRM Dashboard"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Web Application"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Budget */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Budget ($)
              </label>

              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="10000"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option>Planning</option>
                <option>Active</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Priority */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            {/* Start Date */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Due Date */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Members */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Team Members
              </label>

              <input
                type="text"
                name="members"
                value={form.members}
                onChange={handleChange}
                placeholder="John, Sarah, David"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Tags */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="React, Backend, API"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            {/* Visibility */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Visibility
              </label>

              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              >
                <option>Private</option>
                <option>Team</option>
                <option>Public</option>
              </select>
            </div>

            {/* Cover */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Cover Image
              </label>

              <input
                type="file"
                className="block w-full rounded-lg border border-slate-300 p-2"
              />
            </div>

          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}