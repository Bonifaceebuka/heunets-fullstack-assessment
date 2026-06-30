export interface ITask {
_id: string;
title: string;
description: string;
assigned_to: string| undefined;
start_date: string | undefined;
end_date: string| undefined;
priority: "low" | "medium" | "high";
status: "todo" | "in_progress" | "completed";
created_at: string;
updated_at: string;
}