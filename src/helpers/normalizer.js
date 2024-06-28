

const TYPES = {
    id: 0,
    string: '',
    array: [],
    object: {},
    number: 0,
    boolean: false,
    'null': 'null'


}
export function normalizeItem (item = {}, fields = {}, type) {
    const temp = {};

    Object.entries(fields).forEach(([key, value]) => {
        if(typeof fields[key] === 'object' && !Array.isArray(fields[key])) {
           temp[value.normalizedName] = normalizeItem(item[key], fields[key].data)
        } else {

            temp[value] = item[key] || TYPES[type];
        }
    })
    return temp;

}


export function normalizeList  (data = [], fields, type) {

    return data.map((item) => normalizeItem(item, fields, 'id'));
}