export const parse = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html');

    const torrentList = Array.from(doc.querySelectorAll('a[href^="/torrent"]'))
    const seedersList = Array.from(doc.querySelectorAll('.coll-2.seeds'))
    const leechersList = Array.from(doc.querySelectorAll('.coll-3.leeches'))
    const sizeList = Array.from(doc.querySelectorAll('.coll-4.size'))
    const timeList = Array.from(doc.querySelectorAll('.coll-date')).slice(1)

    const lastPage = Array.from(doc.querySelectorAll('.pagination'))[0]?.children[0]?.children[2]?.children[0]?.href?.toString().split('/')[5] ?? 1

    const tors = torrentList?.map((torrent, index) => {
        const url = new URL(torrent?.href)
        const path = "https://1337x.to" + url.pathname
        return {
            name: torrent?.innerText,
            link: path,
            seeders: seedersList[index]?.innerText,
            leechers: leechersList[index]?.innerText,
            size: sizeList[index]?.firstChild?.data,
            time: timeList[index]?.innerText
        }
    })
    return {tors, lastPage: parseInt(lastPage)}
}

export const parseTorrent = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html');

    const magnet = Array.from(doc.querySelectorAll('a[href^="magnet"]'))

    return magnet[0]?.href
}