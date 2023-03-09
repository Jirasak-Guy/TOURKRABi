import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import AppBar from "../myAppBar";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
    cleanup();
});

describe('Appbar on desktop', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: 1024 });
    });

    test('renders without crashing', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
    });

    test('renders logo', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const logo = screen.getByRole('button', { name: 'logo' });
        const logoIcon = screen.getByAltText('(AppIcon)');
        expect(logo).toBeInTheDocument();
        expect(logoIcon).toBeInTheDocument();

        fireEvent.click(logo)
        const path = (window.location.pathname)
        expect(path).toBe('/');
    });

    test('renders Home button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const homeButton = screen.getByRole('button', { name: 'Home Button' });
        expect(homeButton).toBeInTheDocument();
        // async () => {
        fireEvent.click(homeButton)
        const path = (window.location.pathname)
        expect(path).toBe('/');
        // }
    });

    test('renders One Day Trip button',  () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const OneDayTripButton = screen.getByRole('button', { name: 'One Day Trip Button' });
        expect(OneDayTripButton).toBeInTheDocument();        
        
        async () => {
            fireEvent.click(OneDayTripButton);
            await expect(window.location.pathname).toBe('/onedaytrip');
        }
    });

    test('renders Package button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const PackageButton = screen.getByRole('button', { name: 'Package Button' });
        expect(PackageButton).toBeInTheDocument();
        async () => {
            fireEvent.click(PackageButton)
            await expect(window.location.pathname).toBe('/packagetrip');
        }
    });

    test('renders Booking button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const BookingButton = screen.getByRole('button', { name: 'Booking Button' });
        expect(BookingButton).toBeInTheDocument();
        async () => {
            fireEvent.click(BookingButton)
            await expect(window.location.pathname).toBe('/packagetrip');
        }
    });
});

describe('Appbar on mobile', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: 320 });
    });

    test('renders without crashing', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
    });

    test('renders menu button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const menuButton = screen.getByLabelText('menu');
        expect(menuButton).toBeInTheDocument();
        
        fireEvent.click(menuButton)

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('One Day Trip')).toBeInTheDocument();
        expect(screen.getByText('Package')).toBeInTheDocument();
        expect(screen.getByText('Booking')).toBeInTheDocument();
    })

    test('renders logo', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );
        const logo = screen.getByRole('button', { name: 'logo' });
        expect(logo).toBeInTheDocument();
        async () => {
            fireEvent.click(logo)
            await expect(window.location.pathname).toBe('/');
        }
    });

    test('renders Home button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );

        const menuButton = screen.getByLabelText('menu');
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);

        const homeButton = screen.getByText('Home');
        expect(homeButton).toBeInTheDocument();
        async () => {
            fireEvent.click(homeButton)
            await expect(window.location.pathname).toBe('/');
        }
    });

    test('renders One Day Trip button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );

        const menuButton = screen.getByLabelText('menu');
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);

        const OneDayTripButton = screen.getByText('One Day Trip');
        expect(OneDayTripButton).toBeInTheDocument();
        async () => {
            fireEvent.click(OneDayTripButton)
            await expect(window.location.pathname).toBe('/onedaytrip');
        }
    });

    test('renders Package button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );

        const menuButton = screen.getByLabelText('menu');
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);

        const PackageButton = screen.getByText('Package');
        expect(PackageButton).toBeInTheDocument();
        async () => {
            fireEvent.click(PackageButton)
            await expect(window.location.pathname).toBe('/packagetrip');
        }
    });

    test('renders Booking button', () => {
        render(
            <MemoryRouter>
                <AppBar />
            </MemoryRouter>
        );

        const menuButton = screen.getByLabelText('menu');
        expect(menuButton).toBeInTheDocument();

        fireEvent.click(menuButton);

        const BookingButton = screen.getByText('Booking');
        expect(BookingButton).toBeInTheDocument();

        async () => {
            fireEvent.click(BookingButton)
            await expect(window.location.pathname).toBe('/profile');
        }
    });
})