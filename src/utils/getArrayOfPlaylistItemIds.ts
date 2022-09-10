import {IYoutubeSearchData, TitleAndImg} from "./interfaces"

function getArrayOfPlaylistItemIds(jsonBody: IYoutubeSearchData): TitleAndImg[] {
    const titleAndImgArr: TitleAndImg[] = [];
    for (const item of jsonBody.items) {
        const currentTitleAndImg: TitleAndImg = {title: item.snippet.title, img: item.snippet.thumbnails.default.url};
        titleAndImgArr.push(currentTitleAndImg);
    }
    return titleAndImgArr;
}

export default getArrayOfPlaylistItemIds;