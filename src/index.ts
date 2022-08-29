import { Emoji, EmojiCategory, EmojiPlatforms, EmojiSubCategory } from "./types"

export const loadEmojiCategories = (json: string, suppportedPlatforms?: EmojiPlatforms): EmojiCategory[]  => {
    const raws: EmojiRaw[] = JSON.parse(json)
    const categorySet: {[key: string] : EmojiCategory} = {}
    const subCategorySet: {[key: string] : EmojiSubCategory} = {}
    const platforms = suppportedPlatforms

    const categories = raws.reduce((list, raw) => {
        let category = categorySet[raw.category]
        
        if (!category) {
            category = { name: raw.category, subCategories: [] }
            categorySet[raw.category] = category
            list.push(category)
        }

        const subCategoryKey = `${raw.category}_${raw.subcategory}`
        let subCategory = subCategorySet[subCategoryKey]
        if (!subCategory) {
            subCategory = { name: raw.subcategory, emojis: [] }
            subCategorySet[subCategoryKey] = subCategory
            category.subCategories.push(subCategory)
        }

        const isSupportApple = platforms?.apple !== undefined ? raw.has_img_apple === platforms?.apple : true
        const isSupportGoogle = platforms?.google !== undefined ? raw.has_img_google === platforms?.google : true
        const isSupportFacebook = platforms?.facebook !== undefined ? raw.has_img_facebook === platforms?.facebook : true
        const isSupportTwitter = platforms?.twitter !== undefined ? raw.has_img_twitter === platforms?.twitter : true

        const isSupported = isSupportApple && isSupportGoogle &&  isSupportFacebook && isSupportTwitter

        if (!isSupported) return list

        subCategory.emojis.push({
            id: raw.sort_order,
            name: raw.name,
            shortNames: raw.short_names,
            unicodes: raw.unified.split('-').map(code => parseInt(code, 16)),
            ...(platforms &&
                 { apple: raw.has_img_apple,
                    google: raw.has_img_google,
                    facebook: raw.has_img_facebook,
                    twitter: raw.has_img_twitter
            })
        })

        return list
    }, [] as EmojiCategory[])

    return categories.reduce((list, category) => {
        const filteredSubCategories = category.subCategories.filter(subCategory => subCategory.emojis.length > 0)
        if (filteredSubCategories.length <= 0) 
            return list

        list.push({
            ...category,
            subCategories: filteredSubCategories     
        })

        return list
    }, [] as EmojiCategory[])
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

export type { EmojiCategory, EmojiSubCategory, Emoji }