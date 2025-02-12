import { render, screen, waitFor, act } from '@testing-library/react';
import Notification from '../../../components/common/notification/notification';
jest.useFakeTimers();

describe('Notification', () => {
  test('shows notification when notificationCount is updated', () => {
    render(
      <Notification
        text="Products purchased successfully!"
        notificationCount={1}
      />
    );

    // Checks that the notification is rendered
    expect(
      screen.getByText('Products purchased successfully!')
    ).toBeInTheDocument();

    // Checks --visible class is added
    const notification = screen.getByText('Products purchased successfully!');
    expect(notification).toHaveClass('--visible');
  });

  test('hides notification after 3 seconds', async () => {
    render(
      <Notification
        text="Products purchased successfully!"
        notificationCount={1}
      />
    );

    // Checks that notification is visible
    const notification = screen.getByText('Products purchased successfully!');
    expect(notification).toHaveClass('--visible');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Checks that notification disappears
    await waitFor(() => {
      expect(notification).not.toHaveClass('--visible');
    });
  });

  test('does not show notification if notificationCount is 0', () => {
    render(
      <Notification
        text="Products purchased successfully!"
        notificationCount={0}
      />
    );

    // Checks that notification is not rendered
    const notification = screen.queryByText('Products purchased successfully!');
    expect(notification).toBeInTheDocument();
  });
});
