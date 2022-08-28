import { Emoji, EmojiCategory, EmojiPlatforms, EmojiSubCategory } from "./types"

export const loadEmojiCategories = (json: string, suppportedPlatforms?: EmojiPlatforms): EmojiCategory[]  => {
    const raws: EmojiRaw[] = JSON.parse(json)
    const categorySet: {[key: string] : EmojiCategory} = {}
    const subCategorySet: {[key: string] : EmojiSubCategory} = {}

    return raws.reduce((categories, raw) => {
        let category = categorySet[raw.category]
        if (!category) {
            category = { name: raw.category, subCategories: [] }
            categorySet[raw.category] = category
            categories.push(category)
        }

        const subCategoryKey = `${raw.category}_${raw.subcategory}`
        let subCategory = subCategorySet[subCategoryKey]
        if (!subCategory) {
            subCategory = { name: raw.subcategory, emojis: [] }
            subCategorySet[subCategoryKey] = subCategory
            category.subCategories.push(subCategory)
        }

        subCategory.emojis.push({
            id: raw.sort_order,
            name: raw.name,
            shortNames: raw.short_names,
            unicodes: raw.unified.split('-').map(code => Number(code)),
            apple: suppportedPlatforms?.apple ? raw.has_img_apple === suppportedPlatforms?.apple : undefined,
            google: suppportedPlatforms?.google ? raw.has_img_google === suppportedPlatforms?.google : undefined,
            facebook: suppportedPlatforms?.facebook ? raw.has_img_facebook === suppportedPlatforms?.facebook : undefined,
            twitter: suppportedPlatforms?.twitter ? raw.has_img_twitter === suppportedPlatforms?.twitter : undefined
        })

        return categories
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