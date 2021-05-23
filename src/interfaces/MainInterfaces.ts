

export interface RedditImageArray {
    after: string;
    images: ImageObject[];
    errorMessage: string
}

export interface ImageObject {
    title: string;
    thumbnail: string;
    url: string;
    permalink: string;
    subreddit: string;
    id: string
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



