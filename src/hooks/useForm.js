import isEqual from "lodash/isEqual";
import { useState } from "react";

import useStateFromProps from "./useStateFromProps";

function isSelected(data, list, compare){
  return !!list.find(listElement => compare(listElement, data))
}

function add(data, list){
  return [...list, data]
}
function remove(data, list, compare){
  return list.filter(listElement => !compare(listElement, data));
}

function toggle(data, list, compare){
  return isSelected(data, list, compare)
   ? remove(data, list, compare)
   : add(data, list)
}

function merge(
  prevData,
  prevState,
  data){
  return Object.keys(prevState).reduce(
    (acc, key) => {
      if (!isEqual(data[key], prevData[key])) {
        acc[key] = data[key];
      }

      return acc;
    },
    { ...prevState }
  );
}

function handleRefresh(
  data,
  newData,
  setChanged
) {
  if (isEqual(data, newData)) {
    setChanged(false);
  }
}

function useForm(
  initial,
  onSubmit
){
  const [hasChanged, setChanged] = useState(false);
  const [data, setData] = useStateFromProps(initial, {
    mergeFunc: merge,
    // onRefresh: newData => handleRefresh(data, newData, setChanged)
  });

  function toggleValue(event, cb) {
    const { name, value } = event.target;
    const field = data[name];

    if (Array.isArray(field)) {
      if (!hasChanged) {
        setChanged(true);
      }
      setData({
        ...data,
        [name]: toggle(value, field, isEqual)
      });
    }

    if (typeof cb === "function") {
      cb();
    }
  }

  function change(event) {
    const { name, value } = event.target;

    if (!(name in data)) {
      console.error(`Unknown form field: ${name}`);
      return;
    } else {
      if (data[name] !== value) {
        setChanged(true);
      }
      setData(data => ({
        ...data,
        [name]: value
      }));
    }
  }

  function reset() {
    setData(initial);
  }

  function set(newData) {
    setData(data => ({
      ...data,
      ...newData
    }));
  }

  async function submit() {
    if (typeof onSubmit === "function") {
      const result = onSubmit(data);
      if (result) {
        const errors = await result;
        if (errors.length === 0) {
          setChanged(false);
        }
      }
    }
  }

  function triggerChange() {
    setChanged(true);
  }

  return {
    change,
    data,
    hasChanged,
    reset,
    set,
    submit,
    toggleValue,
    triggerChange
  };
}

export default useForm;
