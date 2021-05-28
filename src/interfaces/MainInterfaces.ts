export interface ImageObject {
    author: string;
    title: string;
    thumbnail: string;
    url: string;
    permalink: string;
    subreddit: string;
    subredditId: string;
    id: string
}

export interface UserImageObject {
    author: string;
    title?: string;
    url?: string;
    permalink: string;
    subreddit: string;
    subredditId: string;
    id: string
}

export interface RedditImageArray {
    after: string;
    images: ImageObject[];
    subredditId: string;
    subreddit: string;
    errorMessage: string
}

export interface UserImageArray {
    after: string;
    images: UserImageObject[];
    subredditId: string;
    subreddit: string;
    errorMessage: string
}



export interface ListTitleProps {
    eventKey: string;
    title: string;
    icon: JSX.Element;
}

export interface Category extends ListTitleProps {
    list: string[];

}
export interface MultiListProps extends Category {
    sendName: Function;
}

export interface ImageGridProps {
    images: ImageObject[] | UserImageObject[];
}

export type StorageItem = string[] | ImageObject[]


