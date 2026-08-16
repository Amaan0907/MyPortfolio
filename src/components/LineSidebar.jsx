import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';

const FALLOFF_CURVES = {
    linear: p => p,
    smooth: p => p * p * (3 - 2 * p),
    sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
    'Overview',
    'About Me',
    'Projects',
    'Contact ',
    
];

const LineSidebar = ({
    items = DEFAULT_ITEMS,
    accentColor = 'brown',
    textColor = 'black',
    markerColor = 'black',
    showIndex = true,
    showMarker = true,
    proximityRadius = 100,
    maxShift = 30,
    falloff = 'smooth',
    markerLength = 60,
    markerGap = 0,
    tickScale = 0.5,
    scaleTick = true,
    itemGap = 20,
    fontSize = 1.1,
    smoothing = 100,
    defaultActive = null,
    activeIndex: activeIndexProp,
    onItemClick,
    className = ''
}) => {
    const listRef = useRef(null);
    const itemRefs = useRef([]);
    const targetsRef = useRef([]);
    const currentRef = useRef([]);
    const centersRef = useRef([]); // cached item centers, relative to the list
    const rafRef = useRef(null);
    const moveRafRef = useRef(null);
    const pendingYRef = useRef(null);
    const lastRef = useRef(0);
    const activeRef = useRef(defaultActive);
    const smoothingRef = useRef(smoothing);
    const [activeIndex, setActiveIndex] = useState(defaultActive);

    activeRef.current = activeIndex;
    smoothingRef.current = smoothing;

    // When driven externally (e.g. a scroll-spy tracking the current page
    // section), the controlled prop takes over from the click-set state.
    useEffect(() => {
        if (activeIndexProp != null) setActiveIndex(activeIndexProp);
    }, [activeIndexProp]);

    // Single rAF loop that eases every item's --effect toward its target using
    // frame-rate independent exponential smoothing, so color, shift and scale
    // all move together without staggering CSS transitions.
    const runFrame = useCallback(now => {
        const dt = Math.min((now - lastRef.current) / 1000, 0.05);
        lastRef.current = now;
        const tau = Math.max(smoothingRef.current, 1) / 1000;
        const k = 1 - Math.exp(-dt / tau);

        let moving = false;
        const items = itemRefs.current;
        for (let i = 0; i < items.length; i++) {
            const el = items[i];
            if (!el) continue;
            const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
            const cur = currentRef.current[i] || 0;
            const next = cur + (target - cur) * k;
            const settled = Math.abs(target - next) < 0.0015;
            const value = settled ? target : next;
            currentRef.current[i] = value;
            el.style.setProperty('--effect', value.toFixed(4));
            if (!settled) moving = true;
        }

        rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
    }, []);

    const startLoop = useCallback(() => {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
        }

        lastRef.current = performance.now();
        rafRef.current = requestAnimationFrame(runFrame);
    }, [runFrame]);

    // Measure each item's vertical center ONCE (and whenever layout can change),
    // instead of on every pointermove. Reading offsetTop/offsetHeight inside a
    // mousemove handler forces a synchronous layout on every event, which is
    // what causes the stutter/jank — this removes that reflow from the hot path.
    const measure = useCallback(() => {
        const items = itemRefs.current;
        const centers = new Array(items.length);
        for (let i = 0; i < items.length; i++) {
            const el = items[i];
            if (!el) continue;
            centers[i] = el.offsetTop + el.offsetHeight / 2;
        }
        centersRef.current = centers;
    }, []);

    useLayoutEffect(() => {
        measure();
        const list = listRef.current;
        if (!list || typeof ResizeObserver === 'undefined') return;
        const ro = new ResizeObserver(() => measure());
        ro.observe(list);
        return () => ro.disconnect();
    }, [measure, items, showIndex, fontSize, itemGap]);

    // Recompute targets from the cached centers. Coalesced to one rAF per
    // frame via pendingYRef, so a burst of pointermove events collapses into
    // a single calculation instead of one per event.
    const applyPointerY = useCallback(
        pointerY => {
            const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
            const centers = centersRef.current;
            for (let i = 0; i < centers.length; i++) {
                const center = centers[i];
                if (center == null) continue;
                const distance = Math.abs(pointerY - center);
                targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
            }
            startLoop();
        },
        [falloff, proximityRadius, startLoop]
    );

    const handlePointerMove = useCallback(
        e => {
            const list = listRef.current;
            if (!list) return;
            const rect = list.getBoundingClientRect();
            pendingYRef.current = e.clientY - rect.top;
            if (moveRafRef.current != null) return;
            moveRafRef.current = requestAnimationFrame(() => {
                moveRafRef.current = null;
                if (pendingYRef.current != null) applyPointerY(pendingYRef.current);
            });
        },
        [applyPointerY]
    );

    const handlePointerLeave = useCallback(() => {
        if (moveRafRef.current != null) {
            cancelAnimationFrame(moveRafRef.current);
            moveRafRef.current = null;
        }
        pendingYRef.current = null;
        targetsRef.current = targetsRef.current.map(() => 0);
        startLoop();
    }, [startLoop]);

    const handleClick = useCallback(
        (index, label) => {
            setActiveIndex(index);
            onItemClick?.(index, label);
        },
        [onItemClick]
    );

    useEffect(() => {
        startLoop();
    }, [activeIndex, startLoop]);

    useEffect(
        () => () => {
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            if (moveRafRef.current != null) cancelAnimationFrame(moveRafRef.current);
            rafRef.current = null;
            moveRafRef.current = null;
        },
        []
    );

    return (
        <nav
            className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''}${className ? ` ${className}` : ''}`}
            style={{
                '--accent-color': accentColor,
                '--text-color': textColor,
                '--marker-color': markerColor,
                '--marker-length': `${markerLength}px`,
                '--marker-gap': `${markerGap}px`,
                '--tick-scale': tickScale,
                '--max-shift': `${maxShift}px`,
                '--item-gap': `${itemGap}px`,
                '--font-size': `${fontSize}rem`,
                '--smoothing': `${smoothing}ms`
            }}
        >
            <style>{`
                .line-sidebar {
                    position: relative;
                    display: flex;
                    justify-content: flex-start;
                }

                .line-sidebar--markers {
                    padding-left: calc(var(--marker-length) + var(--marker-gap));
                }

                .line-sidebar__list {
                    list-style: none;
                    margin: 0;
                    padding: 1rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: var(--item-gap);
                }

                .line-sidebar__item {
                    position: relative;
                    cursor: pointer;
                }

                .line-sidebar__item::before {
                    content: '';
                    position: absolute;
                    inset: -6px -48px;
                }

                .line-sidebar__label {
                    position: relative;
                    display: inline-flex;
                    align-items: baseline;
                    font-size: var(--font-size);
                    line-height: 1.2;
                    color: color-mix(in srgb, var(--accent-color) calc(var(--effect, 0) * 100%), var(--text-color));
                    transform: translateX(calc(var(--effect, 0) * var(--max-shift))) scale(1);
                    transform-origin: left center;
                    will-change: transform;
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), font-weight 0.2s ease;
                }

                /* The current page's entry always reads bigger and bolder than
                   any item merely being hovered, so it stays legible as the
                   one you're on rather than just another proximity glow. */
                .line-sidebar__item[aria-current='true'] .line-sidebar__label {
                    font-weight: 700;
                    color: var(--accent-color);
                    transform: translateX(calc(var(--effect, 0) * var(--max-shift))) scale(1.22);
                }

                .line-sidebar__index {
                    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                    margin-right: 0.6rem;
                    font-size: 0.85em;
                    opacity: calc(0.55 + var(--effect, 0) * 0.45);
                }

                .line-sidebar__marker {
                    position: absolute;
                    top: 50%;
                    left: calc(-1 * var(--marker-length) - var(--marker-gap));
                    height: 1px;
                    width: var(--marker-length);
                    background-color: color-mix(in srgb, var(--accent-color) calc(var(--effect, 0) * 100%), var(--marker-color));
                    transform-origin: left center;
                    transform: translateY(-50%) scaleX(calc(0.7 + var(--effect, 0) * 0.5));
                    will-change: transform;
                }

                .line-sidebar--markers .line-sidebar__item:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: calc(100% + var(--item-gap) / 2);
                    left: calc(-1 * var(--marker-length) - var(--marker-gap));
                    height: 1px;
                    width: calc(var(--marker-length) * var(--tick-scale));
                    background-color: var(--marker-color);
                    opacity: 0.5;
                    transform: translateY(-50%);
                }

                .line-sidebar--scale-tick .line-sidebar__item:not(:last-child)::after {
                    transform-origin: left center;
                    transform: translateY(-50%) scaleX(calc(0.7 + var(--effect, 0) * 0.6));
                    will-change: transform;
                }

                @media (prefers-reduced-motion: reduce) {
                    .line-sidebar__label,
                    .line-sidebar__marker,
                    .line-sidebar--scale-tick .line-sidebar__item:not(:last-child)::after {
                        transition: none;
                    }
                }
            `}</style>
            <ul ref={listRef} className="line-sidebar__list" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
                {items.map((label, index) => (
                    <li
                        key={`${label}-${index}`}
                        ref={el => {
                            itemRefs.current[index] = el;
                        }}
                        className="line-sidebar__item"
                        aria-current={activeIndex === index ? 'true' : undefined}
                        onClick={() => handleClick(index, label)}
                    >
                        {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
                        <span className="line-sidebar__label">
                            {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
                            <span className="line-sidebar__text">{label}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LineSidebar;