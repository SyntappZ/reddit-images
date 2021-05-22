

export interface RedditImageArray {
    after: string;
    images: ImageObject[];
}

export interface ImageObject {
    title: string;
    thumbnail: string;
    url: string;
    permalink: string;
    subreddit: string;
}

export interface ListTitleProps {
    eventKey: string;
    title: string;
    icon: JSX.Element;
}

export interface MultiListTypes extends ListTitleProps {
    list: string[]
}

