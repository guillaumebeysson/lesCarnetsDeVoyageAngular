import { User } from "./user";

export interface Carnet {
    id?: number;
    author?: User;
    title?: string;
    introduction?: string;
    description?: string;
    picture1?: string;
    picture2?: string;
    picture3?: string;
    country?: string;
    city?: string;
    durationTrip?: number;
    departurePeriod?: string;
    organisation?: string;
    situation?: string;
    transport?: string;
    date?: Date;
}
