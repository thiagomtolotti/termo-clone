import { renderHook } from "@testing-library/react";
import { useNotification } from "./useNotification";
import {
  ApplicationContext,
  IApplicationContext,
} from "@/context/ApplicationContext";

let hookResult: {
  current: {
    renderNotification: (message: string) => void;
    clearNotification: () => void;
  };
};
const setCurrentNotification = jest.fn();

beforeEach(() => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ApplicationContext.Provider
      value={
        {
          Notifications: { setCurrentNotification },
        } as unknown as IApplicationContext
      }
    >
      {children}
    </ApplicationContext.Provider>
  );

  const { result } = renderHook(() => useNotification(), { wrapper });

  hookResult = result;
});

afterEach(() => {
  jest.clearAllMocks();
});

it("Should render with a renderNotification function", () => {
  Date.now = jest.fn().mockReturnValue(1709259374251);

  hookResult.current.renderNotification("Teste");

  expect(setCurrentNotification).toHaveBeenCalledWith({
    message: "Teste",
    timestamp: Date.now(),
  });
});

it("Should render with a clearNotification function", () => {
  hookResult.current.clearNotification();

  expect(setCurrentNotification).toHaveBeenCalledWith(null);
});
