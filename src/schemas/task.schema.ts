import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").optional(),
    done: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.done !== undefined, {
    message: "At least one of title or done is required",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;