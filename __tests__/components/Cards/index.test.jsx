import { render, fireEvent, screen } from '@utils/testHelper';
import Cards from '@components/Cards';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

const mockProps = {
  is_close: false,
  max_participants: 2
}

const mockId = 1

let wrapper;

beforeEach(() => {
  wrapper = render(<Cards course={mockProps} id={mockId} />)
})

describe('Cards', () => {
  test('Should render correctly', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('Cards')).toBeInTheDocument();
  })
  test('Should call navigate when button clicked', () => {
    const { getByTestId } = wrapper;
    const button = getByTestId('navigate-detail');
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith(`/courses/${mockId}`)
  })
  test('should render text correctly', () => {
    expect(screen.getByText(`Max Participants ${mockProps?.max_participants}`)).toBeInTheDocument()
  })
  test('Should match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})