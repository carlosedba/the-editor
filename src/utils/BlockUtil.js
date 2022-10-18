export function moveDown(arr, index) {
    let newArr = [...arr]
    let newIndex = index + 1

    if (newIndex < arr.length) {
        console.log(arr, index, newIndex)
        let element = arr[index]
    
        newArr.splice(index, 1);
        newArr.splice(newIndex, 0, element)
    }

    return newArr
}

export function moveUp(arr, index) {
    let newArr = [...arr]
    let newIndex = index - 1

    if (newIndex >= 0) {
        console.log(arr, index, newIndex)
        let element = arr[index]
    
        newArr.splice(index, 1);
        newArr.splice(newIndex, 0, element)
    }

    return newArr
}