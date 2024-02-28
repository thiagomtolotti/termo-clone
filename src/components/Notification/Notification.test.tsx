import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Notification } from "./Notification";
import {
  ApplicationContext,
  IApplicationContext,
} from "../../context/ApplicationContext";
import React from "react";

jest.mock("../../context/ApplicationContext", () => ({
  __esModule: true,
  ApplicationContext: jest
    .requireActual("react")
    .createContext({} as IApplicationContext),
}));

let renderResult: HTMLElement;

const currentNotificationMock = {
  message: "Teste",
  timestamp: Date.now(),
};

beforeEach(() => {
  const { container } = render(
    <ApplicationContext.Provider
      value={
        {
          Notifications: {
            currentNotification: currentNotificationMock,
          },
        } as IApplicationContext
      }
    >
      <Notification />
    </ApplicationContext.Provider>
  );

  renderResult = container;
});

afterEach(() => {
  jest.clearAllMocks();
});

it("Should render correctly", () => {
  expect(renderResult).toMatchSnapshot();
});

it("Should render with the notification provided by the context", () => {
  const notificationEl = screen.getByRole("notification");

  expect(notificationEl.innerHTML).toBe(currentNotificationMock.message);
});
