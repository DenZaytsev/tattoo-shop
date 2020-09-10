import { useEffect, useRef } from 'react';

const setChildrenPositions = (children, { gap, columns }) => {
  children.slice(columns).forEach((c, i) => {
    const prevFin = children[i].getBoundingClientRect().bottom; // bottom edge of item above
    const currIni = c.getBoundingClientRect().top; // top edge of current item

    c.style.marginTop = `${prevFin + gap - currIni}px`;
  });
};

export const layoutMasonry = (grid, isResizeAdaptable) => {
  grid.style.alignItems = 'start';

  const gap = parseFloat(getComputedStyle(grid).gridRowGap);
  const children = [...grid.childNodes].filter(
    (child) =>
      child.nodeType === 1 && +getComputedStyle(child).gridColumnEnd !== -1,
  );

  let columns = 0;

  // get the post relayout number of columns and rows
  const postLayoutColumns = getComputedStyle(grid).gridTemplateColumns.split(
    ' ',
  ).length;
  const postLayoutRows = getComputedStyle(grid).gridTemplateRows.split(' ')
    .length;

  if (!(postLayoutRows > 1)) return; // makes no sense to masonry-layout one or less rows

  // if the number of columns has changed
  if (columns !== postLayoutColumns) {
    // update number of columns
    columns = postLayoutColumns;

    if (isResizeAdaptable) {
      // revert to initial positioning, no margin
      children.forEach((c) => c.style.removeProperty('margin-top'));
    }

    // if we have more than one column
    if (columns > 1) {
      setChildrenPositions(children, { gap, columns });
    }
  }
};

/**
 * @param gridRef - React ref to dom-node with display: grid;
 */
export const useMasonry = (gridRef, isListeningToResize = true) => {
  const resizeCallbackRef = useRef();

  useEffect(() => {
    if (
      gridRef.current !== null &&
      getComputedStyle(gridRef.current).gridTemplateRows !== 'masonry'
    ) {
      resizeCallbackRef.current = () =>
        layoutMasonry(gridRef.current, isListeningToResize);

      resizeCallbackRef.current();

      window.removeEventListener('resize', resizeCallbackRef.current);
      window.addEventListener('resize', resizeCallbackRef.current);

      return () => {
        window.removeEventListener('resize', resizeCallbackRef.current);
      };
    }
  }, [gridRef.current]);
};
