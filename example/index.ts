import { readFileSync } from "fs";
import { EmojiCategory } from "ts-unicode-emojis";

const json = readFileSync('./emoji_categories.json').toString()

console.log('json size', json.length)

const emojiCategires: EmojiCategory[] = JSON.parse(json)

console.log('emoji categiry count', emojiCategires.length)

for(const category of emojiCategires) {
    console.log('emoji category', 'name', category.name, 'sub categories', category.subCategories.length)
    for(const subCategory of category.subCategories){
        console.log('sub categiry', 'name', subCategory.name, 'emoji count', subCategory.emojis.length)
    }
}

export type { EmojiCategory }
