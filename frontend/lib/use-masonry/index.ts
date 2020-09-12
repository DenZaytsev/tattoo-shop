import { useEffect, useRef } from 'react';

const setChildrenPositions = (children, { gap, columns }) => {
  children.slice(columns).forEach((c, i) => {
    const prevFin = children[i].getBoundingClientRect().bottom; // bottom edge of item above
    const currIni = c.getBoundingClientRect().top; // top edge of current item

    // eslint-disable-next-line no-param-reassign
    c.style.marginTop = `${prevFin + gap - currIni}px`;
  });
};

export const layoutMasonry = (grid): undefined => {
  if (!grid) {
    // eslint-disable-next-line no-console
    console.error('no grid node provided');
    return undefined;
  }

  // eslint-disable-next-line no-param-reassign
  grid.style.alignItems = 'start';

  const gap = parseFloat(getComputedStyle(grid).gridRowGap);
  const children = [...grid.childNodes].filter(
    (child) =>
      child.nodeType === 1 && +getComputedStyle(child).gridColumnEnd !== -1,
  );

  const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  const rows = getComputedStyle(grid).gridTemplateRows.split(' ').length;

  if (!(rows > 1)) return undefined; // makes no sense to masonry-layout one or less rows

  // if we have more than one column
  if (columns > 1) {
    children.forEach((c) => c.style.removeProperty('margin-top'));
    setChildrenPositions(children, { gap, columns });
  }

  return undefined;
};

const NOOP = () => undefined;

/**
 * @param gridRef - React ref to dom-node with display: grid;
 */
export const useMasonry = (gridRef) => {
  const resizeCallbackRef = useRef(NOOP);

  useEffect(() => {
    if (
      gridRef.current !== null &&
      getComputedStyle(gridRef.current).gridTemplateRows !== 'masonry'
    ) {
      resizeCallbackRef.current = () => layoutMasonry(gridRef.current);

      resizeCallbackRef.current();

      window.removeEventListener('resize', resizeCallbackRef.current);
      window.addEventListener('resize', resizeCallbackRef.current);

      return () => {
        window.removeEventListener('resize', resizeCallbackRef.current);
      };
    }

    return undefined;
  }, [gridRef.current]);
};
