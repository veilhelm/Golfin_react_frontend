
export const useObserver = (DOMref, threshold, classes, animationIsOver = true ) => {
    const observer = new IntersectionObserver((changes) =>{
        for(const change of changes) {
            if(typeof change.isVisible === 'undefined') change.isVisible = true
            if(change.isIntersecting && change.isVisible && animationIsOver) classes.forEach( cssClass => DOMref.current.classList.remove(cssClass))
            if(!change.isIntersecting && animationIsOver) classes.forEach( cssClass => DOMref.current.classList.add(cssClass))
        }
    }, {
        threshold:[threshold],
        trackVisibility: true,
        delay: 100
    })
    return observer
}