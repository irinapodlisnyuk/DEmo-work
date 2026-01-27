export function getLoaderEl() {
    const loaderEl = document.createElement('div') as HTMLElement;
    loaderEl.classList.add("loader");
    for (let i=1; i<=13; i++ ) {
        const divEl = document.createElement('div') as HTMLElement;
        loaderEl.append(divEl)
    }
    return loaderEl;
}