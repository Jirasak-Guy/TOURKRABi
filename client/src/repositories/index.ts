import { TourRepo } from "./ToursRepo";
import { ReviewRepo } from "./ReviewRepo";
import { UserRepo } from "./UserRepo";
import { reservationRepo } from "./Reservation";

const repositories = {
    TourRepo: new TourRepo(),
    ReviewRepo: new ReviewRepo(),
    UserRepo: new UserRepo(),
    ReserveRepo: new reservationRepo()
}

export default repositories
