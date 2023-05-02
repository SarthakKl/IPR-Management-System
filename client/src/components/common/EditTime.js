export const editTime = (time) => {
    return time.slice(0, time.indexOf('GMT') - 1);
}