import clsx from 'clsx';
import React, { forwardRef } from 'react';
import type {
  TreeItemComponentType,
  TreeItemComponentProps,
} from '../../types';
import './SimpleTreeItemWrapper.css';

export const SimpleTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
  forwardRef<HTMLDivElement, TreeItemComponentProps<{}>>((props, ref) => {
    const {
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      item,
      wrapperRef,
      style,
      ...rest
    } = props;

    const disableCollapseOnItemClick = !!props.disableCollapseOnItemClick;
    return (
      <li
        className={clsx(
          'dnd-sortable-tree_simple_wrapper',
          clone && 'dnd-sortable-tree_simple_clone',
          ghost && 'dnd-sortable-tree_simple_ghost',
          disableSelection && 'dnd-sortable-tree_simple_disable-selection',
          disableInteraction && 'dnd-sortable-tree_simple_disable-interaction'
        )}
        ref={wrapperRef}
        {...rest}
        style={{
          ...style,
          paddingLeft: clone ? indentationWidth : indentationWidth * depth,
        }}
      >
        <div
          className={'dnd-sortable-tree_simple_tree-item'}
          ref={ref}
          {...(props.manualDrag ? undefined : handleProps)}
          onClick={disableCollapseOnItemClick ? undefined : props.onCollapse}
        >
          {!props.disableSorting && props.showDragHandle !== false && (
            <div
              className={'dnd-sortable-tree_simple_handle'}
              {...handleProps}
            />
          )}
          {!props.manualDrag &&
            !props.hideCollapseButton &&
            !!onCollapse &&
            !!props.childCount && (
              <button
                onClick={(e) => {
                  if (!disableCollapseOnItemClick) {
                    return;
                  }
                  e.preventDefault();
                  onCollapse?.();
                }}
                className={clsx(
                  'dnd-sortable-tree_simple_tree-item-collapse_button',
                  collapsed &&
                    'dnd-sortable-tree_folder_simple-item-collapse_button-collapsed'
                )}
              />
            )}
          {props.children}
        </div>
      </li>
    );
  });
