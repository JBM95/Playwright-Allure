import { Page } from "@playwright/test";

export default class TodoPage {
  addButton: string;
  newTodoInput: string;
  submitNewTaskButton: string;
  todoItem: string;
  deleteButton: string;
  
  constructor() {
    this.addButton = "[data-testid=add]";
    this.newTodoInput = "[data-testid=new-todo]";
    this.submitNewTaskButton = "[data-testid=submit-newTask]";
    this.todoItem = "[data-testid=todo-item]";
    this.deleteButton = "[data-testid=delete]";
  }

  async load(page: Page) {
    await page.goto("/todo");
  }

  async addNewTodo(page: Page, todoText: string) {
    await page.click(this.addButton);
    await page.fill(this.newTodoInput, todoText);
    await page.click(this.submitNewTaskButton);
  }

  async deleteTodoItem(page: Page) {
    await page.click(this.deleteButton);
  }

  getTodoItem(page: Page) {
    return page.locator(this.todoItem);
  }
}
