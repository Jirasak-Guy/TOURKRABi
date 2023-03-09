import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from "../reservationTable";

const reservation = {
  id: 1,
  reservation_date: new Date(),
  reservation_expire_date: new Date(),
  total_price: 100,
  payment_status: false,
  tour: {
    tour_name: "Test Tour",
    current_participate: 0,
    maximun_participate: 10,
  },
};

describe("DataTable", () => {
  test("displays tour name", () => {
    render(<DataTable userReservation={reservation} />);
    expect(screen.getByText(reservation.tour.tour_name)).toBeInTheDocument();
  });

  test("displays current and maximum participants", () => {
    render(<DataTable userReservation={reservation} />);
    expect(screen.getByText(`${reservation.tour.current_participate}/${reservation.tour.maximun_participate}`)).toBeInTheDocument();
  });

  test("displays reservation date", () => {
    render(<DataTable userReservation={reservation} />);
    expect(screen.getByText(reservation.reservation_date.toLocaleDateString())).toBeInTheDocument();
  });

  test("displays total price", () => {
    render(<DataTable userReservation={reservation} />);
    expect(screen.getByText(`${reservation.total_price} บาท`)).toBeInTheDocument();
  });

  test('should match snapshot', () => {
    const { asFragment } = render(<DataTable userReservation={reservation} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays SweetAlert modal when 'ยังไม่ชำระเงิน' button is clicked", () => {
    render(<DataTable userReservation={reservation} />);
    const notPaidButton = screen.getByText("ยังไม่ชำระเงิน");
    fireEvent.click(notPaidButton);
    expect(screen.getByText(`ยอดรวมทั้งสิ้น ${reservation.total_price} บาท`)).toBeInTheDocument();
    expect(screen.getByAltText("Custom image")).toBeInTheDocument();
  });
});