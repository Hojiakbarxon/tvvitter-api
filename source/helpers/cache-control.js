import NodeCache from "node-cache";

let cache = new NodeCache()

export let setCache = (key, value) => {
    let data = cache.set(key, value, 300)
    return data
}

export let getCache = (key) => {
    return cache.get(key)
}