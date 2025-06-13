import notificationsReducer, {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from "../notifications/notificationsSlice";

describe("notificationsSlice", () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it("should return the initial state by default", () => {
    expect(notificationsReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle showDrawer", () => {
    const prevState = { ...initialState, displayDrawer: false };
    const nextState = notificationsReducer(prevState, showDrawer());
    expect(nextState.displayDrawer).toBe(true);
  });

  it("should handle hideDrawer", () => {
    const prevState = { ...initialState, displayDrawer: true };
    const nextState = notificationsReducer(prevState, hideDrawer());
    expect(nextState.displayDrawer).toBe(false);
  });

  it("should remove a notification when markNotificationAsRead is dispatched", () => {
    const stateWithNotifications = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "Server down" },
      ],
      displayDrawer: true,
    };

    const nextState = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead(1)
    );

    expect(nextState.notifications.length).toBe(1);
    expect(nextState.notifications[0].id).toBe(2);
  });
});