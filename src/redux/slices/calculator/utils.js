const PERMISSIONS = {
  allowEdit: 1,
  disableEdit: 0
}

export function fill(source, target, withCreatingKeys = false) {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);
    const result = Object.assign({},target);
    sourceKeys.forEach(key => {
      if (!targetKeys.includes(key) && !withCreatingKeys) {
        return;
      }
      result[key] = source[key];
    });
    return result;
  }


  export const canEdit = (id) => {
    return Number(id) === PERMISSIONS.allowEdit;
  }


