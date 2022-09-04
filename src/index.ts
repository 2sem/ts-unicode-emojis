import { Emoji, EmojiCategory, EmojiLoadingOptions, EmojiPlatforms, EmojiSubCategory } from "./types"

export const loadEmojiCategories = (json: string, options: EmojiLoadingOptions = DefaultLoadingOptions): EmojiCategory[]  => {
    let raws: EmojiRaw[] = JSON.parse(json)
    raws = raws.sort((leftRaw, rightRaw) => leftRaw.sort_order - rightRaw.sort_order)

    const categorySet: {[key: string] : EmojiCategory} = {}
    const subCategorySet: {[key: string] : EmojiSubCategory} = {}
    const platforms = options?.platforms
    const containingUnicodes = options?.unicodes ?? false
    const containingChar = options?.char ?? (containingUnicodes ? false : true)
    const containingSubCategories = options?.subCategories ?? true

    const categories = raws.reduce((list, raw) => {
        let category = categorySet[raw.category]
        
        if (!category) {
            category = { 
                name: raw.category, 
                subCategories: containingSubCategories ? [] : undefined, 
                emojis: containingSubCategories ? undefined : [] 
            }
            categorySet[raw.category] = category
            list.push(category)
        }

        const subCategoryKey = `${raw.category}_${raw.subcategory}`
        let subCategory = subCategorySet[subCategoryKey]
        if (containingSubCategories && !subCategory) {
            subCategory = { name: raw.subcategory, emojis: [] }
            subCategorySet[subCategoryKey] = subCategory
            category.subCategories?.push(subCategory)
        }

        const isSupportApple = platforms?.apple !== undefined ? raw.has_img_apple === platforms?.apple : true
        const isSupportGoogle = platforms?.google !== undefined ? raw.has_img_google === platforms?.google : true
        const isSupportFacebook = platforms?.facebook !== undefined ? raw.has_img_facebook === platforms?.facebook : true
        const isSupportTwitter = platforms?.twitter !== undefined ? raw.has_img_twitter === platforms?.twitter : true

        const isSupported = isSupportApple && isSupportGoogle &&  isSupportFacebook && isSupportTwitter

        if (!isSupported) return list

        const unicodes = raw.unified.split('-').map(code => parseInt(code, 16)) 

        const emoji: Emoji = {
            id: raw.sort_order,
            name: raw.name,
            shortNames: raw.short_names,
            unicodes: containingUnicodes ? unicodes : undefined,
            char: containingChar ? String.fromCodePoint(...unicodes) : undefined,
            ...(!platforms &&
                 { apple: raw.has_img_apple,
                    google: raw.has_img_google,
                    facebook: raw.has_img_facebook,
                    twitter: raw.has_img_twitter
            })
        }

        if (containingSubCategories) {
            subCategory.emojis.push(emoji)
        } else {
            category.emojis?.push(emoji)
        }

        return list
    }, [] as EmojiCategory[])

    return categories.reduce((list, category) => {
        const filteredSubCategories = category.subCategories?.filter(subCategory => subCategory.emojis.length > 0) ?? []
        if (containingSubCategories) {
            if (filteredSubCategories.length <= 0)             
                return list
        } else if ((category.emojis?.length ?? 0) <= 0){
            return list
        } 

        list.push({
            ...category,
            subCategories: containingSubCategories ? filteredSubCategories : undefined
        })

        return list
    }, [] as EmojiCategory[])
}

const DefaultLoadingOptions: EmojiLoadingOptions = {
    unicodes: true,
    char: true,
    subCategories: true
}

type EmojiRaw = {
    sort_order: number
    name: string,
    unified: string,
    short_names: string[]
    category: string
    subcategory: string
    has_img_apple: boolean
    has_img_google: boolean
    has_img_twitter: boolean
    has_img_facebook: boolean
}

export type { EmojiCategory, EmojiSubCategory, Emoji, EmojiPlatforms }