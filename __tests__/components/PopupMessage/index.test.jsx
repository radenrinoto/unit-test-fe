import { render, fireEvent, screen } from '@utils/testHelper';
import PopupMessage from '@components/PopupMessage/Dialog';

let isOpen = true;
let wrapper;

const mockProps = {
  open: isOpen,
  title: 'app_greeting',
  message: 'app_popup_error_message',
  onClose: () => {
    isOpen = false
  },
};

beforeEach(() => {
  wrapper = render(<PopupMessage open={mockProps.open} title={mockProps.title} message={mockProps.message} onClose={mockProps.onClose} />)
})

describe('Popup message', () => {
  test('Should render correctly', () => {
    const { getByTestId } = wrapper
    const button = getByTestId('button')

    fireEvent.click(button)
    expect(isOpen).toBe(false)
    expect(getByTestId('popup-message')).toBeInTheDocument()
  })
  test('Should render text correctly', () => {
    expect(screen.getByText('Hai dari Web!')).toBeInTheDocument()
  })
  test('should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})