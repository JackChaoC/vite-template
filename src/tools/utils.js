function getIconUrl(imageName) {
    return new URL(`../assets/icon/${imageName}`, import.meta.url).href
}
function getImgUrl(imageName) {
    return new URL(`../assets/image/${imageName}`, import.meta.url).href
}
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// 使用示例

export { getIconUrl, getImgUrl ,getCookie}