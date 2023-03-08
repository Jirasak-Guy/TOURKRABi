import { TourRepo } from "./ToursRepo";
import { ReviewRepo } from "./ReviewRepo";
import { UserRepo } from "./UserRepo";

const repositories = {
    TourRepo: new TourRepo(),
    ReviewRepo: new ReviewRepo(),
    UserRepo: new UserRepo()
}

export default repositories
