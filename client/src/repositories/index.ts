import { TourRepo } from "./ToursRepo";
import { ReviewRepo } from "./ReviewRepo";

const repositories = {
    TourRepo: new TourRepo(),
    ReviewRepo: new ReviewRepo()
}

export default repositories
