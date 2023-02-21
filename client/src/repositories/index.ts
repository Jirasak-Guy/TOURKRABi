import { OneDayTripRepo } from "./OneDayTripRepo";
import { PackageTripRepo } from "./PackageTripRepo";

const repositories = {
    ODTRepo: new OneDayTripRepo(),
    PKTRepo: new PackageTripRepo()
}

export default repositories
