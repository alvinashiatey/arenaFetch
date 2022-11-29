export interface Arena {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    added_to_at: string;
    published: boolean;
    open: boolean;
    collaboration: boolean;
    collaborator_count: number;
    slug: string;
    length: number;
    kind: string;
    status: string;
    user_id: number;
    manifest: Manifest;
    contents?: (ContentsEntity)[] | null;
    base_class: string;
    page: number;
    per: number;
    collaborators?: (null)[] | null;
    follower_count: number;
    share_link?: null;
    metadata: Metadata;
    class_name: string;
    can_index: boolean;
    nsfw?: boolean;
    owner: UserOrOwner;
    user: UserOrOwner;
}
export interface Manifest {
    key: string;
    AWSAccessKeyId: string;
    bucket: string;
    success_action_status: string;
    policy: string;
    acl: string;
    signature: string;
    expires: string;
}
export interface ContentsEntity {
    id: number;
    title: string;
    updated_at: string;
    created_at: string;
    state: string;
    comment_count: number;
    generated_title: string;
    content_html: string;
    description_html: string;
    visibility: string;
    content: string;
    description: string;
    source?: Source | null;
    image: Image;
    embed?: null;
    attachment?: null;
    metadata?: null;
    base_class: string;
    class: string;
    user: UserOrOwner;
    position: number;
    selected: boolean;
    connection_id: number;
    connected_at: string;
    connected_by_user_id: number;
    connected_by_username: string;
    connected_by_user_slug: string;
}
export interface Source {
    url: string;
    title: string;
    provider: Provider;
}
export interface Provider {
    name: string;
    url: string;
}
export interface Image {
    filename: string;
    content_type: string;
    updated_at: string;
    thumb: ThumbOrSquareOrDisplayOrLarge;
    square: ThumbOrSquareOrDisplayOrLarge;
    display: ThumbOrSquareOrDisplayOrLarge;
    large: ThumbOrSquareOrDisplayOrLarge;
    original: Original;
}
export interface ThumbOrSquareOrDisplayOrLarge {
    url: string;
}
export interface Original {
    url: string;
    file_size: number;
    file_size_display: string;
}
export interface UserOrOwner {
    id: number;
    created_at: string;
    slug: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string;
    avatar_image: AvatarImage;
    channel_count: number;
    following_count: number;
    profile_id: number;
    follower_count: number;
    initials: string;
    can_index: boolean;
    metadata: Metadata1;
    is_premium: boolean;
    is_lifetime_premium: boolean;
    is_supporter: boolean;
    is_exceeding_connections_limit: boolean;
    is_confirmed: boolean;
    is_pending_reconfirmation: boolean;
    is_pending_confirmation: boolean;
    badge: string;
    base_class: string;
    class: string;
}
export interface AvatarImage {
    thumb: string;
    display: string;
}
export interface Metadata1 {
    description?: null;
}
export interface Metadata {
    description: string;
}

export interface BlockEntity {
        name: string;
        container: HTMLDivElement;
        template: DocumentFragment | null;
}