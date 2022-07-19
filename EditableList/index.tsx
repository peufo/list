import React, { useEffect, useRef } from "react";
import { IconButton } from "@mui/material";

import {
  initListEditable,
  OnChangeHandler,
  OnReindexHandler,
} from "./handlers";

interface IProps<Type = unknown> {
  items: Type[];
  getKey: (item: Type, index: number) => string | number;
  renderItem: (item: Type, index: number) => React.ReactNode;
  onDelete?: (index: number, items?: Type[]) => void;
  onChange?: OnChangeHandler<Type>;
  onReindex?: OnReindexHandler;
}

export default function EditableList<T>({
  items,
  getKey,
  renderItem,
  onDelete,
  onChange,
  onReindex,
}: IProps<T>): JSX.Element {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() =>
    initListEditable<T>({
      listEl: listRef.current,
      onReindex,
      items,
      onChange,
      onDelete,
    })
  );

  return (
    <div ref={listRef}>
      {items.map((item, index) => (
        <div className="item" key={getKey(item, index)} data-index={index}>
          <div className="item-content">{renderItem(item, index)}</div>
          {onDelete && (
            <IconButton className="item-delete" size="small">
              <i className="far fa-trash-alt"></i>
            </IconButton>
          )}
        </div>
      ))}
    </div>
  );
}
