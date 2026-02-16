export interface Instructor {
    login: {uuid: string};
    name:{first: string; last: string};
    picture: {medium: string};
}

export interface Course {
    title: string;
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    instructor?: string;
    instructorImage?: string;
    isBookMarked?: boolean;
}