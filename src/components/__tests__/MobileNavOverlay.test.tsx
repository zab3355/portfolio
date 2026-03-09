import { render, screen, fireEvent } from '../../shared/test-utils';
import MobileNavOverlay from '../MobileNavOverlay';
import { NAV_ITEMS } from '../../shared/config/navItems';

const mockProps = {
  open: true,
  onClose: jest.fn(),
  onThemeChange: jest.fn(),
  isDarkMode: true,
  selectedRoute: '/',
};

describe('MobileNavOverlay', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  it('renders nav links when open', () => {
    render(<MobileNavOverlay {...mockProps} />);
    NAV_ITEMS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('does not render when closed', () => {
    render(<MobileNavOverlay {...mockProps} open={false} />);
    expect(screen.queryByText(NAV_ITEMS[0].label)).not.toBeInTheDocument();
  });

  it('calls onClose when a nav link is clicked', () => {
    render(<MobileNavOverlay {...mockProps} />);
    fireEvent.click(screen.getByText(NAV_ITEMS[1].label));
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
