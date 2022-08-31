export type Emoji = {
    id: number
    name: string,
    unicodes?: number[],
    char?: string
    shortNames: string[]
    
} & EmojiPlatforms

export type EmojiLoadingOptions = {
    platforms?: EmojiPlatforms
    unicodes?: boolean
    char?: boolean
}

export type EmojiPlatforms = {
    apple?: boolean
    google?: boolean
    twitter?: boolean
    facebook?: boolean
}

export type EmojiCategory = {
    name: string
    subCategories: EmojiSubCategory[]
}

export type EmojiSubCategory = {
    name: string
    emojis: Emoji[]
}
