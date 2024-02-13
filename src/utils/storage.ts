export const getDisplayPhotoName = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0);
    const unixTimestamp = Math.floor(Date.now() / 1000);
    return `${firstInitial}${lastName}${unixTimestamp}Avatar.jpg`
}