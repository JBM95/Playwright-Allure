import { test, expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import TodoApi from "../apis/TodoApi";
import TodoPage from "../pages/TodoPage";
import { setAuthCookies } from "../helpers/cookiesHelper";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const newUser = new User();
  const userApi = new UserApi();
  const todoPage = new TodoPage();

  // Register the new user via API
  const response = await userApi.signup(request, newUser);
  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const userID = responseBody.userID;

  // Set up the authentication context
  await setAuthCookies(context, accessToken, newUser.getFirstName(), userID);

  // Load the Todo page
  await todoPage.load(page);

  // Add a new todo
  await todoPage.addNewTodo(page, "Learn Playwright!");
  const todoItem = todoPage.getTodoItem(page);
  await expect(todoItem).toHaveText("Learn Playwright!");
});

test("should be able to delete a todo", async ({ page, request, context }) => {
  const newUser = new User();
  const userApi = new UserApi();
  const todoApi = new TodoApi();
  const todoPage = new TodoPage();

  // Register the new user via API
  const response = await userApi.signup(request, newUser);
  const responseBody = await response.json();
  const accessToken = responseBody.access_token;
  const userID = responseBody.userID;

  newUser.setAccessToken(accessToken);
  newUser.setUserID(userID);

  // Set up the authentication context
  await setAuthCookies(context, accessToken, newUser.getFirstName(), userID);

  // Add new Todo via API
  await todoApi.addTodo(request, newUser);

  // Load the Todo page
  await todoPage.load(page);
  const todoItem = todoPage.getTodoItem(page);
  await expect(todoItem).toHaveText("Learn Playwright");

  // Delete the todo item
  await todoPage.deleteTodoItem(page);
  await expect(todoItem).not.toBeVisible();
});
