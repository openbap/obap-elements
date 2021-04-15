/*
@license
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
/**
Provides various animation functions.
*/
class AnimationData {
    constructor(el, startBounds, startOpacity, startColor, startBackgroundColor) {
        this.el = el;
        this.startBounds = startBounds;
        this.startOpacity = startOpacity;
        this.startColor = startColor;
        this.startBackgroundColor = startBackgroundColor;
        this.endBounds = null;
        this.endOpacity = null;
    }
}

const scaleAnimation = function (el, scaleStart, scaleEnd, startStateFunc, endStateFunc, duration = 280, easingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)') {
    if (startStateFunc) {
        startStateFunc();
    }

    const player = el.animate([{
        transformOrigin: 'center',
        transform: `translate(-50%, -50%) scale(${scaleStart})`
    }, {
        transformOrigin: 'center',
        transform: `translate(-50%, -50%) scale(${scaleEnd})`
    }], {
        duration: duration,
        delay: 0,
        easing: easingFunction,
        fill: 'both'
    });

    if (endStateFunc) {
        player.addEventListener('finish', () => {
            endStateFunc();
        });
    }
}

const opacityAnimation = function (el, opacityStart, opacityEnd, startStateFunc, endStateFunc, duration = 280, easingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)') {
    if (startStateFunc) {
        startStateFunc();
    }

    const player = el.animate([{
        opacity: opacityStart
    }, {
        opacity: opacityEnd
    }], {
        duration: duration,
        delay: 0,
        easing: easingFunction,
        fill: 'both'
    });

    if (endStateFunc) {
        player.addEventListener('finish', () => {
            endStateFunc();
        });
    }
}

const scaleOpacityAnimation = function (el, scaleStart, scaleEnd, opacityStart, opacityEnd, startStateFunc, endStateFunc, duration = 280, easingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)') {
    if (startStateFunc) {
        startStateFunc();
    }

    const player = el.animate([{
        transformOrigin: 'center',
        transform: `translate(-50%, -50%) scale(${scaleStart})`,
        opacity: opacityStart

    }, {
        transformOrigin: 'center',
        transform: `translate(-50%, -50%) scale(${scaleEnd})`,
        opacity: opacityEnd
    }], {
        duration: duration,
        delay: 0,
        easing: easingFunction,
        fill: 'both'
    });

    if (endStateFunc) {
        player.addEventListener('finish', () => {
            endStateFunc();
        });
    }
}

const animateCollapsibleContainer = function (el, direction = 'open', duration = 280, easingFunction = 'ease-in-out') {
    const rect = el.getBoundingClientRect();
    const endHeight = direction === 'open' ? el.scrollHeight : 0;
    const startHeight = rect.height;
    const endWidth = direction === 'open' ? el.scrollWidth : 0;
    const startWidth = rect.width;

    requestAnimationFrame(() => {
        el.animate([{
            height: `${startHeight}px`,
            width: `${startWidth}px`
        }, {
            height: `${endHeight}px`,
            width: `${endWidth}px`
        }], {
            duration: duration,
            easing: easingFunction,
            fill: 'both'
        });
    });
}

const animateCollapsibleVerticalContainer = function (el, direction = 'open', duration = 280, easingFunction = 'ease-in-out') {
    const rect = el.getBoundingClientRect();
    const endHeight = direction === 'open' ? el.scrollHeight : 0;
    const startHeight = rect.height;

    requestAnimationFrame(() => {
        el.animate([{
            height: `${startHeight}px`
        }, {
            height: `${endHeight}px`
        }], {
            duration: duration,
            easing: easingFunction,
            fill: 'both'
        });
    });
}

const animateCollapsibleHorizontalContainer = function (el, direction = 'open', duration = 280, easingFunction = 'ease-in-out') {
    const rect = el.getBoundingClientRect();
    const endWidth = direction === 'open' ? el.scrollWidth : 0;
    const startWidth = rect.width;
    console.log(`${startWidth} -> ${endWidth}`)

    requestAnimationFrame(() => {
        el.animate([{
            width: `${startWidth}px`
        }, {
            width: `${endWidth}px`
        }], {
            duration: duration,
            easing: easingFunction,
            fill: 'both'
        });
    });
}

const animateTo = function (source, target, finalStateFunc, duration = 280, easingFunction = 'ease-in-out') {
    const csSource = window.getComputedStyle(source);
    const animationData = new AnimationData(source, source.getBoundingClientRect(), parseFloat(csSource.getPropertyValue('opacity')));

    if (finalStateFunc) {
        finalStateFunc();
    }

    requestAnimationFrame(() => {
        const csTarget = window.getComputedStyle(target);
        animationData.endBounds = target.getBoundingClientRect();
        animationData.endOpacity = parseFloat(csTarget.getPropertyValue('opacity'));

        const deltaX = animationData.startBounds.left - animationData.endBounds.left;
        const deltaY = animationData.startBounds.top - animationData.endBounds.top;
        const deltaW = animationData.startBounds.width / animationData.endBounds.width;
        const deltaH = animationData.startBounds.height / animationData.endBounds.height;

        source.animate([{
            opacity: animationData.startOpacity,
            transformOrigin: 'top left',
            transform: `
                  translate(${deltaX}px, ${deltaY}px)
                  scale(${deltaW}, ${deltaH})
                `
        }, {
            transformOrigin: 'top left',
            transform: 'none',
        }], {
            duration: duration,
            easing: easingFunction,
            fill: 'both'
        });
    });
}

const animateElement = function (el, finalStateFunc, duration = 280, animatableAttribute = 'animatable', easingFunction = 'ease-in-out') {
    var animationData = null;
    var animatingElements = [...el.querySelectorAll(`*[${animatableAttribute}]`)];

    if (el.hasAttribute(animatableAttribute)) {
        animatingElements = [el, ...animatingElements];
    }

    animationData = animatingElements.map(item => {
        const cs = window.getComputedStyle(item);
        return new AnimationData(item, item.getBoundingClientRect(), parseFloat(cs.getPropertyValue('opacity')), cs.getPropertyValue('color'), cs.getPropertyValue('background-color'));
    });

    if (finalStateFunc) {
        finalStateFunc();
    }

    requestAnimationFrame(() => {
        animationData.forEach(item => {
            const cs = window.getComputedStyle(item.el);
            item.endBounds = item.el.getBoundingClientRect();
            item.endOpacity = parseFloat(cs.getPropertyValue('opacity'));
        });

        console.log(animationData)

        animationData.forEach(item => {
            const deltaX = item.startBounds.left - item.endBounds.left;
            const deltaY = item.startBounds.top - item.endBounds.top;
            const deltaW = item.endBounds.width !== 0 ? item.startBounds.width / item.endBounds.width : 0;
            const deltaH = item.endBounds.height !== 0 ? item.startBounds.height / item.endBounds.height : 0; 

            item.el.animate([{
                opacity: item.startOpacity,
                color: item.startColor,
                backgroundColor: item.startBackgroundColor,
                transformOrigin: 'top left',
                transform: `
                  translate(${deltaX}px, ${deltaY}px)
                  scale(${deltaW}, ${deltaH})
                `
            }, {
                transformOrigin: 'top left',
                transform: 'none',
            }], {
                duration: duration,
                easing: easingFunction,
                fill: 'both'
            });
        });
    });
}

export { animateElement, animateTo, animateCollapsibleVerticalContainer, animateCollapsibleHorizontalContainer, animateCollapsibleContainer, 
         scaleAnimation, opacityAnimation, scaleOpacityAnimation };