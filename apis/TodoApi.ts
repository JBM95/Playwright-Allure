import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
  async addTodo(request: APIRequestContext, user: User) {
    // Add a new todo using API
    return await request.post("/api/v1/tasks", {
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
      data: {
        isCompleted: false,
        item: "Learn Playwright",
      },
    });
  }
}
